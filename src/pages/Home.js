import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import AOS from "aos";
import "aos/dist/aos.css";
import SEO from "../components/SEO";
import { getEvaUrl } from "../utils/siteLinks";
import { PARTNERS } from "../data/partners";
import PartnerMarquee from "../components/PartnerMarquee";

const LOCATIONS = [
  {
    city: "Baguio",
    description: "A highland hub for sourcing and developing talent across Northern Luzon.",
    detail: "Regional operations and candidate engagement.",
    image: "/baguio.jpg",
  },
  {
    city: "Clark",
    description: "A Central Luzon base close to a fast-growing business corridor.",
    detail: "Operational staffing and specialized placement support.",
    image: "/clark.webp",
  },
  {
    city: "Manila",
    description: "Our Metro Manila hub for partner operations and talent deployment.",
    detail: "Headquarters presence serving hospitality and enterprise partners.",
    image: "/manila.jpg",
  },
  {
    city: "Cebu",
    description: "Our Visayas presence for workforce support and client operations.",
    detail: "Island talent network and growing business partnerships.",
    image: "/cebu.jpg",
  },
  {
    city: "Nevada, USA",
    poweredByEva: true,
    description: "International online staffing, powered through EVA.",
    detail: "Remote talent deployment for global partners.",
    image: "/nevada.jpg",
  },
];

const TALENT_LEAD =
  "5-star talent, selected to your standard and prepared to represent your brand through disciplined hiring, training, and performance management.";

const blockMediaMenu = (e) => {
  e.preventDefault();
  e.stopPropagation();
  return false;
};

