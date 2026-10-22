import React, { useEffect, useRef, useState } from "react";
import { motion, useMotionValue } from "framer-motion";
import { Link } from "react-router-dom";
import "./Eva.css";
import "./EvaGlobal.css";
import AOS from "aos";
import "aos/dist/aos.css";
import SEO from "../components/SEO";
import { getBrooksideUrl, getEvaUrl } from "../utils/siteLinks";
import SocialLinks from "../components/SocialLinks";
import { EVA_PILOT, EVA_PLANS } from "../config/evaPricing";
import BookingCta from "../eva/BookingCta";
import PilotBanner from "../eva/PilotBanner";
import PricingCards from "../eva/PricingCards";
import EvaAudienceBar from "../components/EvaAudienceBar";

const blockMediaMenu = (event) => {
  event.preventDefault();
};

/** Employee carousel images – add images to /public (eva-team-1.jpg, etc.) */
const EVA_EMPLOYEE_IMAGES = [
  { src: "/A7406397.jpg", alt: "Executive Virtual Assistant", title: "Executive Virtual Assistant", caption: "Administrative support, scheduling and business coordination." },
  { src: "/A7407707.jpg", alt: "Marketing Virtual Assistant", title: "Marketing Virtual Assistant", caption: "Social media, content and digital marketing support." },
  { src: "/A7405901.jpg", alt: "Finance Virtual Assistant", title: "Finance Virtual Assistant", caption: "Bookkeeping, reporting and financial administration." },
  { src: "/A7405770.jpg", alt: "EVA team collaboration", title: "Team collaboration", caption: "Professionals working together across time zones." },
  { src: "/A7406858.jpg", alt: "Remote-work environment", title: "Remote-ready talent", caption: "Dedicated setups for focused virtual support." },
  { src: "/A7407768.jpg", alt: "EVA team member", title: "Professional lifestyle", caption: "Human, international, and ready to represent your brand." },
  { src: "/A7406756.jpg", alt: "EVA team member", title: "Operations support", caption: "Day-to-day coordination that keeps businesses moving." },
  { src: "/A7404803.JPG", alt: "EVA team member", title: "Client-facing support", caption: "Communication and follow-through with a 5-star standard." },
  { src: "/A7407815.jpg", alt: "EVA team member", title: "Specialized assistance", caption: "Skills matched to the work, not a generic seat." },
];

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 10;
const DRAG_BUFFER = 50;
const CAROUSEL_SPRING_OPTIONS = {
  type: "spring",
  mass: 3,
  damping: 50,
};

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

