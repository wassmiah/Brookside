import React from "react";
import "./MeetTheTeam.css";

function MeetTheTeam() {
  const teamMembers = [
    { name: "Timothy Justin Zeta", position: "Chief Executive Officer", image: "/team-images/ceo.png", linkedin: "#" },
    { name: "Keith Biñas", position: "HR Officer", image: "/team-images/hr-officer.png", linkedin: "https://www.linkedin.com/in/clarisse-keith-biñas-174b1421a/" },
    { name: "Lady Joy Torres", position: "HR Generalist", image: "/team-images/hr-generalist.png", linkedin: "https://www.linkedin.com/in/lady-joy-torres-116847233/" },
    { name: "Rhice Domingo", position: "General Coordinator", image: "/team-images/general-coordinator.png", linkedin: "https://www.linkedin.com/in/rhice-domingo-9bb103185" },
    { name: "Jofil Duhaylongsod", position: "Payroll Associate", image: "/team-images/payroll-associate.png", linkedin: "https://www.linkedin.com/in/jofil-duhaylongsod-561538232/" },
    { name: "Janet Cornejo", position: "Payroll Manager", image: "/team-images/payroll-manager.png", linkedin: "https://www.linkedin.com/in/janet-cornejo-65739176/" },
  ];  

  return (
    <>
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
              <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="linkedin-button">
                Connect with us on LinkedIn
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-contact-container">
          <h2 className="footer-contact-title"><span className="blue">Contact Us</span></h2>
          <div className="footer-contact-info">
            <div className="footer-contact-block">
              <div className="footer-contact-label">Office</div>
              <div>Unit 604, Tower 2, PITX Building, 1 Kennedy Road,<br />Barangay Tambo, Parañaque City,  Metro Manila, Philippines</div>
            </div>
            <div className="footer-contact-block">
              <div className="footer-contact-label">Phone</div>
              <div>(02) 7001 9493 | +63 917 157 8874</div>
            </div>
            <div className="footer-contact-block">
              <div className="footer-contact-label">Email</div>
              <div>inquire@brooksidemanpower.com</div>
            </div>
            <div className="footer-contact-block">
              <div className="footer-contact-label">Social</div>
              <div className="footer-social-links">
                <a href="https://www.facebook.com/profile.php?id=61560528418956" target="_blank" rel="noreferrer" className="footer-social-icon"><i className="fab fa-facebook-f"></i></a>
                <a href="https://www.linkedin.com/company/brookside-manpower-services" target="_blank" rel="noreferrer" className="footer-social-icon"><i className="fab fa-linkedin-in"></i></a>
                <a href="https://www.tiktok.com/@brooksidemps" target="_blank" rel="noreferrer" className="footer-social-icon"><i className="fab fa-tiktok"></i></a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default MeetTheTeam;
