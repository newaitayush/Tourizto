import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState({ status: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulate API call
      setSubmitStatus({ status: 'loading', message: 'Sending your message...' });
      
      // Simulate successful submission after 1.5 seconds
      setTimeout(() => {
        setSubmitStatus({ 
          status: 'success', 
          message: 'Thank you for your message! We will get back to you soon.' 
        });
        
        // Reset form
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        // Clear success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus({ status: '', message: '' });
        }, 5000);
      }, 1500);
    }
  };

  return (
    <div className="contact-container">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>Have questions or suggestions? We'd love to hear from you!</p>
      </div>
      
      <div className="contact-content">
        <div className="contact-info">
          <div className="info-item">
            <div className="info-icon">📍</div>
            <div className="info-text">
              <h3>Our Location</h3>
              <p>123 Travel Street, Indore, Madhya Pradesh, India</p>
            </div>
          </div>
          
          <div className="info-item">
            <div className="info-icon">📞</div>
            <div className="info-text">
              <h3>Phone Number</h3>
              <p>+91 98765 43210</p>
            </div>
          </div>
          
          <div className="info-item">
            <div className="info-icon">✉️</div>
            <div className="info-text">
              <h3>Email Address</h3>
              <p>info@tourizto.com</p>
            </div>
          </div>
          
          <div className="info-item">
            <div className="info-icon">⏰</div>
            <div className="info-text">
              <h3>Working Hours</h3>
              <p>Monday - Saturday: 9:00 AM - 6:00 PM</p>
            </div>
          </div>
          
          <div className="social-links">
            <h3>Connect With Us</h3>
            <div className="social-icons">
              <a href="#" className="social-icon">
                <i className="fab fa-facebook-f">FB</i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-twitter">TW</i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-instagram">IG</i>
              </a>
              <a href="#" className="social-icon">
                <i className="fab fa-linkedin-in">LI</i>
              </a>
            </div>
          </div>
        </div>
        
        <div className="contact-form-container">
          {submitStatus.status === 'success' ? (
            <div className="success-message">
              <div className="success-icon">✓</div>
              <h3>Message Sent!</h3>
              <p>{submitStatus.message}</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              {submitStatus.status === 'loading' && (
                <div className="loading-overlay">
                  <div className="loading-spinner"></div>
                  <p>{submitStatus.message}</p>
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={errors.name ? 'error' : ''}
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={errors.email ? 'error' : ''}
                />
                {errors.email && <span className="error-message">{errors.email}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={errors.subject ? 'error' : ''}
                />
                {errors.subject && <span className="error-message">{errors.subject}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  className={errors.message ? 'error' : ''}
                ></textarea>
                {errors.message && <span className="error-message">{errors.message}</span>}
              </div>
              
              <button type="submit" className="submit-btn">Send Message</button>
            </form>
          )}
        </div>
      </div>
      
      <div className="map-container">
        <h2>Find Us On Map</h2>
        <div className="map-placeholder">
          <p>Google Maps will be integrated here</p>
          <p>Rajwada Palace, Indore, Madhya Pradesh, India</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
