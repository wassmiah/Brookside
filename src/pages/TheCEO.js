import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import "./Eva.css";
import "./TheCEO.css";
import SEO from "../components/SEO";
import { getBrooksideUrl, getEvaUrl } from "../utils/siteLinks";

function TheCEO() {
  const [menuOpen, setMenuOpen] = useState(false);
  const evaMenuToggleRef = useRef(null);
  const closeEvaMenu = useCallback(() => setMenuOpen(false), []);
  const evaHome = getEvaUrl();
  const brooksideHome = getBrooksideUrl("/");
  const inquiryHref = getEvaUrl("/inquiry");

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("eva-overlay-open");
    } else {
      document.body.classList.remove("eva-overlay-open");
    }
    return () => document.body.classList.remove("eva-overlay-open");
  }, [menuOpen]);

  const navLinks = (
    <>
      <a href={`${evaHome}#home`} onClick={closeEvaMenu}>Home</a>
      <a href={`${evaHome}#about`} onClick={closeEvaMenu}>About</a>
      <a href={`${evaHome}#talent`} onClick={closeEvaMenu}>Talent</a>
      <a href={`${evaHome}#how-it-works`} onClick={closeEvaMenu}>How It Works</a>
      <a href={`${evaHome}#brookside-partnership`} onClick={closeEvaMenu}>Brookside Partnership</a>
      <Link to={getEvaUrl("/the-ceo")} onClick={closeEvaMenu}>The CEO</Link>
      <a href={`${evaHome}#contact`} onClick={closeEvaMenu}>Contact</a>
      <a href={brooksideHome} className="eva-nav-brookside-logo" aria-label="Meet Brookside" onClick={closeEvaMenu}>
        <img src="/logo-white.png" alt="Brookside Manpower Services" className="eva-logo-small" />
      </a>
    </>
  );

  return (
    <>
      <SEO
        title="The CEO | EVA"
        description="Meet Marc Catubay, EVA Chief Executive Officer — AI-enabled virtual assistant solutions that bring together human expertise and technology."
        keywords="EVA CEO, Marc Catubay, virtual assistant, AI-enabled VA"
        ogImage="/eva-ceo-marc.jpg"
        canonicalUrl="/eva/the-ceo"
      />

      <div className="eva-page ceo-page">
        <nav className="eva-nav">
          <div className="eva-nav-container">
            <Link to={evaHome}>
              <img src="/eva-nav-logo.png" alt="EVA" className="eva-logo-small" />
            </Link>
            <div className="eva-nav-links">{navLinks}</div>
            <button ref={evaMenuToggleRef} type="button" className="eva-nav-toggle" onClick={() => setMenuOpen((prev) => !prev)} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
              <i className={`fas ${menuOpen ? "fa-times" : "fa-bars"}`}></i>
            </button>
          </div>
          {menuOpen && createPortal(
            <div className="eva-nav-overlay eva-nav-overlay-open" onClick={closeEvaMenu} aria-hidden="false" role="dialog" aria-modal="true" aria-label="Menu">
              <div className="eva-nav-links eva-nav-links-overlay active" onClick={(e) => e.stopPropagation()}>
                {navLinks}
              </div>
            </div>,
            document.body
          )}
        </nav>

        <section className="ceo-hero" aria-label="EVA CEO">
          <img src="/eva-ceo-marc.jpg" alt="Marc Catubay, EVA Chief Executive Officer" className="ceo-hero-photo" />
          <div className="ceo-hero-copy">
            <p className="section-eyebrow">EVA Chief Executive Officer</p>
            <h1>Marc Catubay</h1>
            <p className="ceo-hero-role">Human expertise. AI-enabled support. Talent that elevates everything.</p>
          </div>
        </section>

        <section className="ceo-block" id="meet">
          <h2>Meet Marc</h2>
          <p>
            Marc believes in using AI to empower talent and help businesses streamline processes, improve efficiency, and scale with confidence.
          </p>
          <p>
            At EVA, he drives AI-enabled Virtual Assistant solutions that bring together human expertise and technology — so clients get support that is personal, reliable, and ready to grow with them.
          </p>
        </section>

        <section className="ceo-block alt">
          <h2>His Story</h2>
          <p>
            Marc’s work sits at the intersection of people and performance. EVA was built for businesses that need agile, high-quality support without the weight of traditional hiring — and for professionals who want meaningful remote careers.
          </p>
        </section>

        <section className="ceo-block">
          <h2>Leadership Philosophy</h2>
          <ul className="ceo-points">
            <li>Technology should empower people, not replace the human standard.</li>
            <li>Efficiency matters only when quality and fit stay intact.</li>
            <li>Virtual assistants are strategic partners, not task-takers.</li>
            <li>Scale should feel confident — structured, trained, and well-matched.</li>
          </ul>
        </section>

        <section className="ceo-block alt">
          <h2>Building EVA</h2>
          <p>
            Under Marc’s leadership, EVA delivers managed virtual assistant solutions: skills-based matching, training, and performance that let owners focus on growth. The aim is simple — elevate operations while keeping the work human.
          </p>
        </section>

        <section className="ceo-block">
          <h2>Beyond EVA</h2>
          <p>
            EVA is the online and international extension of Brookside’s workforce ecosystem in the Philippines. That partnership is how EVA sources, screens, and manages talent with an established standard behind it.
          </p>
          <a href={brooksideHome} className="text-cta">Meet Brookside →</a>
        </section>

        <section className="ceo-block alt" id="video">
          <h2>Video</h2>
          <div className="ceo-video-frame">
            <video controls playsInline preload="metadata" poster="/eva-ceo-marc.jpg" aria-label="EVA CEO video">
              <source src="/eva-ceo.mp4" type="video/mp4" />
            </video>
          </div>
          <p className="ceo-note">CEO video still needed — 60–120 seconds on EVA, people, leadership, and the future of remote talent.</p>
        </section>

        <section className="ceo-block" id="gallery">
          <h2>Gallery</h2>
          <div className="ceo-gallery">
            <img src="/eva-ceo-marc.jpg" alt="Marc Catubay professional portrait" />
            <img src="/eva-ceo-marc-card.jpg" alt="Marc Catubay, EVA Chief Executive Officer" />
            <img src="/eva-ceo-1.png" alt="Marc Catubay" />
            <img src="/eva-ceo.jpeg" alt="Marc Catubay candid professional photo" />
          </div>
          <p className="ceo-note">More candid photos can be added as you share them.</p>
          <p className="ceo-back">
            <a href={inquiryHref}>Work with EVA →</a>
          </p>
        </section>
      </div>
    </>
  );
}

export default TheCEO;
