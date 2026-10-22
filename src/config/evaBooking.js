/**
 * Discovery calls use a real scheduling URL when one is set.
 * Leave discoveryCallUrl empty to send those buttons to the existing EVA inquiry form.
 * Do not put a placeholder URL here.
 */
export const EVA_BOOKING = {
  discoveryCallUrl: "",
};

export const EVA_INQUIRY_INTERESTS = {
  pilot: "You asked about the $500, 10-day pilot run. Share a few details below and the team will follow up.",
  "part-time": "You asked about the part-time plan. Share a few details below and the team will follow up.",
  "full-time": "You asked about the full-time plan. Share a few details below and the team will follow up.",
  discovery: "You asked for a discovery call. Share a few details below and the team will follow up.",
  "know-more": "Tell us what you want to know and the team will follow up.",
  "get-started": "Tell us about your business and the team will follow up.",
};
