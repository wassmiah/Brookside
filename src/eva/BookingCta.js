import { Link } from "react-router-dom";
import { EVA_BOOKING } from "../config/evaBooking";
import { getEvaUrl } from "../utils/siteLinks";

function inquiryHref(interest) {
  const base = getEvaUrl("/inquiry");
  const joiner = base.includes("?") ? "&" : "?";
  return `${base}${joiner}interest=${encodeURIComponent(interest)}`;
}

function SmartAnchor({ href, className, onClick, children }) {
  if (/^https?:\/\//i.test(href)) {
    return (
      <a className={className} href={href} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <Link className={className} to={href} onClick={onClick}>
      {children}
    </Link>
  );
}

/**
 * Discovery calls open EVA_BOOKING.discoveryCallUrl when it is a real URL.
 * Every other action opens the existing inquiry form.
 */
export default function BookingCta({
  interest,
  purpose = "inquiry",
  className = "",
  onClick,
  children,
}) {
  if (purpose === "discovery" && EVA_BOOKING.discoveryCallUrl) {
    return (
      <a className={className} href={EVA_BOOKING.discoveryCallUrl} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <SmartAnchor className={className} href={inquiryHref(interest)} onClick={onClick}>
      {children}
    </SmartAnchor>
  );
}
