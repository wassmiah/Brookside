import React from "react";
import "./MeetTheTeam.css";

function MeetTheTeam() {
  const teamMembers = [
    { name: "Timothy Justin Zeta", position: "Chief Executive Officer", image: "/team-images/ceo.png" },
    { name: "HR Officer", position: "HR Officer", image: "/team-images/hr-officer.png" },
    { name: "HR Generalist", position: "HR Generalist", image: "/team-images/hr-generalist.png" },
    { name: "General Coordinator", position: "General Coordinator", image: "/team-images/general-coordinator.png" },
    { name: "Payroll Associate", position: "Payroll Associate", image: "/team-images/payroll-associate.png" },
    { name: "Payroll Manager", position: "Payroll Manager", image: "/team-images/payroll-manager.png" },
  ];  

  return (
    <>
      <div className="navbar">
        <img src="/logo.png" alt="Company Logo" className="navbar-logo" />
        <div className="nav-links">
          <a href="/">Home</a>
          <a href="/#about">About Us</a>
          <a href="/#services">Services</a>
          <a href="/#contact">Contact Us</a>
          <a href="/meet-the-team">Meet the Team</a>
          <a href="/career">Apply Now</a>
        </div>
      </div>

      {/* CEO Section */}
      <section className="ceo-section">
        <div className="ceo-container">
          <div className="ceo-image">
            <img src="/team-images/ceo.png" alt="CEO" />
          </div>
          <div className="ceo-text">
            <h2>TIMOTHY JUSTIN ZETA</h2>
            <h3>Chief Executive Officer</h3>
            <p>
              "We believe in the spirit of excellence, grit, and consistency in everything we do.
              Brookside not only <strong>bridges opportunities</strong>, but also <strong>builds futures</strong>.
              I am dedicated to personally guide you in your success in the hospitality industry."
            </p>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <h2 className="team-title">
          MEET OUR TEAM <span className="dot" style={{ background: "#f5a623" }}></span>{" "}
          <span className="dot" style={{ background: "#2d9cdb" }}></span>
        </h2>
        <div className="team-container">
          {teamMembers.map((member, index) => (
            <div className="team-card" key={index}>
              <img src={member.image} alt={member.name} className="team-image" />
              <h3>{member.name}</h3>
              <p>{member.position}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-section footer-logo">
            <img src="/logo.png" alt="Brookside Logo" className="footer-logo-img" />
          </div>
          <div className="footer-section">
            <p>&copy; 2025 Brookside Manpower Services, All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </>
  );
}

export default MeetTheTeam;
