const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_id",
  "utm_term",
  "utm_content",
  "placement",
  "ad_id",
];

const FIRST_TOUCH_KEYS = ["landing_page", "first_page_url", "referrer"];

export const ATTRIBUTION_KEYS = [...UTM_KEYS, ...FIRST_TOUCH_KEYS];

function storageAvailable() {
  try {
    return typeof window !== "undefined" && window.localStorage != null;
  } catch (err) {
    return false;
  }
}

function readKey(key) {
  if (!storageAvailable()) return "";
  try {
    return window.localStorage.getItem(key) || "";
  } catch (err) {
    return "";
  }
}

function writeKey(key, value) {
  if (!storageAvailable()) return;
  try {
    window.localStorage.setItem(key, value);
  } catch (err) {
    // Private browsing can block storage. The form still submits without attribution.
  }
}

export function getAttribution() {
  return ATTRIBUTION_KEYS.reduce((values, key) => {
    const value = readKey(key);
    if (value) values[key] = value;
    return values;
  }, {});
}

function pushDataLayer(payload) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(payload);
}

export function captureAttribution(search) {
  if (typeof window === "undefined") return getAttribution();

  const params = new URLSearchParams(
    search != null ? search : window.location.search
  );
  let updated = false;

  UTM_KEYS.forEach((key) => {
    const incoming = (params.get(key) || "").trim();
    if (!incoming || incoming === readKey(key)) return;
    writeKey(key, incoming);
    updated = true;
  });

  if (!readKey("landing_page")) {
    writeKey("landing_page", `${window.location.pathname}${window.location.search}`);
    updated = true;
  }

  if (!readKey("first_page_url")) {
    writeKey("first_page_url", window.location.href);
    updated = true;
  }

  if (!readKey("referrer") && document.referrer) {
    writeKey("referrer", document.referrer);
    updated = true;
  }

  const attribution = getAttribution();
  if (updated) {
    pushDataLayer({
      event: "attribution_ready",
      ...attribution,
    });
  }

  return attribution;
}

export function pushLeadEvent(eventName, leadType) {
  pushDataLayer({
    event: eventName,
    lead_type: leadType,
    ...getAttribution(),
  });
}

export function pushClientLead() {
  pushLeadEvent("generate_lead", "client");
}

export function pushApplicantSubmit() {
  pushLeadEvent("application_submit", "applicant");
}
