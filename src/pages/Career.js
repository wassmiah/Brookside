import React from "react";
import "./Career.css";
import SEO from "../components/SEO";
import SocialLinks from "../components/SocialLinks";

const CAREERS_EMAIL = ["careers", "@", "brooksidemanpower.com"].join("");
const EMAIL_SUBJECT = "Position | Name";
const POSITIONS_URL = "https://www.facebook.com/profile.php?id=61587112033958";
const MAILTO = `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(EMAIL_SUBJECT)}`;

function Career() {
  return (
    <>
      <SEO
        title="Apply Now"
        description="Send your CV to careers@brooksidemanpower.com with the subject Position | Name. Current openings are posted on the Brookside Facebook page."
        keywords="Brookside careers, apply now, send CV, manpower jobs, Brookside Manpower Services"
        ogImage="/media/about-still.webp"
        ogImageAlt="Brookside team"
        canonicalUrl="/career"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://brooksidemps.com",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Apply Now",
              item: "https://brooksidemps.com/career",
            },
          ],
        }}
      />

      <main className="career-page">
        <section className="career-hero" aria-label="Apply now">
          <img
            src="/media/about-still.webp"
            alt=""
            className="career-hero-photo"
            width="1400"
            height="933"
          />
          <div className="career-hero-copy">
            <div className="career-hero-panel">
              <h1>
                <span className="orange">Apply</span> <span className="blue">Now</span>
              </h1>
              <p>Send your CV. We’ll take it from there.</p>
            </div>
          </div>
        </section>

        <section className="career-apply" aria-label="How to apply">
          <div className="career-apply-copy">
            <h2>
              <span className="orange">How to</span> <span className="blue">Apply</span>
            </h2>
            <p className="career-lead">
              Email your CV to{" "}
              <a href={MAILTO}>{CAREERS_EMAIL}</a>
            </p>
            <div className="career-subject">
              <span>Email subject</span>
              <strong>{EMAIL_SUBJECT}</strong>
            </div>
            <a className="career-mail-btn" href={MAILTO}>
              Email your CV
            </a>
          </div>
          <div className="career-photo-grid" aria-hidden="true">
            <img src="/services/manpower.png" alt="" width="900" height="900" />
            <img src="/services/projects.png" alt="" width="900" height="900" />
            <img src="/services/placement.png" alt="" width="900" height="1000" />
          </div>
        </section>

        <section className="career-openings" aria-label="Available positions">
          <img
            src="/media/loc-manila.webp"
            alt=""
            className="career-openings-photo"
            width="900"
            height="600"
          />
          <div className="career-openings-copy">
            <h2>
              <span className="orange">Open</span> <span className="blue">Positions</span>
            </h2>
            <p>
              For the list of available positions, check our Facebook posts for current openings.
            </p>
            <a
              className="career-mail-btn"
              href={POSITIONS_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              View openings on Facebook
            </a>
          </div>
        </section>

        <section className="career-social" aria-label="Follow our socials">
          <h2>
            <span className="orange">Follow</span> <span className="blue">our socials</span>
          </h2>
          <SocialLinks
            className="career-social-links"
            linkClassName="career-social-link"
            showLabels
          />
        </section>
      </main>
    </>
  );
}

export default Career;