function Home() {
  const evaHref = getEvaUrl();
  const teamVideoRef = useRef(null);

  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      easing: "ease-out-cubic",
      offset: 100,
      delay: 0,
    });

    const video = teamVideoRef.current;
    if (video && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.pause();
      video.removeAttribute("autoplay");
    }

    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
      }
    }
  }, []);

  return (
    <>
      <SEO
        title="Home"
        description="Brookside matches quality talent to businesses that need the right fit: workforce solutions, specialized professionals, and online staffing through EVA."
        keywords="talent solutions, workforce solutions, staffing solutions, specialized talent, online staffing, Philippines, EVA"
        ogImage="/logohero.webp"
        ogImageWidth={1200}
        ogImageHeight={630}
        ogImageAlt="Brookside. The Right People. The Right Fit."
        canonicalUrl="/"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Brookside",
          url: "https://brooksidemps.com",
        }}
      />

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
          <div className="hero-actions">
            <Link to="/contact" className="contact-us-btn" aria-label="Contact us">
              <span>Contact Us</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="about-new section-partition" id="about" aria-label="About Brookside">
        <video
          ref={teamVideoRef}
          className="about-full-video"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/about-bms1.png"
          aria-hidden="true"
          tabIndex={-1}
          controls={false}
          controlsList="nodownload noplaybackrate noremoteplayback"
          disablePictureInPicture
          disableRemotePlayback
          onContextMenu={blockMediaMenu}
        >
          <source src="/brookside-team-vid.mp4" type="video/mp4" />
        </video>
        <div className="about-overlay-copy">
          <div className="about-overlay-top">
            <p className="about-eyebrow">
              <span>People</span>
              <span className="about-eyebrow-dot" aria-hidden="true">•</span>
              <span>Purpose</span>
              <span className="about-eyebrow-dot" aria-hidden="true">•</span>
              <span>Possibilities</span>
            </p>
            <span className="about-eyebrow-line" aria-hidden="true"></span>
            <h2 className="neon-section-title">
              <span className="orange">About</span> <span className="blue">Us</span>
            </h2>
            <p className="about-overlay-lead">
              Brookside delivers 5-star talent through sourcing that aligns with each client’s needs, brand standards, culture, and values.
            </p>
          </div>
          <div className="about-overlay-bottom">
            <Link to="/contact#quote" className="contact-us-btn" aria-label="Partner with us">
              <span>Partner With Us</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="commitment-section section-partition" id="mission" aria-label="Vision, mission, and values">
        <img
          src="/commitment-bg.png"
          alt=""
          className="commitment-bg-img"
          width="1920"
          height="1080"
          loading="lazy"
        />
        <div className="commitment-overlay"></div>
        <div className="commitment-content">
          <div className="commitment-left">
            <article className="commitment-block" id="vision" data-aos="fade-up" data-aos-delay="0">
              <h2 className="commitment-title blue">Vision</h2>
              <div className="commitment-desc">To be the hub partners trust for 5-star professionals, where the standard of the person matters as much as the role.</div>
            </article>
            <article className="commitment-block" data-aos="fade-up" data-aos-delay="100">
              <h2 className="commitment-title blue">Mission</h2>
              <div className="commitment-desc">Train professionals with industry practitioners, then place them in careers they can be proud to carry.</div>
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
              alt="Timothy Justin Zeta, Chief Executive Officer"
              className="commitment-ceo-img"
              width="400"
              height="500"
              loading="lazy"
            />
          </div>
        </div>
      </section>

      <section className="offer-section section-partition" id="offer" aria-label="What we offer">
        <h2 className="neon-section-title">
          <span className="orange">What</span> <span className="blue">We Offer</span>
        </h2>
        <p className="section-lead offer-lead">{TALENT_LEAD}</p>
        <div className="offer-grid">
          <article className="offer-card" data-aos="fade-up">
            <img src="/A7406576.JPG" alt="" className="offer-card-photo" width="1200" height="800" loading="lazy" />
            <div className="offer-card-shade"></div>
            <div className="offer-card-body">
              <h3>General Manpower</h3>
              <p>Reliable manpower matched to your operational needs.</p>
            </div>
          </article>
          <article className="offer-card offer-card-featured" data-aos="fade-up" data-aos-delay="80">
            <img src="/A7404803.JPG" alt="" className="offer-card-photo" width="1200" height="800" loading="lazy" />
            <div className="offer-card-shade"></div>
            <div className="offer-card-body">
              <h3>Online Staffing</h3>
              <p>Remote and virtual staffing solutions for teams that work from anywhere.</p>
              <a href={evaHref} className="brand-cta brand-cta-eva" aria-label="Explore EVA">
                <span>Explore</span>
                <img src="/eva-logo-white-bg-removebg-preview.png" alt="EVA" />
                <span className="explore-eva-arrow" aria-hidden="true">→</span>
              </a>
            </div>
          </article>
          <article className="offer-card" data-aos="fade-up" data-aos-delay="160">
            <img src="/A7405688.JPG" alt="" className="offer-card-photo" width="1200" height="800" loading="lazy" />
            <div className="offer-card-shade"></div>
            <div className="offer-card-body">
              <h3>Specialized Talent</h3>
              <p>Carefully selected professionals for specialized business requirements.</p>
            </div>
          </article>
        </div>
      </section>

      <section className="asia-section section-partition" id="asiametrics" aria-label="Why us, talent selection powered by Aseametrics">
        <div className="asia-glow asia-glow-left" aria-hidden="true"></div>
        <div className="asia-glow asia-glow-right" aria-hidden="true"></div>
        <h2 className="neon-section-title asia-title">
          <span className="orange">Why</span> <span className="blue asia-title-us">Us</span>
        </h2>
        <p className="section-lead asia-lead">Science-backed screening, matched to Brookside talent standards before anyone is deployed.</p>
        <div className="asia-layout">
          <div className="asia-pyramid">
            <p className="asia-cap">Driven by Quality</p>
            <div className="asia-logo-card asia-card-brookside">
              <img src="/logo.png" alt="Brookside" />
            </div>
            <div className="asia-graph" aria-hidden="true">
              <svg viewBox="0 0 400 200" preserveAspectRatio="none">
                <defs>
                  <filter id="asiaLineGlow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3.5" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>
                <g filter="url(#asiaLineGlow)" stroke="#f78f3f" strokeWidth="6" strokeLinecap="round" fill="none">
                  <line x1="200" y1="8" x2="70" y2="188" />
                  <line x1="200" y1="8" x2="330" y2="188" />
                  <line x1="70" y1="188" x2="330" y2="188" />
                </g>
                <circle cx="200" cy="8" r="7" fill="#f78f3f" />
                <circle cx="70" cy="188" r="7" fill="#f78f3f" />
                <circle cx="330" cy="188" r="7" fill="#f78f3f" />
              </svg>
            </div>
            <div className="asia-base">
              <div className="asia-base-item">
                <div className="asia-logo-card asia-card-asea">
                  <img src="/partners/aseametrics-removebg-preview.png" alt="Aseametrics" />
                </div>
                <p>Unmatched Expertise</p>
              </div>
              <div className="asia-base-item">
                <div className="asia-logo-card asia-card-hr">
                  <img src="/partners/hr-avatar.jpg" alt="HR Avatar" />
                </div>
                <p>Client Focused</p>
              </div>
            </div>
          </div>
          <div className="asia-copy">
            <p className="asia-powered">Powered by Aseametrics</p>
            <p>
              <strong>What it does:</strong> Aseametrics screens candidates before you hire through tests, job simulations, video interviews, and reference checks. Not résumés alone.
            </p>
            <p>
              <strong>How it works:</strong> They are the exclusive Southeast Asia partner of HR Avatar. Brookside uses those scores to match people to the right role, worksite, and brand before deployment.
            </p>
            <p>
              <strong>Why us:</strong> Faster screening, fewer mismatches, and teams that stay and perform.
            </p>
          </div>
        </div>
      </section>

      <section className="partners-section section-partition" id="partners" aria-label="Our Partners">
        <h2 className="neon-section-title partners-title">
          <span className="orange">Our</span> <span className="blue">Partners</span>
        </h2>
        <p className="section-lead">Trusted Talent Behind Leading Brands.</p>
        <PartnerMarquee partners={PARTNERS} />
      </section>

      <section className="locations-section" id="locations" aria-label="Locations">
        <div className="locations-intro">
          <h2 className="neon-section-title">
            <span className="orange">Loca</span><span className="blue">tions</span>
          </h2>
          <p className="section-lead light">Brookside operations across Baguio, Clark, Manila, Cebu, and Nevada.</p>
        </div>
        <div className="location-grid">
          {LOCATIONS.map((place) => (
            <article className="location-card" key={place.city}>
              <div
                className="location-card-photo"
                style={{ backgroundImage: `url(${place.image})` }}
                aria-hidden="true"
              ></div>
              <div className="location-card-inner">
                <h3>{place.city}</h3>
                {place.poweredByEva && (
                  <p className="location-flag">
                    Powered through EVA
                  </p>
                )}
                <p>{place.description}</p>
                <p className="location-detail">{place.detail}</p>
                {place.poweredByEva && (
                  <a href={evaHref} className="brand-cta brand-cta-eva">
                    <span>Visit</span>
                    <img src="/eva-logo-white-bg-removebg-preview.png" alt="EVA" />
                    <span className="explore-eva-arrow" aria-hidden="true">→</span>
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="final-cta-section" id="apply" aria-label="Apply now">
        <h2>Ready to join, or to build your team?</h2>
        <p>Apply if you are talent. Partner with us if you need people who fit.</p>
        <div className="hero-actions">
          <Link to="/career" className="apply-now-btn hero-apply">Apply Now</Link>
          <Link to="/contact#quote" className="apply-now-btn hero-apply" aria-label="Partner with us">
            <span>Partner With Us</span>
          </Link>
        </div>
      </section>
    </>
  );
}

export default Home;
