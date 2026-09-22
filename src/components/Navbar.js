import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "./logo.png";
import { getEvaUrl } from "../utils/siteLinks";
import "./Navbar.css";

const BODY_CLASS = "navbar-overlay-open";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const location = useLocation();
  const menuToggleRef = useRef(null);
  const overlayCloseRef = useRef(null);
  const aboutRef = useRef(null);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => {
    setMenuOpen(false);
    setAboutOpen(false);
  };

  const evaHref = getEvaUrl();

  useEffect(() => {
    setMenuOpen(false);
    setAboutOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add(BODY_CLASS);
      requestAnimationFrame(() => {
        overlayCloseRef.current?.focus();
      });
    } else {
      document.body.classList.remove(BODY_CLASS);
      menuToggleRef.current?.focus();
    }
    return () => {
      document.body.classList.remove(BODY_CLASS);
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") closeMenu();
    };
    if (menuOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [menuOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (aboutRef.current && !aboutRef.current.contains(e.target)) {
        setAboutOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const isHomePage = location.pathname === "/" || location.pathname === "/#home";

    const handleScroll = () => {
      const hero = document.getElementById("home");
      if (hero) {
        const rect = hero.getBoundingClientRect();
        setShowLogo(rect.bottom < 0);
      } else {
        setShowLogo(true);
      }
    };

    if (isHomePage) {
      window.addEventListener("scroll", handleScroll);
      handleScroll();
      return () => window.removeEventListener("scroll", handleScroll);
    }
    setShowLogo(true);
  }, [location]);

  const aboutLinks = (
    <>
      <a href="/meet-the-team#story" onClick={closeMenu}>Our Story</a>
      <a href="/meet-the-team#team" onClick={closeMenu}>Meet the Team</a>
      <a href="/#mission" onClick={closeMenu}>Mission &amp; Vision</a>
    </>
  );

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-left">
          {showLogo && (
            <Link to="/" className="navbar-logo-link" onClick={closeMenu} aria-label="Brookside home">
              <img src={logo} alt="Brookside Logo" className="navbar-logo visible" />
            </Link>
          )}
          <button ref={menuToggleRef} type="button" className="menu-toggle" onClick={toggleMenu} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
            <i className={`fas ${menuOpen ? "fa-times" : "fa-bars"}`}></i>
          </button>
        </div>

        <div className="navbar-center">
          <a href="/" onClick={closeMenu}>Home</a>
          <div
            className={`nav-dropdown ${aboutOpen ? "open" : ""}`}
            ref={aboutRef}
            onMouseEnter={() => setAboutOpen(true)}
            onMouseLeave={() => setAboutOpen(false)}
          >
            <button
              type="button"
              className="nav-dropdown-toggle"
              aria-expanded={aboutOpen}
              onClick={() => setAboutOpen((prev) => !prev)}
            >
              About <i className="fas fa-chevron-down" aria-hidden="true"></i>
            </button>
            <div className="nav-dropdown-menu">{aboutLinks}</div>
          </div>
          <a href="/#offer" onClick={closeMenu}>What We Offer</a>
          <a href="/#partners" onClick={closeMenu}>Our Partners</a>
          <a href="/#locations" onClick={closeMenu}>Locations</a>
          <a href={evaHref} className="eva-nav-link" onClick={closeMenu} aria-label="Explore EVA">
            <img src="/eva-logo-white-bg.png" alt="EVA by Brookside" className="eva-nav-logo-img" />
          </a>
        </div>

        <div className="navbar-right">
          <a href="/career" className="apply-now-btn" onClick={closeMenu}>Apply Now</a>
        </div>
      </div>

      <div className={`navbar-overlay ${menuOpen ? "navbar-overlay-open" : ""}`} onClick={closeMenu} aria-hidden={!menuOpen}>
        <div className="navbar-overlay-panel" onClick={(e) => e.stopPropagation()}>
          <button ref={overlayCloseRef} type="button" className="navbar-overlay-close" onClick={closeMenu} aria-label="Close menu">
            <i className="fas fa-times"></i>
          </button>
          <div className="navbar-overlay-links">
            <a href="/" onClick={closeMenu}>Home</a>
            <p className="overlay-group-label">About</p>
            {aboutLinks}
            <a href="/#offer" onClick={closeMenu}>What We Offer</a>
            <a href="/#partners" onClick={closeMenu}>Our Partners</a>
            <a href="/#locations" onClick={closeMenu}>Locations</a>
            <a href={evaHref} className="eva-nav-link" onClick={closeMenu} aria-label="Explore EVA">
              <img src="/eva-logo-white-bg.png" alt="EVA by Brookside" className="eva-nav-logo-img" />
            </a>
            <a href="/career" className="apply-now-btn" onClick={closeMenu}>Apply Now</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
