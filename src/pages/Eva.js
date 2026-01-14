import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Eva.css";
import SEO from "../components/SEO";

function Eva() {
  const statsRef = useRef(null);

  useEffect(() => {
    // Smooth scrolling for anchor links
    const handleAnchorClick = (e) => {
      const href = e.target.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    };

    const navLinks = document.querySelectorAll('.eva-nav-links a');
    navLinks.forEach(link => {
      link.addEventListener('click', handleAnchorClick);
    });

    // Statistics animation observer
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const statNumbers = entry.target.querySelectorAll('.eva-stat-number');
          statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
              current += increment;
              if (current < target) {
                const suffix = stat.getAttribute('data-target') === '1000' ? '+' : 
                              stat.getAttribute('data-target') === '95' ? '%' : 
                              stat.getAttribute('data-target') === '150' ? '+' : '%';
                stat.textContent = Math.floor(current) + suffix;
                requestAnimationFrame(updateCounter);
              } else {
                const suffix = stat.getAttribute('data-target') === '1000' ? '+' : 
                              stat.getAttribute('data-target') === '95' ? '%' : 
                              stat.getAttribute('data-target') === '150' ? '+' : '%';
                stat.textContent = target + suffix;
              }
            };

            updateCounter();
          });
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => {
      navLinks.forEach(link => {
        link.removeEventListener('click', handleAnchorClick);
      });
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <SEO 
        title="E-VA - Elevate Your Everything | Virtual Assistant Services"
        description="E-VA provides elite virtual assistant services and top-tier assistance. Elevate your business with our skilled virtual assistants."
        keywords="virtual assistant, VA services, business support, executive assistance, virtual staffing"
        ogImage="/eva-logo-placeholder.png"
        canonicalUrl="/eva"
      />

      <div className="eva-page">
        {/* Navigation */}
        <nav className="eva-nav">
          <div className="eva-nav-container">
            <Link to="/" className="eva-nav-logo">E-VA</Link>
            <div className="eva-nav-links">
              <a href="#home">Home</a>
              <a href="#services">Services</a>
              <a href="#clients">Clients</a>
              <a href="#about">About</a>
              <a href="#apply">Apply</a>
              <a href="#contact">Contact</a>
            </div>
          </div>
        </nav>

        {/* Hero Section */}
        <section className="eva-hero" id="home">
          <div className="eva-hero-background">
            <div className="eva-hero-overlay"></div>
          </div>
          <div className="eva-hero-content">
            <div className="eva-logo-container">
              <img src="/eva-logo-placeholder.png" alt="E-VA Logo" className="eva-logo" />
            </div>
            <h1 className="eva-hero-tagline">Elevate your<br />everything</h1>
            <Link to="/eva/inquiry" className="eva-cta-button">KNOW MORE</Link>
          </div>
        </section>

        {/* Specializations Section */}
        <section className="eva-specializations-section" id="services">
          <div className="eva-specializations-container">
            <div className="eva-specializations-header">
              <h2 className="eva-specializations-title">Our Specializations</h2>
              <p className="eva-specializations-subtitle">Expert virtual assistant services tailored to your business needs</p>
            </div>
            <div className="eva-specializations-grid">
              <div className="eva-specialization-card">
                <div className="eva-specialization-icon">
                  <i className="fas fa-building"></i>
                </div>
                <h3 className="eva-specialization-name">Property Management</h3>
              </div>
              <div className="eva-specialization-card">
                <div className="eva-specialization-icon">
                  <i className="fas fa-shopping-cart"></i>
                </div>
                <h3 className="eva-specialization-name">E-Commerce</h3>
              </div>
              <div className="eva-specialization-card">
                <div className="eva-specialization-icon">
                  <i className="fas fa-bullhorn"></i>
                </div>
                <h3 className="eva-specialization-name">Marketing/Social Media VA</h3>
              </div>
              <div className="eva-specialization-card">
                <div className="eva-specialization-icon">
                  <i className="fas fa-calculator"></i>
                </div>
                <h3 className="eva-specialization-name">Bookkeeping</h3>
              </div>
              <div className="eva-specialization-card">
                <div className="eva-specialization-icon">
                  <i className="fas fa-briefcase"></i>
                </div>
                <h3 className="eva-specialization-name">Executive Admin</h3>
              </div>
            </div>
            <div className="eva-specializations-cta">
              <Link to="/eva/inquiry" className="eva-specializations-button">Get Started</Link>
            </div>
          </div>
        </section>

        {/* Elite Support Section */}
        <section className="eva-elite-section">
          <div className="eva-elite-content">
            <div className="eva-elite-text">
              <h2 className="eva-elite-heading">
                Get elite support &<br />
                top-tier assistance
              </h2>
              <Link to="/eva/inquiry" className="eva-hire-button">HIRE HERE</Link>
            </div>
            <div className="eva-elite-graphic">
              <div className="eva-graphic-placeholder"></div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="eva-features">
          <div className="eva-feature-card">
            <div className="eva-feature-icon">
              <div className="eva-icon-placeholder icon-diamond"></div>
            </div>
            <h3 className="eva-feature-title">Match-making is key</h3>
            <p className="eva-feature-description">
              Find the perfect virtual assistant to elevate your business efficiency and free up your time for what matters most!
            </p>
          </div>

          <div className="eva-feature-card">
            <div className="eva-feature-icon">
              <div className="eva-icon-placeholder icon-disc"></div>
            </div>
            <h3 className="eva-feature-title">Skill meets competence</h3>
            <p className="eva-feature-description">
              We have unlocked the secret to providing the best virtual assistance for you and your business.
            </p>
          </div>

          <div className="eva-feature-card">
            <div className="eva-feature-icon">
              <div className="eva-icon-placeholder icon-swirl"></div>
            </div>
            <h3 className="eva-feature-title">Your work-life balance redefined</h3>
            <p className="eva-feature-description">
              Time is life's greatest commodity and we help to give you more of it!
            </p>
          </div>
        </section>

        {/* CEO Message Section */}
        <section className="eva-ceo-section">
          <div className="eva-ceo-container">
            <div className="eva-ceo-image">
              <img src="/eva-ceo-placeholder.png" alt="CEO Ethel Ann Cabezas" className="eva-ceo-photo" />
            </div>
            <div className="eva-ceo-content">
              <h2 className="eva-ceo-title">Message from our CEO</h2>
              <p className="eva-ceo-text">
                In today's fast-paced world, businesses need agile, reliable, and efficient support. That's where we come in. Whether it's administrative tasks, customer service, marketing, or executive assistance, our team of dedicated professionals is here to ensure that you can focus on what truly matters—growing your business.
              </p>
              <p className="eva-ceo-text">
                We take pride in offering personalized solutions tailored to your unique needs. Our virtual assistants are not just service providers; they are strategic partners committed to your success. With cutting-edge tools and a passion for excellence, we're here to make your work-life balance a reality.
              </p>
              <div className="eva-ceo-signature">
                <p className="eva-signature-name">ETHEL ANN CABEZAS</p>
                <p className="eva-signature-title">CEO, E-VA</p>
              </div>
            </div>
          </div>
        </section>

        {/* Statistics & Achievements Section */}
        <section className="eva-statistics" id="clients" ref={statsRef}>
          <div className="eva-statistics-container">
            <div className="eva-statistics-header">
              <h2 className="eva-statistics-title">Trusted by Industry Leaders</h2>
              <p className="eva-statistics-subtitle">Join hundreds of successful businesses that rely on our elite virtual assistants</p>
            </div>

            <div className="eva-stats-grid">
              <div className="eva-stat-card">
                <div className="eva-stat-number" data-target="1000">0</div>
                <div className="eva-stat-label">+ Talents Placed in Top Restaurants</div>
              </div>
              <div className="eva-stat-card">
                <div className="eva-stat-number" data-target="95">0</div>
                <div className="eva-stat-label">% Client Satisfaction Rate</div>
              </div>
              <div className="eva-stat-card">
                <div className="eva-stat-number" data-target="150">0</div>
                <div className="eva-stat-label">+ Premium F&B Partners</div>
              </div>
              <div className="eva-stat-card">
                <div className="eva-stat-number" data-target="45">0</div>
                <div className="eva-stat-label">% Increase in Quality Applicants</div>
              </div>
            </div>

            <div className="eva-partners-section">
              <h3 className="eva-partners-title">Proudly Partnered With</h3>
              <p className="eva-partners-subtitle">Trusted by leading hospitality and F&B brands across Metro Manila</p>
              <div className="eva-partners-grid">
                <div className="eva-partner-item">
                  <div className="eva-partner-logo-placeholder">5-Star Hotels</div>
                  <p className="eva-partner-name">Luxury Hotel Chains</p>
                </div>
                <div className="eva-partner-item">
                  <div className="eva-partner-logo-placeholder">Fine Dining</div>
                  <p className="eva-partner-name">Premium Restaurants</p>
                </div>
                <div className="eva-partner-item">
                  <div className="eva-partner-logo-placeholder">Resorts</div>
                  <p className="eva-partner-name">Integrated Resorts</p>
                </div>
                <div className="eva-partner-item">
                  <div className="eva-partner-logo-placeholder">BPO</div>
                  <p className="eva-partner-name">Business Process Outsourcing</p>
                </div>
                <div className="eva-partner-item">
                  <div className="eva-partner-logo-placeholder">Catering</div>
                  <p className="eva-partner-name">Event Catering Services</p>
                </div>
                <div className="eva-partner-item">
                  <div className="eva-partner-logo-placeholder">Retail</div>
                  <p className="eva-partner-name">Retail & Hospitality</p>
                </div>
              </div>
              <div className="eva-cta-box">
                <p className="eva-cta-text">This could be <span className="eva-cta-highlight">you next</span></p>
                <Link to="/eva/inquiry" className="eva-cta-button-secondary">
                  Get Started Today
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="eva-testimonials">
          <div className="eva-testimonials-container">
            <div className="eva-testimonial-card">
              <p className="eva-testimonial-quote">
                "My virtual assistant handles everything from data entry to customer support seamlessly. Their skills and adaptability make them an invaluable part of my business operations!"
              </p>
              <p className="eva-testimonial-author">— Lisa T., CEO of a Startup</p>
            </div>

            <div className="eva-testimonial-card">
              <p className="eva-testimonial-quote">
                "Working with my virtual assistant has been a game-changer. They are proactive, communicate clearly, and always deliver on time. I can't imagine running my business without them!"
              </p>
              <p className="eva-testimonial-author">— Emily R., Entrepreneur</p>
            </div>

            <div className="eva-testimonial-card">
              <p className="eva-testimonial-quote">
                "I work in different time zones, and my VA is always available when I need them. Their flexibility and commitment make them an essential part of my business."
              </p>
              <p className="eva-testimonial-author">— Leo V., Digital Nomad & Consultant</p>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section className="eva-pricing">
          <div className="eva-pricing-container">
            <div className="eva-pricing-logo">
              <img src="/eva-logo-placeholder.png" alt="E-VA Logo" className="eva-logo-small" />
              <p className="eva-pricing-tagline">ELEVATING LIVES</p>
              <p className="eva-pricing-text">Get yours for only</p>
              <p className="eva-pricing-amount">$2k/month</p>
            </div>
          </div>
        </section>

        {/* Vision Mission Values Section */}
        <section className="eva-vmv-section" id="about">
          <div className="eva-vmv-content">
            <div className="eva-vmv-item">
              <h3 className="eva-vmv-title">Vision</h3>
              <p className="eva-vmv-text">To provide elevated support through talent, grit, and passion for literally everything.</p>
            </div>
            <div className="eva-vmv-item">
              <h3 className="eva-vmv-title">Mission</h3>
              <p className="eva-vmv-text">Happy clients meet exceptional service.</p>
            </div>
            <div className="eva-vmv-item">
              <h3 className="eva-vmv-title">Values</h3>
              <ul className="eva-vmv-values-list">
                <li>Bespoke excellence</li>
                <li>Non-stop innovation</li>
                <li>Reliable efficiency</li>
              </ul>
            </div>
          </div>
        </section>


        {/* Apply Section - Ready to get hired & trained */}
        <section className="eva-apply-section" id="apply">
          <div className="eva-apply-content">
            <h2 className="eva-apply-heading">
              <span className="eva-apply-heading-line1">Ready to get</span>
              <span className="eva-apply-heading-line2">hired & trained?</span>
            </h2>
            <Link to="/career" className="eva-apply-button">APPLY NOW</Link>
            <div className="eva-categories">
              <div className="eva-category-box">
                <span>REAL ESTATE</span>
              </div>
              <div className="eva-category-box">
                <span>DIGITAL MARKETING</span>
              </div>
              <div className="eva-category-box">
                <span>CUSTOMER SERVICE</span>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="eva-contact" id="contact">
          <div className="eva-contact-header">
            <div className="eva-contact-header-bg">
              <p className="eva-contact-header-text">ELEVATING LIVES</p>
            </div>
          </div>
          <div className="eva-contact-content">
            <h2 className="eva-contact-title">Contact Us</h2>
            <div className="eva-contact-info">
              <div className="eva-contact-item">
                <h3 className="eva-contact-label">Office</h3>
                <p className="eva-contact-value">
                  Unit 704C, Tower 3, PITX Building, 1 Kennedy Road,<br />
                  Barangay Tambo, Paranaque City, 1701 Metro Manila
                </p>
              </div>
              <div className="eva-contact-item">
                <h3 className="eva-contact-label">Phone</h3>
                <p className="eva-contact-value">(02) 7001 9493 | +63 917 157 8874</p>
              </div>
              <div className="eva-contact-item">
                <h3 className="eva-contact-label">Email</h3>
                <p className="eva-contact-value">
                  <a href={`mailto:${`eva@brooksidemanpower.com`}`} className="eva-contact-link">
                    {['eva', '@', 'brooksidemanpower.com'].join('')}
                  </a>
                </p>
              </div>
              <div className="eva-contact-item">
                <h3 className="eva-contact-label">Social</h3>
                <div className="eva-social-icons">
                  <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="eva-social-icon">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="eva-social-icon">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Eva;
