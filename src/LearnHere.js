import React, { useEffect, useState } from "react";
import "./LearnHere.css";
import { signOut } from "firebase/auth";
import { auth, db } from "./firebase";
import { Link } from "react-router-dom";
import Footer from "./components/Footer";
import { doc, getDoc } from "firebase/firestore";

function LearnHere() {
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchRole = async () => {
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setRole(userSnap.data().role);
        }
      }
    };
    fetchRole();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        window.location.href = "/login";
      })
      .catch((error) => {
        alert("Logout failed: " + error.message);
      });
  };

  return (
    <>
      {/* Hero Section */}
      <div className="hero learn-hero" id="learn">
        <video autoPlay muted loop playsInline preload="auto" id="heroVideo" aria-hidden="true">
          <source src="/herobg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="hero-overlay">
          <img src="/logohero.webp" alt="Brookside Manpower Logo" className="hero-logo" width="500" height="200" loading="eager" decoding="async" />
          <h1>Learning Link</h1>
          <div className="hero-btn-group">
            <button className="hero-btn logout-btn" onClick={handleLogout}><i className="fas fa-sign-out-alt"></i> Logout</button>
            {role === "admin" && (
              <Link to="/admin-dashboard" className="hero-btn admin-btn">Admin Dashboard</Link>
            )}
          </div>
        </div>
      </div>

      {/* Learning Link Section */}
      <div className="learn-here" id="learning-link">
        <h2 className="services-title">LEARNING NEVER STOPS</h2>
        <p>
          Brookside's Learning Link is here to provide a continuous learning experience for you. <br />
          This enables Brookies to refresh knowledge and promote self-paced learning even after training.
        </p>
        <div className="services-container">
          {/* First Row */}
          <div className="service-box">
            <a href="https://drive.google.com/file/d/1MRsmwkooIogs0kheV54V3PARSV9IM87g/view" target="_blank" rel="noopener noreferrer">
              <img src="/learning/clockster.png" alt="Clockster" className="service-image" />
            </a>
            <h3 className="service-title">
              <a href="https://drive.google.com/file/d/1MRsmwkooIogs0kheV54V3PARSV9IM87g/view" target="_blank" rel="noopener noreferrer">CLOCKSTER</a>
            </h3>
          </div>

          <div className="service-box">
            <a href="https://drive.google.com/file/d/1BeiGGplNlybxTVbBdj2FtiZ2HjiGTTvV/view" target="_blank" rel="noopener noreferrer">
              <img src="/learning/benefits.png" alt="Benefits" className="service-image" />
            </a>
            <h3 className="service-title">
              <a href="https://drive.google.com/file/d/1BeiGGplNlybxTVbBdj2FtiZ2HjiGTTvV/view" target="_blank" rel="noopener noreferrer">BENEFITS</a>
            </h3>
          </div>

          <div className="service-box">
            <a href="https://drive.google.com/file/d/1vzlF_i2S_bJmLHGiip-bi47rgASCfxaM/view" target="_blank" rel="noopener noreferrer">
              <img src="/learning/maxicare.jpg" alt="Maxicare" className="service-image" />
            </a>
            <h3 className="service-title">
              <a href="https://drive.google.com/file/d/1vzlF_i2S_bJmLHGiip-bi47rgASCfxaM/view" target="_blank" rel="noopener noreferrer">MAXICARE</a>
            </h3>
          </div>

          <div className="service-box">
            <a href="https://drive.google.com/file/d/11XxHgjbHVFYqgKw7L5Ue78r_0BRCXWO_/view" target="_blank" rel="noopener noreferrer">
              <img src="/learning/wildflour.jpg" alt="Wildflour" className="service-image" />
            </a>
            <h3 className="service-title">
              <a href="https://drive.google.com/file/d/11XxHgjbHVFYqgKw7L5Ue78r_0BRCXWO_/view" target="_blank" rel="noopener noreferrer">WILDFLOUR</a>
            </h3>
          </div>
        </div>

        {/* Second Row */}
        <div className="services-container">
          <div className="service-box">
            <a href="https://drive.google.com/file/d/1ac4VuXAma7xfpYw9Yiur6YGThNdqmTcj/view" target="_blank" rel="noopener noreferrer">
              <img src="/learning/food-safety.jpg" alt="Food Safety" className="service-image" />
            </a>
            <h3 className="service-title">
              <a href="https://drive.google.com/file/d/1ac4VuXAma7xfpYw9Yiur6YGThNdqmTcj/view" target="_blank" rel="noopener noreferrer">FOOD SAFETY</a>
            </h3>
          </div>

          <div className="service-box">
            <a href="https://drive.google.com/file/d/1nVfetP9YRd5NN3W-M8unb9207WHiW6ba/view" target="_blank" rel="noopener noreferrer">
              <img src="/learning/brooksified.jpg" alt="Brooksified" className="service-image" />
            </a>
            <h3 className="service-title">
              <a href="https://drive.google.com/file/d/1nVfetP9YRd5NN3W-M8unb9207WHiW6ba/view" target="_blank" rel="noopener noreferrer">BROOKSIFIED</a>
            </h3>
          </div>

          <div className="service-box">
            <a href="https://drive.google.com/file/d/1mHbniktH1sqt1_njLpS_shEFRu8gkqEX/view" target="_blank" rel="noopener noreferrer">
              <img src="/learning/basic-fb.jpg" alt="Basic F&B Course" className="service-image" />
            </a>
            <h3 className="service-title">
              <a href="https://drive.google.com/file/d/1mHbniktH1sqt1_njLpS_shEFRu8gkqEX/view" target="_blank" rel="noopener noreferrer">BASIC F&B COURSE</a>
            </h3>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </>
  );
}

export default LearnHere;
