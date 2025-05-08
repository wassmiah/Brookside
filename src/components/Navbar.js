import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import logo from "./logo.png";
import "./Navbar.css";

function Navbar({ onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogo, setShowLogo] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setMenuOpen((prev) => !prev);

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
          {showLogo && <img src={logo} alt="Brookside Logo" className="navbar-logo visible" />}
          <div className="menu-toggle" onClick={toggleMenu}>
            <i className={`fas ${menuOpen ? "fa-times" : "fa-bars"}`}></i>
          </div>
        </div>

        <div className={`navbar-center ${menuOpen ? "show" : ""}`}>
          <a href="/">Home</a>
          <a href="/#about">About Us</a>
          <a href="/#services">Services</a>
          <a href="/#commitment">Our Commitment</a>
          <a href="/meet-the-team">Meet the Team</a>
          {/* <a href="/LearnHere">Learn Here</a> */}
         </div>

        <div className="navbar-right">
          <a href="/career" className="apply-now-btn">Apply Now</a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
