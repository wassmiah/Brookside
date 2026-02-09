import React, { useState, useCallback, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import "./Eva.css";
import "./EvaInquiry.css";
import SEO from "../components/SEO";

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
        title="Hire E-VA Brookside Virtual Assistant | E-VA PH Inquiry Form"
        description="Hire E-VA Brookside virtual assistant Philippines. Get started with E-VA's premium virtual assistant services. Fill out our inquiry form and join industry leaders. E-VA PH - Fast hiring in 21 days average, 98% client satisfaction rate."
        keywords="eva brookside, eva virtual assistant, eva ph, eva philippines, e-va brookside, e-va virtual assistant, e-va philippines, hire eva virtual assistant, eva brooksidemps, virtual assistant philippines, filipino virtual assistant, eva va philippines, hire virtual assistant philippines, eva inquiry, eva brookside inquiry"
        ogImage="/eva-logo.png"
        ogImageWidth={1200}
        ogImageHeight={630}
        ogImageAlt="E-VA Brookside Virtual Assistant - Inquiry Form Philippines"
        canonicalUrl="/eva/inquiry"
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "serviceType": "Virtual Assistant Services",
            "provider": {
              "@type": "Organization",
              "name": "E-VA (Brookside Manpower Services)",
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
                "name": "E-VA",
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
        {/* Navigation – same as Eva.js */}
        <nav className="eva-nav">
          <div className="eva-nav-container">
            <Link to="/eva">
              <img src="/eva-nav-logo.png" alt="E-VA Brookside - Virtual Assistant Philippines" className="eva-logo-small" />
            </Link>
            <div className="eva-nav-links">
              <Link to="/eva#home" onClick={closeEvaMenu}>Home</Link>
              <Link to="/eva#services" onClick={closeEvaMenu}>Services</Link>
              <Link to="/eva#clients" onClick={closeEvaMenu}>Clients</Link>
              <Link to="/eva#about" onClick={closeEvaMenu}>About</Link>
              <Link to="/eva#course" onClick={closeEvaMenu}>Course</Link>
              <Link to="/eva#apply" onClick={closeEvaMenu}>Apply</Link>
              <Link to="/eva#contact" onClick={closeEvaMenu}>Contact</Link>
              <Link to="/" className="eva-nav-brookside-logo" aria-label="Back to Brookside Manpower home" onClick={closeEvaMenu}>
                <img src="/logo-white.png" alt="Brookside Manpower Services" className="eva-logo-small" />
              </Link>
            </div>
            <button ref={evaMenuToggleRef} type="button" className="eva-nav-toggle" onClick={() => setMenuOpen((prev) => !prev)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
              <i className={`fas ${menuOpen ? "fa-times" : "fa-bars"}`}></i>
            </button>
          </div>
          {menuOpen && createPortal(
            <div className="eva-nav-overlay eva-nav-overlay-open" onClick={closeEvaMenu} aria-hidden="false" role="dialog" aria-modal="true" aria-label="Menu">
              <div className="eva-nav-links eva-nav-links-overlay active" onClick={(e) => e.stopPropagation()}>
                <Link to="/eva#home" onClick={closeEvaMenu}>Home</Link>
                <Link to="/eva#services" onClick={closeEvaMenu}>Services</Link>
                <Link to="/eva#clients" onClick={closeEvaMenu}>Clients</Link>
                <Link to="/eva#about" onClick={closeEvaMenu}>About</Link>
                <Link to="/eva#course" onClick={closeEvaMenu}>Course</Link>
                <Link to="/eva#apply" onClick={closeEvaMenu}>Apply</Link>
                <Link to="/eva#contact" onClick={closeEvaMenu}>Contact</Link>
                <Link to="/" className="eva-nav-brookside-logo" aria-label="Back to Brookside Manpower home" onClick={closeEvaMenu}>
                  <img src="/logo-white.png" alt="Brookside Manpower Services" className="eva-logo-small" />
                </Link>
              </div>
            </div>,
            document.body
          )}
        </nav>

        {/* Hero Section */}
        <section className="eva-inquiry-hero section-partition">
          <div className="eva-inquiry-hero-content">
            <div className="eva-inquiry-hero-logo-wrap">
              <img src="/eva-logo.png" alt="E-VA Brookside - Elite Virtual Assistant Services" className="eva-inquiry-hero-logo" />
            </div>
            <h1 className="eva-inquiry-hero-title">Elevate Your Business</h1>
            <p className="eva-inquiry-hero-subtitle">Join industry leaders who trust E-VA for elite virtual assistant services</p>
          </div>
        </section>

        {/* Main Content */}
        <section className="eva-inquiry-main section-partition">
          <div className="eva-inquiry-container">
            <div className="eva-inquiry-grid">
              {/* Inquiry Form Section */}
              <div className="eva-inquiry-form-section">
                <div className="eva-inquiry-form-header">
                  <h2 className="eva-inquiry-form-title">Get Started Today</h2>
                  <p className="eva-inquiry-form-subtitle">Fill out our inquiry form and our team will contact you within 24 hours</p>
                </div>
                
                <div className="eva-google-form-container">
                  <iframe
                    src="https://docs.google.com/forms/d/e/1FAIpQLSeAojAZEzTNJObfhkjQ_h4jPM0SPHrhhanHEXrbmH5dR3aiYg/viewform?embedded=true"
                    className="eva-google-form"
                    frameBorder="0"
                    marginHeight="0"
                    marginWidth="0"
                    title="E-VA Course Enrollment Form"
                  >
                    Loading…
                  </iframe>
                  <div className="eva-form-fallback">
                    <p className="eva-form-fallback-text">Having trouble viewing the form?</p>
                    <a 
                      href="https://docs.google.com/forms/d/e/1FAIpQLSeAojAZEzTNJObfhkjQ_h4jPM0SPHrhhanHEXrbmH5dR3aiYg/viewform" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="eva-form-link-button"
                    >
                      Open Form in New Tab
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Details Section */}
              <div className="eva-inquiry-contact-section">
                <div className="eva-inquiry-contact-card">
                  <h2 className="eva-inquiry-contact-title">Contact Us</h2>
                  <p className="eva-inquiry-contact-subtitle">Prefer to reach out directly? We're here to help.</p>

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
                            {['eva', '@', 'brooksidemanpower.com'].join('')}
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

                {/* Why Choose EVA */}
                <div className="eva-inquiry-benefits-card">
                  <h3 className="eva-inquiry-benefits-title">Why Choose E-VA?</h3>
                  <ul className="eva-inquiry-benefits-list">
                    <li className="eva-inquiry-benefit-item">
                      <i className="fas fa-check-circle"></i>
                      <span>98% client retention rate</span>
                    </li>
                    <li className="eva-inquiry-benefit-item">
                      <i className="fas fa-check-circle"></i>
                      <span>Fast hiring in 21 days average</span>
                    </li>
                    <li className="eva-inquiry-benefit-item">
                      <i className="fas fa-check-circle"></i>
                      <span>Save up to 70% on staffing costs</span>
                    </li>
                    <li className="eva-inquiry-benefit-item">
                      <i className="fas fa-check-circle"></i>
                      <span>Elite Filipino virtual assistants, vetted and trained</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default EvaInquiry;
