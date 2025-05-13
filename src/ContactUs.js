import React, { useState } from 'react';
import './ContactUs.css';
import Footer from './components/Footer';

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="contact-page">
      <div className="contact-hero">
        <h1>Get in Touch</h1>
        <p>Let's discuss how we can help your business grow</p>
      </div>

      <div className="contact-container">
        <div className="contact-info">
          <div className="info-block">
            <h2>Contact Information</h2>
            <div className="info-item">
              <div>
                <h3><i className="fas fa-envelope"></i>Email</h3>
                <p>inquire@brooksidemanpower.com</p>
              </div>
            </div>
            <div className="info-item">
              <div>
                <h3><i className="fas fa-phone"></i>Phone</h3>
                <p>(02) 7001 9493<br />+63 917 157 8874</p>
              </div>
            </div>
            <div className="info-item">
              <div>
                <h3><i className="fas fa-map-marker-alt"></i>Office</h3>
                <p>Unit 604, Tower 2, PITX Building,<br />1 Kennedy Road, Barangay Tambo,<br />Parañaque City, Metro Manila, Philippines</p>
              </div>
            </div>
          </div>
        </div>

        <div className="contact-form">
          <h2>Get a Quote</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your Phone Number"
                required
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Company Name"
                required
              />
            </div>
            <div className="form-group">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us about your staffing needs"
                required
              ></textarea>
            </div>
            <button type="submit" className="submit-btn">Submit Request</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ContactUs;
