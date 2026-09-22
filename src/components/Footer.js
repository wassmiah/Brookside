import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import { getEvaUrl } from "../utils/siteLinks";
import SocialLinks from "./SocialLinks";

function Footer() {
  const evaHref = getEvaUrl();

  return (
    <footer className="footer">
      <div className="footer-contact-container">
        <h2 className="footer-contact-title"><span className="blue">Contact Us</span></h2>
        <div className="footer-contact-info">
          <div className="footer-contact-block">
            <div className="footer-contact-label">Office</div>
            <div>Unit 704C, Tower 3, PITX Building, 1 Kennedy Road,<br />Barangay Tambo, Paranaque City, 1701 Metro Manila</div>
          </div>
          <div className="footer-contact-block">
            <div className="footer-contact-label">Phone</div>
            <div>(02) 7001 9493 | +63 917 157 8874</div>
          </div>
          <div className="footer-contact-block">
            <div className="footer-contact-label">Email</div>
            <div>
              <a href="mailto:inquire@brooksidemanpower.com" className="footer-email-link">
                {['inquire', '@', 'brooksidemanpower.com'].join('')}
              </a>
            </div>
          </div>
          <div className="footer-contact-block">
            <div className="footer-contact-label">Explore</div>
            <div>
              <a href={evaHref} className="footer-brand-cta" aria-label="Explore EVA">
                Explore
                <img src="/eva-nav-logo.png" alt="EVA" />
              </a>
              <span> · </span>
              <a href="/#partners" className="footer-email-link">Our Partners</a>
            </div>
          </div>
          <div className="footer-contact-block">
            <div className="footer-contact-label">Social</div>
            <SocialLinks className="footer-social-links" linkClassName="footer-social-icon" />
          </div>
          <div className="footer-contact-block">
            <Link to="/employee-access" className="employee-access-link">
              <i className="fas fa-user-lock"></i> Employee Access
            </Link>
          </div>
          <div className="footer-contact-block">
            <div className="footer-legal-links">
              <Link to="/privacy-policy" className="footer-legal-link">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
