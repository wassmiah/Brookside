import React from "react";
import { Link } from "react-router-dom";
import "./EvaInquiry.css";
import SEO from "../components/SEO";

function EvaInquiry() {
  return (
    <>
      <SEO 
        title="Hire Elite Virtual Assistants | EVA Inquiry"
        description="Get started with EVA's premium virtual assistant services. Fill out our inquiry form and join industry leaders."
        keywords="hire virtual assistant, VA inquiry, virtual assistant services, business support"
        ogImage="/eva-logo-placeholder.png"
        canonicalUrl="/eva/inquiry"
      />

      <div className="eva-inquiry-page">
        {/* Navigation */}
        <nav className="eva-inquiry-nav">
          <div className="eva-inquiry-nav-container">
            <Link to="/eva" className="eva-inquiry-nav-logo">EVA</Link>
            <Link to="/eva" className="eva-inquiry-back-link">
              <i className="fas fa-arrow-left"></i> Back to EVA
            </Link>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="eva-inquiry-hero">
          <div className="eva-inquiry-hero-content">
            <h1 className="eva-inquiry-hero-title">Elevate Your Business</h1>
            <p className="eva-inquiry-hero-subtitle">Join industry leaders who trust EVA for elite virtual assistant services</p>
          </div>
        </section>

        {/* Main Content */}
        <section className="eva-inquiry-main">
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
                    src="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform?embedded=true"
                    className="eva-google-form"
                    frameBorder="0"
                    marginHeight="0"
                    marginWidth="0"
                    title="EVA Inquiry Form"
                  >
                    Loading…
                  </iframe>
                  <div className="eva-form-fallback">
                    <p className="eva-form-fallback-text">Having trouble viewing the form?</p>
                    <a 
                      href="https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform" 
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
                      <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="eva-inquiry-social-icon">
                        <i className="fab fa-facebook-f"></i>
                      </a>
                      <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="eva-inquiry-social-icon">
                        <i className="fab fa-linkedin-in"></i>
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
                      <span>1000+ successful placements in top restaurants</span>
                    </li>
                    <li className="eva-inquiry-benefit-item">
                      <i className="fas fa-check-circle"></i>
                      <span>95% client satisfaction rate</span>
                    </li>
                    <li className="eva-inquiry-benefit-item">
                      <i className="fas fa-check-circle"></i>
                      <span>45% increase in quality applicants</span>
                    </li>
                    <li className="eva-inquiry-benefit-item">
                      <i className="fas fa-check-circle"></i>
                      <span>150+ premium F&B partners</span>
                    </li>
                    <li className="eva-inquiry-benefit-item">
                      <i className="fas fa-check-circle"></i>
                      <span>24/7 support and dedicated account managers</span>
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
