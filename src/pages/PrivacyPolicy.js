import React from 'react';
import './PrivacyPolicy.css';
import SEO from '../components/SEO';

function PrivacyPolicy() {
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
        <section className="privacy-hero">
          <h1>Privacy Policy</h1>
          <p>Last updated: {new Date().toLocaleDateString()}</p>
        </section>

        <div className="privacy-container">
          <section className="privacy-section">
            <h2>Introduction</h2>
            <p>
              At Brookside Manpower Services, we take your privacy seriously. This Privacy Policy explains how we collect, 
              use, disclose, and safeguard your information when you visit our website or use our services.
            </p>
          </section>

          <section className="privacy-section">
            <h2>Information We Collect</h2>
            <h3>Personal Information</h3>
            <p>We may collect personal information that you voluntarily provide to us when you:</p>
            <ul>
              <li>Register for an account</li>
              <li>Apply for a job</li>
              <li>Contact us through our website</li>
              <li>Subscribe to our newsletter</li>
            </ul>
            <p>This information may include:</p>
            <ul>
              <li>Name and contact information</li>
              <li>Professional qualifications</li>
              <li>Employment history</li>
              <li>Educational background</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to track activity on our website and store certain information. 
              These technologies help us understand how you interact with our website and improve your experience.
            </p>
            <h3>Types of Cookies We Use</h3>
            <ul>
              <li>
                <strong>Essential Cookies:</strong> Required for the website to function properly
              </li>
              <li>
                <strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website
              </li>
              <li>
                <strong>Advertising Cookies:</strong> Used to deliver relevant advertisements and track their effectiveness
              </li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul>
              <li>Provide and maintain our services</li>
              <li>Process job applications</li>
              <li>Send you important updates and notifications</li>
              <li>Improve our website and services</li>
              <li>Analyze usage patterns and trends</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information from unauthorized access, 
              alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, 
              and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="privacy-section">
            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Object to processing of your information</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <div className="contact-info">
              <p><strong>Email:</strong> inquire@brooksidemanpower.com</p>
              <p><strong>Phone:</strong> (02) 7001 9493</p>
              <p><strong>Address:</strong> Unit 604, Tower 2, PITX Building, 1 Kennedy Road, Barangay Tambo, Parañaque City, Metro Manila 1700</p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

export default PrivacyPolicy; 