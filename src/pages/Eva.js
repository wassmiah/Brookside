import React, { useEffect, useRef, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import "./Eva.css";
import AOS from "aos";
import "aos/dist/aos.css";
import SEO from "../components/SEO";

const blockMediaMenu = (e) => {
  e.preventDefault();
  e.stopPropagation();
  return false;
};

/** E-VA Course Enrollment Form (Google Forms) – public viewform URL */
const EVA_COURSE_ENROLLMENT_FORM_URL = "https://docs.google.com/forms/d/1XUtZKtciUOggybHo6zSpsrH8o5sUf4RXaXNo4CJj9Pk/viewform";


// Illustration Component for numbered images (1.png to 10.png)
const IllustrationImage = ({ imageNumber, size = 180, className = "" }) => {
  return (
    <div className={`illustration-image ${className}`}>
      <img
        src={`/${imageNumber}.png`}
        alt={`Illustration ${imageNumber}`}
        style={{ width: size, height: size, objectFit: 'contain' }}
        onError={(e) => {
          e.target.style.display = 'none';
          e.currentTarget.style.display = 'flex';
        }}
      />
      <div className="illustration-placeholder" style={{ display: 'none' }}>
        <div className="placeholder-icon">📷</div>
        <div className="placeholder-text">{imageNumber}.png</div>
      </div>
    </div>
  );
};


function Eva() {
  const vmvRef = useRef(null);
  const servicesRef = useRef(null);
  const featuresRef = useRef(null);
  const valueBenefitsRef = useRef(null);
  const ceoRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const evaMenuToggleRef = useRef(null);

  const closeEvaMenu = useCallback(() => setMenuOpen(false), []);

  // Body class and focus (overlay best practice)
  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("eva-overlay-open");
      requestAnimationFrame(() => {
        const firstLink = document.querySelector(".eva-nav-links a, .eva-nav-links .eva-nav-brookside-logo");
        firstLink?.focus?.();
      });
    } else {
      document.body.classList.remove("eva-overlay-open");
      evaMenuToggleRef.current?.focus();
    }
    return () => document.body.classList.remove("eva-overlay-open");
  }, [menuOpen]);

  // Escape key closes overlay
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") closeEvaMenu();
    };
    if (menuOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [menuOpen, closeEvaMenu]);

  useEffect(() => {
    // Responsive AOS offset - trigger immediately on mobile
    const isMobile = window.innerWidth <= 768;
    const offsetValue = isMobile ? -200 : 100; // Very negative offset on mobile triggers well before element enters viewport
    
    AOS.init({
      duration: isMobile ? 300 : 600, // Faster animations on mobile
      once: true,
      offset: offsetValue,
      easing: 'ease-out-cubic',
      // Mobile-specific settings
      disable: false,
      startEvent: 'DOMContentLoaded',
      animatedClassName: 'aos-animate',
      useClassNames: false,
      disableMutationObserver: false,
      debounceDelay: isMobile ? 10 : 50, // Faster debounce on mobile
      throttleDelay: isMobile ? 50 : 99, // Faster throttle on mobile
    });

    // On mobile, immediately make all sections visible and refresh AOS
    if (isMobile) {
      // Immediately add section-visible class to all sections on mobile
      const allSections = document.querySelectorAll('.eva-services-min, .eva-features, .eva-value-benefits-section, .eva-ceo-section, .eva-testimonials-lux, .eva-cta-section');
      allSections.forEach(section => {
        // Check if section is in viewport or near viewport
        const rect = section.getBoundingClientRect();
        const isNearViewport = rect.top < window.innerHeight + 300; // 300px before viewport
        if (isNearViewport) {
          section.classList.add('section-visible');
        }
      });

      // Force multiple AOS refreshes to ensure triggering
      setTimeout(() => {
        AOS.refresh();
      }, 50);
      setTimeout(() => {
        AOS.refresh();
      }, 200);
      setTimeout(() => {
        AOS.refresh();
      }, 500);
    }

    // Refresh AOS on resize to update offset for mobile/desktop
    const handleResize = () => {
      // Refresh AOS to recalculate positions based on current viewport
      AOS.refresh();
    };
    
    window.addEventListener('resize', handleResize);

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


    // General section animation observer - trigger immediately on mobile
    const isMobileDevice = window.innerWidth <= 768;
    const sectionObserverOptions = {
      threshold: isMobileDevice ? 0 : 0.2, // Trigger immediately on mobile (0% = as soon as any part enters), 20% on desktop
      rootMargin: isMobileDevice ? '400px 0px 0px 0px' : '0px 0px -100px 0px' // Very large positive margin on mobile triggers well before element enters viewport
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section-visible');
          // On mobile, also trigger AOS animation immediately
          if (isMobileDevice) {
            const aosElements = entry.target.querySelectorAll('[data-aos]');
            aosElements.forEach(el => {
              el.classList.add('aos-animate');
            });
          }
          sectionObserver.unobserve(entry.target);
        }
      });
    }, sectionObserverOptions);

    // Observe all sections
    const sections = [servicesRef, featuresRef, valueBenefitsRef, ceoRef, testimonialsRef, ctaRef];
    sections.forEach(ref => {
      if (ref.current) {
        sectionObserver.observe(ref.current);
        
        // On mobile, immediately check if section is visible and make it visible
        if (isMobileDevice) {
          const rect = ref.current.getBoundingClientRect();
          const isInViewport = rect.top < window.innerHeight + 400;
          if (isInViewport) {
            ref.current.classList.add('section-visible');
            // Also trigger AOS animations immediately
            const aosElements = ref.current.querySelectorAll('[data-aos]');
            aosElements.forEach(el => {
              el.classList.add('aos-animate');
            });
          }
        }
      }
    });

    // VMV section scroll animations - trigger immediately on mobile
    const vmvObserverOptions = {
      threshold: isMobileDevice ? 0.01 : 0.3, // Trigger at 1% visible on mobile (almost immediately), 30% on desktop
      rootMargin: isMobileDevice ? '200px 0px 0px 0px' : '0px' // Large positive margin on mobile triggers well before element enters viewport
    };

    const vmvObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const vmvItems = entry.target.querySelectorAll('.eva-vmv-item');
          vmvItems.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add('animate-in');
            }, index * 200);
          });
          vmvObserver.unobserve(entry.target);
        }
      });
    }, vmvObserverOptions);

    if (vmvRef.current) {
      vmvObserver.observe(vmvRef.current);
    }

    // Staggered grid animations - trigger immediately on mobile
    const gridObserverOptions = {
      threshold: isMobileDevice ? 0.01 : 0.2, // Trigger at 1% visible on mobile (almost immediately)
      rootMargin: isMobileDevice ? '200px 0px 0px 0px' : '0px' // Large positive margin on mobile triggers well before element enters viewport
    };

    const gridObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const gridItems = entry.target.querySelectorAll('.grid-item');
          gridItems.forEach((item, index) => {
            setTimeout(() => {
              item.classList.add('grid-item-visible');
            }, index * 80);
          });
          gridObserver.unobserve(entry.target);
        }
      });
    }, gridObserverOptions);

    // Observe grid containers
    const grids = document.querySelectorAll('.grid-container');
    grids.forEach(grid => {
      gridObserver.observe(grid);
    });

    // Scroll direction and position tracking
    let lastScrollY = window.pageYOffset;
    let ticking = false;

    const handleScroll = () => {
      const scrolled = window.pageYOffset;
      const scrollDirection = scrolled > lastScrollY ? 'down' : 'up';
      lastScrollY = scrolled;

      // On mobile, refresh AOS on scroll and immediately show sections
      if (window.innerWidth <= 768) {
        AOS.refresh();
        
        // Immediately show sections that are near viewport
        const allSections = document.querySelectorAll('.eva-services-min:not(.section-visible), .eva-features:not(.section-visible), .eva-value-benefits-section:not(.section-visible), .eva-ceo-section:not(.section-visible), .eva-testimonials-lux:not(.section-visible), .eva-cta-section:not(.section-visible)');
        allSections.forEach(section => {
          const rect = section.getBoundingClientRect();
          // Show section if it's within 400px of viewport
          if (rect.top < window.innerHeight + 400) {
            section.classList.add('section-visible');
            // Also trigger AOS animations
            const aosElements = section.querySelectorAll('[data-aos]');
            aosElements.forEach(el => {
              el.classList.add('aos-animate');
            });
          }
        });
      }

      if (!ticking) {
        requestAnimationFrame(() => {
          // Enhanced parallax effects
          updateParallaxEffects(scrolled);

          // Scroll-triggered animations
          updateScrollAnimations(scrolled, scrollDirection);

          ticking = false;
        });
        ticking = true;
      }
    };

    const updateParallaxEffects = (scrolled) => {
      // VMV background video parallax
      const vmvSection = vmvRef.current;
      if (vmvSection) {
        const rect = vmvSection.getBoundingClientRect();
        const sectionTop = rect.top + window.pageYOffset;
        const distance = scrolled - sectionTop;
        const rate = distance * -0.3;

        if (Math.abs(distance) < window.innerHeight) {
          const video = vmvSection.querySelector('.eva-vmv-video');
          if (video) {
            video.style.transform = `translateY(${rate}px)`;
          }
        }
      }

      // Hero section parallax
      const heroVideo = document.querySelector('#heroVideo');
      if (heroVideo && scrolled < window.innerHeight) {
        const rate = scrolled * 0.3;
        heroVideo.style.transform = `translateY(${rate}px)`;
      }

      // Subtle parallax for decorative elements
      const sections = document.querySelectorAll(
        '.eva-services-min, .eva-features, .eva-value-benefits-section, .eva-testimonials-lux, .eva-cta-section'
      );
            sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top + window.pageYOffset;
        const distance = scrolled - sectionTop;
        const rate = distance * 0.1;

        if (Math.abs(distance) < window.innerHeight) {
          const bgElements = section.querySelectorAll('[class*="bg"], [class*="overlay"]');
          bgElements.forEach(element => {
            element.style.transform = `translateY(${rate * 0.5}px)`;
          });
        }
      });
    };

    const updateScrollAnimations = (scrolled, direction) => {
      // Animate elements based on scroll position
      const elements = document.querySelectorAll('.scroll-animate');

      elements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const elementTop = rect.top + scrolled;
        const elementBottom = rect.bottom + scrolled;
        const windowHeight = window.innerHeight;

        // Check if element is in viewport
        if (elementBottom > scrolled && elementTop < scrolled + windowHeight) {
          const progress = Math.min(1, Math.max(0, (scrolled + windowHeight - elementTop) / windowHeight));

          // Apply direction-based animation
          if (direction === 'down') {
            element.style.transform = `translateY(${20 * (1 - progress)}px)`;
            element.style.opacity = progress;
          } else {
            element.style.transform = `translateY(${10 * (1 - progress)}px)`;
            element.style.opacity = progress;
          }
        }
      });

      // Stagger animations for grid items based on scroll
      const gridItems = document.querySelectorAll('.grid-item');
      gridItems.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        const itemTop = rect.top + scrolled;

        if (itemTop < scrolled + window.innerHeight * 0.8 && itemTop > scrolled - 100) {
          setTimeout(() => {
            item.classList.add('scroll-visible');
          }, index * 40);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      navLinks.forEach(link => {
        link.removeEventListener('click', handleAnchorClick);
      });
      sectionObserver.disconnect();
      vmvObserver.disconnect();
      gridObserver.disconnect();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <>
      <SEO
        title="E-VA Brookside | E-VA Virtual Assistant Philippines | Elite Virtual Assistants"
        description="E-VA Brookside - Elite virtual assistant services in the Philippines. E-VA virtual assistant by Brookside Manpower Services. Transform your business with top-tier Filipino virtual assistants. Save up to 70% on staffing costs. 98% client retention rate. Fast hiring in 21 days."
        keywords="eva brookside, eva virtual assistant, eva ph, eva philippines, eva virtual assistant philippines, eva brooksidemps, e-va brookside, e-va virtual assistant, e-va philippines, virtual assistant philippines, filipino virtual assistant, philippines virtual assistant, remote staffing philippines, virtual assistant services philippines, eva brookside manpower, brookside eva, eva va philippines, virtual assistant ph, va services philippines, elite virtual assistant philippines, professional virtual assistant philippines"
        ogImage="/eva-logo.png"
        ogImageWidth={1200}
        ogImageHeight={630}
        ogImageAlt="E-VA Brookside - Elite Virtual Assistant Services Philippines"
        canonicalUrl="/eva"
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "E-VA Brookside - Elite Virtual Assistant Services Philippines",
            "alternateName": ["E-VA Virtual Assistant", "E-VA PH", "E-VA Philippines", "E-VA Brookside Manpower", "EVA Virtual Assistant", "EVA PH", "EVA Philippines"],
            "description": "E-VA Brookside offers elite virtual assistant services in the Philippines. E-VA virtual assistant by Brookside Manpower Services provides top-tier Filipino virtual assistants for businesses worldwide. Save up to 70% on staffing costs with 98% client retention rate.",
            "provider": {
              "@type": "Organization",
              "name": "Brookside Manpower Services",
              "alternateName": "E-VA Brookside",
              "url": "https://brooksidemps.com/eva",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Unit 704C, Tower 3, PITX Building, 1 Kennedy Road",
                "addressLocality": "Paranaque City",
                "addressRegion": "Metro Manila",
                "postalCode": "1701",
                "addressCountry": "PH"
              },
              "telephone": "+63-917-157-8874",
              "email": "eva@brooksidemanpower.com"
            },
            "serviceType": "Virtual Assistant Services",
            "areaServed": {
              "@type": "Country",
              "name": "Philippines"
            },
            "availableChannel": {
              "@type": "ServiceChannel",
              "serviceUrl": "https://brooksidemps.com/eva",
              "serviceSmsNumber": "+63-917-157-8874",
              "servicePhone": "+63-917-157-8874"
            },
            "hasOfferCatalog": {
              "@type": "OfferCatalog",
              "name": "E-VA Virtual Assistant Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Property Management Support",
                    "description": "E-VA virtual assistant services for property management"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "E-Commerce Operations",
                    "description": "E-VA Philippines virtual assistant for e-commerce support"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Digital Marketing Support",
                    "description": "E-VA Brookside virtual assistant for digital marketing"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Financial Administration",
                    "description": "E-VA PH virtual assistant for financial administration"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Executive Assistance",
                    "description": "E-VA virtual assistant Philippines for executive support"
                  }
                }
              ]
            }
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is E-VA Brookside?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "E-VA Brookside is the elite virtual assistant service division of Brookside Manpower Services, providing top-tier Filipino virtual assistants to businesses worldwide. E-VA stands for Elite Virtual Assistants and offers professional remote staffing solutions."
                }
              },
              {
                "@type": "Question",
                "name": "What is E-VA virtual assistant?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "E-VA virtual assistant is a premium virtual assistant service offered by Brookside Manpower Services in the Philippines. E-VA provides elite Filipino virtual assistants specializing in property management, e-commerce, digital marketing, financial administration, and executive assistance."
                }
              },
              {
                "@type": "Question",
                "name": "What is E-VA PH?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "E-VA PH refers to E-VA Virtual Assistant Philippines, the premier virtual assistant service provider based in Metro Manila, Philippines. E-VA PH offers cost-effective remote staffing solutions with 98% client retention rate and average 21-day hiring time."
                }
              },
              {
                "@type": "Question",
                "name": "How much does E-VA Brookside virtual assistant cost?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "E-VA Brookside virtual assistant services can save businesses up to 70% on staffing costs compared to traditional hiring. Contact E-VA at eva@brooksidemanpower.com or visit eva.brooksidemps.com for a free consultation and customized pricing."
                }
              },
              {
                "@type": "Question",
                "name": "Where is E-VA virtual assistant Philippines located?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "E-VA virtual assistant Philippines is located at Unit 704C, Tower 3, PITX Building, 1 Kennedy Road, Paranaque City, Metro Manila, Philippines. E-VA serves clients globally while operating from the Philippines."
                }
              },
              {
                "@type": "Question",
                "name": "How do I hire an E-VA Brookside virtual assistant?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "To hire an E-VA Brookside virtual assistant, visit eva.brooksidemps.com and fill out the inquiry form. E-VA offers free consultations, customized staffing solutions, and average 21-day hiring time. Contact E-VA at eva@brooksidemanpower.com or call +63 917 157 8874."
                }
              }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://brooksidemps.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "E-VA Virtual Assistant",
                "item": "https://brooksidemps.com/eva"
              }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "E-VA Brookside - Elite Virtual Assistant Services Philippines",
            "description": "E-VA Brookside offers elite virtual assistant services in the Philippines. E-VA virtual assistant by Brookside Manpower Services.",
            "url": "https://brooksidemps.com/eva",
            "inLanguage": "en-PH",
            "isPartOf": {
              "@type": "WebSite",
              "name": "Brookside Manpower Services",
              "url": "https://brooksidemps.com"
            }
          }
        ]}
      />

      <div className="eva-page">
        {/* Navigation */}
        <nav className="eva-nav">
          <div className="eva-nav-container">
            <Link to="/eva">
              <img src="/eva-nav-logo.png" alt="E-VA Brookside - Virtual Assistant Philippines" className="eva-logo-small" />
            </Link>
            <div className="eva-nav-links">
              <a href="#home" onClick={closeEvaMenu}>Home</a>
              <a href="#services" onClick={closeEvaMenu}>Services</a>
              <a href="#clients" onClick={closeEvaMenu}>Clients</a>
              <a href="#about" onClick={closeEvaMenu}>About</a>
              <a href="#course" onClick={closeEvaMenu}>Course</a>
              <a href="#apply" onClick={closeEvaMenu}>Apply</a>
              <a href="#contact" onClick={closeEvaMenu}>Contact</a>
              <Link to="/" className="eva-nav-brookside-logo" aria-label="Back to Brookside Manpower home" onClick={closeEvaMenu}>
                <img src="/logo-white.png" alt="Brookside Manpower Services" className="eva-logo-small" />
              </Link>
            </div>
            <button ref={evaMenuToggleRef} type="button" className="eva-nav-toggle" onClick={() => setMenuOpen((prev) => !prev)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
              <i className={`fas ${menuOpen ? "fa-times" : "fa-bars"}`}></i>
            </button>
          </div>
          {/* E-VA overlay: portal to body so it covers full page (like Home/Navbar) */}
          {menuOpen && createPortal(
            <div className="eva-nav-overlay eva-nav-overlay-open" onClick={closeEvaMenu} aria-hidden="false" role="dialog" aria-modal="true" aria-label="Menu">
              <div className="eva-nav-links eva-nav-links-overlay active" onClick={(e) => e.stopPropagation()}>
                <a href="#home" onClick={closeEvaMenu}>Home</a>
                <a href="#services" onClick={closeEvaMenu}>Services</a>
                <a href="#clients" onClick={closeEvaMenu}>Clients</a>
                <a href="#about" onClick={closeEvaMenu}>About</a>
                <a href="#course" onClick={closeEvaMenu}>Course</a>
                <a href="#apply" onClick={closeEvaMenu}>Apply</a>
                <a href="#contact" onClick={closeEvaMenu}>Contact</a>
                <Link to="/" className="eva-nav-brookside-logo" aria-label="Back to Brookside Manpower home" onClick={closeEvaMenu}>
                  <img src="/logo-white.png" alt="Brookside Manpower Services" className="eva-logo-small" />
                </Link>
              </div>
            </div>,
            document.body
          )}
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
          controls={false}
          controlsList="nodownload noplaybackrate noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          onContextMenu={blockMediaMenu}
          onError={(e) => {
            console.error("Video failed to load:", e);
            e.currentTarget.style.display = "none";
          }}
        >

            <source src="/hero-eva-bg.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="eva-hero-fallback"></div>
          <div className="eva-hero-content">
            <div className="eva-logo-container">
              <img src="/eva-logo.png" alt="E-VA Brookside - Elite Virtual Assistant Services Philippines" className="eva-logo-hero" />
            </div>
            <h1 className="eva-hero-tagline">Elevate Your Everything</h1>
            <p className="eva-hero-subtitle">E-VA helps businesses cut staffing costs by up to 70% with skilled global talent. Fast hiring in 21 days, no upfront fees.
            </p>

            <div className="eva-hero-buttons">
              <Link to="/eva/inquiry" className="eva-cta-button-secondary">Get Started Today</Link>
            </div>
          </div>
        </section>

                {/* Features Section */}
                <section className="eva-features grid-container" ref={featuresRef} data-aos="fade-in">
          <div className="eva-features-inner">
          <div className="eva-feature-card grid-item">
            <div className="eva-feature-icon">
              <img src="/f1.png" alt="Feature 1" className="eva-feature-image" />
            </div>
            <h3 className="eva-feature-title">Match-making is key</h3>
            <p className="eva-feature-description">
              Find the perfect virtual assistant to elevate your business efficiency and free up your time for what matters most!
            </p>
          </div>

          <div className="eva-feature-card grid-item">
            <div className="eva-feature-icon">
              <img src="/f2.png" alt="Feature 2" className="eva-feature-image" />
            </div>
            <h3 className="eva-feature-title">Skill meets competence</h3>
            <p className="eva-feature-description">
              We have unlocked the secret to providing the best virtual assistance for you and your business.
            </p>
          </div>

          <div className="eva-feature-card grid-item">
            <div className="eva-feature-icon">
              <img src="/f3.png" alt="Feature 3" className="eva-feature-image" />
            </div>
            <h3 className="eva-feature-title">Your work-life balance redefined</h3>
            <p className="eva-feature-description">
              Time is life's greatest commodity and we help to give you more of it!
            </p>
          </div>
          </div>
        </section>

        {/* Services Overview Section */}
        <section className="eva-services-min" id="services" ref={servicesRef}>
          <div className="eva-services-min-container">
            <div className="eva-services-min-header">
              <h2 className="eva-services-min-title">E-VA Services</h2>
              <p className="eva-services-min-subtitle">E-VA provides professional virtual assistant services worldwide, connecting businesses with highly skilled professionals to support daily operations and business growth.
              </p>
            </div>

            <div className="eva-services-min-grid">

              <div className="eva-service-hover">
                <IllustrationImage imageNumber={1} size={220} className="eva-service-icon" />
                <h4>Property Management</h4>
                <p>Complete property administration, tenant coordination, and real estate support.</p>
              </div>

              <div className="eva-service-hover">
                <IllustrationImage imageNumber={2} size={220} className="eva-service-icon" />
                <h4>E-Commerce Operations</h4>
                <p>Order processing, inventory tracking, store updates, and customer support.</p>
              </div>

              <div className="eva-service-hover">
                <IllustrationImage imageNumber={3} size={220} className="eva-service-icon" />
                <h4>Digital Marketing</h4>
                <p>Content scheduling, campaign support, analytics tracking, and brand presence.</p>
              </div>

              <div className="eva-service-hover">
                <IllustrationImage imageNumber={4} size={220} className="eva-service-icon" />
                <h4>Financial Administration</h4>
                <p>Bookkeeping assistance, invoicing, expense tracking, and reports.</p>
              </div>

              <div className="eva-service-hover">
                <IllustrationImage imageNumber={5} size={220} className="eva-service-icon" />
                <h4>Executive Assistance</h4>
                <p>Calendar management, inbox handling, travel coordination, and daily admin tasks.</p>
              </div>

              <div className="eva-service-hover">
                <IllustrationImage imageNumber={6} size={220} className="eva-service-icon" />
                <h4>Customer Service</h4>
                <p>Customer inquiries, follow-ups, live chat, and relationship support.</p>
              </div>
            </div>


            <div className="eva-services-min-cta">
              <Link to="/eva/inquiry" className="eva-hire-button">Hire Here</Link>
            </div>
          </div>
        </section>

{/* Combined Value Proposition & Benefits Section */}
<section className="eva-value-benefits-section" id="clients" ref={valueBenefitsRef}>
  <div className="eva-value-benefits-container">

    {/* Value Proposition */}
    <div className="eva-value-proposition" data-aos="fade-up">
      <div className="eva-value-content">
        <h2 className="eva-value-heading">
        E-VA: More Time.<br />
          <span className="eva-value-highlight">Better Focus. <br />Smarter Support.</span>
        </h2>

        <p className="eva-value-description">
        E-VA provides reliable virtual assistants who work smoothly within your operations, so you can focus on growth, strategy, and results without daily distractions.
        </p>

        <Link
          to="/eva/inquiry"
          className="eva-cta-button-primary"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Start Free Consultation
        </Link>
      </div>

      <div className="eva-value-visual" data-aos="fade-left">
        <div className="eva-value-illustration">
          <img
            src="/eva-value.png"
            alt="E-VA Value Illustration"
            className="value-main-illustration"
            draggable={false}
            onContextMenu={(e) => e.preventDefault()}
            onDragStart={(e) => e.preventDefault()}
          />
        </div>
      </div>
    </div>

    {/* Benefits Header */}
    <div className="eva-benefits-header" data-aos="fade-up">
      <h2 className="eva-benefits-title">What You Gain with <br />E-VA</h2>
      <p className="eva-benefits-subtitle">
        E-VA delivers practical benefits designed to improve how your business runs every day.
      </p>
    </div>

    {/* Benefits Grid */}
    <div className="eva-benefits-showcase">
      <div className="eva-benefits-grid grid-container">

        <div className="eva-benefit-card grid-item">
          <div className="eva-benefit-illustration">
            <IllustrationImage imageNumber={7} size={220} />
            <div className="eva-benefit-illustration-overlay"></div>
          </div>
          <h3 className="eva-benefit-title">More Time Back</h3>
          <p className="eva-benefit-description">
            Delegate repetitive and time-consuming tasks so your schedule stays focused on what truly matters.
          </p>
        </div>

        <div className="eva-benefit-card grid-item">
          <div className="eva-benefit-illustration">
            <IllustrationImage imageNumber={8} size={220} />
            <div className="eva-benefit-illustration-overlay"></div>
          </div>
          <h3 className="eva-benefit-title">Reliable Daily Support</h3>
          <p className="eva-benefit-description">
            Your assistant works as an extension of your team, aligned with your workflow and priorities.
          </p>
        </div>

        <div className="eva-benefit-card grid-item">
          <div className="eva-benefit-illustration">
            <IllustrationImage imageNumber={9} size={220} />
            <div className="eva-benefit-illustration-overlay"></div>
          </div>
          <h3 className="eva-benefit-title">Less Operational Stress</h3>
          <p className="eva-benefit-description">
            Reduce workload pressure while keeping tasks organized, tracked, and consistently handled.
          </p>
        </div>

        <div className="eva-benefit-card grid-item">
          <div className="eva-benefit-illustration">
            <IllustrationImage imageNumber={10} size={220} />
            <div className="eva-benefit-illustration-overlay"></div>
          </div>
          <h3 className="eva-benefit-title">Scalable Support</h3>
          <p className="eva-benefit-description">
            Easily adjust support as your business grows — without restructuring your internal team.
          </p>
        </div>

      </div>
    </div>
  </div>
</section>

{/* Testimonials (Luxury / Corporate) */}
<section className="eva-testimonials-lux" ref={testimonialsRef}>
  <div className="eva-testimonials-lux-container">
    {/* Left */}
    <div className="eva-testimonials-lux-left">
      <img src="/eva-logo.png" alt="E-VA Brookside - Virtual Assistant Philippines" className="eva-testimonials-lux-logo" />
      <div className="eva-testimonials-lux-tagline">ELEVATING LIVES</div>
    </div>

    {/* Right */}
    <div className="eva-testimonials-lux-right">
      <div className="eva-testimonials-lux-card">
        <p className="eva-testimonials-lux-quote">
          "My virtual assistant handles everything from data entry to customer support seamlessly.
          Their range, speed, and discretion have become essential to how we operate."
        </p>
        <div className="eva-testimonials-lux-author">– Lisa T., CEO of a startup</div>
      </div>

      <div className="eva-testimonials-lux-card">
        <p className="eva-testimonials-lux-quote">
          "Working with my virtual assistant has been a genuine upgrade.
          They’re proactive, communicate clearly, and consistently deliver on time without constant follow-ups."
        </p>
        <div className="eva-testimonials-lux-author">– Emily R., Entrepreneur</div>
      </div>

      <div className="eva-testimonials-lux-card">
        <p className="eva-testimonials-lux-quote">
          "I work across time zones, and my VA is dependable when it counts.
          Their flexibility, accountability, and professionalism make them a core part of our workflow."
        </p>
        <div className="eva-testimonials-lux-author">– Leo V., Consultant</div>
      </div>
    </div>
  </div>
</section>


        {/* Call to Action Section */}
        <section className="eva-cta-section" ref={ctaRef}>
          <div className="eva-cta-container" data-aos="fade-in">
            <div className="eva-cta-content">
              <h2 className="eva-cta-heading">Ready to Elevate Your Business with E-VA?</h2>
              <p className="eva-cta-description">
                Get started with E-VA - Free consultation and discover how our elite Filipino virtual assistants can transform your operations. E-VA delivers excellence. No upfront costs, no long-term commitments.
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
                <Link to="/eva/inquiry" className="eva-cta-secondary">Contact Us</Link>
              </div>
            </div>
          </div>
        </section>

                {/* CEO Message Section */}
                <section className="eva-ceo-section" ref={ceoRef}>
          <div className="eva-ceo-container" data-aos="fade-in">
            <div className="eva-ceo-image">
              <img src="/eva-ceo.jpeg" alt="CEO Ethel Ann Cabezas" className="eva-ceo-photo" />
            </div>
            <div className="eva-ceo-content">
              <h2 className="eva-ceo-title">Message from <br/> E-VA CEO</h2>
              <p className="eva-ceo-text">
                In today's fast-paced world, businesses need agile, reliable, and efficient support. That's where E-VA comes in. Whether it's administrative tasks, customer service, marketing, or executive assistance, E-VA's team of dedicated Filipino professionals is here to ensure that you can focus on what truly matters—growing your business.
              </p>
              <p className="eva-ceo-text">
                E-VA takes pride in offering personalized solutions tailored to your unique needs. Our E-VA virtual assistants are not just service providers; they are strategic partners committed to your success. With cutting-edge tools and a passion for excellence, E-VA is here to make your work-life balance a reality.
              </p>
              <div className="eva-ceo-signature">
                <p className="eva-signature-name">ETHEL ANN CABEZAS</p>
                <p className="eva-signature-title">CEO, E-VA</p>
              </div>
            </div>
          </div>
        </section>

        {/* Vision Mission Values Section */}
        <section className="eva-vmv-section" id="about" ref={vmvRef}>
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          className="eva-vmv-video"
          aria-hidden="true"
          controls={false}
          controlsList="nodownload noremoteplayback noplaybackrate"
          disablePictureInPicture
          disableRemotePlayback
          tabIndex={-1}
          onContextMenu={(e) => e.preventDefault()}
          onError={(e) => {
            console.error("VMV Video failed to load:", e);
            e.target.style.display = "none";
          }}
          onLoadStart={() => console.log("VMV Video started loading")}
          onCanPlay={() => console.log("VMV Video can play")}
        >

            <source src="/eva-vmv-bg.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="eva-vmv-content" data-aos="fade-in">
            <div className="eva-vmv-item">
              <h3 className="eva-vmv-title">Vision</h3>
              <p className="eva-vmv-text">E-VA aims to provide elevated support through talent, grit, and passion for literally everything.</p>
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

        {/* General Virtual Assistant Course - Promote & sell */}
        <section className="eva-course-section" id="course">
          <div className="eva-course-content" data-aos="fade-in">
            <h2 className="eva-course-title">General Virtual Assistant Course</h2>
            <p className="eva-course-tagline">Get started on your VA Journey!</p>
            <div className="eva-course-price">
              <span>Get certified for only <strong>P999!</strong></span>
            </div>
            <div className="eva-course-modules">
              <div className="eva-course-module">
                <h4>VA Foundation and Career Awareness</h4>
                <ul>
                  <li>VA Definition</li>
                  <li>Understanding VA Realities</li>
                  <li>Ethical Standards</li>
                  <li>VA Career Paths & Niches</li>
                </ul>
              </div>
              <div className="eva-course-module">
                <h4>Tools, Niches, & Skill Positioning</h4>
                <ul>
                  <li>Common VA Tools Overview</li>
                  <li>Social Media VA Overview</li>
                  <li>Bookkeeping Basics</li>
                  <li>Skill Mapping and Career Strategy</li>
                </ul>
              </div>
              <div className="eva-course-module">
                <h4>Admin Tasks and Daily VA Operations</h4>
                <ul>
                  <li>Admin Task and Workflows</li>
                  <li>Email and Calendar Management</li>
                  <li>Google Workspace Essentials</li>
                  <li>Task and Productivity Tools</li>
                </ul>
              </div>
              <div className="eva-course-module">
                <h4>Resume, Interview, & Career Launch</h4>
                <ul>
                  <li>Resume Preparation</li>
                  <li>Interview Preparation</li>
                  <li>Job-Search</li>
                  <li>30-day Action Plan</li>
                </ul>
              </div>
              <div className="eva-course-module">
                <h4>Communication and Client Handling</h4>
                <ul>
                  <li>Professional Communication</li>
                  <li>Client Handling</li>
                  <li>Reporting and Handling</li>
                  <li>Accountability</li>
                </ul>
              </div>
            </div>
            <p className="eva-course-cta-text">Secure your spot in the E-VA Course Program. Complete the enrollment form and our team will be in touch.</p>
            <a
              href={EVA_COURSE_ENROLLMENT_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="eva-course-cta-button"
            >
              Enroll Now
            </a>
            <p className="eva-course-cta-text eva-course-cta-secondary">Have questions? Message us on Facebook.</p>
            <a
              href="https://www.facebook.com/profile.php?id=61560528418956"
              target="_blank"
              rel="noopener noreferrer"
              className="eva-course-cta-button eva-course-cta-button-outline"
            >
              Message on Facebook
            </a>
            <div className="eva-course-social">
              <span className="eva-course-social-label">Follow Brookside Manpower:</span>
              <div className="eva-course-social-icons">
                <a href="https://www.facebook.com/profile.php?id=61560528418956" target="_blank" rel="noopener noreferrer" className="eva-course-social-icon" aria-label="Brookside Manpower Facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="https://www.linkedin.com/company/brookside-manpower-services" target="_blank" rel="noopener noreferrer" className="eva-course-social-icon" aria-label="Brookside Manpower LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="https://www.tiktok.com/@brooksidemps" target="_blank" rel="noopener noreferrer" className="eva-course-social-icon" aria-label="Brookside Manpower TikTok">
                  <i className="fab fa-tiktok"></i>
                </a>
              </div>
            </div>
          </div>
        </section>

       {/* Apply Section - Ready to get hired & trained */}
        <section className="eva-apply-section" id="apply">
          <div className="eva-apply-content" data-aos="fade-in">
            <h2 className="eva-apply-heading">
              <span className="eva-apply-heading-line1">Ready to get</span>
              <span className="eva-apply-heading-line2">trained & hired?</span>
            </h2>

            <a
              href={EVA_COURSE_ENROLLMENT_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="eva-apply-button"
            >
              Apply Now
            </a>

            <div className="eva-categories">
              <div className="eva-category-box"><span>REAL ESTATE</span></div>
              <div className="eva-category-box"><span>DIGITAL MARKETING</span></div>
              <div className="eva-category-box"><span>CUSTOMER SERVICE</span></div>
              <div className="eva-category-box"><span>EXECUTIVE ASSISTANCE</span></div>
              <div className="eva-category-box"><span>E-COMMERCE OPERATIONS</span></div>
              <div className="eva-category-box"><span>FINANCIAL ADMINISTRATION</span></div>
              <div className="eva-category-box"><span>PROPERTY MANAGEMENT</span></div>
              <div className="eva-category-box"><span>GENERAL ADMIN SUPPORT</span></div>
            </div>
          </div>
        </section>


        {/* Contact Section */}
        <section className="eva-contact" id="contact">
          <div className="eva-contact-header" data-aos="fade-in">
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
                  <a href={`mailto:${`eva@brooksidemanpower.com`}`} className="eva-contact-link" aria-label="Contact EVA Brookside at eva@brooksidemanpower.com">
                    {['eva', '@', 'brooksidemanpower.com'].join('')}
                  </a>
                  <br />
                  <span style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)' }}>E-VA Virtual Assistant Philippines</span>
                </p>
              </div>
              <div className="eva-contact-item">
                <h3 className="eva-contact-label">Social</h3>
                <div className="eva-social-icons">
                  <a href="https://www.facebook.com/profile.php?id=61560528418956" target="_blank" rel="noopener noreferrer" className="eva-social-icon" aria-label="Brookside Manpower Facebook">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="https://www.linkedin.com/company/brookside-manpower-services" target="_blank" rel="noopener noreferrer" className="eva-social-icon" aria-label="Brookside Manpower LinkedIn">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="https://www.tiktok.com/@brooksidemps" target="_blank" rel="noopener noreferrer" className="eva-social-icon" aria-label="Brookside Manpower TikTok">
                    <i className="fab fa-tiktok"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <footer className="eva-footer">
          <div className="eva-footer-content">
            <p className="eva-footer-text">
              &copy; {new Date().getFullYear()} E-VA by Brookside Manpower Services. All Rights Reserved.
            </p>
            <div className="eva-footer-links">
              <Link to="/privacy-policy" className="eva-footer-link">Privacy Policy</Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

export default Eva;
