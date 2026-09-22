import React, { useState, useCallback, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import "./Eva.css";
import "./EvaInquiry.css";
import SEO from "../components/SEO";

const EVA_INQUIRY_FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScDMfeClW80ATe_sY2S6nELA83C57kdWCyPYsW4zV5gsl12iA/viewform";
const EVA_INQUIRY_FORM_EMBED_URL = `${EVA_INQUIRY_FORM_URL}?embedded=true&hl=en`;

function EvaInquiry() {
  const [menuOpen, setMenuOpen] = useState(false);
  const evaMenuToggleRef = useRef(null);
  const closeEvaMenu = useCallback(() => setMenuOpen(false), []);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("eva-overlay-open");
      requestAnimationFrame(() => {
        const firstLink = document.querySelector(".eva-nav-links a, .eva-nav-links .eva-nav-brookside-logo");
        firstLink?.focus?.();
      });
    } else {
      document.body.classList.remove("eva-overlay-open");
      evaMenuToggleRef.current?.focus();
    }
    return () => document.body.classList.remove("eva-overlay-open");
  }, [menuOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") closeEvaMenu();
    };
    if (menuOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [menuOpen, closeEvaMenu]);

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
        <nav className="eva-nav">
          <div className="eva-nav-container">
            <Link to={typeof window !== "undefined" && window.location.hostname === "eva.brooksidemps.com" ? "/" : "/eva"}>
              <img src="/eva-nav-logo.png" alt="EVA Brookside - Executive Virtual Assistant Philippines" className="eva-logo-small" />
            </Link>
            <div className="eva-nav-links">
              <Link to="/eva#home" onClick={closeEvaMenu}>Home</Link>
              <Link to="/eva#about" onClick={closeEvaMenu}>About</Link>
              <Link to="/eva#partners" onClick={closeEvaMenu}>Partners</Link>
              <Link to="/eva#services" onClick={closeEvaMenu}>Services</Link>
              <Link to="/eva#clients" onClick={closeEvaMenu}>Clients</Link>
              <Link to="/eva#course" onClick={closeEvaMenu}>Course</Link>
              <Link to="/eva#apply" onClick={closeEvaMenu}>Apply</Link>
              <Link to="/eva/inquiry" onClick={closeEvaMenu}>Contact</Link>
              <a href="https://brooksidemps.com" className="eva-nav-brookside-logo" aria-label="Brookside Manpower Services home" onClick={closeEvaMenu}>
                <img src="/logo-white.png" alt="Brookside Manpower Services" className="eva-logo-small" />
              </a>
            </div>
            <button ref={evaMenuToggleRef} type="button" className="eva-nav-toggle" onClick={() => setMenuOpen((prev) => !prev)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
              <i className={`fas ${menuOpen ? "fa-times" : "fa-bars"}`}></i>
            </button>
          </div>
          {menuOpen && createPortal(
            <div className="eva-nav-overlay eva-nav-overlay-open" onClick={closeEvaMenu} aria-hidden="false" role="dialog" aria-modal="true" aria-label="Menu">
              <div className="eva-nav-links eva-nav-links-overlay active" onClick={(e) => e.stopPropagation()}>
                <Link to="/eva#home" onClick={closeEvaMenu}>Home</Link>
                <Link to="/eva#about" onClick={closeEvaMenu}>About</Link>
                <Link to="/eva#partners" onClick={closeEvaMenu}>Partners</Link>
                <Link to="/eva#services" onClick={closeEvaMenu}>Services</Link>
                <Link to="/eva#clients" onClick={closeEvaMenu}>Clients</Link>
                <Link to="/eva#course" onClick={closeEvaMenu}>Course</Link>
                <Link to="/eva#apply" onClick={closeEvaMenu}>Apply</Link>
                <Link to="/eva/inquiry" onClick={closeEvaMenu}>Contact</Link>
                <a href="https://brooksidemps.com" className="eva-nav-brookside-logo" aria-label="Brookside Manpower Services home" onClick={closeEvaMenu}>
                  <img src="/logo-white.png" alt="Brookside Manpower Services" className="eva-logo-small" />
                </a>
              </div>
            </div>,
            document.body
          )}
        </nav>

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
                      className="eva-google-form"
                      src={EVA_INQUIRY_FORM_EMBED_URL}
                      title="EVA Client Inquiry Form"
                      width="640"
                      height="1885"
                      loading="lazy"
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
                <div className="eva-inquiry-social-icons">
                  <a href="https://www.facebook.com/profile.php?id=61560528418956" target="_blank" rel="noopener noreferrer" className="eva-inquiry-social-icon" aria-label="Brookside Manpower Facebook">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="https://www.linkedin.com/company/brookside-manpower-services" target="_blank" rel="noopener noreferrer" className="eva-inquiry-social-icon" aria-label="Brookside Manpower LinkedIn">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="https://www.tiktok.com/@brooksidemps" target="_blank" rel="noopener noreferrer" className="eva-inquiry-social-icon" aria-label="Brookside Manpower TikTok">
                    <i className="fab fa-tiktok"></i>
                  </a>
                </div>
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
