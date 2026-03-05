import React, { useState, useCallback, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import "./Eva.css";
import "./EvaInquiry.css";
import SEO from "../components/SEO";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import emailjs from "@emailjs/browser";

const EMAILJS_SERVICE_ID = "service_919vexw";
const EMAILJS_EVA_TEMPLATE_ID = "template_pnmrgkd";
const EMAILJS_PUBLIC_KEY = "iPVx_07GJePRZMIXP";

function EvaInquiry() {
  const formRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const evaMenuToggleRef = useRef(null);
  const closeEvaMenu = useCallback(() => setMenuOpen(false), []);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseMessage = () => {
    setMessage("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");
    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_EVA_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );
      await addDoc(collection(db, "eva_inquiries"), {
        ...formData,
        timestamp: serverTimestamp(),
        status: "new"
      });
      setMessage("Thank you for your inquiry! We will get back to you within 24 hours.");
      setFormData({ name: "", email: "", phone: "", company: "", message: "" });
    } catch (err) {
      setError("Failed to send inquiry. Please try again or email us directly at eva@brooksidemanpower.com.");
      console.error("EVA inquiry error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO 
        title="Hire EVA Brookside | EVA PH Inquiry Form"
        description="Hire EVA Brookside Philippines. Get started with EVA's premium executive virtual assistant services. Fill out our inquiry form and join industry leaders. EVA PH - Fast hiring in 21 days average, 98% client satisfaction rate."
        keywords="eva brookside, eva virtual assistant, eva ph, eva philippines, eva brookside, eva virtual assistant, eva philippines, hire eva virtual assistant, eva brooksidemps, virtual assistant philippines, filipino virtual assistant, eva va philippines, hire virtual assistant philippines, eva inquiry, eva brookside inquiry"
        ogImage="/eva-logo.png"
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
        {/* Navigation – same as Eva.js */}
        <nav className="eva-nav">
          <div className="eva-nav-container">
            <Link to={typeof window !== "undefined" && window.location.hostname === "eva.brooksidemps.com" ? "/" : "/eva"}>
              <img src="/eva-nav-logo.png" alt="EVA Brookside - Executive Virtual Assistant Philippines" className="eva-logo-small" />
            </Link>
            <div className="eva-nav-links">
              <Link to="/eva#home" onClick={closeEvaMenu}>Home</Link>
              <Link to="/eva#services" onClick={closeEvaMenu}>Services</Link>
              <Link to="/eva#clients" onClick={closeEvaMenu}>Clients</Link>
              <Link to="/eva#about" onClick={closeEvaMenu}>About</Link>
              <Link to="/eva#course" onClick={closeEvaMenu}>Course</Link>
              <Link to="/eva#apply" onClick={closeEvaMenu}>Apply</Link>
              <Link to="/eva#contact" onClick={closeEvaMenu}>Contact</Link>
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
                <Link to="/eva#services" onClick={closeEvaMenu}>Services</Link>
                <Link to="/eva#clients" onClick={closeEvaMenu}>Clients</Link>
                <Link to="/eva#about" onClick={closeEvaMenu}>About</Link>
                <Link to="/eva#course" onClick={closeEvaMenu}>Course</Link>
                <Link to="/eva#apply" onClick={closeEvaMenu}>Apply</Link>
                <Link to="/eva#contact" onClick={closeEvaMenu}>Contact</Link>
                <a href="https://brooksidemps.com" className="eva-nav-brookside-logo" aria-label="Brookside Manpower Services home" onClick={closeEvaMenu}>
                  <img src="/logo-white.png" alt="Brookside Manpower Services" className="eva-logo-small" />
                </a>
              </div>
            </div>,
            document.body
          )}
        </nav>

        {/* Hero Section */}
        <section className="eva-inquiry-hero section-partition">
          <div className="eva-inquiry-hero-content">
            <div className="eva-inquiry-hero-logo-wrap">
              <img src="/eva-logo.png" alt="EVA Brookside - Executive Virtual Assistant Services" className="eva-inquiry-hero-logo" />
            </div>
            <h1 className="eva-inquiry-hero-title">Elevate Your Business</h1>
            <p className="eva-inquiry-hero-subtitle">Join industry leaders who trust EVA for executive virtual assistant services</p>
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
                {message && (
                  <div className="eva-inquiry-success-message" role="alert">
                    <i className="fas fa-check-circle" aria-hidden="true"></i>
                    <span>{message}</span>
                    <button type="button" className="eva-inquiry-close-message" onClick={handleCloseMessage} aria-label="Close message">&times;</button>
                  </div>
                )}
                {error && (
                  <div className="eva-inquiry-error-message" role="alert">
                    <i className="fas fa-exclamation-circle" aria-hidden="true"></i>
                    <span>{error}</span>
                  </div>
                )}
                <form ref={formRef} onSubmit={handleSubmit} className="eva-inquiry-form" aria-label="EVA inquiry form">
                  <div className="eva-inquiry-form-group">
                    <label htmlFor="eva-name" className="visually-hidden">Your Name</label>
                    <input id="eva-name" type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required disabled={loading} />
                  </div>
                  <div className="eva-inquiry-form-group">
                    <label htmlFor="eva-email" className="visually-hidden">Your Email</label>
                    <input id="eva-email" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" required disabled={loading} />
                  </div>
                  <div className="eva-inquiry-form-group">
                    <label htmlFor="eva-phone" className="visually-hidden">Your Phone</label>
                    <input id="eva-phone" type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Your Phone Number" required disabled={loading} />
                  </div>
                  <div className="eva-inquiry-form-group">
                    <label htmlFor="eva-company" className="visually-hidden">Company Name</label>
                    <input id="eva-company" type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Company Name" required disabled={loading} />
                  </div>
                  <div className="eva-inquiry-form-group">
                    <label htmlFor="eva-message" className="visually-hidden">Your Message</label>
                    <textarea id="eva-message" name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about your virtual assistant needs" required disabled={loading} rows={5}></textarea>
                  </div>
                  <button type="submit" className="eva-inquiry-submit-btn" disabled={loading} aria-label={loading ? "Sending..." : "Submit inquiry"}>
                    {loading ? <><i className="fas fa-spinner fa-spin" aria-hidden="true"></i> Sending...</> : "Submit Inquiry"}
                  </button>
                </form>
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
                  <h3 className="eva-inquiry-benefits-title">Why Choose EVA?</h3>
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
                      <span>Elite virtual assistants, vetted and trained</span>
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
