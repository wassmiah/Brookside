const COUNTRY_PATTERN = /^[A-Z]{2}$/;
const UNKNOWN_CODES = new Set(["XX", "T1"]);

function normalizeCountry(value) {
  const code = String(value || "").trim().toUpperCase();
  if (!COUNTRY_PATTERN.test(code) || UNKNOWN_CODES.has(code)) return "";
  return code;
}

async function fetchWithTimeout(url, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      signal: controller.signal,
      cache: "no-store",
      credentials: "same-origin",
    });
  } finally {
    clearTimeout(timer);
  }
}

async function countryFromOrigin() {
  const response = await fetchWithTimeout("/visitor-country.php", 2500);
  if (!response.ok) return "";
  const contentType = response.headers.get("content-type") || "";
  if (!contentType.includes("application/json")) return "";
  const data = await response.json();
  return normalizeCountry(data.country);
}

async function countryFromCloudflareTrace() {
  const response = await fetchWithTimeout("/cdn-cgi/trace", 2500);
  if (!response.ok) return "";
  const text = await response.text();
  if (!text.includes("loc=")) return "";
  const match = text.match(/(?:^|\n)loc=([A-Za-z]{2})(?:\n|$)/);
  return normalizeCountry(match && match[1]);
}

/**
 * Country comes from the hosting edge, not from the browser language.
 * 1. Same-origin PHP reads CF-IPCountry or CloudFront-Viewer-Country.
 * 2. Cloudflare's /cdn-cgi/trace loc field, when this site is proxied.
 * 3. Empty string. Callers decide the fallback.
 */
export async function detectVisitorCountry() {
  try {
    const fromOrigin = await countryFromOrigin();
    if (fromOrigin) return fromOrigin;
  } catch (err) {
    // PHP is optional. The trace lookup is the next source.
  }

  try {
    return await countryFromCloudflareTrace();
  } catch (err) {
    return "";
  }
}
