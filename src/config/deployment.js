/**
 * Independent deploys:
 *   REACT_APP_SITE=combined    one app, current domain behavior (default)
 *   REACT_APP_SITE=eva         EVA only. Home is /.
 *   REACT_APP_SITE=brookside   Brookside only. EVA links leave the site.
 *
 * Origins are used when a button must leave this deployment.
 */
export const SITE_MODE = process.env.REACT_APP_SITE || "combined";

export const EVA_ORIGIN = (process.env.REACT_APP_EVA_ORIGIN || "https://eva.brooksidemps.com").replace(/\/$/, "");
export const BROOKSIDE_ORIGIN = (process.env.REACT_APP_BROOKSIDE_ORIGIN || "https://brooksidemps.com").replace(/\/$/, "");

export const isEvaDeploy = SITE_MODE === "eva";
export const isBrooksideDeploy = SITE_MODE === "brookside";

export function evaCanonicalPath(subpath = "/") {
  if (isEvaDeploy) return subpath || "/";
  if (!subpath || subpath === "/") return "/eva";
  return subpath.startsWith("/eva") ? subpath : `/eva${subpath.startsWith("/") ? subpath : `/${subpath}`}`;
}
