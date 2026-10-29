/**
 * Edit prices, features, and who can see them here.
 * Do not duplicate these strings inside components.
 *
 * hidePricingForCountries uses ISO country codes from the hosting/CDN
 * geolocation header (Cloudflare CF-IPCountry, or CloudFront-Viewer-Country).
 * Browser language is not used.
 *
 * showPricingWhenCountryUnknown: when the edge cannot identify a country,
 * pricing stays visible so international visitors are not blocked by a failed lookup.
 */
export const EVA_GEO = {
  hidePricingForCountries: ["PH"],
  showPricingWhenCountryUnknown: true,
};

export const EVA_PILOT = {
  id: "pilot",
  price: "$500",
  title: "$500 Pilot Run — 10 Days. Your Decision.",
  summary: "See how dedicated virtual assistance fits your business before you choose a monthly plan.",
  cta: "Start Your Pilot",
};

export const EVA_PLANS = [
  {
    id: "part-time",
    name: "Part-Time",
    hours: "80 hours",
    price: "$1299",
    period: "/ month",
    featured: false,
    cta: "Get Started",
    features: [
      "AI-certified virtual assistant",
      "Foundational AI knowledge",
      "Trained and experienced virtual assistant",
    ],
  },
  {
    id: "full-time",
    name: "Full-Time",
    hours: "160 hours",
    price: "$2499",
    period: "/ month",
    featured: true,
    cta: "Get Started",
    features: [
      "AI-certified virtual assistant",
      "Trained and experienced virtual assistant",
      "Advanced AI knowledge and automation",
      "Dedicated Success Manager",
    ],
  },
];

export function shouldShowEvaPricing(countryCode) {
  const code = (countryCode || "").toUpperCase();
  if (!code) return EVA_GEO.showPricingWhenCountryUnknown;
  return !EVA_GEO.hidePricingForCountries.includes(code);
}
