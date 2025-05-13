import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-contact-container">
        <h2 className="footer-contact-title"><span className="blue">Contact Us</span></h2>
        <div className="footer-contact-info">
          <div className="footer-contact-block">
            <div className="footer-contact-label">Office</div>
            <div>Unit 604, Tower 2, PITX Building, 1 Kennedy Road,<br />Barangay Tambo, Parañaque City,  Metro Manila, Philippines</div>
          </div>
          <div className="footer-contact-block">
            <div className="footer-contact-label">Phone</div>
            <div>(02) 7001 9493 | +63 917 157 8874</div>
          </div>
          <div className="footer-contact-block">
            <div className="footer-contact-label">Email</div>
            <div>inquire@brooksidemanpower.com</div>
          </div>
          <div className="footer-contact-block">
            <div className="footer-contact-label">Social</div>
            <div className="footer-social-links">
              <a href="https://www.facebook.com/profile.php?id=61560528418956" target="_blank" rel="noreferrer" className="footer-social-icon"><i className="fab fa-facebook-f"></i></a>
              <a href="https://www.linkedin.com/company/brookside-manpower-services" target="_blank" rel="noreferrer" className="footer-social-icon"><i className="fab fa-linkedin-in"></i></a>
              <a href="https://www.tiktok.com/@brooksidemps" target="_blank" rel="noreferrer" className="footer-social-icon"><i className="fab fa-tiktok"></i></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer; 