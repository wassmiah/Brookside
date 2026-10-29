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
  { src: "/A7405901.png", alt: "Finance Virtual Assistant", title: "Finance Virtual Assistant", caption: "Bookkeeping, reporting and financial administration." },
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

    // Why EVA scroll transitions — same staggered fade-up pattern as VMV
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const whyObserverOptions = {
      threshold: isMobileDevice ? 0.01 : 0.2,
      rootMargin: isMobileDevice ? '200px 0px 0px 0px' : '0px'
    };

    const whyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const whyItems = entry.target.querySelectorAll('.eva-why-reveal');
          whyItems.forEach((item, index) => {
            if (reduceMotion) {
              item.classList.add('animate-in');
              return;
            }
            setTimeout(() => {
              item.classList.add('animate-in');
            }, index * 200);
          });
          whyObserver.unobserve(entry.target);
        }
      });
    }, whyObserverOptions);

    if (vmvRef.current) {
      whyObserver.observe(vmvRef.current);
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
      whyObserver.disconnect();
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
              <img src="/eva-hero.png" alt="EVA Brookside - Executive Virtual Assistant Services" className="eva-logo-hero" />
            </div>
            <h1 className="eva-hero-tagline">
              Your AI{"\u2011"}Fluent Assistant.
            </h1>
            <p className="eva-hero-subtitle">
              Work smarter with trained, AI-fluent virtual assistants backed by Brookside, the #1 Philippines’ premier talent agencies.
            </p>
            <div className="eva-hero-buttons">
              <Link to={getEvaUrl("/inquiry")} className="eva-hero-cta eva-hero-cta-primary">Get Your AI-Ready Assistant</Link>
            </div>
          </div>
        </section>

        <section className="eva-g-talent eva-why-section" id="about" ref={vmvRef}>
          <div className="eva-why-atmosphere" aria-hidden="true">
            <svg className="eva-why-orbits" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
              <defs>
                <linearGradient id="evaWhyStroke" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#A78BFA" stopOpacity="0" />
                  <stop offset="45%" stopColor="#A78BFA" stopOpacity="0.55" />
                  <stop offset="100%" stopColor="#93C5FD" stopOpacity="0" />
                </linearGradient>
              </defs>
              <ellipse cx="720" cy="390" rx="640" ry="220" fill="none" stroke="url(#evaWhyStroke)" strokeWidth="1.25" />
              <ellipse cx="760" cy="450" rx="500" ry="168" fill="none" stroke="url(#evaWhyStroke)" strokeWidth="1" transform="rotate(-12 760 450)" />
              <path d="M-60 640 C 240 520, 480 780, 820 650 S 1240 480, 1520 700" fill="none" stroke="url(#evaWhyStroke)" strokeWidth="1.4" />
              <path d="M-40 160 C 280 280, 620 40, 960 150 S 1280 300, 1520 120" fill="none" stroke="#A78BFA" strokeOpacity="0.28" strokeWidth="1.15" />
            </svg>
          </div>

          <div className="eva-why-top">
            <div className="eva-why-container eva-why-reveal">
              <p className="eva-why-eyebrow">
                <span>Why</span>
                <img src="/eva-nav-logo.png" alt="EVA" className="eva-why-eyebrow-logo" />
                <span>?</span>
              </p>
              <h2 className="eva-why-headline">
                <span>AI Fluency</span>
                <span className="eva-why-and">and</span>
                <a href={brooksideHome} className="eva-fluency-brookside" aria-label="Brookside website">
                  <img src="/logo-white.png" alt="Brookside" />
                </a>
              </h2>
              <p className="eva-why-lead">
                EVA’s advantage is AI fluency and Brookside — assistants trained to use AI in real work, supported by Brookside’s professional talent.
              </p>
            </div>
          </div>

          <div className="eva-why-middle">
            <div className="eva-why-container">
              <div className="eva-why-reveal">
                <h3 className="eva-fluency-name">AI Fluency</h3>
                <p className="eva-why-subhead">AI Skills Applied to Real Work.</p>
                <p className="eva-fluency-detail">
                  Practical AI knowledge applied to research, reporting, communication, and everyday workflows, with human judgment guiding every result.
                </p>
              </div>
              <div className="eva-g-points" id="ai-fluent">
                <article className="eva-why-reveal">
                  <h2>Practical AI Training</h2>
                  <p>Assistants trained to apply AI tools to everyday business tasks.</p>
                </article>
                <article className="eva-why-reveal">
                  <h2>Skills That Fit Your Business</h2>
                  <p>Experienced professionals matched to your needs, with AI fluency that adds value to their existing expertise.</p>
                </article>
                <article className="eva-why-reveal">
                  <h2>Smarter Workflows</h2>
                  <p>Reduce repetitive work and improve productivity through AI-assisted processes and human oversight.</p>
                </article>
              </div>
            </div>
          </div>
        </section>

        {/* Partners Section */}
        <section className="eva-partners-section" id="brookside-partnership" ref={partnersRef}>
          <div className="eva-partners-atmosphere" aria-hidden="true">
            <svg className="eva-partners-orbits" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
              <defs>
                <linearGradient id="evaPartnersStroke" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#A78BFA" stopOpacity="0.34" />
                  <stop offset="55%" stopColor="#7DD3FC" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.05" />
                </linearGradient>
              </defs>
              <ellipse cx="180" cy="140" rx="420" ry="180" fill="none" stroke="url(#evaPartnersStroke)" strokeWidth="1.2" />
              <ellipse cx="1260" cy="760" rx="460" ry="210" fill="none" stroke="url(#evaPartnersStroke)" strokeWidth="1.1" />
              <path d="M-40 520 C 220 420, 420 680, 720 560 S 1180 420, 1520 580" fill="none" stroke="url(#evaPartnersStroke)" strokeWidth="1.15" />
            </svg>
          </div>
          <div className="eva-partners-container">
            <div className="eva-brookside-banner">
              <img src="/logo-white.png" alt="Brookside Manpower Services" className="eva-brookside-logo" />
            </div>
            <div className="eva-brookside-compact">
              <h3>
                <span className="eva-brookside-eva">EVA</span> is supported by Brookside Manpower Services, the #1 Philippine workforce solutions provider with experience in recruiting, screening, and managing professional talent.
              </h3>
              <a href={brooksideHome} className="eva-brookside-cta">
                Discover Brookside
                <span aria-hidden="true">→</span>
              </a>
            </div>

            <div className="eva-training">
              <p className="eva-training-label">Trained Talents By Brookside</p>
              <div className="eva-training-grid">
                <img src="/eva-team-1.jpg" alt="Brookside team with training certificates" />
                <img src="/A7407654.jpg" alt="Virtual assistants in a Brookside training session" />
                <img src="/eva-team-4.jpg" alt="Brookside trainer leading a session" />
                <img src="/eva-team-6.jpg" alt="EVA Brookside virtual training session" />
              </div>
            </div>

            <div className="eva-partners-stage">
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
                <a href={brooksidePartners} className="eva-partners-view-link">
                  View Brookside partners
                  <span aria-hidden="true">→</span>
                </a>
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
          </div>
        </section>

        <section className="eva-ceo-section" ref={ceoRef} id="eva-ceo">
          <div className="eva-ceo-container">
            <div className="eva-ceo-image">
              <img src="/A74061642.png" alt="CEO Marc Catubay" className="eva-ceo-photo" />
            </div>
            <div className="eva-ceo-content">
              <h2 className="eva-ceo-title">Message from <br/> <span className="eva-ceo-mark">EVA CEO</span></h2>
              <p className="eva-ceo-text">
                In today&apos;s fast-paced world, businesses need agile, reliable, and efficient support. That&apos;s where EVA comes in. Whether it&apos;s administrative tasks, customer service, marketing, or executive assistance, EVA&apos;s team of dedicated professionals is here to ensure that you can focus on what truly matters: growing your business.
              </p>
              <p className="eva-ceo-text">
                EVA takes pride in offering personalized solutions tailored to your unique needs. Our EVA virtual assistants are not just service providers; they are strategic partners committed to your success. With cutting-edge tools and a passion for excellence, EVA is here to make your work-life balance a reality.
              </p>
              <div className="eva-ceo-signature">
                <p className="eva-signature-name">MARC CATUBAY</p>
                <p className="eva-signature-title">CEO, EVA</p>
                <p className="eva-ceo-origin">From <span>Las Vegas, Nevada, USA</span></p>
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
            <div className="eva-g-close-inner" id="book">
              <div>
                <h2>Your Next Great Hire Starts Here.</h2>
                <p>Need specialized support? Let&apos;s find an AI-fluent assistant who fits the way your business works.</p>
              </div>
              <BookingCta interest="discovery" purpose="discovery" className="eva-btn eva-btn-primary">
                Book a Discovery Call
              </BookingCta>
            </div>
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

        <section className="eva-features grid-container" id="how-it-works" ref={featuresRef}>
          <div className="eva-g-head">
            <h2>What You Gain with EVA</h2>
          </div>
          <div className="eva-features-inner">
            <div className="eva-feature-card grid-item">
              <div className="eva-feature-icon">
                <img src="/f1.png" alt="" className="eva-feature-image" />
              </div>
              <h3 className="eva-feature-title">Match-making is key</h3>
              <p className="eva-feature-description">
                Find the perfect virtual assistant to elevate your business efficiency and free up your time for what matters most!
              </p>
            </div>
            <div className="eva-feature-card grid-item">
              <div className="eva-feature-icon">
                <img src="/f2.png" alt="" className="eva-feature-image" />
              </div>
              <h3 className="eva-feature-title">Skill meets competence</h3>
              <p className="eva-feature-description">
                We have unlocked the secret to providing the best virtual assistance for you and your business.
              </p>
            </div>
            <div className="eva-feature-card grid-item">
              <div className="eva-feature-icon">
                <img src="/f3.png" alt="" className="eva-feature-image" />
              </div>
              <h3 className="eva-feature-title">Your work-life balance redefined</h3>
              <p className="eva-feature-description">
                Time is life&apos;s greatest commodity and we help to give you more of it!
              </p>
            </div>
          </div>
        </section>

        <section className="eva-value-benefits-section eva-more-time" id="clients" ref={valueBenefitsRef}>
          <div className="eva-value-benefits-container">
            <div className="eva-value-proposition">
              <div className="eva-value-content">
                <h2 className="eva-value-heading">
                  More Time.<br />
                  <span className="eva-value-highlight">Better Focus. <br />Smarter Support.</span>
                </h2>
                <p className="eva-value-description">
                  With EVA, we provide reliable virtual assistants to support your operations in helping your business develop and achieve results without interruption.
                </p>
                <Link to={getEvaUrl("/inquiry")} className="eva-cta-button-primary">
                  Start Free Consultation
                </Link>
              </div>
              <div className="eva-value-visual">
                <div className="eva-value-illustration">
                  <img
                    src="/eva-value.png"
                    alt="EVA virtual assistants at work"
                    className="value-main-illustration"
                    draggable={false}
                    onContextMenu={(e) => e.preventDefault()}
                    onDragStart={(e) => e.preventDefault()}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="eva-contact" id="contact">
          <h2 className="eva-contact-title">Contact Us</h2>
          <div className="eva-contact-offices">
            <article className="eva-contact-office">
              <img src="/manila.jpg" alt="" className="eva-contact-photo" />
              <div className="eva-contact-panel">
                <h3 className="eva-contact-region">Philippines</h3>
                <p className="eva-contact-label">Paranaque Office</p>
                <p className="eva-contact-value">
                  <a href="tel:+63270019493" className="eva-contact-link">(02) 7001 9493</a>
                </p>
                <p className="eva-contact-value">
                  <a href="tel:+639171578874" className="eva-contact-link">+63 917 157 8874</a>
                </p>
                <p className="eva-contact-value">
                  <a href="mailto:executiveoffice@brooksidemanpower.com" className="eva-contact-link">
                    executiveoffice@brooksidemanpower.com
                  </a>
                </p>
              </div>
            </article>
            <article className="eva-contact-office">
              <img src="/nevada.jpg" alt="" className="eva-contact-photo" />
              <div className="eva-contact-panel">
                <h3 className="eva-contact-region">USA</h3>
                <p className="eva-contact-label">Las Vegas Office</p>
                <p className="eva-contact-value">
                  <a href="tel:+15629395900" className="eva-contact-link">+1 (562) 939-5900</a>
                </p>
                <p className="eva-contact-value">
                  <a href="mailto:eva@brooksidemanpower.com" className="eva-contact-link">
                    eva@brooksidemanpower.com
                  </a>
                </p>
              </div>
            </article>
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
