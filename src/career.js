import React from "react";
import "./career.css";
import resume from "./how-to-resume.png";

function Career() {
  return (
    <>
      {/* Nav Section */}
      <div class="navbar">
        <img src="logo.png" alt="Company Logo" class="navbar-logo" />
        <div class="nav-links">
          <a href="/#">Home</a>
          <a href="/#about">About Us</a>
          <a href="/#services">Services</a>
          <a href="/#contact">Contact Us</a>
          <a href="/meet-the-team">Meet the Team</a>
          <a href="/career"><span>Apply Now</span></a>
        </div>
        </div>
        
      
      <div className="career-page">

      {/* Career Content */}
      <main className="career-content">
        <h1 className="current-job-offers">Current Job Offers</h1>

        <div className="job-section">
          {/* Job List */}
          <div className="job-list-container">
            <div className="job-list-card">
              <h3 className="job-list-header">We are looking for:</h3>
              <ul className="job-list">
                <li>
                  <i className="fas fa-user"></i> Receptionist
                </li>
                <li>
                  <i className="fas fa-utensils"></i> Line Cook
                </li>
                <li>
                  <i className="fas fa-cash-register"></i> Cashier
                </li>
                <li>
                  <i className="fas fa-coffee"></i> Barista
                </li>
                <li>
                  <i className="fas fa-glass-cheers"></i> Bartender
                </li>
                <li>
                  <i className="fas fa-user-friends"></i> Waitstaff
                </li>
                <li>
                  <i className="fas fa-utensil-spoon"></i> Kitchen Steward
                </li>
              </ul>
              <p className="application-instructions">
                Send your resume to{" "}
                <a href="mailto:inquire@brooksidemanpower.com">
                  inquire@brooksidemanpower.com
                </a>{" "}
                <br />
                with the email subject <strong>Applicant_F&B</strong>.
              </p>
            </div>
          </div>

          {/* Resume Instructions */}
          <div className="job-image">
            <img src={resume} alt="How to Send Your Resume" />
          </div>
        </div>
      </main>

      {/* Footer */}
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-section footer-logo">
          <img src="/logo.png" alt="Brookside Logo" class="footer-logo-img" />
        </div>
        <div class="footer-section">
          <p>&copy; 2025 Brookside Manpower Services, All Rights Reserved.</p>
        </div>
        <div class="footer-section">
          <div class="social-links">
            <a href="https://www.facebook.com/profile.php?id=61560528418956" target="_blank" rel="noreferrer" class="social-icon facebook">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.linkedin.com/company/brookside-manpower-services" target="_blank" rel="noreferrer" class="social-icon linkedin">
              <i class="fab fa-linkedin-in"></i>
            </a>
            <a href="https://www.tiktok.com/@brooksidemps" target="_blank" rel="noreferrer" class="social-icon tiktok">
              <i class="fab fa-tiktok"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>

    </div>
    </>
  );
}

export default Career;
