import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import AOS from "aos";
import "aos/dist/aos.css";
import SEO from "../components/SEO";

function Home() {

  useEffect(() => {
    AOS.init({ 
      duration: 600,
      once: true,
      easing: 'ease-out-cubic',
      offset: 100,
      delay: 0
    });

    // AOS handles animations automatically with once: true, no need for manual observers
  }, []);

  return (
    <>
      <SEO 
        title="Home"
        description="Brookside Manpower Services - Your trusted partner in hospitality staffing solutions. We connect skilled talents to leading hotels, resorts, and restaurants in Metro Manila."
        keywords="hospitality staffing, hotel jobs, restaurant jobs, manpower services, job placement, Metro Manila, Philippines"
        ogImage="/logohero.webp"
        ogImageWidth={1200}
        ogImageHeight={630}
        ogImageAlt="Brookside Manpower Services - Hospitality Staffing Experts"
        canonicalUrl="/"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "Brookside Manpower Services",
          "url": "https://brooksidemps.com",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://brooksidemps.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }}
      />

      {/* Hero Section */}
      <section className="hero" id="home" aria-label="Hero section">
        <video autoPlay muted loop playsInline preload="auto" id="heroVideo" aria-hidden="true">
          <source src="/herobg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-overlay">
          <picture>
            <source srcSet="/logohero.webp" type="image/webp" />
            <img 
              src="/logohero.png" 
              alt="Brookside Manpower Services Logo" 
              className="hero-logo" 
              width="500" 
              height="200" 
              loading="eager" 
              decoding="async" 
            />
          </picture>
          <Link to="/contact" className="contact-us-btn" aria-label="Contact us">
            <span>Contact Us</span>
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="about-new section-partition" id="about" aria-label="About us">
        <h1 className="about-main-heading">
          <span className="orange">Brookside Manpower Services</span> – Hospitality Staffing in <span className="blue">Metro Manila</span>
        </h1>
        <div className="about-left" data-aos="fade-right">
          <h2 className="about-heading">
            Leave your <span className="highlight">staffing</span><br />problem to us.
          </h2>
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
          <div className="social-share">
            <span className="social-share-label">Follow us:</span>
            <a href="https://www.facebook.com/profile.php?id=61560528418956" target="_blank" rel="noopener noreferrer" aria-label="Visit our Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="https://www.linkedin.com/company/brookside-manpower-services" target="_blank" rel="noopener noreferrer" aria-label="Visit our LinkedIn"><i className="fab fa-linkedin-in"></i></a>
            <a href="https://www.tiktok.com/@brooksidemps" target="_blank" rel="noopener noreferrer" aria-label="Visit our TikTok"><i className="fab fa-tiktok"></i></a>
          </div>
        </div>
        <div className="about-right" data-aos="fade-left">
          <img 
            src="/about-bms1.png" 
            alt="Brookside Manpower Services team working together" 
            className="about-photo"
            width="600"
            height="400"
            loading="lazy"
          />
        </div>
      </section>

      {/* Services Section */}
      <section className="what-we-do-section section-partition" id="services" aria-label="Our services">
        <h2 className="neon-section-title" data-aos="fade-up">
          <span className="orange">Bridging</span> & <span className="blue">building</span><br />are our thing
        </h2>

        <div className="get-quoted-btn-wrapper" data-aos="fade-up" data-aos-delay="100">
          <Link to="/contact" className="get-quoted-btn" aria-label="Get a quote">GET QUOTED</Link>
        </div>

        <div className="service-row">
          <article className="service-item" data-aos="fade-right">
            <h3 className="service-label">MANPOWER SERVICES</h3>
            <p>We attract, acquire, and retain the top talents for you; strengthening your brand's workforce.</p>
          </article>
          <article className="service-item" data-aos="fade-left">
            <h3 className="service-label">TALENT DEVELOPMENT</h3>
            <p>We specialize in the training and development of our candidates prior deployment.</p>
          </article>
          <article className="service-item" data-aos="fade-up">
            <h3 className="service-label">CONSULTATION SERVICES</h3>
            <p>We advise businesses on workforce planning and achieve the best manpower solutions.</p>
          </article>
        </div>
      </section>

      {/* Commitment Section */}
      <section className="commitment-section section-partition" id="commitment" aria-label="Our commitment">
        <img 
          src="/commitment-bg.png" 
          alt="Modern city background" 
          className="commitment-bg-img"
          loading="lazy"
        />
        <div className="commitment-overlay"></div>
        <div className="commitment-content">
          <div className="commitment-left">
            <article className="commitment-block" data-aos="fade-up" data-aos-delay="0">
              <h2 className="commitment-title blue">Vision</h2>
              <div className="commitment-desc">To be a hub for 5–Star premium professionals.</div>
            </article>
            <article className="commitment-block" data-aos="fade-up" data-aos-delay="100">
              <h2 className="commitment-title blue">Mission</h2>
              <div className="commitment-desc">For all professionals to be trained by industry practitioners & be given fulfilling careers.</div>
            </article>
            <article className="commitment-block" data-aos="fade-up" data-aos-delay="200">
              <h2 className="commitment-title blue">Values</h2>
              <div className="commitment-desc">
                <ul>
                  <li>Innovative and revolutionary</li>
                  <li>Constant progression and results-driven</li>
                  <li>Empathetic collaborator</li>
                </ul>
              </div>
            </article>
          </div>
          <div className="commitment-right" data-aos="fade-left">
            <img 
              src="/ceo.png" 
              alt="Timothy Justin Zeta - CEO of Brookside Manpower Services" 
              className="commitment-ceo-img"
              width="400"
              height="500"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
