import React from "react";
import "./LearnHere.css";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import Navbar from "./components/Navbar";


function LearnHere() {

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

    {/* Nav Section */}
    <Navbar onLogout={handleLogout} />

          
      {/* Hero Section */}
      <div className="learn-here hero" id="learn">
        <video autoPlay muted loop id="heroVideo">
          <source src="/herobg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="learn-here hero">
        <div className="hero-overlay">
          <img src="/logo.png" alt="Business Logo" className="hero-logo" />
          <h1>LEARNING LINK</h1>
        </div>
      </div>
      </div>
  {/* Learning Link Section */}
  <div className="learn-here" id="learning-link">
        <h2 className="services-title">LEARNING NEVER STOPS</h2>
        <p>
          Brookside’s Learning Link is here to provide a continuous learning experience for you. <br />
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

     {/* Vision, Mission, Values Section */}
      <div
        className="vmv-section"
        style={{ backgroundImage: "url(/learning/vmv-bg.png)" }}
      >
        <div className="vmv-overlay">
          <div className="vmv-box">
            <h2 className="vmv-title orange">VISION</h2>
            <p className="vmv-text">To be a hub for 5–Star premium professionals.</p>
          </div>
          <div className="vmv-box">
            <h2 className="vmv-title orange">MISSION</h2>
            <p className="vmv-text">
              For all professionals to be trained by industry practitioners & be given fulfilling careers.
            </p>
          </div>
          <div className="vmv-box">
            <h2 className="vmv-title orange">VALUES</h2>
            <p className="vmv-text">
              Innovative, Revolutionary, Progressive, <br />
              Results–Driven and Empathetic
            </p>
          </div>
        </div>
      </div>


    {/* Footer */}
    <footer className="footer">
            <div className="footer-container">
              <div className="footer-section footer-logo">
                <img src="/logo.png" alt="Brookside Logo" className="footer-logo-img" />
              </div>
              <div className="footer-section">
                <p>&copy; 2025 Brookside Manpower Services, All Rights Reserved.</p>
              </div>
              <div className="footer-section">
            <div className="social-links">
            <a
                href="https://www.tiktok.com/@brooksidemps"
                target="_blank"
                rel="noreferrer"
                className="social-icon tiktok"
              >
                <i className="fab fa-tiktok"></i>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=61560528418956"
                target="_blank"
                rel="noreferrer"
                className="social-icon facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://www.linkedin.com/company/brookside-manpower-services"
                target="_blank"
                rel="noreferrer"
                className="social-icon linkedin"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
            </div>
          </footer>
    </>
  );
}

export default LearnHere;
