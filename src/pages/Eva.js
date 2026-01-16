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
        title="E-VA Virtual Assistants | Elite Business Support & Remote Staffing Solutions"
        description="Transform your business with elite virtual assistants. Save up to 70% on staffing costs while getting top-tier talent. 98% client retention rate. Fast hiring in 21 days average."
        keywords="virtual assistant services, remote staffing, business process outsourcing, executive assistant, administrative support, virtual staffing solutions, offshore virtual assistants, business support services, cost-effective staffing, professional virtual assistants"
        ogImage="/eva-logo.png"
        canonicalUrl="/eva"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Service",
          "name": "E-VA Virtual Assistant Services",
          "description": "Elite virtual assistant services providing business support, administrative assistance, and remote staffing solutions",
          "provider": {
            "@type": "Organization",
            "name": "Brookside Manpower Services",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Unit 704C, Tower 3, PITX Building, 1 Kennedy Road",
              "addressLocality": "Paranaque City",
              "addressRegion": "Metro Manila",
              "postalCode": "1701",
              "addressCountry": "PH"
            },
            "telephone": "+63 917 157 8874"
          },
          "serviceType": "Virtual Assistant Services",
          "areaServed": "Global",
          "hasOfferCatalog": {
            "@type": "OfferCatalog",
            "name": "Virtual Assistant Services",
            "itemListElement": [
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Property Management Support"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "E-Commerce Operations"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Digital Marketing Support"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Financial Administration"
                }
              },
              {
                "@type": "Offer",
                "itemOffered": {
                  "@type": "Service",
                  "name": "Executive Assistance"
                }
              }
            ]
          }
        }}
      />

      <div className="eva-page">
        {/* Navigation */}
        <nav className="eva-nav">
          <div className="eva-nav-container">
            <Link to="/">
              <img src="/eva-logo.png" alt="E-VA Logo" className="eva-logo-small" />
            </Link>
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
          <video
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            id="heroVideo"
            aria-hidden="true"
            onError={(e) => {
              console.error('Video failed to load:', e);
              e.target.style.display = 'none';
            }}
            onLoadStart={() => {
              console.log('Video started loading');
            }}
            onCanPlay={() => {
              console.log('Video can play');
            }}
          >
            <source src="/hero-eva-bg.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="eva-hero-fallback"></div>
          <div className="eva-hero-content">
            <div className="eva-logo-container">
              <img src="/eva-logo.png" alt="E-VA Logo" className="eva-logo-hero" />
            </div>
            <h1 className="eva-hero-tagline">Elevate Your Business<br />with Elite Virtual Assistants</h1>
            <p className="eva-hero-subtitle">Save up to 70% on staffing costs while getting top-tier talent. Fast hiring, no upfront fees.</p>

            <div className="eva-hero-buttons">
              <Link to="/eva/inquiry" className="eva-cta-button-secondary">Get Started Today</Link>
            </div>
          </div>
        </section>

        {/* Services Overview Section */}
        <section className="eva-services-section" id="services">
          <div className="eva-services-container">
            <div className="eva-services-header">
              <h2 className="eva-services-title">Our Virtual Assistant Services</h2>
              <p className="eva-services-subtitle">Professional support across all business functions to help you scale efficiently</p>
            </div>

            <div className="eva-services-grid">
              <div className="eva-service-card">
                <div className="eva-service-icon">
                  <i className="fas fa-building"></i>
                </div>
                <div className="eva-service-content">
                  <h3 className="eva-service-name">Property Management</h3>
                  <p className="eva-service-description">Complete property administration, tenant management, and real estate support services</p>
                </div>
              </div>
              <div className="eva-service-card">
                <div className="eva-service-icon">
                  <i className="fas fa-shopping-cart"></i>
                </div>
                <div className="eva-service-content">
                  <h3 className="eva-service-name">E-Commerce Operations</h3>
                  <p className="eva-service-description">Online store management, order processing, inventory control, and customer service</p>
                </div>
              </div>
              <div className="eva-service-card">
                <div className="eva-service-icon">
                  <i className="fas fa-bullhorn"></i>
                </div>
                <div className="eva-service-content">
                  <h3 className="eva-service-name">Digital Marketing</h3>
                  <p className="eva-service-description">Social media management, content creation, campaign management, and brand promotion</p>
                </div>
              </div>
              <div className="eva-service-card">
                <div className="eva-service-icon">
                  <i className="fas fa-calculator"></i>
                </div>
                <div className="eva-service-content">
                  <h3 className="eva-service-name">Financial Administration</h3>
                  <p className="eva-service-description">Bookkeeping, invoicing, expense tracking, and financial reporting services</p>
                </div>
              </div>
              <div className="eva-service-card">
                <div className="eva-service-icon">
                  <i className="fas fa-briefcase"></i>
                </div>
                <div className="eva-service-content">
                  <h3 className="eva-service-name">Executive Assistance</h3>
                  <p className="eva-service-description">Calendar management, email handling, travel coordination, and executive support</p>
                </div>
              </div>
              <div className="eva-service-card">
                <div className="eva-service-icon">
                  <i className="fas fa-headset"></i>
                </div>
                <div className="eva-service-content">
                  <h3 className="eva-service-name">Customer Service</h3>
                  <p className="eva-service-description">Professional customer support, inquiry handling, and relationship management</p>
                </div>
              </div>
            </div>

            <div className="eva-services-benefits">
              <h3 className="eva-services-benefits-title">Why Choose Our Virtual Assistant Services?</h3>
              <div className="eva-services-benefits-grid">
                <div className="eva-services-benefit">
                  <div className="eva-services-benefit-icon">
                    <i className="fas fa-dollar-sign"></i>
                  </div>
                  <div className="eva-services-benefit-text">
                    <h4>Cost Effective</h4>
                    <p>Save up to 70% compared to hiring full-time local staff</p>
                  </div>
                </div>
                <div className="eva-services-benefit">
                  <div className="eva-services-benefit-icon">
                    <i className="fas fa-rocket"></i>
                  </div>
                  <div className="eva-services-benefit-text">
                    <h4>Quick Deployment</h4>
                    <p>Get started in as little as 21 days with our streamlined process</p>
                  </div>
                </div>
                <div className="eva-services-benefit">
                  <div className="eva-services-benefit-icon">
                    <i className="fas fa-user-check"></i>
                  </div>
                  <div className="eva-services-benefit-text">
                    <h4>Highly Skilled</h4>
                    <p>Access to top 1% talent with specialized training and expertise</p>
                  </div>
                </div>
                <div className="eva-services-benefit">
                  <div className="eva-services-benefit-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="eva-services-benefit-text">
                    <h4>Flexible Hours</h4>
                    <p>24/7 availability to support your business across time zones</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="eva-services-cta">
              <Link to="/eva/inquiry" className="eva-services-button">Start Your Free Consultation</Link>
            </div>
          </div>
        </section>

        {/* Elite Support Section */}
        <section className="eva-elite-section">
          <div className="eva-elite-content">
            <div className="eva-elite-text">
              <h2 className="eva-elite-heading">
                Ready to Transform<br />
                Your Business?
              </h2>
              <p className="eva-elite-description">
                Join hundreds of successful businesses that have elevated their operations with our elite virtual assistants. Get started today and experience the difference.
              </p>
              <Link to="/eva/inquiry" className="eva-hire-button">Start Free Consultation</Link>
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
              <img src="/eva-ceo.png" alt="CEO Ethel Ann Cabezas" className="eva-ceo-photo" />
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

        {/* Why Choose E-VA Section */}
        <section className="eva-why-choose" id="clients" ref={statsRef}>
          <div className="eva-why-choose-container">
            <div className="eva-why-choose-header">
              <h2 className="eva-why-choose-title">Why Leading Businesses Choose E-VA</h2>
              <p className="eva-why-choose-subtitle">Transform your business operations with our proven virtual assistant solutions</p>
            </div>

            <div className="eva-benefits-grid">
              <div className="eva-benefit-card">
                <div className="eva-benefit-icon">
                  <i className="fas fa-chart-line"></i>
                </div>
                <div className="eva-benefit-content">
                  <h3 className="eva-benefit-title">70% Cost Savings</h3>
                  <p className="eva-benefit-description">Reduce your staffing costs significantly without compromising on quality or expertise</p>
                </div>
              </div>
              <div className="eva-benefit-card">
                <div className="eva-benefit-icon">
                  <i className="fas fa-clock"></i>
                </div>
                <div className="eva-benefit-content">
                  <h3 className="eva-benefit-title">21 Days Average to Fill</h3>
                  <p className="eva-benefit-description">Fast-track your hiring process with our streamlined recruitment and onboarding</p>
                </div>
              </div>
              <div className="eva-benefit-card">
                <div className="eva-benefit-icon">
                  <i className="fas fa-users"></i>
                </div>
                <div className="eva-benefit-content">
                  <h3 className="eva-benefit-title">98% Client Retention</h3>
                  <p className="eva-benefit-description">Our long-term partnerships speak to the quality and reliability of our services</p>
                </div>
              </div>
              <div className="eva-benefit-card">
                <div className="eva-benefit-icon">
                  <i className="fas fa-star"></i>
                </div>
                <div className="eva-benefit-content">
                  <h3 className="eva-benefit-title">Top 1% Talent</h3>
                  <p className="eva-benefit-description">Access to pre-vetted, highly skilled virtual assistants across multiple industries</p>
                </div>
              </div>
            </div>

            <div className="eva-stats-section">
              <h3 className="eva-stats-title">Our Impact in Numbers</h3>
              <div className="eva-stats-grid">
                <div className="eva-stat-card">
                  <div className="eva-stat-number" data-target="1000">0</div>
                  <div className="eva-stat-label">+ Virtual Assistants Placed</div>
                </div>
                <div className="eva-stat-card">
                  <div className="eva-stat-number" data-target="95">0</div>
                  <div className="eva-stat-label">% Client Satisfaction Rate</div>
                </div>
                <div className="eva-stat-card">
                  <div className="eva-stat-number" data-target="200">0</div>
                  <div className="eva-stat-label">+ Happy Business Partners</div>
                </div>
                <div className="eva-stat-card">
                  <div className="eva-stat-number" data-target="50">0</div>
                  <div className="eva-stat-label">Countries Served</div>
                </div>
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

        {/* Client Success Stories Section */}
        <section className="eva-testimonials">
          <div className="eva-testimonials-container">
            <div className="eva-testimonials-header">
              <h2 className="eva-testimonials-title">Client Success Stories</h2>
              <p className="eva-testimonials-subtitle">See how E-VA virtual assistants transform businesses</p>
            </div>

            <div className="eva-testimonials-grid">
              <div className="eva-testimonial-card">
                <div className="eva-testimonial-content">
                  <p className="eva-testimonial-quote">
                    "Since partnering with E-VA, we've reduced our operational costs by 65% while maintaining exceptional service quality. Our virtual assistants handle complex administrative tasks and customer support with professionalism that exceeds our expectations."
                  </p>
                  <div className="eva-testimonial-meta">
                    <p className="eva-testimonial-author">Neil Tagawa</p>
                    <p className="eva-testimonial-position">CEO, RedHammer LLC</p>
                  </div>
                </div>
              </div>

              <div className="eva-testimonial-card">
                <div className="eva-testimonial-content">
                  <p className="eva-testimonial-quote">
                    "The dedication and language proficiency of our E-VA virtual assistants are unmatched. They've become integral to our operations, handling everything from bookkeeping to client communications with remarkable efficiency."
                  </p>
                  <div className="eva-testimonial-meta">
                    <p className="eva-testimonial-author">Ernest Sutton, CPA</p>
                    <p className="eva-testimonial-position">Vice President, RediCarpet</p>
                  </div>
                </div>
              </div>

              <div className="eva-testimonial-card">
                <div className="eva-testimonial-content">
                  <p className="eva-testimonial-quote">
                    "E-VA's commitment to employee development and retention shows in the quality of service we receive. Their human-centered approach to virtual assistance has been a game-changer for our business operations."
                  </p>
                  <div className="eva-testimonial-meta">
                    <p className="eva-testimonial-author">Jamie Wiseman</p>
                    <p className="eva-testimonial-position">Principal, Real Estate Development Firm</p>
                  </div>
                </div>
              </div>

              <div className="eva-testimonial-card">
                <div className="eva-testimonial-content">
                  <p className="eva-testimonial-quote">
                    "The ROI we've achieved with E-VA virtual assistants is incredible. We've expanded our service offerings while maintaining profitability, all thanks to their reliable and skilled support team."
                  </p>
                  <div className="eva-testimonial-meta">
                    <p className="eva-testimonial-author">Senior Business Strategist</p>
                    <p className="eva-testimonial-position">Transportation Company</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Indicators Section */}
        <section className="eva-trust">
          <div className="eva-trust-container">
            <div className="eva-trust-header">
              <h2 className="eva-trust-title">Trusted by Industry Leaders</h2>
              <p className="eva-trust-subtitle">Recognized for excellence in virtual assistance services</p>
            </div>

            <div className="eva-trust-grid">
              <div className="eva-trust-item">
                <div className="eva-trust-icon">
                  <i className="fas fa-shield-alt"></i>
                </div>
                <h3 className="eva-trust-name">SOC 2 Type II Certified</h3>
                <p className="eva-trust-description">Enterprise-grade security and compliance standards</p>
              </div>
              <div className="eva-trust-item">
                <div className="eva-trust-icon">
                  <i className="fas fa-users"></i>
                </div>
                <h3 className="eva-trust-name">98% Client Retention</h3>
                <p className="eva-trust-description">Long-term partnerships built on trust and results</p>
              </div>
              <div className="eva-trust-item">
                <div className="eva-trust-icon">
                  <i className="fas fa-award"></i>
                </div>
                <h3 className="eva-trust-name">Top-Rated Service</h3>
                <p className="eva-trust-description">Consistently rated 5-star by satisfied clients</p>
              </div>
              <div className="eva-trust-item">
                <div className="eva-trust-icon">
                  <i className="fas fa-clock"></i>
                </div>
                <h3 className="eva-trust-name">24/7 Support</h3>
                <p className="eva-trust-description">Round-the-clock assistance for your business needs</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="eva-cta-section">
          <div className="eva-cta-container">
            <div className="eva-cta-content">
              <h2 className="eva-cta-heading">Ready to Elevate Your Business?</h2>
              <p className="eva-cta-description">
                Get started with a free consultation and discover how our virtual assistants can transform your operations. No upfront costs, no long-term commitments.
              </p>
              <div className="eva-cta-features">
                <div className="eva-cta-feature">
                  <i className="fas fa-check-circle"></i>
                  <span>Free initial consultation</span>
                </div>
                <div className="eva-cta-feature">
                  <i className="fas fa-check-circle"></i>
                  <span>Customized staffing solutions</span>
                </div>
                <div className="eva-cta-feature">
                  <i className="fas fa-check-circle"></i>
                  <span>21-day average hiring time</span>
                </div>
                <div className="eva-cta-feature">
                  <i className="fas fa-check-circle"></i>
                  <span>98% client satisfaction rate</span>
                </div>
              </div>
              <div className="eva-cta-buttons">
                <Link to="/eva/inquiry" className="eva-cta-primary">Get Free Consultation</Link>
                <Link to="#contact" className="eva-cta-secondary">Contact Us</Link>
              </div>
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