function EvaGlobal() {
  const brooksideHome = getBrooksideUrl("/");
  const brooksidePartners = getBrooksideUrl("/#partners");
  const vmvRef = useRef(null);
  const servicesRef = useRef(null);
  const featuresRef = useRef(null);
  const valueBenefitsRef = useRef(null);
  const ceoRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);
  const partnersRef = useRef(null);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const dragX = useMotionValue(0);
  // Employee carousel autoplay (Aceternity swipe logic)
  useEffect(() => {
    if (EVA_EMPLOYEE_IMAGES.length <= 1) return;
    const interval = setInterval(() => {
      const x = dragX.get();
      if (Math.abs(x) < 0.5) {
        setCarouselIndex((prev) => (prev + 1) % EVA_EMPLOYEE_IMAGES.length);
      }
    }, AUTO_DELAY);
    return () => clearInterval(interval);
  }, [dragX]);

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
      const allSections = document.querySelectorAll('.eva-services-min, .eva-features, .eva-value-benefits-section, .eva-partners-section, .eva-ceo-section, .eva-testimonials-lux, .eva-cta-section');
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
    const sections = [servicesRef, featuresRef, valueBenefitsRef, partnersRef, ceoRef, testimonialsRef, ctaRef];
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
        const allSections = document.querySelectorAll('.eva-services-min:not(.section-visible), .eva-features:not(.section-visible), .eva-value-benefits-section:not(.section-visible), .eva-partners-section:not(.section-visible), .eva-ceo-section:not(.section-visible), .eva-testimonials-lux:not(.section-visible), .eva-cta-section:not(.section-visible)');
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
        '.eva-services-min, .eva-features, .eva-value-benefits-section, .eva-partners-section, .eva-testimonials-lux, .eva-cta-section'
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

  const showPrevEmployee = () => {
    if (EVA_EMPLOYEE_IMAGES.length <= 1) return;
    setCarouselIndex((prev) => (prev - 1 + EVA_EMPLOYEE_IMAGES.length) % EVA_EMPLOYEE_IMAGES.length);
  };

  const showNextEmployee = () => {
    if (EVA_EMPLOYEE_IMAGES.length <= 1) return;
    setCarouselIndex((prev) => (prev + 1) % EVA_EMPLOYEE_IMAGES.length);
  };

  const onEmployeeDragEnd = () => {
    const x = dragX.get();
    if (x <= -DRAG_BUFFER && carouselIndex < EVA_EMPLOYEE_IMAGES.length - 1) {
      setCarouselIndex((prev) => prev + 1);
    } else if (x >= DRAG_BUFFER && carouselIndex > 0) {
      setCarouselIndex((prev) => prev - 1);
    }
  };

  return (
    <>
      <SEO
        title="EVA by Brookside Manpower Services | Executive Virtual Assistant"
        description="EVA Brookside provides executive virtual assistant services from the Philippines, helping businesses scale with reliable remote support and fast hiring."
        keywords="eva brookside, eva virtual assistant, eva ph, eva philippines, eva virtual assistant philippines, eva brooksidemps, eva brookside, eva virtual assistant, eva philippines, virtual assistant philippines, philippines virtual assistant, remote staffing philippines, virtual assistant services philippines, eva brookside manpower, brookside eva, eva va philippines, virtual assistant ph, va services philippines, executive virtual assistant philippines, professional virtual assistant philippines"
        ogImage="/eva-logo.png"
        ogImageWidth={1200}
        ogImageHeight={630}
        ogImageAlt="EVA Brookside - Managed Virtual Assistant Solutions"
        canonicalUrl="/eva"
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            "name": "EVA Brookside - Executive Virtual Assistant Services",
            "alternateName": ["EVA PH", "EVA Philippines", "EVA Brookside Manpower"],
            "description": "EVA by Brookside Manpower Services is a managed virtual assistant solutions provider dedicated to reducing operational costs, improving efficiency, and creating scalable support systems for growing businesses. As labor expenses rise, businesses need structured, cost-effective support without sacrificing quality. EVA delivers reliable support that reduces overhead, manages customer communication, and frees business owners to focus on growth. Services include managed VA placement, team support solutions, scalable workforce options, training and development, and performance monitoring.",
            "provider": {
              "@type": "Organization",
              "name": "Brookside Manpower Services",
              "alternateName": "EVA Brookside",
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
              "name": "EVA Services",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Property Management Support",
                    "description": "EVA services for property management"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "E-Commerce Operations",
                    "description": "EVA Philippines virtual assistant for e-commerce support"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Digital Marketing Support",
                    "description": "EVA Brookside virtual assistant for digital marketing"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Financial Administration",
                    "description": "EVA PH virtual assistant for financial administration"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Executive Assistance",
                    "description": "EVA Philippines for executive support"
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
                "name": "What is EVA Brookside?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "EVA by Brookside Manpower Services is a managed virtual assistant solutions provider dedicated to reducing operational costs, improving efficiency, and creating scalable support for growing businesses. EVA delivers structured, reliable support systems that enhance productivity and drive success."
                }
              },
              {
                "@type": "Question",
                "name": "What is EVA?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "EVA is a managed virtual assistant service by Brookside Manpower Services. With rising compensation costs and operational overload, businesses need virtual assistants to reduce overhead, manage customer communication, and free owners to focus on growth. EVA provides structured, reliable support with skills-based matching, managed team solutions, and scalable workforce options."
                }
              },
              {
                "@type": "Question",
                "name": "What is EVA PH?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "EVA PH is EVA Philippines, a managed virtual assistant solutions provider based in Metro Manila. EVA PH offers cost-effective remote staffing to help businesses reduce overhead and scale operations without sacrificing quality."
                }
              },
              {
                "@type": "Question",
                "name": "How much does EVA Brookside virtual assistant cost?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "EVA offers cost-effective virtual assistant services designed to reduce operational costs for growing businesses. Contact EVA at eva@brooksidemanpower.com or visit eva.brooksidemps.com for a free consultation and customized pricing."
                }
              },
              {
                "@type": "Question",
                "name": "Where is EVA Philippines located?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "EVA Philippines is located at Unit 704C, Tower 3, PITX Building, 1 Kennedy Road, Paranaque City, Metro Manila, Philippines. EVA serves clients globally while operating from the Philippines."
                }
              },
              {
                "@type": "Question",
                "name": "How do I hire an EVA Brookside virtual assistant?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "To hire an EVA Brookside virtual assistant, visit eva.brooksidemps.com and fill out the inquiry form. EVA offers free consultations and customized staffing solutions. Contact eva@brooksidemanpower.com or call +63 917 157 8874."
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
                "name": "EVA",
                "item": "https://brooksidemps.com/eva"
              }
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "EVA Brookside - Executive Virtual Assistant Services Philippines",
            "description": "EVA by Brookside provides managed virtual assistant solutions that reduce operational costs, improve efficiency, and create scalable support for growing businesses.",
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

      <div className="eva-page eva-global">
        <EvaAudienceBar />
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
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          >
            <source src="/hero-eva-bg.mp4" type="video/mp4" />
          </video>
          <div className="eva-hero-fallback"></div>
          <div className="eva-hero-content">
            <div className="eva-logo-container">
              <img src="/eva-logo.png" alt="EVA Brookside - Executive Virtual Assistant Services" className="eva-logo-hero" />
            </div>
            <h1 className="eva-hero-tagline">
              Your AI-Fluent Assistant.
            </h1>
            <p className="eva-hero-subtitle">
              Work smarter with trained, AI-fluent virtual assistants backed by Brookside, the #1 Philippines’ premier talent agencies.
            </p>
            <div className="eva-hero-buttons">
              <Link to={getEvaUrl("/inquiry")} className="eva-hero-cta eva-hero-cta-primary">Get Your AI-Ready Assistant</Link>
            </div>
          </div>
        </section>

                {/* Features Section */}
                <section className="eva-features grid-container" id="how-it-works" ref={featuresRef} data-aos="fade-in">
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

        <section className="eva-g-talent" id="about" ref={vmvRef}>
          <div className="eva-g-wrap">
            <header className="eva-g-head">
              <p className="eva-signature-title">Why EVA</p>
              <h2>AI-Fluent Assistants. Smarter Talent. Stronger Business.</h2>
            </header>
            <div className="eva-g-points" id="ai-fluent">
              <article>
                <h3>Talent Matching</h3>
                <p>Accurate talent matching powered by ASEAMETRICS.</p>
              </article>
              <article>
                <h3>AI-Trained. Human-Led.</h3>
                <p>Directly trained and overseen by a dedicated AI trainer.</p>
              </article>
              <article>
                <h3>Backed by Brookside</h3>
                <p>Services for top brands and companies in the Philippines.</p>
              </article>
            </div>
          </div>
        </section>

        <section className="eva-ceo-section" ref={ceoRef} id="eva-ceo">
          <div className="eva-ceo-container" data-aos="fade-in">
            <div className="eva-ceo-image">
              <img src="/A7406164.jpg" alt="CEO Marc Catubay" className="eva-ceo-photo" />
            </div>
            <div className="eva-ceo-content">
              <h2 className="eva-ceo-title">Message from <br/> EVA CEO</h2>
              <p className="eva-ceo-text">
                In today&apos;s fast-paced world, businesses need agile, reliable, and efficient support. That&apos;s where EVA comes in. Whether it&apos;s administrative tasks, customer service, marketing, or executive assistance, EVA&apos;s team of dedicated professionals is here to ensure that you can focus on what truly matters: growing your business.
              </p>
              <p className="eva-ceo-text">
                EVA takes pride in offering personalized solutions tailored to your unique needs. Our EVA virtual assistants are not just service providers; they are strategic partners committed to your success. With cutting-edge tools and a passion for excellence, EVA is here to make your work-life balance a reality.
              </p>
              <div className="eva-ceo-signature">
                <p className="eva-signature-name">MARC CATUBAY</p>
                <p className="eva-signature-title">CEO, EVA</p>
              </div>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="eva-partners-section" id="brookside-partnership" ref={partnersRef}>
          <div className="eva-partners-container">
            <div className="eva-brookside-compact">
              <img src="/logo-white.png" alt="Brookside Manpower Services" className="eva-brookside-logo" />
              <h2>Premium Talent.</h2>
              <p>
                EVA is supported by Brookside Manpower Services Inc., the #1 Philippine workforce solutions provider with experience in recruiting, screening, and managing professional talent.
              </p>
              <a href={brooksideHome} className="eva-text-link">Discover Brookside</a>
            </div>

            <figure className="eva-partners-collage">
              <div className="eva-partners-frame">
                <img
                  src="/partners-group.png"
                  alt="Brands served by Brookside, including West Side City"
                  width="1494"
                  height="634"
                  loading="lazy"
                />
              </div>
              <a href={brooksidePartners} className="eva-text-link">View Brookside partners</a>
            </figure>

            <div className="eva-partners-carousel-wrap">
              <div className="eva-partners-carousel">
                <button
                  type="button"
                  className="eva-partners-carousel-nav eva-partners-carousel-nav-prev"
                  onClick={showPrevEmployee}
                  aria-label="Previous team image"
                >
                  ‹
                </button>
                <motion.div
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  style={{ x: dragX }}
                  animate={{ translateX: `-${carouselIndex * 100}%` }}
                  transition={CAROUSEL_SPRING_OPTIONS}
                  onDragEnd={onEmployeeDragEnd}
                  className="eva-partners-carousel-track"
                >
                  {EVA_EMPLOYEE_IMAGES.map((img, idx) => (
                    <motion.div
                      key={idx}
                      className="eva-partners-carousel-slide"
                      animate={{ scale: 1 }}
                      transition={CAROUSEL_SPRING_OPTIONS}
                    >
                      <div className="eva-partners-carousel-frame">
                        <img
                          src={img.src}
                          alt={img.alt}
                          className="eva-partners-carousel-img"
                          onError={(e) => {
                            e.target.style.display = "none";
                            const slide = e.target.closest(".eva-partners-carousel-slide");
                            if (slide) slide.classList.add("eva-partners-slide-fallback");
                          }}
                        />
                      </div>
                      {img.title && (
                        <div className="eva-va-caption">
                          <strong>{img.title}</strong>
                          <span>{img.caption}</span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
                <button
                  type="button"
                  className="eva-partners-carousel-nav eva-partners-carousel-nav-next"
                  onClick={showNextEmployee}
                  aria-label="Next team image"
                >
                  ›
                </button>
                <div className="eva-partners-carousel-gradient-edge eva-partners-carousel-gradient-left" />
                <div className="eva-partners-carousel-gradient-edge eva-partners-carousel-gradient-right" />
              </div>
              <div className="eva-partners-carousel-dots">
                  {EVA_EMPLOYEE_IMAGES.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`eva-partners-dot ${carouselIndex === idx ? "active" : ""}`}
                      onClick={() => setCarouselIndex(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
              </div>
            </div>
          </div>
        </section>

        <section className="eva-pricing-section" id="elevate">
          <div className="eva-section-inner">
            <header className="eva-section-head">
              <h2>Find the Right Support for Your Business</h2>
            </header>
            <PilotBanner pilot={EVA_PILOT} />
            <PricingCards plans={EVA_PLANS} />
            <p className="eva-price-note">*prices may vary depending on your business needs.</p>
          </div>
        </section>

        <section className="eva-g-close" id="book">
          <div className="eva-g-close-inner">
            <div>
              <h2>Your Next Great Hire Starts Here.</h2>
              <p>Need specialized support? Let&apos;s find an AI-fluent assistant who fits the way your business works.</p>
            </div>
            <BookingCta interest="discovery" purpose="discovery" className="eva-btn eva-btn-primary">
              Book a Discovery Call
            </BookingCta>
          </div>
        </section>

        {/* Services Overview Section */}
        <section className="eva-services-min" id="talent" ref={servicesRef}>
          <div className="eva-services-min-container">
            <div className="eva-services-min-header">
              <h2 className="eva-services-min-title">EVA Services</h2>
              <p className="eva-services-min-subtitle">EVA provides professional virtual assistant services worldwide, connecting businesses with highly skilled professionals to support daily operations and business growth.
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
      More Time.<br />
          <span className="eva-value-highlight">Better Focus. <br />Smarter Support.</span>
        </h2>

        <p className="eva-value-description">
        With EVA, we provide reliable virtual assistants to support your operations in helping your business develop and achieve results without interruption.       
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
            alt="EVA Value Illustration"
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
      <h2 className="eva-benefits-title">What You Gain with <br />EVA</h2>
      <p className="eva-benefits-subtitle">
        EVA delivers practical benefits designed to improve how your business runs every day.
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
            Easily adjust support as your business grows without restructuring your internal team.
          </p>
        </div>

      </div>
    </div>
  </div>
</section>


        {/* Contact Section */}
        <section className="eva-contact" id="contact">
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
                </p>
              </div>
            </div>
          </div>
        </section>

        <footer className="eva-footer">
          <div className="eva-footer-grid">
            <div>
              <img src="/eva-nav-logo.png" alt="EVA" className="eva-footer-logo" />
              <p>Trained, AI-fluent virtual assistants for growing businesses, supported by Brookside Manpower Services.</p>
            </div>
            <div>
              <p className="eva-footer-label">Explore</p>
              <a href="#home">Home</a>
              <a href="#about">Why EVA</a>
              <a href="#how-it-works">How It Works</a>
              <a href="#talent">Talent</a>
              <a href="#elevate">Pricing</a>
              <a href="#book">Book a Call</a>
              <a href={getEvaUrl("/inquiry")}>Contact</a>
            </div>
            <div>
              <p className="eva-footer-label">Contact</p>
              <p>Unit 704C, Tower 3, PITX Building, 1 Kennedy Road, Barangay Tambo, Paranaque City, 1701 Metro Manila</p>
              <p>(02) 7001 9493</p>
              <p>+63 917 157 8874</p>
              <a href="mailto:eva@brooksidemanpower.com">eva@brooksidemanpower.com</a>
            </div>
            <div>
              <p className="eva-footer-label">Brookside</p>
              <a href={brooksideHome}>Brookside website</a>
              <a href={brooksidePartners}>Brookside partners</a>
              <SocialLinks className="eva-footer-social" linkClassName="eva-footer-social-link" />
              <Link to="/privacy-policy">Privacy Policy</Link>
            </div>
          </div>
          <p className="eva-footer-text">
            &copy; {new Date().getFullYear()} EVA by Brookside Manpower Services. All Rights Reserved.
          </p>
        </footer>
      </div>
    </>
  );
}

export default EvaGlobal;
