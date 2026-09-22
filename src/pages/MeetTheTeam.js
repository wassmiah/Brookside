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
    { name: "Timothy Justin Zeta", role: "Chief Executive Officer", image: "/team-images/placeholders/chief-executive-officer.jpg" },
    { name: "Clarisse Keith Biñas", role: "HR Asst. Manager", image: "/team-images/placeholders/hr-asst-manager.jpg" },
    { name: "Lady Joy Torres", role: "Recruitment Officer", image: "/team-images/placeholders/recruitment-officer.jpg" },
    { name: "Jofil Duhaylongsod", role: "Payroll Officer", image: "/team-images/placeholders/payroll-officer.jpg" },
    { name: "Jeffrey Carmen", role: "General Coordinator", image: "/team-images/placeholders/general-coordinator.jpg" },
    { name: "Adrianna Tandoc", role: "Jr. Coordinator", image: "/team-images/placeholders/jr-coordinator-1.jpg" },
    { name: "Karen Claire Bacsarza", role: "Jr. Coordinator", image: "/team-images/placeholders/jr-coordinator-2.jpg" },
    { name: "Nerissa Mae Rosario", role: "Payroll Associate", image: "/team-images/placeholders/payroll-associate-1.jpg" },
    { name: "Ferdinand Gomez", role: "HR Generalist", image: "/team-images/placeholders/hr-generalist.jpg" },
    { name: "Princess Wassmiah Al Salihi", role: "Payroll Associate", image: "/team-images/placeholders/payroll-associate-2.jpg" },
    { name: "Rona Mariz Cortez", role: "Payroll Associate", image: "/team-images/placeholders/payroll-associate-3.jpg" },
    { name: "Janet Cornejo", role: "Internal Auditor", image: "/team-images/placeholders/internal-auditor.jpg" },
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
        "jobTitle": member.role
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
          <p className="story-kicker">Our Story</p>
          <h1 className="story-title">Built around people who fit.</h1>
          <p className="story-lead">
            Brookside began with a clear idea: businesses deserve talent that represents them well, and professionals deserve work that matches their ability. What started as a hospitality-focused workforce partner has grown into a modern talent company, serving operations, specialized roles, and online staffing through EVA.
          </p>
        </div>

        <div className="story-gallery">
          <figure className="story-figure story-figure-wide">
            <img src="/manila.jpg" alt="Brookside operations in Manila" width="5298" height="3124" />
          </figure>
          <figure className="story-figure story-figure-baguio">
            <img src="/baguio.jpg" alt="Brookside team in Baguio" width="4928" height="3264" />
          </figure>
          <figure className="story-figure story-figure-cebu">
            <img src="/cebu.jpg" alt="Brookside team in Cebu" width="3968" height="2976" />
          </figure>
        </div>

        <div className="story-message">
          <img
            src="/brookside-72.jpg"
            alt="Timothy Justin Zeta, Chief Executive Officer"
            className="story-ceo-photo"
            width="3375"
            height="4219"
          />
          <div className="story-message-copy">
            <p className="story-kicker">Message from the CEO</p>
            <blockquote>
              We believe in excellence, grit, and consistency. Brookside does more than fill a seat. It builds futures, and guides people toward work that meets a 5-star standard.
            </blockquote>
            <p className="story-ceo-name">Timothy Justin Zeta</p>
            <p className="story-ceo-role">Chief Executive Officer</p>
          </div>
        </div>

        <p className="story-follow">
          The company was created to raise the standard of matching. The work is the right people, prepared and proud to show up for the brand they join.
        </p>
      </section>

      <section className="story-video-section" id="story-video" aria-label="The people behind Brookside">
        <h2 className="team-title">The people behind Brookside</h2>
        <img
          src="/brookside-286.jpg"
          alt="The Brookside team"
          className="story-video"
          width="2048"
          height="1365"
        />
      </section>

      <section className="team-section section-partition" id="team" aria-label="Our Team">
        <p className="story-kicker team-kicker">The Team</p>
        <h2 className="team-title">Meet the Team</h2>
        <div className="team-container">
          {teamMembers.map((member) => (
            <article className="team-card" key={member.name}>
              <img
                src={member.image}
                alt={`${member.name}, ${member.role} at Brookside Manpower Services`}
                className="team-image"
                width="800"
                height="1000"
                loading="lazy"
              />
              <h3>{member.name}</h3>
              <p>{member.role}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export default MeetTheTeam;
