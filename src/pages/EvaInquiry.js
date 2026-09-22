import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Eva.css";
import "./EvaInquiry.css";
import SEO from "../components/SEO";
import SocialLinks from "../components/SocialLinks";
import { pushClientLead } from "../utils/attribution";

const EVA_INQUIRY_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScDMfeClW80ATe_sY2S6nELA83C57kdWCyPYsW4zV5gsl12iA/viewform";
const EVA_INQUIRY_FORM_EMBED_URL = `${EVA_INQUIRY_FORM_URL}?embedded=true&hl=en`;

function EvaInquiry() {
  const formFrameRef = useRef(null);
  const formLoadCount = useRef(0);
  const formFocused = useRef(false);
  const leadTracked = useRef(false);

  useEffect(() => {
    const markFocused = () => {
      if (document.activeElement === formFrameRef.current) {
        formFocused.current = true;
      }
    };
    window.addEventListener("blur", markFocused);
    return () => window.removeEventListener("blur", markFocused);
  }, []);

  const handleInquiryFormLoad = () => {
    formLoadCount.current += 1;
    if (!formFocused.current || formLoadCount.current < 2 || leadTracked.current) return;
    leadTracked.current = true;
    pushClientLead();
  };

  return (
    <>
      <SEO
        title="Hire EVA Brookside | EVA PH Inquiry Form"
        description="Hire EVA Brookside Philippines. Get started with EVA's premium executive virtual assistant services. Fill out our inquiry form and join industry leaders. EVA PH - Fast hiring in 21 days average, 98% client satisfaction rate."
        keywords="eva brookside, eva virtual assistant, eva ph, eva philippines, hire eva virtual assistant, eva brooksidemps, virtual assistant philippines, filipino virtual assistant, eva va philippines, hire virtual assistant philippines, eva inquiry, eva brookside inquiry"
        ogImage="/eva-nav-logo.png"
        ogImageWidth={1200}
        ogImageHeight={630}
        ogImageAlt="EVA Brookside - Inquiry Form Philippines"
        canonicalUrl="/eva/inquiry"
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Virtual Assistant Services",
            "provider": {
              "@type": "Organization",
              "name": "EVA (Brookside Manpower Services)",
              "url": "https://brooksidemps.com/eva"
            },
            "areaServed": {
              "@type": "Country",
              "name": "Global"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "Virtual Assistant Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Property Management Support"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "E-Commerce Operations"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Digital Marketing Support"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Financial Administration"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Executive Assistance"
                  }
                }
              ]
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://brooksidemps.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "EVA",
                "item": "https://brooksidemps.com/eva"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Inquiry",
                "item": "https://brooksidemps.com/eva/inquiry"
              }
            ]
          }
        ]}
      />

      <div className="eva-inquiry-page">
        <section className="eva-inquiry-main section-partition">
          <div className="eva-inquiry-container">
            <div className="eva-inquiry-intro">
              <h1 className="eva-inquiry-kicker">Partner with EVA</h1>
              <img src="/eva-nav-logo.png" alt="EVA Brookside" className="eva-inquiry-intro-logo" />
            </div>

            <div className="eva-inquiry-grid">
              <div className="eva-inquiry-form-section">
                <div className="eva-inquiry-form-header">
                  <h2 className="eva-inquiry-form-title">Get Started</h2>
                  <p className="eva-inquiry-form-subtitle">
                    Complete the brief below and we will respond within one business day.
                  </p>
                </div>
                <div className="eva-google-form-shell">
                  <div className="eva-google-form-container">
                    <iframe
                      ref={formFrameRef}
                      className="eva-google-form"
                      src={EVA_INQUIRY_FORM_EMBED_URL}
                      title="EVA Client Inquiry Form"
                      width="640"
                      height="1885"
                      loading="lazy"
                      onLoad={handleInquiryFormLoad}
                    >
                      Loading…
                    </iframe>
                  </div>
                </div>
                <p className="eva-form-fallback-text">
                  Prefer a full-page form?{" "}
                  <a href={`${EVA_INQUIRY_FORM_URL}?hl=en`} target="_blank" rel="noopener noreferrer" className="eva-inquiry-contact-link">
                    Open it in a new tab
                  </a>
                </p>
              </div>

              <aside className="eva-inquiry-benefits-card">
                <h2 className="eva-inquiry-benefits-title">Why Choose EVA?</h2>
                <ul className="eva-inquiry-benefits-list">
                  <li className="eva-inquiry-benefit-item">
                    <i className="fas fa-check-circle" aria-hidden="true"></i>
                    <span>98% client retention rate</span>
                  </li>
                  <li className="eva-inquiry-benefit-item">
                    <i className="fas fa-check-circle" aria-hidden="true"></i>
                    <span>Fast hiring in 21 days average</span>
                  </li>
                  <li className="eva-inquiry-benefit-item">
                    <i className="fas fa-check-circle" aria-hidden="true"></i>
                    <span>Save up to 70% on staffing costs</span>
                  </li>
                  <li className="eva-inquiry-benefit-item">
                    <i className="fas fa-check-circle" aria-hidden="true"></i>
                    <span>Elite virtual assistants, vetted and trained</span>
                  </li>
                </ul>
              </aside>
            </div>

            <div className="eva-inquiry-contact-card eva-inquiry-contact-below">
              <p className="eva-inquiry-kicker eva-inquiry-kicker-left">Direct line</p>
              <h2 className="eva-inquiry-contact-title">Contact Us</h2>
              <p className="eva-inquiry-contact-subtitle">Prefer to speak with us first? Reach the team through any of the channels below.</p>

              <div className="eva-inquiry-contact-details">
                <div className="eva-inquiry-contact-item">
                  <div className="eva-inquiry-contact-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="eva-inquiry-contact-content">
                    <h3 className="eva-inquiry-contact-label">Office</h3>
                    <p className="eva-inquiry-contact-value">
                      Unit 704C, Tower 3, PITX Building<br />
                      1 Kennedy Road, Barangay Tambo<br />
                      Paranaque City, 1701 Metro Manila
                    </p>
                  </div>
                </div>

                <div className="eva-inquiry-contact-item">
                  <div className="eva-inquiry-contact-icon">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div className="eva-inquiry-contact-content">
                    <h3 className="eva-inquiry-contact-label">Phone</h3>
                    <p className="eva-inquiry-contact-value">
                      <a href="tel:+63270019493" className="eva-inquiry-contact-link">(02) 7001 9493</a><br />
                      <a href="tel:+639171578874" className="eva-inquiry-contact-link">+63 917 157 8874</a>
                    </p>
                  </div>
                </div>

                <div className="eva-inquiry-contact-item">
                  <div className="eva-inquiry-contact-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="eva-inquiry-contact-content">
                    <h3 className="eva-inquiry-contact-label">Email</h3>
                    <p className="eva-inquiry-contact-value">
                      <a href={`mailto:${`eva@brooksidemanpower.com`}`} className="eva-inquiry-contact-link">
                        {["eva", "@", "brooksidemanpower.com"].join("")}
                      </a>
                    </p>
                  </div>
                </div>

                <div className="eva-inquiry-contact-item">
                  <div className="eva-inquiry-contact-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="eva-inquiry-contact-content">
                    <h3 className="eva-inquiry-contact-label">Business Hours</h3>
                    <p className="eva-inquiry-contact-value">
                      Monday - Friday: 9:00 AM - 6:00 PM<br />
                      Saturday: 9:00 AM - 1:00 PM<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>

              <div className="eva-inquiry-social-section">
                <h3 className="eva-inquiry-social-title">Follow Us</h3>
                <SocialLinks className="eva-inquiry-social-icons" linkClassName="eva-inquiry-social-icon" />
              </div>
            </div>
          </div>
        </section>

        <footer className="eva-footer">
          <div className="eva-footer-content">
            <p className="eva-footer-text">
              &copy; {new Date().getFullYear()} EVA by Brookside Manpower Services. All Rights Reserved.
            </p>
            <div className="eva-footer-links">
              <Link to="/privacy-policy" className="eva-footer-link">Privacy Policy</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default EvaInquiry;
