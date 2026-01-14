import React, { useState, useRef, useEffect } from 'react';
import './ContactUs.css';
import { db } from '../firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import emailjs from '@emailjs/browser';
import { useLocation } from 'react-router-dom';
import SEO from '../components/SEO';

function ContactUs() {
  const formRef = useRef();
  const location = useLocation();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Clear message on route change
  useEffect(() => {
    setMessage('');
    setError('');
  }, [location.pathname]);

  const handleCloseMessage = () => setMessage('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setError('');

    try {
      // Send email using EmailJS
      await emailjs.sendForm(
        'service_ebblue8',
        'template_0cc0uio',
        formRef.current,
        '7mLng9CeO9N8rQaOg'
      );

      // Store in Firestore as backup
      await addDoc(collection(db, 'contact_submissions'), {
        ...formData,
        timestamp: serverTimestamp(),
        status: 'new'
      });
      
      setMessage('Thank you for your message! We will get back to you soon.');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
      });
    } catch (err) {
      setError('Failed to send message. Please try again later.');
      console.error('Error submitting form:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO 
        title="Contact Us"
        description="Get in touch with Brookside Manpower Services for your hospitality staffing needs. We're here to help you find the perfect talent for your business in Metro Manila."
        keywords="contact Brookside, manpower services contact, hospitality staffing contact, Metro Manila recruitment, staffing solutions contact"
        ogImage="/PITX.png"
        canonicalUrl="/contact"
      />

      <div className="contact-page">
        <section className="contact-hero" aria-label="Contact header">
          <h1>Get in Touch</h1>
          <p>Let's discuss how we can help your business grow</p>
        </section>

        <div className="contact-container">
          <section className="contact-info" aria-label="Contact information">
            <div className="info-block">
              <h2>Contact Information</h2>
              <div className="info-item">
                <div>
                  <h3><i className="fas fa-envelope" aria-hidden="true"></i>Email</h3>
                  <p>
                    <a href={`"mailto:inquire@brooksidemanpower.com"'}`} aria-label="Send email to inquire@brooksidemanpower.com">
                      {['inquire', '@', 'brooksidemanpower.com'].join('')}
                    </a>
                  </p>
                </div>
              </div>
              <div className="info-item">
                <div>
                  <h3><i className="fas fa-phone" aria-hidden="true"></i>Phone</h3>
                  <p>
                    <a href="tel:+63270019493" aria-label="Call us at (02) 7001 9493">(02) 7001 9493</a>
                    <br />
                    <a href="tel:+639171578874" aria-label="Call us at +63 917 157 8874">+63 917 157 8874</a>
                  </p>
                </div>
              </div>
              <div className="info-item">
                <div>
                  <h3><i className="fas fa-map-marker-alt" aria-hidden="true"></i>Office</h3>
                  <address>
                    Unit 704C, Tower 3, PITX Building, 1 Kennedy Road, <br />
                    Barangay Tambo, Paranaque City, 1701 Metro Manila
                  </address>
                  <div className="contact-map-container">
                    <iframe
                      className="contact-map-iframe"
                      title="Brookside Manpower Services Inc. Location"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3862.5828563774644!2d120.98709607510447!3d14.508619985966975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397cff0f354180d%3A0x7ad62cd3e2c16311!2sBrookside%20Manpower%20Services%20Inc.!5e0!3m2!1sen!2sph!4v1751337563003!5m2!1sen!2sph"
                      width="100%"
                      height="350"
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="contact-form" aria-label="Contact form">
            <h2>Get a Quote</h2>
            {message && (
              <div className="success-message" role="alert">
                <i className="fas fa-check-circle" aria-hidden="true"></i>
                <span>{message}</span>
                <button 
                  className="close-message-btn" 
                  onClick={handleCloseMessage} 
                  aria-label="Close success message"
                >
                  &times;
                </button>
              </div>
            )}
            {error && (
              <div className="error-message" role="alert">
                <i className="fas fa-exclamation-circle" aria-hidden="true"></i>
                {error}
              </div>
            )}
            <form ref={formRef} onSubmit={handleSubmit} aria-label="Contact form">
              <div className="form-group">
                <label htmlFor="name" className="visually-hidden">Your Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  disabled={loading}
                  aria-required="true"
                />
              </div>
              <div className="form-group">
                <label htmlFor="email" className="visually-hidden">Your Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  disabled={loading}
                  aria-required="true"
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone" className="visually-hidden">Your Phone Number</label>
                <input
                  id="phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your Phone Number"
                  required
                  disabled={loading}
                  aria-required="true"
                />
              </div>
              <div className="form-group">
                <label htmlFor="company" className="visually-hidden">Company Name</label>
                <input
                  id="company"
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Company Name"
                  required
                  disabled={loading}
                  aria-required="true"
                />
              </div>
              <div className="form-group">
                <label htmlFor="message" className="visually-hidden">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your staffing needs"
                  required
                  disabled={loading}
                  aria-required="true"
                ></textarea>
              </div>
              <button 
                type="submit" 
                className="submit-btn" 
                disabled={loading}
                aria-label={loading ? "Sending message..." : "Submit contact form"}
              >
                {loading ? (
                  <>
                    <i className="fas fa-spinner fa-spin" aria-hidden="true"></i> Sending...
                  </>
                ) : (
                  'Submit Request'
                )}
              </button>
            </form>
          </section>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
