import React, { useEffect } from "react";
import "./MeetTheTeam.css";
import SEO from "../components/SEO";

function MeetTheTeam() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const el = document.querySelector(hash);
      if (el) setTimeout(() => el.scrollIntoView({ behavior: "smooth", block: "start" }), 80);
    }
  }, []);

  const teamMembers = [
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
        title="Our Story & Team"
        description="The people and story behind Brookside — a talent and workforce company built around fit, trust, and 5-star professionals."
        keywords="Brookside story, founders, meet the team, talent solutions"
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
      
      <section className="story-section section-partition" id="story" aria-label="Brookside's Story">
        <div className="story-wrap">
          <h2 className="story-kicker">Brookside&apos;s Story</h2>
          <h1 className="story-title">Built around people who fit.</h1>
          <p>
            Brookside began with a clear idea: businesses deserve talent that represents them well, and professionals deserve work that matches their ability. What started as a hospitality-focused workforce partner has grown into a modern talent company — serving operations, specialized roles, and online staffing through EVA.
          </p>
          <p>
            The company was created to raise the standard of matching. Not faster filling of seats, but the right people, prepared and proud to show up for the brand they join.
          </p>
        </div>
      </section>

      <section className="founders-section section-partition" id="founders" aria-label="Our Founders">
        <h2 className="team-title">Our Founders</h2>
        <div className="founders-grid">
          <article className="founder-card">
            <img src="/team-images/ceo.png" alt="Timothy Justin Zeta" />
            <h3>Timothy Justin Zeta</h3>
            <p className="founder-role">Leadership</p>
            <p>We believe in excellence, grit, and consistency. Brookside not only bridges opportunities, but also builds futures — guiding people toward work that meets a 5-star standard.</p>
          </article>
        </div>
      </section>

      <section className="story-video-section" id="story-video" aria-label="Company video">
        <h2 className="team-title">The people behind Brookside</h2>
        <video controls playsInline preload="metadata" poster="/about-bms1.png" className="story-video">
          <source src="/brookside-about.mp4" type="video/mp4" />
        </video>
        <p className="story-note">Founder/company video placeholder.</p>
      </section>

      <section className="team-section section-partition" id="team" aria-label="Our Team">
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
