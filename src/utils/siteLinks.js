export function isLocalHost() {
  if (typeof window === "undefined") return true;
  const host = window.location.hostname;
  return host === "localhost" || host === "127.0.0.1";
}

export function getBrooksideUrl(path = "/") {
  if (isLocalHost()) return path;
  return `https://brooksidemps.com${path}`;
}

export function getEvaUrl(path = "") {
  if (typeof window === "undefined") return path ? `/eva${path}` : "/eva";
  const host = window.location.hostname;
  if (host === "localhost" || host === "127.0.0.1") {
    if (!path || path === "/") return "/eva";
    return path.startsWith("/eva") ? path : `/eva${path}`;
  }
  if (host === "eva.brooksidemps.com") return path || "/";
  return `https://eva.brooksidemps.com${path || ""}`;
}
