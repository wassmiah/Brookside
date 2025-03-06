import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";  // Import the new CSS file

function Home() {
  return (
    <>

{/* Nav Section */}
    <div class="navbar">
      <img src="logo.png" alt="Company Logo" class="navbar-logo" />
      <div class="nav-links">
        <a href="#home">Home</a>
        <a href="#about">About Us</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact Us</a>
        <a href="/meet-the-team">Meet the Team</a>
        <a href="/career"><span>Apply Now</span></a>
      </div>
    </div>

{/* Hero Section */}
      <div className="hero" id="home">
        <video autoPlay muted loop id="heroVideo">
          <source src="/herobg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-overlay">
          <img src="/logohero.png" alt="Business Logo" className="hero-logo" />
          <Link to="/career" className="apply-now-btn">
            <span>Apply Now</span>
          </Link>        </div>
      </div>

      {/* About Section */}
      <div className="content" id="about">
        <div className="about-container">
          <div className="about-text">
            <h2 className="about-title">
              WHO WE ARE <span className="dot" style={{ backgroundColor: "#f4a024" }}></span>{" "}
              <span className="dot" style={{ backgroundColor: "#2f86d6" }}></span>
            </h2>
            <p>
              Brookside is a job placement company dedicated to connecting skilled talents to the leading
              hospitality businesses in Metro Manila. We are committed to bridge opportunities and build
              futures of our talents and partners.
            </p>
            <p>
              Our partners are mainly from hospitality business segments such as but not limited to
              integrated resorts, 5-star hotels, BPO, and high-end restaurant chains.
            </p>
            <p>
              Brookside explores potentials from different parts of the Philippines by engaging local
              government units and more.
            </p>
          </div>
          <div className="about-image">
            <div className="about-image-container">
              <img src="/about-bms.png" alt="About Us" className="about-main-image" />
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="content" id="services">
        <h2 className="services-title">
          WHAT WE DO <span className="dot" style={{ background: "#f5a623" }}></span>{" "}
          <span className="dot" style={{ background: "#2d9cdb" }}></span>
        </h2>
        <div className="services-container">
          <div className="service-box">
            <img src="/placement.jpg" alt="Placement" className="service-image" />
            <h3 className="service-title">PLACEMENT</h3>
            <p>
              We bring our top talents to new heights in their careers in the hospitality industry -
              offering direct hiring to our partners!
            </p>
          </div>
          <div className="service-box">
            <img src="/manpower.jpg" alt="Manpower Services" className="service-image" />
            <h3 className="service-title">MANPOWER SERVICES</h3>
            <p>
              We provide contractual staffing to our accredited partners which allow them to focus on
              their core business operation and leaving the recruitment efforts to us.
            </p>
          </div>
          <div className="service-box">
            <img src="/projects.jpg" alt="Projects" className="service-image" />
            <h3 className="service-title">PROJECTS</h3>
            <p>
              Adept to different facets and functions of an organization, we offer project based
              services to our partners.
            </p>
          </div>
        </div>
      </div>

      {/* Connect With Us Section */}
      <div className="content" id="contact">
        <h2 className="contact-title">
          CONNECT WITH US <span className="dot" style={{ background: "#f5a623" }}></span>{" "}
          <span className="dot" style={{ background: "#2d9cdb" }}></span>
        </h2>
        <div className="contact-container">
          <div className="contact-info">
            <p><strong>Address:</strong> Unit 604, Tower 2, PITX Building, 1 Kennedy Road, Barangay Tambo, Parañaque City, Metro Manila</p>
            <p><strong>Phone:</strong> (02) 7001 9493 | +63 917 157 8874</p>
            <p><strong>Email:</strong> <a href="mailto:inquire@brooksidemanpower.com">inquire@brooksidemanpower.com</a></p>
          </div>
          <div className="contact-map">
            <iframe 
              title="Google Maps Location"
              src="https://maps.google.com/maps?q=Unit%20604,%20Tower%202,%20PITX%20Building,%201%20Kennedy%20Road,%20Barangay%20Tambo,%20Parañaque%20City,%20Metro%20Manila&t=&z=13&ie=UTF8&iwloc=&output=embed" 
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section footer-logo">
            <img src="/logo.png" alt="Brookside Logo" className="footer-logo-img" />
          </div>
          <div className="footer-section">
            <p>&copy; 2025 Brookside Manpower Services, All Rights Reserved.</p>
          </div>
          <div className="footer-section">
            <div className="social-links">
              <a
                href="https://www.facebook.com/profile.php?id=61560528418956"
                target="_blank"
                rel="noreferrer"
                className="social-icon facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://www.linkedin.com/company/brookside-manpower-services"
                target="_blank"
                rel="noreferrer"
                className="social-icon linkedin"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                href="https://www.tiktok.com/@brooksidemps"
                target="_blank"
                rel="noreferrer"
                className="social-icon tiktok"
              >
                <i className="fab fa-tiktok"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Home;