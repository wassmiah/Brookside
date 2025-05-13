import React from "react";
import "./MeetTheTeam.css";
import SecondaryNav from "./components/SecondaryNav";
import Footer from "./components/Footer";

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
      <SecondaryNav />
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
      <Footer />
    </>
  );
}

export default MeetTheTeam;
