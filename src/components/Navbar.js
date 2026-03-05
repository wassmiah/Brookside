import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "./logo.png";
import "./Navbar.css";

const BODY_CLASS = "navbar-overlay-open";

function Navbar({ onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const location = useLocation();
  const menuToggleRef = useRef(null);
  const overlayCloseRef = useRef(null);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  // On localhost use in-app /eva route; on production send to subdomain
  const isProduction = typeof window !== "undefined" && window.location.hostname !== "localhost" && window.location.hostname !== "127.0.0.1";

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Body class and scroll lock; focus management (overlay best practice)
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

  // Escape key closes overlay
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
    } else {
      setShowLogo(true); 
    }
  }, [location]);

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <div className="navbar-left">
          {showLogo && (
            <Link to="/" className="navbar-logo-link" onClick={closeMenu} aria-label="Brookside Manpower Services home">
              <img src={logo} alt="Brookside Logo" className="navbar-logo visible" />
            </Link>
          )}
          <button ref={menuToggleRef} type="button" className="menu-toggle" onClick={toggleMenu} aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen}>
            <i className={`fas ${menuOpen ? "fa-times" : "fa-bars"}`}></i>
          </button>
        </div>

        <div className="navbar-center">
          <a href="/" onClick={closeMenu}>Home</a>
          <a href="/#about" onClick={closeMenu}>About Us</a>
          <a href="/#services" onClick={closeMenu}>Services</a>
          <a href="/#commitment" onClick={closeMenu}>Our Commitment</a>
          <a href="/meet-the-team" onClick={closeMenu}>Meet the Team</a>
          {isProduction ? (
            <a href="https://eva.brooksidemps.com" className="eva-nav-link" onClick={closeMenu} aria-label="EVA by Brookside - Executive Virtual Assistant Services">
              <img src="/eva-logo-white-bg.png" alt="EVA by Brookside" className="eva-nav-logo-img" />
            </a>
          ) : (
            <Link to="/eva" className="eva-nav-link" onClick={closeMenu} aria-label="EVA by Brookside - Executive Virtual Assistant Services">
              <img src="/eva-logo-white-bg.png" alt="EVA by Brookside" className="eva-nav-logo-img" />
            </Link>
          )}
          {/* <a href="/LearnHere">Learn Here</a> */}
        </div>

        <div className="navbar-right">
          <a href="/career" className="apply-now-btn" onClick={closeMenu}>Apply Now</a>
        </div>
      </div>

      {/* Mobile overlay menu */}
      <div className={`navbar-overlay ${menuOpen ? "navbar-overlay-open" : ""}`} onClick={closeMenu} aria-hidden={!menuOpen}>
        <div className="navbar-overlay-panel" onClick={(e) => e.stopPropagation()}>
          <button ref={overlayCloseRef} type="button" className="navbar-overlay-close" onClick={closeMenu} aria-label="Close menu">
            <i className="fas fa-times"></i>
          </button>
          <div className="navbar-overlay-links">
            <a href="/" onClick={closeMenu}>Home</a>
            <a href="/#about" onClick={closeMenu}>About Us</a>
            <a href="/#services" onClick={closeMenu}>Services</a>
            <a href="/#commitment" onClick={closeMenu}>Our Commitment</a>
            <a href="/meet-the-team" onClick={closeMenu}>Meet the Team</a>
            {isProduction ? (
              <a href="https://eva.brooksidemps.com" className="eva-nav-link" onClick={closeMenu} aria-label="EVA by Brookside - Executive Virtual Assistant Services">
                <img src="/eva-logo-white-bg.png" alt="EVA by Brookside" className="eva-nav-logo-img" />
              </a>
            ) : (
              <Link to="/eva" className="eva-nav-link" onClick={closeMenu} aria-label="EVA by Brookside - Executive Virtual Assistant Services">
                <img src="/eva-logo-white-bg.png" alt="EVA by Brookside" className="eva-nav-logo-img" />
              </Link>
            )}
            <a href="/career" className="apply-now-btn" onClick={closeMenu}>Apply Now</a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
