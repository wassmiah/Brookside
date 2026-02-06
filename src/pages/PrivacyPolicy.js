import React, { useEffect } from 'react';
import './PrivacyPolicy.css';
import SEO from '../components/SEO';

function PrivacyPolicy() {
  const lastUpdated = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  useEffect(() => {
    // Smooth scroll for anchor links
    const handleAnchorClick = (e) => {
      const href = e.target.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  return (
    <>
      <SEO 
        title="Privacy Policy"
        description="Learn about how Brookside Manpower Services collects, uses, and protects your personal information. Our commitment to data protection and privacy compliance."
        keywords="privacy policy, data protection, cookie policy, Brookside Manpower Services privacy, GDPR compliance, data security"
        ogImage="/logo192.png"
        ogImageWidth={1200}
        ogImageHeight={630}
        ogImageAlt="Privacy Policy - Brookside Manpower Services"
        canonicalUrl="/privacy-policy"
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Privacy Policy",
            "description": "Privacy Policy for Brookside Manpower Services",
            "datePublished": "2025-01-27",
            "dateModified": new Date().toISOString().split('T')[0],
            "publisher": {
              "@type": "Organization",
              "name": "Brookside Manpower Services"
            }
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
                "name": "Privacy Policy",
                "item": "https://brooksidemps.com/privacy-policy"
              }
            ]
          }
        ]}
      />

      <div className="privacy-policy-page">
        <section className="privacy-hero section-partition">
          <h1>Privacy Policy</h1>
          <p>Last updated: {lastUpdated}</p>
        </section>

        <div className="privacy-container">
          {/* Table of Contents */}
          <nav className="privacy-toc section-partition">
            <h2>Table of Contents</h2>
            <ul>
              <li><a href="#introduction">1. Introduction</a></li>
              <li><a href="#information-we-collect">2. Information We Collect</a></li>
              <li><a href="#how-we-use-information">3. How We Use Your Information</a></li>
              <li><a href="#data-sharing">4. Sharing Your Information</a></li>
              <li><a href="#cookies-tracking">5. Cookies and Tracking Technologies</a></li>
              <li><a href="#data-security">6. Data Security</a></li>
              <li><a href="#data-retention">7. Data Retention</a></li>
              <li><a href="#international-transfers">8. International Data Transfers</a></li>
              <li><a href="#your-rights">9. Your Privacy Rights</a></li>
              <li><a href="#children-privacy">10. Children's Privacy</a></li>
              <li><a href="#opt-out">11. Universal Opt-Out Mechanisms</a></li>
              <li><a href="#policy-updates">12. Policy Updates</a></li>
              <li><a href="#contact-us">13. Contact Us</a></li>
            </ul>
          </nav>

          <section id="introduction" className="privacy-section section-partition">
            <h2>1. Introduction</h2>
            <p>
              This Privacy Policy ("Policy") describes how <strong>Brookside Manpower Services</strong> (doing business as "Brookside Manpower") 
              ("Company," "we," "us," or "our") collects, stores, uses, and shares ("processes") your information when you use our services 
              ("Services"), including when you:
            </p>
            <ul>
              <li>Visit our website at <a href="https://brooksidemps.com" target="_blank" rel="noopener noreferrer">brooksidemps.com</a>, or any website of ours that links to this privacy notice</li>
              <li>Use our online services, including job application portals and employee access systems</li>
              <li>Contact us through our website, email, or phone</li>
              <li>Subscribe to our newsletters or marketing communications</li>
              <li>Engage with us on social media platforms</li>
            </ul>
            <p>
              <strong>Reading this Privacy Policy will help you understand your privacy rights and choices.</strong> If you do not agree with 
              our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at 
              <a href="mailto:inquire@brooksidemanpower.com"> inquire@brooksidemanpower.com</a>.
            </p>
          </section>

          <section id="information-we-collect" className="privacy-section section-partition">
            <h2>2. Information We Collect</h2>
            <h3>2.1 Personal Information You Provide</h3>
            <p>We collect personal information that you voluntarily provide to us when you:</p>
            <ul>
              <li><strong>Register for an account:</strong> Name, email address, phone number, username, password</li>
              <li><strong>Apply for a job:</strong> Full name, contact information (email, phone, address), resume/CV, cover letter, 
                  professional qualifications, employment history, educational background, references, work authorization status</li>
              <li><strong>Contact us:</strong> Name, email address, phone number, company name, and any information you provide in your message</li>
              <li><strong>Subscribe to newsletters:</strong> Email address, name, and preferences</li>
              <li><strong>Use employee access portal:</strong> Employee ID, login credentials, employment information</li>
            </ul>

            <h3>2.2 Automatically Collected Information</h3>
            <p>When you visit our website, we automatically collect certain information about your device and how you interact with our Services, including:</p>
            <ul>
              <li><strong>Device Information:</strong> IP address, browser type and version, device type, operating system, unique device identifiers</li>
              <li><strong>Usage Information:</strong> Pages visited, time spent on pages, clickstream data, referring/exit pages, date and time of visits</li>
              <li><strong>Location Information:</strong> General location data (city, state, country) based on IP address</li>
            </ul>

            <h3>2.3 Information from Third Parties</h3>
            <p>We may receive information about you from third-party sources, such as:</p>
            <ul>
              <li>Job boards and recruitment platforms where you've posted your resume</li>
              <li>Social media platforms (if you interact with us on social media)</li>
              <li>Background check providers (with your consent, for employment purposes)</li>
              <li>Analytics providers and advertising networks</li>
            </ul>
          </section>

          <section id="how-we-use-information" className="privacy-section section-partition">
            <h2>3. How We Use Your Information</h2>
            <p>We process your information for the following purposes:</p>
            <ul>
              <li><strong>To provide and maintain our Services:</strong> Process job applications, manage accounts, provide customer support</li>
              <li><strong>To communicate with you:</strong> Send important updates, respond to inquiries, send newsletters and marketing communications (with your consent)</li>
              <li><strong>To improve our Services:</strong> Analyze usage patterns, conduct research, develop new features</li>
              <li><strong>To ensure security:</strong> Detect and prevent fraud, unauthorized access, and other security threats</li>
              <li><strong>To comply with legal obligations:</strong> Meet legal requirements, respond to legal processes, enforce our terms</li>
              <li><strong>For business purposes:</strong> Conduct business analytics, manage our operations, facilitate mergers or acquisitions</li>
              <li><strong>For employment purposes:</strong> Evaluate job applications, conduct background checks (with consent), manage employee relationships</li>
            </ul>
            <p>
              <strong>Legal Basis for Processing:</strong> We process your personal information based on: (1) your consent, (2) performance of a contract, 
              (3) compliance with legal obligations, (4) protection of vital interests, (5) legitimate business interests, or (6) as otherwise permitted by law.
            </p>
          </section>

          <section id="data-sharing" className="privacy-section section-partition">
            <h2>4. Sharing Your Information</h2>
            <p>We may share your information in the following situations:</p>
            
            <h3>4.1 With Service Providers</h3>
            <p>We may share your information with third-party service providers who perform services on our behalf, including:</p>
            <ul>
              <li>Cloud hosting and data storage providers</li>
              <li>Email service providers</li>
              <li>Analytics and marketing platforms</li>
              <li>Payment processors (if applicable)</li>
              <li>Background check providers (for employment purposes, with your consent)</li>
            </ul>
            <p>These service providers are contractually obligated to protect your information and use it only for the purposes we specify.</p>

            <h3>4.2 With Business Partners</h3>
            <p>We may share information with business partners, such as client companies seeking candidates for employment opportunities, 
            but only with your explicit consent or as part of the job application process.</p>

            <h3>4.3 For Legal Reasons</h3>
            <p>We may disclose your information if required by law or in response to valid legal requests, such as:</p>
            <ul>
              <li>Court orders, subpoenas, or other legal processes</li>
              <li>Government investigations</li>
              <li>To protect our rights, property, or safety, or that of our users or others</li>
              <li>In connection with a business transfer (merger, acquisition, or sale of assets)</li>
            </ul>

            <h3>4.4 We Do Not Sell Your Information</h3>
            <p>
              <strong>We do not sell, rent, or trade your personal information to third parties for their marketing purposes.</strong> 
              We only share information as described in this Policy.
            </p>
          </section>

          <section id="cookies-tracking" className="privacy-section section-partition">
            <h2>5. Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our website and store certain information. 
              Cookies are small data files stored on your device that help us improve your experience.
            </p>
            
            <h3>5.1 Types of Cookies We Use</h3>
            <ul>
              <li>
                <strong>Essential Cookies:</strong> Required for the website to function properly. These cannot be disabled as they are 
                necessary for core functionality (e.g., authentication, security).
              </li>
              <li>
                <strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website by collecting and reporting 
                information anonymously (e.g., Google Analytics).
              </li>
              <li>
                <strong>Functional Cookies:</strong> Remember your preferences and settings to provide enhanced, personalized features.
              </li>
              <li>
                <strong>Advertising Cookies:</strong> Used to deliver relevant advertisements and track their effectiveness. 
                These may be set by third-party advertising networks.
              </li>
            </ul>

            <h3>5.2 Managing Cookies</h3>
            <p>
              You can control cookies through your browser settings. Most browsers allow you to refuse or delete cookies. 
              However, disabling certain cookies may limit your ability to use some features of our website. You can also use our 
              cookie consent manager to control your preferences.
            </p>
            <p>
              For more detailed information about our use of cookies, please refer to our <a href="/cookie-policy">Cookie Policy</a> 
              (if available) or contact us.
            </p>
          </section>

          <section id="data-security" className="privacy-section section-partition">
            <h2>6. Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures to protect your personal information from unauthorized 
              access, alteration, disclosure, or destruction. These measures include:
            </p>
            <ul>
              <li>Encryption of data in transit (SSL/TLS) and at rest</li>
              <li>Secure servers and databases</li>
              <li>Access controls and authentication mechanisms</li>
              <li>Regular security assessments and updates</li>
              <li>Employee training on data protection</li>
              <li>Incident response procedures</li>
            </ul>
            <p>
              <strong>However, no method of transmission over the Internet or electronic storage is 100% secure.</strong> While we strive 
              to use commercially acceptable means to protect your information, we cannot guarantee absolute security. If you have reason 
              to believe that your interaction with us is no longer secure, please contact us immediately.
            </p>
          </section>

          <section id="data-retention" className="privacy-section section-partition">
            <h2>7. Data Retention</h2>
            <p>
              We retain your personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, 
              unless a longer retention period is required or permitted by law. Our retention periods are based on:
            </p>
            <ul>
              <li><strong>Job Applications:</strong> We retain application data for up to 2 years after your last interaction, unless you request deletion earlier</li>
              <li><strong>Account Information:</strong> Retained for the duration of your account plus 1 year after account closure</li>
              <li><strong>Marketing Communications:</strong> Retained until you unsubscribe or request deletion</li>
              <li><strong>Legal Requirements:</strong> Some information may be retained longer if required by law, regulation, or legal process</li>
            </ul>
            <p>
              When we no longer need your information, we will securely delete or anonymize it in accordance with our data retention policies.
            </p>
          </section>

          <section id="international-transfers" className="privacy-section section-partition">
            <h2>8. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your country of residence. These countries may 
              have data protection laws that differ from those in your country.
            </p>
            <p>
              When we transfer personal information from the European Economic Area (EEA), United Kingdom, or other regions with strict 
              data protection laws, we ensure appropriate safeguards are in place, such as:
            </p>
            <ul>
              <li>Standard Contractual Clauses approved by relevant authorities</li>
              <li>Adequacy decisions by the European Commission</li>
              <li>Other legally recognized transfer mechanisms</li>
            </ul>
            <p>
              By using our Services, you consent to the transfer of your information to countries outside your jurisdiction, including 
              the Philippines and other countries where our service providers operate.
            </p>
          </section>

          <section id="your-rights" className="privacy-section section-partition">
            <h2>9. Your Privacy Rights</h2>
            <p>Depending on your location, you may have certain rights regarding your personal information:</p>
            
            <h3>9.1 General Rights (GDPR, CCPA, and other laws)</h3>
            <ul>
              <li><strong>Right to Access:</strong> Request a copy of the personal information we hold about you</li>
              <li><strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete information</li>
              <li><strong>Right to Erasure ("Right to be Forgotten"):</strong> Request deletion of your personal information</li>
              <li><strong>Right to Restrict Processing:</strong> Request that we limit how we use your information</li>
              <li><strong>Right to Data Portability:</strong> Request transfer of your data to another service provider</li>
              <li><strong>Right to Object:</strong> Object to processing of your information for certain purposes</li>
              <li><strong>Right to Withdraw Consent:</strong> Withdraw consent where processing is based on consent</li>
            </ul>

            <h3>9.2 California-Specific Rights (CCPA/CPRA)</h3>
            <p>If you are a California resident, you have additional rights:</p>
            <ul>
              <li><strong>Right to Know:</strong> Know what personal information we collect, use, disclose, and sell</li>
              <li><strong>Right to Delete:</strong> Request deletion of your personal information</li>
              <li><strong>Right to Opt-Out:</strong> Opt-out of the sale or sharing of personal information (we do not sell your information)</li>
              <li><strong>Right to Non-Discrimination:</strong> Not be discriminated against for exercising your privacy rights</li>
              <li><strong>Right to Correct:</strong> Request correction of inaccurate personal information</li>
            </ul>

            <h3>9.3 How to Exercise Your Rights</h3>
            <p>
              To exercise any of these rights, please contact us at <a href="mailto:inquire@brooksidemanpower.com">inquire@brooksidemanpower.com</a> 
              or use the contact information provided in the "Contact Us" section below. We will respond to your request within the timeframes 
              required by applicable law (typically 30-45 days).
            </p>
            <p>
              <strong>Verification:</strong> For security purposes, we may need to verify your identity before processing your request. 
              We may ask you to provide additional information to confirm your identity.
            </p>
          </section>

          <section id="children-privacy" className="privacy-section section-partition">
            <h2>10. Children's Privacy</h2>
            <p>
              Our Services are not directed to children under the age of 13 (or 16 in the EEA). We do not knowingly collect personal 
              information from children under 13 (or 16 in the EEA). If you are a parent or guardian and believe your child has provided 
              us with personal information, please contact us immediately.
            </p>
            <p>
              If we learn that we have collected personal information from a child under 13 (or 16 in the EEA) without verifiable parental 
              consent, we will delete that information promptly. If you believe we might have any information from or about a child, please 
              contact us at <a href="mailto:inquire@brooksidemanpower.com">inquire@brooksidemanpower.com</a>.
            </p>
          </section>

          <section id="opt-out" className="privacy-section section-partition">
            <h2>11. Universal Opt-Out Mechanisms</h2>
            <p>
              Some U.S. state privacy laws require websites to honor browser settings and technology called universal opt-out mechanisms 
              (UOOMs) as a verifiable consumer request to opt-out of certain data processing activities.
            </p>
            <p>
              <strong>We honor universal opt-out signals</strong> sent by your browser or device, such as the Global Privacy Control (GPC) signal. 
              If you have enabled GPC or similar opt-out mechanisms in your browser settings, we will respect your preference to opt-out 
              of the sale or sharing of personal information (though we do not sell your information).
            </p>
            <p>
              You can also opt-out of marketing communications by clicking the "unsubscribe" link in any marketing email we send you, 
              or by contacting us directly.
            </p>
          </section>

          <section id="policy-updates" className="privacy-section section-partition">
            <h2>12. Policy Updates</h2>
            <p>
              We may update this Privacy Policy from time to time to reflect changes in our practices, technology, legal requirements, 
              or other factors. We will notify you of any material changes by:
            </p>
            <ul>
              <li>Posting the updated Policy on this page with a new "Last updated" date</li>
              <li>Sending an email notification (if you have provided your email address)</li>
              <li>Displaying a prominent notice on our website</li>
            </ul>
            <p>
              <strong>We encourage you to review this Privacy Policy periodically</strong> to stay informed about how we protect your information. 
              Your continued use of our Services after any changes indicates your acceptance of the updated Policy.
            </p>
            <p>
              Under certain laws (such as the CCPA), we are required to update this Privacy Policy at least once every 12 months.
            </p>
          </section>

          <section id="contact-us" className="privacy-section section-partition">
            <h2>13. Contact Us</h2>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="contact-info">
              <p><strong>Brookside Manpower Services</strong></p>
              <p><strong>Email:</strong> <a href="mailto:inquire@brooksidemanpower.com">inquire@brooksidemanpower.com</a></p>
              <p><strong>Phone:</strong> <a href="tel:+63270019493">(02) 7001 9493</a> | <a href="tel:+639171578874">+63 917 157 8874</a></p>
              <p><strong>Address:</strong> Unit 704C, Tower 3, PITX Building, 1 Kennedy Road, Barangay Tambo, Parañaque City, Metro Manila 1700, Philippines</p>
              <p><strong>Data Protection Officer:</strong> For privacy-related inquiries, please contact us at the email address above with "Privacy Inquiry" in the subject line.</p>
            </div>
            <p>
              <strong>Response Time:</strong> We will respond to your privacy inquiries within 30-45 days, as required by applicable law.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}

export default PrivacyPolicy; 