import React from "react";
import "./career.css";
import resume from "./how-to-resume.png";
import Navbar from "./components/Navbar";


function Career() {
  return (
    <>
      {/* Nav Section */}
            <Navbar />
        
      
      <div className="career-page">

      {/* Career Content */}
      <main className="career-content">
        <h1 className="current-job-offers">Current Job Offers</h1>

        <div className="job-section">
          {/* Job List */}
          <div className="job-list-container">
            <div className="job-list-card">
            <p className="application-instructions">
                Send your resume to{" "}
                <a href="mailto:inquire@brooksidemanpower.com">
                  inquire@brooksidemanpower.com
                </a>{" "}
                <br />
                with the email subject: <strong>Applicant_F&B</strong>.
              </p>
              <h3 className="job-list-header">We are looking for:</h3>
              <ul className="job-list">
              <li><i className="fas fa-user"></i> Receptionist</li>
                  <li><i className="fas fa-user-friends"></i> Waitstaff</li>
                  <li><i className="fas fa-cash-register"></i> Cashier</li>
                  <li><i className="fas fa-coffee"></i> Barista</li>
                  <li><i className="fas fa-glass-cheers"></i> Bartender</li>
                  <li><i className="fas fa-utensils"></i> Line Cook</li>
                  <li><i className="fas fa-hands-helping"></i> Kitchen Helper</li>
                  <li><i className="fas fa-utensil-spoon"></i> Kitchen Steward</li>
                  <li><i className="fas fa-warehouse"></i> Commissary</li>
                  <li><i className="fas fa-birthday-cake"></i> Pastry Chef</li>
              </ul>
            </div>
          </div>

          {/* Resume Instructions */}
          <div className="job-image">
            <img src={resume} alt="How to Send Your Resume" />
          </div>
        </div>
        
        {/* Job Descriptions */}
        <div className="job-descriptions">
        <h2>Job Descriptions & Requirements</h2>
        <table className="job-table">
          <thead>
            <tr>
              <th>Position</th>
              <th>Description</th>
              <th>Requirements</th>
              <th>Experience</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="job-title">Receptionist</td>
              <td>Greets customers, manages reservations, and assists front-of-house operations.</td>
              <td>Male or Female, 18–35 years old, at least 5'2", good communication and interpersonal skills.</td>
              <td className="highlight">No experience required</td>
            </tr>
            <tr>
              <td className="job-title">Waitstaff</td>
              <td>Serves food and beverages, provide a clean and welcoming dining experience.</td>
              <td>Male or Female, 18–35 years old, team player, good customer service skills.</td>
              <td className="highlight">No experience required</td>
            </tr>
            <tr>
              <td className="job-title">Cashier</td>
              <td>Handles customer transactions, operates the POS system, and manages payment processing.</td>
              <td>Male or Female, 18–35 years old, trustworthy, basic math skills required.</td>
              <td className="highlight">No experience required</td>
            </tr>
            <tr>
              <td className="job-title">Barista</td>
              <td>Prepares coffee, tea, and blended drinks while maintaining a clean and organized station.</td>
              <td>Male or Female, 18–35 years old, customer-oriented.</td>
              <td className="highlight">No experience required</td>
            </tr>
            <tr>
              <td className="job-title">Bartender</td>
              <td>Mixes and serves drinks, maintains cleanliness and bar inventory.</td>
              <td>Male or Female, 18–35 years old, basic bartending knowledge is a plus.</td>
              <td className="highlight">No experience required</td>
            </tr>
            <tr>
              <td className="job-title">Line Cook</td>
              <td>Prepares dishes to recipe specs, ensures food quality and cleanliness.</td>
              <td>At least 18 years old, able to work under pressure.</td>
              <td className="highlight">No experience required</td>
            </tr>
            <tr>
              <td className="job-title">Kitchen Helper</td>
              <td>Assists chefs with preparation, cleaning, and basic cooking tasks.</td>
              <td>At least 18 years old, physically fit, willing to learn.</td>
              <td className="highlight">No experience required</td>
            </tr>
            <tr>
              <td className="job-title">Kitchen Steward</td>
              <td>Maintains kitchen sanitation, washes dishes, and supports operations.</td>
              <td>At least 18 years old, dependable and hard-working.</td>
              <td className="highlight">No experience required</td>
            </tr>
            <tr>
              <td className="job-title">Commissary</td>
              <td>Assists with bulk food prep, packaging, and supply tracking in commissary.</td>
              <td>At least 18 years old, organized, good with inventory.</td>
              <td className="highlight">No experience required</td>
            </tr>
            <tr>
              <td className="job-title">Pastry Chef</td>
              <td>Prepares pastries, desserts, and baked goods with precision and creativity.</td>
              <td>At least 18 years old, baking/pastry interest preferred.</td>
              <td className="highlight">No experience required</td>
            </tr>
          </tbody>
        </table>
      </div>

      </main>

      {/* Footer */}
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-section footer-logo">
          <img src="/logo.png" alt="Brookside Logo" class="footer-logo-img" />
        </div>
        <div class="footer-section">
          <p>&copy; 2025 Brookside Manpower Services, All Rights Reserved.</p>
        </div>
        <div class="footer-section">
          <div class="social-links">
            <a href="https://www.facebook.com/profile.php?id=61560528418956" target="_blank" rel="noreferrer" class="social-icon facebook">
              <i class="fab fa-facebook-f"></i>
            </a>
            <a href="https://www.linkedin.com/company/brookside-manpower-services" target="_blank" rel="noreferrer" class="social-icon linkedin">
              <i class="fab fa-linkedin-in"></i>
            </a>
            <a href="https://www.tiktok.com/@brooksidemps" target="_blank" rel="noreferrer" class="social-icon tiktok">
              <i class="fab fa-tiktok"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>

    </div>
    </>
  );
}

export default Career;
