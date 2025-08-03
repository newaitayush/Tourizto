import React, { useState } from "react";
import AuthModal from "../components/AuthModal";
import LoginPrompt from "../components/LoginPrompt";
import './Home.css';
import rajwada from '../images/RajwadaPalace.jpg';
import sarafa from '../images/sarafa.jpg';
import patalpani from '../images/PatalpaniWaterfalls.jpg';
import lalbagh from '../images/Lal-Bagh-Palace.jpg';
import KM from '../images/kanchMandir.jpg'
import krishna from '../images/krishnapurachhatri.jpg';

const Home = () => {
  const [showModal, setShowModal] = useState(false);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [savedDestinations, setSavedDestinations] = useState([]);

  const handleExploreClick = () => {
    setShowLoginPrompt(true);
  };

  const handleLoginPromptClose = () => {
    setShowLoginPrompt(false);
  };

  const handleLoginPromptLogin = () => {
    setShowLoginPrompt(false);
    setShowModal(true);
  };

  const handleToggleSave = (id) => {
    if (savedDestinations.includes(id)) {
      setSavedDestinations(savedDestinations.filter(destId => destId !== id));
    } else {
      setSavedDestinations([...savedDestinations, id]);
      // Show login prompt if user tries to save without being logged in
      setShowLoginPrompt(true);
    }
  };

  // Featured destinations in Indore with authentic images
  const featuredDestinations = [
    {
      id: 1,
      name: "Rajwada Palace",
      image: rajwada,
      description: "Historical 7-story palace from Holkar dynasty",
      category: "Historical"
    },
    {
      id: 2,
      name: "Sarafa Bazaar",
      image: sarafa,
      description: "Famous night food street with delicious options",
      category: "Food & Culture"
    },
    {
      id: 3,
      name: "Lal Bagh Palace",
      image: lalbagh,
      description: "Magnificent palace with European architecture",
      category: "Historical"
    },
    {
      id: 4,
      name: "Patalpani Waterfall",
      image: patalpani,
      description: "Beautiful 300-foot waterfall for nature lovers",
      category: "Nature"
    },
    {
      id: 5,
      name: "Kanch Mandir",
      image: KM,
      description: "Unique Jain temple made entirely of glass and mirrors",
      category: "Religious"
    },
    {
      id: 6,
      name: "Krishnapura Chhatris",
      image: krishna,
      description: "Cenotaphs of the Holkar rulers with stunning architecture",
      category: "Historical"
    }
  ];

  // Testimonials
  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      text: "Tourizto made my Indore trip unforgettable! The local insights and hidden gems were exactly what I was looking for.",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 2,
      name: "Rahul Verma",
      text: "I discovered places in my own city that I never knew existed. The food recommendations were spot on!",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
      id: 3,
      name: "Ananya Patel",
      text: "The historical information provided about each location added so much depth to my visit. Highly recommended!",
      avatar: "https://randomuser.me/api/portraits/women/68.jpg"
    }
  ];

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1>Discover the Magic of Indore</h1>
          <p>Experience the rich culture, royal heritage, delicious street food, and historical wonders of Central India's gem</p>
          <div className="hero-buttons">
            <button
              className="explore-btn"
              onClick={handleExploreClick}
            >
              Explore Destinations
            </button>
            <button
              className="login-btn"
              onClick={() => setShowModal(true)}
            >
              Plan Your Trip
            </button>
          </div>
        </div>
      </section>

      {/* Featured Destinations */}
      <section className="featured-section">
        <div className="section-header">
          <h2>Featured Destinations in Indore</h2>
          <p>Explore the beauty and culture of the heart of Madhya Pradesh</p>
        </div>
        <div className="featured-grid">
          {featuredDestinations.map(destination => (
            <div className="featured-card" key={destination.id}>
              <div className="featured-image" style={{ backgroundImage: `url(${destination.image})` }}>
                <button
                  className={`save-button ${savedDestinations.includes(destination.id) ? 'saved' : ''}`}
                  onClick={() => handleToggleSave(destination.id)}
                  title={savedDestinations.includes(destination.id) ? "Remove from saved" : "Save this place"}
                >
                  {savedDestinations.includes(destination.id) ? '★' : '☆'}
                </button>
                <div className="featured-overlay">
                  <h3>{destination.name}</h3>
                  <p>{destination.description}</p>
                  <button className="view-btn" onClick={handleExploreClick}>
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="why-us-section">
        <div className="section-header">
          <h2>Why Choose Tourizto?</h2>
          <p>We make your travel experience seamless and memorable</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔍</div>
            <h3>Local Insights</h3>
            <p>Get recommendations from locals who know the city best</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Best Prices</h3>
            <p>Find the most affordable options for your travel budget</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🍽️</div>
            <h3>Food Trails</h3>
            <p>Discover the culinary delights of Indore's famous cuisine</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Easy Booking</h3>
            <p>Book your experiences with just a few taps</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section">
        <div className="section-header">
          <h2>What Our Explorers Say</h2>
          <p>Hear from travelers who have experienced Indore with us</p>
        </div>
        <div className="testimonials-container">
          <div className="testimonials-slider" style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}>
            {testimonials.map(testimonial => (
              <div className="testimonial-card" key={testimonial.id}>
                <div className="testimonial-content">
                  <p>"{testimonial.text}"</p>
                  <div className="testimonial-author">
                    <img src={testimonial.avatar} alt={testimonial.name} />
                    <span>{testimonial.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="testimonial-dots">
            {testimonials.map((_, index) => (
              <button
                key={index}
                className={`dot ${index === activeTestimonial ? 'active' : ''}`}
                onClick={() => setActiveTestimonial(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <h2>Ready to Experience the Magic of Indore?</h2>
        <p>Join us to discover royal palaces, vibrant markets, and authentic local experiences!</p>
        <button className="cta-btn" onClick={() => setShowModal(true)}>Start Your Journey</button>
      </section>

      {/* Modals */}
      {showModal && <AuthModal onClose={() => setShowModal(false)} />}
      {showLoginPrompt && (
        <LoginPrompt
          onClose={handleLoginPromptClose}
          onLogin={handleLoginPromptLogin}
        />
      )}
    </div>
  );
};

export default Home;
