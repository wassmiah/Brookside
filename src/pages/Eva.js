import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, useMotionValue } from "framer-motion";
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

/** EVA Course Enrollment Form (Google Forms) – public viewform URL */
const EVA_COURSE_ENROLLMENT_FORM_URL = "https://docs.google.com/forms/d/1XUtZKtciUOggybHo6zSpsrH8o5sUf4RXaXNo4CJj9Pk/viewform";

/** Partners by category. Use logo placeholder paths; replace with actual images in /public/partners/ */
const EVA_PARTNER_CATEGORIES = [
  {
    id: "dining",
    title: "Upscale Restaurants",
    partners: [
      { name: "Osteria Antica", description: "Italian trattoria", logo: "/partners/osteria-antica.png" },
      { name: "Kei Maki", description: "Japanese sushi bar", logo: "/partners/kei-maki.png" },
      { name: "Wildflour Restaurant", description: "Upscale restaurant", logo: "/partners/wild-flour.png" },
      { name: "George and Onnie's", description: "Filipino comfort food", logo: "/partners/george-onnies.png" },
      { name: "Farmacy", description: "American diner", logo: "/partners/farmacy.png" },
      { name: "Pizza Sisters", description: "Neapolitan pizzeria", logo: "/partners/pizza-sisters.png" },
      { name: "Pink's", description: "Gourmet hotdogs", logo: "/partners/pinks.png" },
    ],
  },
  {
    id: "combined-row",
    title: "",
    singleRow: true,
    categories: [
      {
        id: "resorts",
        title: "Integrated Hotels & Resorts",
        shortLabel: "Hotels & Resorts",
        partners: [
          { name: "West Side City", description: "Integrated hotel and resort", logo: "/partners/west-side-city.png" },
        ],
      },
      {
        id: "catering",
        title: "Catering & Events",
        shortLabel: "Catering",
        partners: [
          { name: "Josiah Catering", description: "Wedding and catering events", logo: "/partners/josiah-catering.png" },
        ],
      },
      {
        id: "sports-gaming",
        title: "Sports & Gaming",
        shortLabel: "Sports & Gaming",
        partners: [
          { name: "Play Padel Greenfield", description: "Indoor padel club", logo: "/partners/play-padel.png" },
          { name: "Digiplus", description: "Philippine inland gaming operations", logo: "/partners/digiplus.png" },
          { name: "Pink Dolphin", description: "Premium hospitality and gaming", logo: "/partners/pink-dolphin.png" },
        ],
      },
    ],
  },
];

/** Employee carousel images – add images to /public (eva-team-1.jpg, etc.) */
const EVA_EMPLOYEE_IMAGES = [
  { src: "/eva-team-1.jpg", alt: "EVA team member" },
  { src: "/eva-team-2.jpg", alt: "EVA team member" },
  { src: "/eva-team-3.jpg", alt: "EVA team member" },
  { src: "/eva-team-4.jpg", alt: "EVA team member" },
  { src: "/eva-team-5.jpg", alt: "EVA team member" },
  { src: "/eva-team-6.jpg", alt: "EVA team member" },
  { src: "/eva-team-7.jpg", alt: "EVA team member" },
  { src: "/eva-team-8.jpg", alt: "EVA team member" },
  { src: "/eva-team-9.jpg", alt: "EVA team member" },
  { src: "/eva-team-10.jpg", alt: "EVA team member" },
  { src: "/eva-team-11.jpg", alt: "EVA team member" },
];

const ONE_SECOND = 1000;
const AUTO_DELAY = ONE_SECOND * 4;
const DRAG_BUFFER = 50;
const CAROUSEL_SPRING_OPTIONS = {
  type: "spring",
  mass: 3,
  damping: 50,
};

const PartnerCard = ({ partner, labelFallback }) => {
  return (
    <div className="eva-partner-card" title={partner.description || labelFallback}>
      <div className="eva-partner-card-logo">
        <img
          src={partner.logo}
          alt={partner.name}
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextElementSibling?.classList.add("eva-partner-logo-placeholder-active");
          }}
        />
        <div className="eva-partner-logo-placeholder">
          <span>{partner.name.split(" ").map((w) => w[0]).join("").slice(0, 3)}</span>
        </div>
      </div>
      <h4 className="eva-partner-card-name">{partner.name}</h4>
      <span className="eva-partner-card-cat">{partner.description || labelFallback}</span>
    </div>
  );
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


