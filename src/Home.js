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
            <span>Contact Us</span>
          </Link>
        </div>
      </div>

      {/* About Section */}
      <div className="content" id="about">
        <div className="about-container">
          <div className="about-text">
            <h2 className="about-title">WHO WE ARE</h2>
            <p>
            Brookside is a manpower services company dedicated to connecting skilled talents to the leading hospitality
            businesses in Metro Manila. With precision to excellence, we are committed to find the top and right
            talents for our partners.
            </p>
            <p>
            Our team is comprised of  certified industry experts and wide array of experiences from global brands in
            the hospitality / tourism industry.
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

      {/* Vision, Mission, Values Section */}
      <div className="vmv-section" style={{ backgroundImage: "url(/learning/vmv-bg.png)" }}>
         <div className="vmv-overlay">
          <div className="vmv-box">
            <h2 className="vmv-title orange">VISION</h2>
            <p className="vmv-text">To be a hub for 5–Star premium professionals.</p>
          </div>
          <div className="vmv-box">
            <h2 className="vmv-title orange">MISSION</h2>
            <p className="vmv-text">
              For all professionals to be trained by industry practitioners 
              & be given fulfilling careers.
            </p>
          </div>
          <div className="vmv-box">
            <h2 className="vmv-title orange">VALUES</h2>
            <p className="vmv-text">
              Innovative and revolutionary<br />
              Constant progression and results-driven<br />
              Empathetic collaborator
            </p>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="content" id="services">
        <h2 className="services-title">WHAT WE DO</h2>
        <div className="services-container">
        <div className="service-box">
            <img src="/services/manpower.png" alt="Manpower Services" className="service-image" />
            <h3 className="service-title">MANPOWER SERVICES</h3>
            <p>
              We provide contractual staffing to our accredited partners which allow them to focus on
              their core business operation and leaving the recruitment efforts to us.
            </p>
          </div>
          <div className="service-box">
            <img src="/services/placement.png" alt="Placement" className="service-image" />
            <h3 className="service-title">TALENT DEVELOPMENT</h3>
            <p>
            We connect top hospitality talent with leading businesses, ensuring the right fit for every role through strategic sourcing and screening.
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
            <p><strong>Email:</strong> <a href="mailto:inquire@brooksidemanpower.com">inquire@brooksidemanpower.com</a></p>
            <p><strong>Address:</strong> Unit 604, Tower 2, PITX Building, 1 Kennedy Road, Barangay Tambo, Parañaque City, Metro Manila</p>
            <p><strong>Phone:</strong> (02) 7001 9493 | +63 917 157 8874</p>
            
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
