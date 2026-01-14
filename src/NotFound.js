import React from "react";
import { Link } from "react-router-dom";
import "./NotFound.css"; // optional

function NotFound() {
  return (
    <div className="notfound-container">
      <h1>404 - Page Not Found</h1>
      <p>Sorry, we couldn't find the page you were looking for.</p>
      <div className="notfound-links">
        <Link to="/" className="notfound-link">Home</Link>
        <Link to="/about" className="notfound-link">About Us</Link>
        <Link to="/services" className="notfound-link">Services</Link>
        <Link to="/contact" className="notfound-link">Contact Us</Link>
      </div>
      <p className="notfound-help">Need help? <a href={`mailto:${'inquire' + '@' + 'brooksidemanpower.com'}`}>Contact us</a> or return to the <Link to="/">homepage</Link>.</p>
    </div>
  );
}

export default NotFound;
