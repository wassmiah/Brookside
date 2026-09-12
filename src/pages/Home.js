import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import AOS from "aos";
import "aos/dist/aos.css";
import SEO from "../components/SEO";
import { getEvaUrl } from "../utils/siteLinks";
import { PARTNERS } from "../data/partners";
import PartnerMarquee from "../components/PartnerMarquee";

const TESTIMONIALS = [
  {
    quote: "Brookside sends people who already understand the standard we hold. The fit is cultural, not just operational.",
    name: "Partner operations lead",
    role: "Hospitality group",
    image: "/partners/wild-flour.png",
  },
  {
    quote: "What stood out was how carefully they matched talent to the role. We spent less time retraining and more time performing.",
    name: "People manager",
    role: "Integrated resort partner",
    image: "/partners/west-side-city.png",
  },
];

const LOCATIONS = [
  {
    city: "Baguio",
    description: "A highland hub for sourcing and developing talent across Northern Luzon.",
    detail: "Regional operations and candidate engagement.",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=80",
  },
  {
    city: "Cebu",
    description: "Our Visayas presence for workforce support and client operations.",
    detail: "Island talent network and growing business partnerships.",
    image: "https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&w=1400&q=80",
  },
  {
    city: "Clark",
    description: "A Central Luzon base close to a fast-growing business corridor.",
    detail: "Operational staffing and specialized placement support.",
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=1400&q=80",
  },
  {
    city: "Nevada, USA",
    poweredByEva: true,
    description: "International online staffing, powered through EVA.",
    detail: "Remote talent deployment for global partners.",
    image: "https://images.unsplash.com/photo-1605833556294-ea5e0305b09f?auto=format&fit=crop&w=1400&q=80",
  },
];

