import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import "./EmployeeAccess.css";

function EmployeeAccess() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const userRef = doc(db, "users", currentUser.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setRole(userSnap.data().role);
        } else {
          setRole(null);
        }
      } else {
        setRole(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      let email = identifier;
      if (!identifier.includes("@")) {
        const userRef = doc(db, "users", identifier);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          email = userSnap.data().email;
        } else {
          setError("Username not found.");
          setLoading(false);
          return;
        }
      }
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      if (!user.emailVerified) {
        navigate("/verify-email");
        setLoading(false);
        return;
      }
      setIdentifier("");
      setPassword("");
    } catch (err) {
      setError("Login failed: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setRole(null);
  };

  // Scroll to top when Employee Access is clicked
  useEffect(() => {
    if (window.location.pathname === "/employee-access") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);

  if (!user) {
    return (
      <div className="login-container section-partition">
        <h2>Login to Brookside</h2>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Email or Username" value={identifier} onChange={(e) => setIdentifier(e.target.value)} required />
          <div className="password-input-wrapper">
            <input type={passwordVisible ? "text" : "password"} placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <span className="toggle-password" onClick={() => setPasswordVisible((prev) => !prev)}>
              <i className={`fas ${passwordVisible ? "fa-eye-slash" : "fa-eye"}`}></i>
            </span>
          </div>
          <button type="submit" disabled={loading}>{loading ? "Loading..." : "Login"}</button>
          {error && <div className="employee-access-error">{error}</div>}
          <p><Link to="/forgot-password" style={{ color: '#40b4ff', textDecoration: 'underline' }}>Forgot Password?</Link></p>
          <p>New user? <Link to="/register" style={{ color: '#40b4ff', textDecoration: 'underline' }}>Create an account</Link></p>
        </form>
      </div>
    );
  }

  return (
    <div className="employee-access">
      <section className="hero employee-hero section-partition">
        <video autoPlay muted loop playsInline preload="auto" id="heroVideo" aria-hidden="true">
          <source src="/herobg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-overlay">
          <div className="employee-access-title"><h1>Employee Access</h1></div>
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
          <div className="employee-access-btn-group">
            <Link to="/learn-here" className="hero-btn primary-btn">Learn Here</Link>
            {role === "admin" && (
              <Link to="/admin-dashboard" className="hero-btn primary-btn">Admin Dashboard</Link>
            )}
            <button className="hero-btn logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EmployeeAccess; 