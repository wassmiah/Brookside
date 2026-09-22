import React, { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Link, useLocation } from "react-router-dom";
import "../pages/Eva.css";
import { getBrooksideUrl, getEvaUrl } from "../utils/siteLinks";

function isEvaHomePath(pathname) {
  return pathname === "/eva" || pathname === "/eva/" || pathname === "/" || pathname === "";
}

function SectionLink({ href, onEvaHome, onClick, children }) {
  if (onEvaHome) {
    return <a href={href} onClick={onClick}>{children}</a>;
  }
  return <Link to={href} onClick={onClick}>{children}</Link>;
}

function EvaNavbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const evaMenuToggleRef = useRef(null);
  const wasOpen = useRef(false);
  const closeEvaMenu = useCallback(() => setMenuOpen(false), []);
  const evaHome = getEvaUrl();
  const brooksideHome = getBrooksideUrl("/");
  const onEvaHome = isEvaHomePath(location.pathname);
  const sectionHref = (id) => (onEvaHome ? `#${id}` : `${evaHome}#${id}`);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    if (menuOpen) {
      document.body.classList.add("eva-overlay-open");
      wasOpen.current = true;
      requestAnimationFrame(() => {
        const firstLink = document.querySelector(".eva-nav-links-overlay a, .eva-nav-links-overlay .eva-nav-brookside-logo");
        firstLink?.focus?.();
      });
    } else {
      document.body.classList.remove("eva-overlay-open");
      if (wasOpen.current) evaMenuToggleRef.current?.focus();
      wasOpen.current = false;
    }
    return () => document.body.classList.remove("eva-overlay-open");
  }, [menuOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") closeEvaMenu();
    };
    if (menuOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [menuOpen, closeEvaMenu]);

  const navLinks = (
    <>
      <SectionLink href={sectionHref("home")} onEvaHome={onEvaHome} onClick={closeEvaMenu}>Home</SectionLink>
      <SectionLink href={sectionHref("how-it-works")} onEvaHome={onEvaHome} onClick={closeEvaMenu}>How It Works</SectionLink>
      <SectionLink href={sectionHref("about")} onEvaHome={onEvaHome} onClick={closeEvaMenu}>About</SectionLink>
      <SectionLink href={sectionHref("brookside-partnership")} onEvaHome={onEvaHome} onClick={closeEvaMenu}>Brookside Partnership</SectionLink>
      <SectionLink href={sectionHref("talent")} onEvaHome={onEvaHome} onClick={closeEvaMenu}>Talent</SectionLink>
      <Link to={getEvaUrl("/inquiry")} onClick={closeEvaMenu}>Contact</Link>
      <a href={brooksideHome} className="eva-nav-brookside-logo" aria-label="Meet Brookside" onClick={closeEvaMenu}>
        <img src="/logo-white.png" alt="Brookside Manpower Services" className="eva-logo-small" />
      </a>
    </>
  );

  return (
    <nav className="eva-nav">
      <div className="eva-nav-container">
        <Link to={evaHome}>
          <img src="/eva-nav-logo.png" alt="EVA Brookside - Executive Virtual Assistant Philippines" className="eva-logo-small" />
        </Link>
        <div className="eva-nav-links">{navLinks}</div>
        <button
          ref={evaMenuToggleRef}
          type="button"
          className="eva-nav-toggle"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
        >
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
  );
}

export default EvaNavbar;