function Home() {
  const evaHref = getEvaUrl();

  useEffect(() => {
    AOS.init({
      duration: 600,
      once: true,
      easing: "ease-out-cubic",
      offset: 100,
      delay: 0,
    });

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
        description="Brookside matches quality talent to businesses that need the right fit — workforce solutions, specialized professionals, and online staffing through EVA."
        keywords="talent solutions, workforce solutions, staffing solutions, specialized talent, online staffing, Philippines, EVA"
        ogImage="/logohero.webp"
        ogImageWidth={1200}
        ogImageHeight={630}
        ogImageAlt="Brookside — The Right People. The Right Fit."
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
          <Link to="/contact" className="contact-us-btn" aria-label="Contact us">
            <span>Contact Us</span>
          </Link>
        </div>
      </section>

      <section className="about-new section-partition" id="about" aria-label="About Brookside">
        <div className="about-intro">
          <h2 className="section-eyebrow">About Brookside</h2>
          <h3 className="about-heading">
            Quality talent,<br />matched with care.
          </h3>
          <p>
            Brookside helps businesses build teams they can trust. We source, screen, and deploy people who fit the work and the culture — across large-scale operations, specialized roles, and remote staffing.
          </p>
          <p>
            Through our relationship with EVA and Aseametrics, we combine human judgment with stronger selection. The result is talent that performs, stays, and represents your brand well.
          </p>
        </div>
        <div className="about-media" data-aos="fade-left">
          <img
            src="/about-bms1.png"
            alt="Brookside team"
            className="about-photo"
            width="600"
            height="400"
            loading="lazy"
          />
          <div className="about-video-frame">
            <video
              controls
              playsInline
              preload="metadata"
              poster="/about-bms1.png"
              aria-label="About Brookside video"
            >
              <source src="/brookside-about.mp4" type="video/mp4" />
            </video>
            <p className="media-note">Company video placeholder — 30–60s about film will play here.</p>
          </div>
        </div>
      </section>

      <section className="mission-section section-partition" id="mission" aria-label="Mission and vision">
        <h2 className="section-eyebrow">Mission &amp; Vision</h2>
        <div className="mission-grid">
          <article className="mission-card" data-aos="fade-up">
            <h3>Mission</h3>
            <p>Match exceptional people with organizations that need them — across operations, specialized roles, and remote work.</p>
          </article>
          <article className="mission-card" data-aos="fade-up" data-aos-delay="80">
            <h3>Vision</h3>
            <p>To be a leading hub for 5-star talent and workforce solutions, known for fit, trust, and people who elevate every brand they join.</p>
          </article>
        </div>
      </section>

      <section className="offer-section section-partition" id="offer" aria-label="What we offer">
        <h2 className="neon-section-title">
          <span className="orange">What</span> We <span className="blue">Offer</span>
        </h2>
        <p className="section-lead">Three ways we help you build the right team.</p>
        <div className="offer-grid">
          <article className="offer-card" data-aos="fade-up">
            <h3>General Manpower</h3>
            <p>Reliable manpower matched to your operational needs.</p>
          </article>
          <article className="offer-card offer-card-featured" data-aos="fade-up" data-aos-delay="80">
            <h3>Online Staffing</h3>
            <p>Remote and virtual staffing solutions for teams that work from anywhere.</p>
            <a href={evaHref} className="text-cta">Explore EVA →</a>
          </article>
          <article className="offer-card" data-aos="fade-up" data-aos-delay="160">
            <h3>Specialized Talent</h3>
            <p>Carefully selected professionals for specialized business requirements.</p>
          </article>
        </div>
      </section>

      <section className="asia-section section-partition" id="asiametrics" aria-label="Talent selection powered by Aseametrics">
        <div className="asia-inner">
          <img src="/partners/aseametrics.png" alt="Aseametrics" className="asia-logo" />
          <h2 className="section-eyebrow">Talent Selection Powered by Aseametrics</h2>
          <p className="asia-headline">Brookside understands people.<br />Aseametrics strengthens the selection process.</p>
          <p className="asia-body">
            Every candidate is screened for skill, character, and fit. Aseametrics adds structured assessment and matching so we can place people with more confidence — a clearer picture of who will thrive in your environment, not just who looks good on paper.
          </p>
        </div>
      </section>

      <section className="partners-section section-partition" id="partners" aria-label="Partners">
        <div className="section-heading-row">
          <div>
            <h2 className="section-eyebrow">Partners</h2>
            <p className="section-lead left">Recognizable brands who trust Brookside with their people.</p>
          </div>
        </div>
        <PartnerMarquee partners={PARTNERS} />
      </section>

      <section className="testimonials-section section-partition" id="testimonials" aria-label="Testimonials">
        <h2 className="section-eyebrow">Testimonials</h2>
        <p className="section-lead">What partners notice when the fit is right.</p>
        <div className="testimonial-grid">
          {TESTIMONIALS.map((item) => (
            <article className="testimonial-card" key={item.name} data-aos="fade-up">
              <img src={item.image} alt="" className="testimonial-logo" loading="lazy" />
              <blockquote>{item.quote}</blockquote>
              <p className="testimonial-name">{item.name}</p>
              <p className="testimonial-role">{item.role}</p>
            </article>
          ))}
        </div>
        <p className="media-note">Final client names, photos, and quotes will replace these placeholders once approved.</p>
      </section>

      <section className="locations-section" id="locations" aria-label="Locations">
        <div className="locations-intro">
          <h2 className="section-eyebrow light">Locations</h2>
          <p className="section-lead light">Where Brookside operates.</p>
        </div>
        <div className="location-grid">
          {LOCATIONS.map((place) => (
            <article
              className="location-card"
              key={place.city}
              style={{ backgroundImage: `url(${place.image})` }}
            >
              <div className="location-card-inner">
                <h3>{place.city}</h3>
                {place.poweredByEva && <p className="location-flag">Powered through EVA</p>}
                <p>{place.description}</p>
                <p className="location-detail">{place.detail}</p>
                {place.poweredByEva && (
                  <a href={evaHref} className="text-cta light">Visit EVA →</a>
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
          <Link to="/contact" className="hero-secondary dark">Talk to Brookside</Link>
        </div>
      </section>
    </>
  );
}

export default Home;
