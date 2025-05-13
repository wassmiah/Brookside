import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import AOS from "aos";
import "aos/dist/aos.css";
import Footer from "./components/Footer";

function Home() {

  useEffect(() => {
    AOS.init({ duration: 800, once: false });

    const sections = [
      document.getElementById('services'),
      document.getElementById('about'),
      document.getElementById('commitment'),
    ];
    const observers = [];
    sections.forEach(section => {
      if (section) {
        const observer = new window.IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                AOS.refresh();
              }
            });
          },
          { threshold: 0.2 }
        );
        observer.observe(section);
        observers.push(observer);
      }
    });
    return () => observers.forEach(observer => observer.disconnect());
  }, []);

  return (
    <>
      {/* Hero Section */}
      <div className="hero" id="home">
        <video autoPlay muted loop playsInline preload="auto" id="heroVideo" aria-hidden="true">
          <source src="/herobg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="hero-overlay">
          <picture>
            <source srcSet="/logohero.webp" type="image/webp" />
            <img src="/logohero.png" alt="Brookside Manpower Logo" className="hero-logo" width="500" height="200" loading="eager" decoding="async" />
          </picture>

          <Link to="/contact" className="contact-us-btn">
            <span>Contact Us</span>
          </Link>
        </div>
      </div>


      {/* About Section */}
      <div className="about-new" id="about">
        <div className="about-left" data-aos="fade-right">
          <h1 className="about-heading">
            Leave your <span className="highlight">staffing</span><br />problem to us.
          </h1>
          <p>
            Brookside is a job placement company dedicated to connecting skilled talents to the leading
            hospitality businesses in Metro Manila. We are committed to bridge opportunities and build
            futures of our talents and partners.
          </p>
          <p>
            Our partners are mainly from hospitality business segments such as but not limited to integrated
            resorts, 5-star hotels, BPO, and high-end restaurant chains.
          </p>
          <p>
            Brookside explores potentials from different parts of the Philippines by engaging local government
            units and more.
          </p>
        </div>
        <div className="about-right" data-aos="fade-left">
          <img src="/about-bms1.png" alt="Brookside Team" className="about-photo" />
        </div>
      </div>

    {/* Services Section */}
    <div className="what-we-do-section" id="services">
        <h2 className="neon-section-title" data-aos="fade-up">
          <span className="orange">Bridging</span> & <span className="blue">building</span><br />are our thing
        </h2>

        <div className="get-quoted-btn-wrapper" data-aos="fade-up" data-aos-delay="100">
          <Link to="/contact" className="get-quoted-btn">GET QUOTED</Link>
        </div>

        <div className="service-row">
          <div className="service-item" data-aos="fade-right">
            <div className="service-label">MANPOWER SERVICES</div>
            <p>We attract, acquire, and retain the top talents for you; strengthening your brand's workforce.</p>
          </div>
          <div className="service-item" data-aos="fade-left">
            <div className="service-label">TALENT DEVELOPMENT</div>
            <p>We specialize in the training and development of our candidates prior deployment.</p>
          </div>
          <div className="service-item" data-aos="fade-up">
            <div className="service-label">CONSULTATION SERVICES</div>
            <p>We advise businesses on workforce planning and achieve the best manpower solutions.</p>
          </div>
        </div>
      </div>

      {/* Commitment Section */}
      <div className="commitment-section" id="commitment">
        <img src="/commitment-bg.png" alt="City Background" className="commitment-bg-img" />
        <div className="commitment-overlay"></div>
        <div className="commitment-content">
          <div className="commitment-left">
            <div className="commitment-block" data-aos="fade-up" data-aos-delay="0">
              <h2 className="commitment-title blue">Vision</h2>
              <div className="commitment-desc">To be a hub for 5–Star premium professionals.</div>
            </div>
            <div className="commitment-block" data-aos="fade-up" data-aos-delay="100">
              <h2 className="commitment-title blue">Mission</h2>
              <div className="commitment-desc">For all professionals to be trained by industry practitioners & be given fulfilling careers.</div>
            </div>
            <div className="commitment-block" data-aos="fade-up" data-aos-delay="200">
              <h2 className="commitment-title blue">Values</h2>
              <div className="commitment-desc">
                <div>Innovative and revolutionary</div>
                <div>Constant progression and results-driven</div>
                <div>Empathetic collaborator</div>
              </div>
            </div>
          </div>
          <div className="commitment-right" data-aos="fade-left">
            <img src="/ceo.png" alt="Timothy Justin Zeta" className="commitment-ceo-img" />
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default Home;