function Eva() {
  const vmvRef = useRef(null);
  const servicesRef = useRef(null);
  const featuresRef = useRef(null);
  const valueBenefitsRef = useRef(null);
  const ceoRef = useRef(null);
  const testimonialsRef = useRef(null);
  const ctaRef = useRef(null);
  const contactVideoRef = useRef(null);
  const partnersRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isEmployeeDragging, setIsEmployeeDragging] = useState(false);
  const dragX = useMotionValue(0);
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

  // Employee carousel autoplay
  useEffect(() => {
    if (EVA_EMPLOYEE_IMAGES.length <= 1) return;
    const interval = setInterval(() => {
      if (!isEmployeeDragging) {
        setCarouselIndex((prev) => (prev + 1) % EVA_EMPLOYEE_IMAGES.length);
      }
    }, AUTO_DELAY);
    return () => clearInterval(interval);
  }, [isEmployeeDragging]);

  // Restart contact video when it comes into view on scroll
  useEffect(() => {
    const video = contactVideoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.currentTime = 0;
            video.play().catch(() => {});
          }
        });
      },
      { threshold: 0.25 }
    );
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

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

  const allIndustryPartners = EVA_PARTNER_CATEGORIES.flatMap((cat) => {
    if (cat.singleRow) {
      return (cat.categories || []).flatMap((sub) =>
        (sub.partners || []).map((p) => ({ ...p, industry: sub.title }))
      );
    }
    return (cat.partners || []).map((p) => ({ ...p, industry: cat.title }));
  });

  const MarqueeLane = ({ title, partners }) => {
    const trackRef = useRef(null);
    const dragStartRef = useRef({ x: 0, offset: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const animationDurationSec = 40;

    const getTranslateX = useCallback((el) => {
      const transform = window.getComputedStyle(el).transform;
      if (!transform || transform === "none") return 0;
      if (transform.startsWith("matrix3d(")) {
        const values = transform.slice(9, -1).split(",").map((v) => Number(v.trim()));
        return values[12] || 0;
      }
      if (transform.startsWith("matrix(")) {
        const values = transform.slice(7, -1).split(",").map((v) => Number(v.trim()));
        return values[4] || 0;
      }
      return 0;
    }, []);

    const getLoopDistance = useCallback(() => {
      const track = trackRef.current;
      if (!track) return 0;
      const total = track.scrollWidth || track.offsetWidth || 0;
      return total > 0 ? total / 2 : 0;
    }, []);

    const applyAnimationAtPosition = useCallback((translateX) => {
      const track = trackRef.current;
      if (!track) return;
      const loop = getLoopDistance();
      if (loop <= 0) return;

      let wrapped = ((translateX % loop) + loop) % loop; // [0, loop)
      wrapped = wrapped === 0 ? 0 : wrapped - loop; // (-loop, 0]
      if (wrapped <= -loop) wrapped = 0;

      const progress = Math.abs(wrapped) / loop;
      track.style.setProperty("--animation-duration", `${animationDurationSec}s`);
      track.style.setProperty("--animation-delay", `${-progress * animationDurationSec}s`);
      track.style.setProperty("--drag-offset", "0px");
    }, [animationDurationSec, getLoopDistance]);

    useEffect(() => {
      const track = trackRef.current;
      if (!track) return;
      const init = () => applyAnimationAtPosition(0);
      requestAnimationFrame(init);
    }, [partners, applyAnimationAtPosition]);

    useEffect(() => {
      const track = trackRef.current;
      if (!track) return;
      const ro = new ResizeObserver(() => {
        if (isDragging) return;
        requestAnimationFrame(() => {
          applyAnimationAtPosition(getTranslateX(track));
        });
      });
      ro.observe(track);
      return () => ro.disconnect();
    }, [isDragging, applyAnimationAtPosition, getTranslateX]);

    const handlePointerDown = (e) => {
      e.preventDefault();
      const track = trackRef.current;
      if (!track) return;
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const currentTranslate = getTranslateX(track);
      track.style.setProperty("--drag-offset", `${currentTranslate}px`);
      dragStartRef.current = { x, offset: currentTranslate };
      setIsDragging(true);
    };

    const handlePointerMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const track = trackRef.current;
      if (!track) return;
      const x = e.touches ? e.touches[0].clientX : e.clientX;
      const delta = x - dragStartRef.current.x;
      const nextOffset = dragStartRef.current.offset + delta;
      track.style.setProperty("--drag-offset", `${nextOffset}px`);
    };

    const handlePointerUp = () => {
      if (!isDragging) return;
      const track = trackRef.current;
      if (!track) {
        setIsDragging(false);
        return;
      }
      const currentTranslate = getTranslateX(track);
      applyAnimationAtPosition(currentTranslate);
      setIsDragging(false);
    };

    const nudge = (dir) => {
      const track = trackRef.current;
      if (!track) return;
      const currentTranslate = getTranslateX(track);
      const nextTranslate = currentTranslate - (dir * 120);
      applyAnimationAtPosition(nextTranslate);
    };

    if (!partners || partners.length === 0) return null;

    return (
      <div className="eva-partners-marquee">
        {title ? <h3 className="eva-partners-category-heading">{title}</h3> : null}

        <div className="eva-partners-marquee-nav">
          <button type="button" className="eva-partners-marquee-btn eva-partners-marquee-btn-left" onClick={() => nudge(-1)} aria-label="Scroll partners left">
            ‹
          </button>
          <button type="button" className="eva-partners-marquee-btn eva-partners-marquee-btn-right" onClick={() => nudge(1)} aria-label="Scroll partners right">
            ›
          </button>
        </div>

        <div
          className="eva-partners-marquee-viewport"
          onMouseDown={handlePointerDown}
          onMouseMove={handlePointerMove}
          onMouseUp={handlePointerUp}
          onMouseLeave={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
          onTouchCancel={handlePointerUp}
          style={{ cursor: isDragging ? "grabbing" : "grab" }}
        >
          <div
            ref={trackRef}
            className={`eva-partners-marquee-track ${isDragging ? "is-dragging" : ""}`}
            style={{ "--animation-direction": "forwards" }}
          >
            <div className="eva-partners-marquee-set">
              {partners.map((partner, idx) => (
                <div key={`${partner.name}-a-${idx}`} className="eva-partners-marquee-item">
                  <PartnerCard partner={partner} labelFallback={partner.industry} />
                </div>
              ))}
            </div>
            <div className="eva-partners-marquee-set" aria-hidden>
              {partners.map((partner, idx) => (
                <div key={`${partner.name}-b-${idx}`} className="eva-partners-marquee-item">
                  <PartnerCard partner={partner} labelFallback={partner.industry} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

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

      <div className="eva-page">
        {/* Navigation */}
        <nav className="eva-nav">
          <div className="eva-nav-container">
            <Link to="/eva">
              <img src="/eva-nav-logo.png" alt="EVA Brookside - Executive Virtual Assistant Philippines" className="eva-logo-small" />
            </Link>
            <div className="eva-nav-links">
              <a href="#home" onClick={closeEvaMenu}>Home</a>
              <a href="#about" onClick={closeEvaMenu}>About</a>
              <a href="#partners" onClick={closeEvaMenu}>Partners</a>
              <a href="#services" onClick={closeEvaMenu}>Services</a>
              <a href="#clients" onClick={closeEvaMenu}>Clients</a>
              <a href="#course" onClick={closeEvaMenu}>Course</a>
              <a href="#apply" onClick={closeEvaMenu}>Apply</a>
              <a href="#contact" onClick={closeEvaMenu}>Contact</a>
              <a href="https://brooksidemps.com" className="eva-nav-brookside-logo" aria-label="Brookside Manpower Services home" onClick={closeEvaMenu}>
                <img src="/logo-white.png" alt="Brookside Manpower Services" className="eva-logo-small" />
              </a>
            </div>
            <button ref={evaMenuToggleRef} type="button" className="eva-nav-toggle" onClick={() => setMenuOpen((prev) => !prev)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
              <i className={`fas ${menuOpen ? "fa-times" : "fa-bars"}`}></i>
            </button>
          </div>
          {/* EVA overlay: portal to body so it covers full page (like Home/Navbar) */}
          {menuOpen && createPortal(
            <div className="eva-nav-overlay eva-nav-overlay-open" onClick={closeEvaMenu} aria-hidden="false" role="dialog" aria-modal="true" aria-label="Menu">
              <div className="eva-nav-links eva-nav-links-overlay active" onClick={(e) => e.stopPropagation()}>
                <a href="#home" onClick={closeEvaMenu}>Home</a>
                <a href="#about" onClick={closeEvaMenu}>About</a>
                <a href="#partners" onClick={closeEvaMenu}>Partners</a>
                <a href="#services" onClick={closeEvaMenu}>Services</a>
                <a href="#clients" onClick={closeEvaMenu}>Clients</a>
                <a href="#course" onClick={closeEvaMenu}>Course</a>
                <a href="#apply" onClick={closeEvaMenu}>Apply</a>
                <a href="#contact" onClick={closeEvaMenu}>Contact</a>
                <a href="https://brooksidemps.com" className="eva-nav-brookside-logo" aria-label="Brookside Manpower Services home" onClick={closeEvaMenu}>
                  <img src="/logo-white.png" alt="Brookside Manpower Services" className="eva-logo-small" />
                </a>
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
              <img src="/eva-logo.png" alt="EVA Brookside - Executive Virtual Assistant Services" className="eva-logo-hero" />
            </div>
            <h1 className="eva-hero-tagline">Elevate Your Everything</h1>
            <p className="eva-hero-subtitle">Scale smarter with EVA, access top global talent that lowers <br/> operational costs by up to 70% without compromising quality and performance.
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
              <p className="eva-vmv-text">A hub for 5-star talents to elevate your everything.</p>
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

        {/* Partners Section */}
        <section className="eva-partners-section" id="partners" ref={partnersRef}>
          <div className="eva-partners-container">
            <div className="eva-partners-header">
              <h2 className="eva-partners-title">Our Partners</h2>
              <p className="eva-partners-intro"> Trusted by leading hospitality and service-driven brands.  <br />  Scale your operations, reduce costs, and focus on growth with our proven support across dining, hospitality, and gaming. </p>
              <div className="eva-partners-trust-bar">
                <span className="eva-partners-trust-item">
                  <strong>{EVA_PARTNER_CATEGORIES.reduce((n, c) => n + (c.partners?.length ?? (c.categories?.reduce((s, sub) => s + sub.partners.length, 0) ?? 0)), 0)}</strong> Trusted Partners
                </span>
                <span className="eva-partners-trust-divider" aria-hidden>|</span>
                <span className="eva-partners-trust-item">
                  <strong>5 </strong> Industries
                </span>
              </div>
            </div>

            <MarqueeLane partners={allIndustryPartners} />
            {/* CTA and Social Block */}
            <div className="eva-partners-cta-block">
              <div className="eva-partners-cta-content">
                <h3 className="eva-partners-cta-title">Ready to Elevate Your Operations?</h3>
                <p className="eva-partners-cta-text">Get a free consultation and discover how EVA can scale your business.</p>
                <Link to="/eva/inquiry" className="eva-partners-cta-button">Get Free Consultation</Link>
              </div>
              <div className="eva-partners-social-block">
                <h4 className="eva-partners-social-title">Follow Us on our Socials!</h4>
                <div className="eva-partners-social-links">
                  <a href="https://www.facebook.com/profile.php?id=61560528418956" target="_blank" rel="noopener noreferrer" className="eva-partners-social-link" aria-label="EVA on Facebook">
                    <i className="fab fa-facebook-f"></i>
                    <span>Facebook</span>
                  </a>
                  <a href="https://www.linkedin.com/company/brookside-manpower-services" target="_blank" rel="noopener noreferrer" className="eva-partners-social-link" aria-label="EVA on LinkedIn">
                    <i className="fab fa-linkedin-in"></i>
                    <span>LinkedIn</span>
                  </a>
                  <a href="https://www.tiktok.com/@brooksidemps" target="_blank" rel="noopener noreferrer" className="eva-partners-social-link" aria-label="EVA on TikTok">
                    <i className="fab fa-tiktok"></i>
                    <span>TikTok</span>
                  </a>
                </div>
              </div>
            </div>
            <br />

            {/* Employee Carousel */}
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
                  onDragStart={() => setIsEmployeeDragging(true)}
                  onDragEnd={() => {
                    onEmployeeDragEnd();
                    setIsEmployeeDragging(false);
                  }}
                  className="eva-partners-carousel-track"
                >
                  {EVA_EMPLOYEE_IMAGES.map((img, idx) => (
                    <motion.div
                      key={idx}
                      className="eva-partners-carousel-slide"
                      animate={{ scale: carouselIndex === idx ? 0.95 : 0.85 }}
                      transition={CAROUSEL_SPRING_OPTIONS}
                    >
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
                <div className="eva-partners-carousel-gradient-edge eva-partners-carousel-gradient-left" />
                <div className="eva-partners-carousel-gradient-edge eva-partners-carousel-gradient-right" />
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
              <h2 className="eva-ceo-title">Message from <br/> EVA CEO</h2>
              <p className="eva-ceo-text">
                In today's fast-paced world, businesses need agile, reliable, and efficient support. That's where EVA comes in. Whether it's administrative tasks, customer service, marketing, or executive assistance, EVA's team of dedicated professionals is here to ensure that you can focus on what truly matters: growing your business.
              </p>
              <p className="eva-ceo-text">
                EVA takes pride in offering personalized solutions tailored to your unique needs. Our EVA virtual assistants are not just service providers; they are strategic partners committed to your success. With cutting-edge tools and a passion for excellence, EVA is here to make your work-life balance a reality.
              </p>
              <div className="eva-ceo-signature">
                <p className="eva-signature-name">ETHEL ANN CABEZAS</p>
                <p className="eva-signature-title">CEO, EVA</p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Overview Section */}
        <section className="eva-services-min" id="services" ref={servicesRef}>
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


        {/* Call to Action Section */}
        <section className="eva-cta-section" ref={ctaRef}>
          <div className="eva-cta-container" data-aos="fade-in">
            <div className="eva-cta-content">
              <h2 className="eva-cta-heading">Ready to Elevate Your <br/> Business with EVA?</h2>
              <p className="eva-cta-description">
              EVA delivers excellence. <br/> Contact us for a free consultation and discover how our elite virtual assistants can transform your operations.
              </p>
              <div className="eva-cta-buttons">
                <Link to="/eva/inquiry" className="eva-cta-primary eva-cta-single">Get Free Consultation</Link>
              </div>
            </div>
          </div>
        </section>

        {/* General Virtual Assistant Course - Promote & sell */}
        <section className="eva-course-section" id="course">
          <div className="eva-course-content" data-aos="fade-in">
            <h2 className="eva-course-title">General Virtual Assistant Course</h2>
            <p className="eva-course-tagline">Get started on your VA Journey!</p>
            <p className="eva-course-intro">Industry-recognized certification designed to launch <br/> and advance your virtual assistant career.</p>
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
            <p className="eva-course-cta-text">Secure your spot in the EVA Course Program. <br/> Complete the enrollment form and our team will be in touch.</p>
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
            <video
              ref={contactVideoRef}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              className="eva-contact-header-video"
              aria-hidden="true"
              tabIndex={-1}
              controls={false}
              controlsList="nodownload noplaybackrate noremoteplayback"
              disablePictureInPicture
              disableRemotePlayback
              onContextMenu={blockMediaMenu}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            >
              <source src="/eva-footer-video.mp4" type="video/mp4" />
            </video>
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
              &copy; {new Date().getFullYear()} EVA by Brookside Manpower Services. All Rights Reserved.
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
