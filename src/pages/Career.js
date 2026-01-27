import React from "react";
import "./Career.css";
import SEO from "../components/SEO";

function Career() {
  return (
    <>     
      <SEO 
        title="Career Opportunities"
        description="Explore exciting career opportunities in hospitality with Brookside Manpower Services. We're hiring for various positions including Receptionist, Waitstaff, Barista, and more. No experience required for entry-level positions."
        keywords="hospitality jobs, restaurant jobs, hotel jobs, entry level jobs, no experience jobs, Metro Manila jobs, Brookside careers, manpower services jobs"
        ogImage="/how-to-resume.png"
        ogImageWidth={1200}
        ogImageHeight={630}
        ogImageAlt="Career Opportunities at Brookside Manpower Services"
        canonicalUrl="/career"
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "JobPosting",
            "title": "Hospitality Staff Positions",
            "description": "Multiple positions available in hospitality industry including Receptionist, Waitstaff, Barista, Cashier, Bartender, Line Cook, Kitchen Helper, Kitchen Steward, Commissary, and Pastry Chef. No experience required for entry-level positions.",
            "identifier": {
              "@type": "PropertyValue",
              "name": "Brookside Manpower Services",
              "value": "HOSPITALITY-STAFF-2025"
            },
            "datePosted": "2025-01-27",
            "validThrough": "2025-12-31",
            "employmentType": "FULL_TIME,PART_TIME",
            "hiringOrganization": {
              "@type": "Organization",
              "name": "Brookside Manpower Services",
              "sameAs": "https://brooksidemps.com"
            },
            "jobLocation": {
              "@type": "Place",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Metro Manila",
                "addressRegion": "Metro Manila",
                "addressCountry": "PH"
              }
            },
            "baseSalary": {
              "@type": "MonetaryAmount",
              "currency": "PHP",
              "value": {
                "@type": "QuantitativeValue",
                "value": "Competitive",
                "unitText": "MONTH"
              }
            },
            "workHours": "Flexible",
            "qualifications": "No experience required. Willing to learn and work in hospitality industry.",
            "responsibilities": "Various roles in hospitality including customer service, food preparation, and administrative tasks.",
            "skills": "Good communication skills, team player, customer-oriented"
          },
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
                "name": "Career Opportunities",
                "item": "https://brooksidemps.com/career"
              }
            ]
          }
        ]}
      />

      <div className="career-page">
        {/* Career Content */}
        <main className="career-content">
          <h1 className="current-job-offers">Current Job Offers</h1>

          <section className="job-section" aria-label="Available Positions">
            {/* Job List */}
            <div className="job-list-container">
              <article className="job-list-card">
                <p className="application-instructions">
                  Send your resume to{" "}
                  <a href="mailto:inquire@brooksidemanpower.com" aria-label="Send resume to inquire@brooksidemanpower.com">
                    inquire@brooksidemanpower.com
                  </a>{" "}
                  <br />
                  with the email subject: <strong>Applicant_F&B</strong>.
                </p>
                <h2 className="job-list-header">We are looking for:</h2>
                <ul className="job-list">
                  <li><i className="fas fa-user" aria-hidden="true"></i> Receptionist</li>
                  <li><i className="fas fa-user-friends" aria-hidden="true"></i> Waitstaff</li>
                  <li><i className="fas fa-cash-register" aria-hidden="true"></i> Cashier</li>
                  <li><i className="fas fa-coffee" aria-hidden="true"></i> Barista</li>
                  <li><i className="fas fa-glass-cheers" aria-hidden="true"></i> Bartender</li>
                  <li><i className="fas fa-utensils" aria-hidden="true"></i> Line Cook</li>
                  <li><i className="fas fa-hands-helping" aria-hidden="true"></i> Kitchen Helper</li>
                  <li><i className="fas fa-utensil-spoon" aria-hidden="true"></i> Kitchen Steward</li>
                  <li><i className="fas fa-warehouse" aria-hidden="true"></i> Commissary</li>
                  <li><i className="fas fa-birthday-cake" aria-hidden="true"></i> Pastry Chef</li>
                </ul>
              </article>
            </div>

            {/* Resume Instructions */}
            <div className="job-image">
              <img 
                src="/how-to-resume.png" 
                alt="How to create a resume guide" 
                className="resume-guide"
                width="800"
                height="600"
                loading="lazy"
              />
            </div>
          </section>
          
          {/* Job Descriptions */}
          <section className="job-descriptions" aria-label="Job Requirements">
            <h2>Job Descriptions & Requirements</h2>
            <div className="table-responsive">
              <table className="job-table">
                <caption className="visually-hidden">Detailed job descriptions and requirements for each position</caption>
                <thead>
                  <tr>
                    <th scope="col">Position</th>
                    <th scope="col">Description</th>
                    <th scope="col">Requirements</th>
                    <th scope="col">Experience</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row" className="job-title">Receptionist</th>
                    <td>Greets customers, manages reservations, and assists front-of-house operations.</td>
                    <td>Male or Female, 18–35 years old, at least 5'2", good communication and interpersonal skills.</td>
                    <td className="highlight">No experience required</td>
                  </tr>
                  <tr>
                    <th scope="row" className="job-title">Waitstaff</th>
                    <td>Serves food and beverages, provide a clean and welcoming dining experience.</td>
                    <td>Male or Female, 18–35 years old, team player, good customer service skills.</td>
                    <td className="highlight">No experience required</td>
                  </tr>
                  <tr>
                    <th scope="row" className="job-title">Cashier</th>
                    <td>Handles customer transactions, operates the POS system, and manages payment processing.</td>
                    <td>Male or Female, 18–35 years old, trustworthy, basic math skills required.</td>
                    <td className="highlight">No experience required</td>
                  </tr>
                  <tr>
                    <th scope="row" className="job-title">Barista</th>
                    <td>Prepares coffee, tea, and blended drinks while maintaining a clean and organized station.</td>
                    <td>Male or Female, 18–35 years old, customer-oriented.</td>
                    <td className="highlight">No experience required</td>
                  </tr>
                  <tr>
                    <th scope="row" className="job-title">Bartender</th>
                    <td>Mixes and serves drinks, maintains cleanliness and bar inventory.</td>
                    <td>Male or Female, 18–35 years old, basic bartending knowledge is a plus.</td>
                    <td className="highlight">No experience required</td>
                  </tr>
                  <tr>
                    <th scope="row" className="job-title">Line Cook</th>
                    <td>Prepares dishes to recipe specs, ensures food quality and cleanliness.</td>
                    <td>At least 18 years old, able to work under pressure.</td>
                    <td className="highlight">No experience required</td>
                  </tr>
                  <tr>
                    <th scope="row" className="job-title">Kitchen Helper</th>
                    <td>Assists chefs with preparation, cleaning, and basic cooking tasks.</td>
                    <td>At least 18 years old, physically fit, willing to learn.</td>
                    <td className="highlight">No experience required</td>
                  </tr>
                  <tr>
                    <th scope="row" className="job-title">Kitchen Steward</th>
                    <td>Maintains kitchen sanitation, washes dishes, and supports operations.</td>
                    <td>At least 18 years old, dependable and hard-working.</td>
                    <td className="highlight">No experience required</td>
                  </tr>
                  <tr>
                    <th scope="row" className="job-title">Commissary</th>
                    <td>Assists with bulk food prep, packaging, and supply tracking in commissary.</td>
                    <td>At least 18 years old, organized, good with inventory.</td>
                    <td className="highlight">No experience required</td>
                  </tr>
                  <tr>
                    <th scope="row" className="job-title">Pastry Chef</th>
                    <td>Prepares pastries, desserts, and baked goods with precision and creativity.</td>
                    <td>At least 18 years old, baking/pastry interest preferred.</td>
                    <td className="highlight">No experience required</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export default Career; 