export const NEWS = [
  {
    slug: "brookside-operations-across-five-locations",
    title: "Brookside operations across five locations",
    description:
      "Brookside supports partners from Baguio, Clark, Manila, and Cebu, with international online staffing through EVA in Nevada.",
    date: "2026-09-08",
    category: "Company",
    image: "/manila.jpg",
    imageAlt: "Manila, a Brookside operating location",
    paragraphs: [
      "Brookside matches people to the standard of the brand they will represent. That work now runs from Baguio, Clark, Manila, and Cebu, with international online staffing in Nevada through EVA.",
      "Each location is there for a reason. Baguio supports talent across Northern Luzon. Clark sits beside a growing business corridor. Manila is the hub for partner operations. Cebu extends the same standard into the Visayas. Nevada is the remote-staffing base, powered through EVA.",
      "The aim is the same in every city: source carefully, train with practitioners, and place people who can carry a 5-star standard.",
    ],
  },
  {
    slug: "hospitality-roles-open-for-application",
    title: "Hospitality roles open for application",
    description:
      "Brookside is accepting applications for hospitality roles, including front-of-house, kitchen, and guest service positions. No experience is required for entry-level roles.",
    date: "2026-08-20",
    category: "Recruitment",
    image: "/how-to-resume.png",
    imageAlt: "Guide for preparing a resume when applying to Brookside",
    paragraphs: [
      "Brookside is hiring for hospitality teams: receptionist, waitstaff, cashier, barista, bartender, line cook, kitchen helper, kitchen steward, commissary, and pastry.",
      "Entry-level roles do not require previous experience. What matters is the willingness to learn the standard of the workplace you join.",
      "Send a resume to inquire@brooksidemanpower.com with the subject Applicant_F&B, or use the careers page to see the current list and requirements.",
    ],
  },
  {
    slug: "eva-online-staffing-with-brookside",
    title: "Online staffing with EVA and Brookside",
    description:
      "EVA and Brookside partner on virtual staffing so businesses can add trained remote support without lowering the standard of the hire.",
    date: "2026-07-15",
    category: "Partnership",
    image: "/nevada.jpg",
    imageAlt: "Nevada, where EVA powers Brookside online staffing",
    paragraphs: [
      "EVA is Brookside’s online staffing practice. It places virtual assistants for operations, customer communication, marketing support, and executive assistance.",
      "Brookside handles sourcing, screening, and workforce management in the Philippines. EVA puts that talent to work for partners who need reliable remote support, including teams served from Nevada.",
      "Businesses that want a consultation can start from the EVA inquiry form. Professionals who want to be trained and hired can apply through the EVA course and apply sections.",
    ],
  },
];

export function getNewsArticle(slug) {
  return NEWS.find((article) => article.slug === slug);
}

export function formatNewsDate(isoDate) {
  return new Date(`${isoDate}T00:00:00`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
