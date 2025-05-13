import React from "react";
import "./EmailVerified.css";
import { Link } from "react-router-dom";

function EmailVerified() {
  return (
    <div className="email-verified-container">
      <h2>Email Verified!</h2>
      <p>Your email has been successfully verified.<br />
      You can now log in to your account.</p>
      <Link to="/login" className="login-link">Go to Login</Link>
    </div>
  );
}

export default EmailVerified; 