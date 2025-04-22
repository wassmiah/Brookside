import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {
  const [index, setIndex] = useState(0);
  const totalSlides = 5;

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % totalSlides);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setIndex((prevIndex) => (prevIndex - 1 + totalSlides) % totalSlides);
  };

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % totalSlides);
  };

  return (
    <>
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
          </Link>
        </div>
      </div>

      {/* About Section with Carousel */}
      <div className="content" id="about">
        <div className="about-container">
          <div className="about-text">
            <h2 className="about-title">WHO WE ARE</h2>
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
            <div className="carousel-wrapper">
              <div className="carousel" style={{ transform: `translateX(-${index * 100}%)` }}>
                {[...Array(totalSlides)].map((_, idx) => (
                  <div className="carousel-slide" key={idx}>
                    <img src={`/about-bms${idx + 1}.png`} alt={`Slide ${idx + 1}`} className="about-main-image" />
                  </div>
                ))}
              </div>
              <button className="carousel-arrow left" onClick={handlePrev}>&#10094;</button>
              <button className="carousel-arrow right" onClick={handleNext}>&#10095;</button>
              <div className="carousel-indicators">
                {[...Array(totalSlides)].map((_, idx) => (
                  <span
                    key={idx}
                    className={`indicator ${index === idx ? "active" : ""}`}
                    onClick={() => setIndex(idx)}
                  ></span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="content" id="services">
        <h2 className="services-title">WHAT WE DO</h2>
        <div className="services-container">
          <div className="service-box">
            <img src="/services/placement.png" alt="Placement" className="service-image" />
            <h3 className="service-title">TALENT ACQUISITION</h3>
            <p>
               We specialize in sourcing and matching top-tier hospitality professionals with industry-leading 
               businesses. Our extensive network and strategic partnerships help companies build high-performing 
               teams while providing job seekers with rewarding career opportunities.
          </p>
          </div>
          <div className="service-box">
            <img src="/services/manpower.png" alt="Manpower Services" className="service-image" />
            <h3 className="service-title">MANPOWER SERVICES</h3>
            <p>
              We provide contractual staffing to our accredited partners which allow them to focus on
              their core business operation and leaving the recruitment efforts to us.
            </p>
          </div>
          <div className="service-box">
            <img src="/services/projects.png" alt="Projects" className="service-image" />
            <h3 className="service-title">WORKFORCE SOLUTIONS</h3>
            <p>
              We optimize the hiring process by offering end-to-end workforce solutions, including sourcing, 
              screening, and deploying qualified candidates efficiently.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="content" id="contact">
        <h2 className="contact-title">CONNECT WITH US</h2>
        <div className="contact-container">
          <div className="contact-info">
            <p><strong>Search us on Google Maps or Waze:</strong> Brookside Manpower Services Inc.</p>
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
                href="https://www.tiktok.com/@brooksidemps"
                target="_blank"
                rel="noreferrer"
                className="social-icon tiktok"
              >
                <i className="fab fa-tiktok"></i>
              </a>
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
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Home;
