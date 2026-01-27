import React from "react";
import "./MeetTheTeam.css";
import SEO from "../components/SEO";

function MeetTheTeam() {
  const teamMembers = [
    { 
      name: "Timothy Justin Zeta", 
      position: "Chief Executive Officer", 
      image: "/team-images/ceo.png", 
      linkedin: "#",
      bio: "We believe in the spirit of excellence, grit, and consistency in everything we do. Brookside not only bridges opportunities, but also builds futures. I am dedicated to personally guide you in your success in the hospitality industry."
    },
    { 
      name: "Keith Biñas", 
      position: "HR Officer", 
      image: "/team-images/hr-officer.png", 
      linkedin: "https://www.linkedin.com/in/clarisse-keith-biñas-174b1421a/" 
    },
    { 
      name: "Lady Joy Torres", 
      position: "HR Generalist", 
      image: "/team-images/hr-generalist.png", 
      linkedin: "https://www.linkedin.com/in/lady-joy-torres-116847233/" 
    },
    { 
      name: "Rhice Domingo", 
      position: "General Coordinator", 
      image: "/team-images/general-coordinator.png", 
      linkedin: "https://www.linkedin.com/in/rhice-domingo-9bb103185" 
    },
    { 
      name: "Jofil Duhaylongsod", 
      position: "Payroll Associate", 
      image: "/team-images/payroll-associate.png", 
      linkedin: "https://www.linkedin.com/in/jofil-duhaylongsod-561538232/" 
    },
    { 
      name: "Janet Cornejo", 
      position: "Payroll Manager", 
      image: "/team-images/payroll-manager.png", 
      linkedin: "https://www.linkedin.com/in/janet-cornejo-65739176/" 
    },
  ];

  const teamStructuredData = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "Meet Our Team",
    "description": "Meet the dedicated team behind Brookside Manpower Services.",
    "mainEntity": {
      "@type": "Organization",
      "name": "Brookside Manpower Services",
      "employee": teamMembers.map((member) => ({
        "@type": "Person",
        "name": member.name,
        "jobTitle": member.position,
        ...(member.linkedin !== "#" && { "sameAs": member.linkedin })
      }))
    }
  };

  return (
    <>
      <SEO 
        title="Meet Our Team"
        description="Meet the dedicated team behind Brookside Manpower Services. Our experienced professionals are committed to connecting top talent with leading hospitality companies in Metro Manila."
        keywords="Brookside team, hospitality staffing team, HR professionals, manpower services team, Metro Manila"
        ogImage="/team-images/ceo.png"
        ogImageWidth={1200}
        ogImageHeight={630}
        ogImageAlt="Meet the Team at Brookside Manpower Services"
        canonicalUrl="/meet-the-team"
        structuredData={[
          teamStructuredData,
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://brooksidemps.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Meet Our Team",
                "item": "https://brooksidemps.com/meet-the-team"
              }
            ]
          }
        ]}
      />
      
      {/* CEO Section */}
      <section className="ceo-section" aria-label="CEO Profile">
        <div className="ceo-container">
          <div className="ceo-image">
            <img 
              src="/team-images/ceo.png" 
              alt="Timothy Justin Zeta - CEO of Brookside Manpower Services" 
              width="400"
              height="500"
              loading="eager"
            />
          </div>
          <div className="ceo-text">
            <h1>TIMOTHY JUSTIN ZETA</h1>
            <h2>Chief Executive Officer</h2>
            <blockquote>
              {teamMembers[0].bio}
            </blockquote>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section" aria-label="Our Team">
        <h2 className="team-title">
          MEET OUR TEAM <span className="dot" style={{ background: "#f5a623" }}></span>{" "}
          <span className="dot" style={{ background: "#2d9cdb" }}></span>
        </h2>
        <div className="team-container">
          {teamMembers.map((member, index) => (
            <article className="team-card" key={index}>
              <img 
                src={member.image} 
                alt={`${member.name} - ${member.position} at Brookside Manpower Services`} 
                className="team-image"
                width="300"
                height="300"
                loading="lazy"
              />
              <h3>{member.name}</h3>
              <p>{member.position}</p>
              <a 
                href={member.linkedin} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="linkedin-button"
                aria-label={`Connect with ${member.name} on LinkedIn`}
              >
                Connect with us on LinkedIn
              </a>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export default MeetTheTeam;
