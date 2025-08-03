import React, { useState, useEffect } from 'react';
import { useSavedPlaces } from '../context/SavedPlacesContext';
import './RecommendedPlaces.css';

const RecommendedPlaces = ({ places, onViewDetails }) => {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { savedPlaces } = useSavedPlaces();

  useEffect(() => {
    // Generate recommendations based on user's saved places and browsing history
    const generateRecommendations = () => {
      setLoading(true);
      
      // If no saved places, recommend popular places
      if (savedPlaces.length === 0) {
        // Get 3 random places from different categories
        const randomPlaces = getRandomPlacesFromDifferentCategories(places, 3);
        setRecommendations(randomPlaces);
        setLoading(false);
        return;
      }
      
      // Get user preferences based on saved places
      const preferences = getUserPreferences(savedPlaces);
      
      // Get recommended places based on preferences
      const recommendedPlaces = getRecommendedPlaces(places, preferences, savedPlaces);
      
      setRecommendations(recommendedPlaces);
      setLoading(false);
    };
    
    // Wait a bit to simulate API call
    const timer = setTimeout(() => {
      generateRecommendations();
    }, 800);
    
    return () => clearTimeout(timer);
  }, [places, savedPlaces]);

  // Get random places from different categories
  const getRandomPlacesFromDifferentCategories = (allPlaces, count) => {
    const categories = ['historical', 'religious', 'food', 'nature'];
    const result = [];
    
    // Get one place from each category until we have enough
    for (const category of categories) {
      if (result.length >= count) break;
      
      const placesInCategory = allPlaces.filter(place => place.category === category);
      if (placesInCategory.length > 0) {
        const randomIndex = Math.floor(Math.random() * placesInCategory.length);
        result.push(placesInCategory[randomIndex]);
      }
    }
    
    // If we still need more places, add random ones
    while (result.length < count) {
      const randomIndex = Math.floor(Math.random() * allPlaces.length);
      const randomPlace = allPlaces[randomIndex];
      
      // Avoid duplicates
      if (!result.some(place => place.id === randomPlace.id)) {
        result.push(randomPlace);
      }
    }
    
    return result;
  };

  // Get user preferences based on saved places
  const getUserPreferences = (userSavedPlaces) => {
    const preferences = {
      categories: {},
      priceRange: { free: 0, paid: 0 }
    };
    
    userSavedPlaces.forEach(place => {
      // Count category preferences
      preferences.categories[place.category] = (preferences.categories[place.category] || 0) + 1;
      
      // Count price preferences
      if (place.price === 0) {
        preferences.priceRange.free += 1;
      } else {
        preferences.priceRange.paid += 1;
      }
    });
    
    return preferences;
  };

  // Get recommended places based on preferences
  const getRecommendedPlaces = (allPlaces, preferences, userSavedPlaces) => {
    // Filter out places that are already saved
    const unsavedPlaces = allPlaces.filter(place => 
      !userSavedPlaces.some(savedPlace => savedPlace.id === place.id)
    );
    
    // Sort places by preference match
    const scoredPlaces = unsavedPlaces.map(place => {
      let score = 0;
      
      // Category match
      const categoryPreference = preferences.categories[place.category] || 0;
      score += categoryPreference * 2;
      
      // Price preference
      const priceType = place.price === 0 ? 'free' : 'paid';
      score += preferences.priceRange[priceType];
      
      return { ...place, score };
    });
    
    // Sort by score (descending)
    scoredPlaces.sort((a, b) => b.score - a.score);
    
    // Return top 3 recommendations
    return scoredPlaces.slice(0, 3);
  };

  if (loading) {
    return (
      <div className="recommendations-loading">
        <div className="loading-spinner"></div>
        <p>Generating personalized recommendations...</p>
      </div>
    );
  }

  return (
    <div className="recommendations-container">
      <h3 className="recommendations-title">
        <i className="fas fa-lightbulb"></i> Recommended for You
      </h3>
      
      <div className="recommendations-description">
        {savedPlaces.length > 0 ? (
          <p>Based on your saved places, you might also enjoy these destinations:</p>
        ) : (
          <p>Popular places you might enjoy exploring in Indore:</p>
        )}
      </div>
      
      <div className="recommendations-grid">
        {recommendations.map(place => (
          <div className={`recommendation-card ${place.category}`} key={place.id}>
            <div 
              className="recommendation-image" 
              style={{ backgroundImage: `url(${place.image})` }}
            >
              <span className="recommendation-category">{place.category}</span>
              <div className={`recommendation-price ${place.price === 0 ? 'free' : ''}`}>
                {place.price === 0 ? 'Free Entry' : `₹${place.price}`}
              </div>
            </div>
            
            <div className="recommendation-details">
              <h4>{place.name}</h4>
              <p className="recommendation-description">{place.description}</p>
              
              <button 
                className="view-recommendation-btn" 
                onClick={() => onViewDetails(place)}
              >
                <i className="fas fa-info-circle"></i> View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecommendedPlaces;
