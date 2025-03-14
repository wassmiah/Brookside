import React, { useState } from "react";
import "./Navbar.css";

function Navbar({ onLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <nav className="navbar">
      <div className="menu-toggle" onClick={toggleMenu}>
        <i className={`fas ${menuOpen ? "fa-times" : "fa-bars"}`}></i>
      </div>

      <div className={`nav-links ${menuOpen ? "show" : ""}`}>
        <a href="/">Home</a>
        <a href="/#about">About Us</a>
        <a href="/#services">Services</a>
        <a href="/#contact">Contact Us</a>
        <a href="/meet-the-team">Meet the Team</a>
        <a href="/LearnHere">Learn Here</a>
        <div className="nav-actions">
        <a href="/career" className="apply-now-btn">Apply Now</a>
        {onLogout && (
          <button onClick={onLogout} className="logout-btn">Logout</button>
        )}
      </div>
      </div>
    </nav>
  );
}
  

export default Navbar;
