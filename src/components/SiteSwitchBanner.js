import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { isBrooksideDeploy, isEvaDeploy } from "../config/deployment";
import { useVisitorCountry } from "../context/VisitorCountryContext";
import { getBrooksideUrl, getEvaUrl } from "../utils/siteLinks";
import "./SiteSwitchBanner.css";

const DISMISS_KEY = "site-switch-dismissed";

function SmartLink({ href, children }) {
  return <a href={href}>{children}</a>;
}

export default function SiteSwitchBanner() {
  const location = useLocation();
  const { country, status } = useVisitorCountry();
  const [dismissed, setDismissed] = useState(() => {
    try {
      return sessionStorage.getItem(DISMISS_KEY) === location.pathname;
    } catch (err) {
      return false;
    }
  });

  const onEva = isEvaDeploy || location.pathname === "/eva" || location.pathname.startsWith("/eva/") || location.pathname === "/inquiry";
  const showBrooksideLink = status === "ready" && country === "PH" && onEva && !isBrooksideDeploy;
  const showEvaLink = status === "ready" && country && country !== "PH" && !onEva && !isEvaDeploy;
  const visible = !dismissed && (showBrooksideLink || showEvaLink);

  useEffect(() => {
    document.body.classList.toggle("has-site-switch", visible);
    return () => document.body.classList.remove("has-site-switch");
  }, [visible]);

  if (!visible) return null;

  const dismiss = () => {
    try {
      sessionStorage.setItem(DISMISS_KEY, location.pathname);
    } catch (err) {
      // The banner can still close for this view.
    }
    setDismissed(true);
  };

  return (
    <div className="site-switch" role="region" aria-label="Switch website">
      <p>
        {showBrooksideLink
          ? "You are viewing EVA, our global virtual staffing brand. For manpower services in the Philippines, visit Brookside."
          : "Looking for an AI-fluent virtual assistant? Visit EVA, our global virtual staffing brand."}
      </p>
      <SmartLink href={showBrooksideLink ? getBrooksideUrl("/") : getEvaUrl()}>
        {showBrooksideLink ? "Visit Brookside" : "Visit EVA"}
      </SmartLink>
      <button type="button" onClick={dismiss}>
        Stay here
      </button>
    </div>
  );
}
