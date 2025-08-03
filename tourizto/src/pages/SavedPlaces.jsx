import React, { useState } from 'react';
import { useSavedPlaces } from '../context/SavedPlacesContext';
import PlaceDetail from '../components/PlaceDetail';
import BookingForm from '../components/BookingForm';
import './SavedPlaces.css';

const SavedPlaces = ({ user }) => {
  const { savedPlaces, removePlace, clearAllSavedPlaces } = useSavedPlaces();
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showPlaceDetail, setShowPlaceDetail] = useState(false);

  // Handle booking button click
  const handleBookClick = (place) => {
    setSelectedPlace(place);
    setShowBookingForm(true);
  };

  // Handle view details button click
  const handleViewDetails = (place) => {
    setSelectedPlace(place);
    setShowPlaceDetail(true);
  };

  // Handle remove place
  const handleRemovePlace = (placeId) => {
    removePlace(placeId);
    showNotification('Place removed from saved list', 'success');
  };

  // Show notification
  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: '', type: '' });
    }, 3000);
  };

  // Handle clear all saved places
  const handleClearAll = () => {
    if (savedPlaces.length === 0) return;
    
    if (window.confirm('Are you sure you want to clear all saved places?')) {
      clearAllSavedPlaces();
      showNotification('All saved places cleared', 'success');
    }
  };

  return (
    <div className="saved-places-container">
      {notification.show && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      <div className="saved-places-header">
        <h1>Your Saved Places</h1>
        <p>Manage your collection of favorite destinations in Indore.</p>
        
        {savedPlaces.length > 0 && (
          <button className="clear-all-btn" onClick={handleClearAll}>
            <i className="fas fa-trash-alt"></i> Clear All
          </button>
        )}
      </div>

      {savedPlaces.length === 0 ? (
        <div className="no-saved-places">
          <i className="fas fa-bookmark no-saved-icon"></i>
          <h2>No Saved Places Yet</h2>
          <p>Start exploring Indore and save your favorite places here for easy access.</p>
          <a href="/places" className="explore-btn">
            <i className="fas fa-compass"></i> Explore Places
          </a>
        </div>
      ) : (
        <div className="saved-places-grid">
          {savedPlaces.map(place => (
            <div className={`saved-place-card ${place.category}`} key={place.id}>
              <div 
                className="saved-place-image" 
                style={{ backgroundImage: `url(${place.image})` }}
              >
                <span className="saved-place-category-tag">{place.category}</span>
                <div className={`saved-place-price ${place.price === 0 ? 'free' : ''}`}>
                  {place.price === 0 ? 'Free Entry' : `₹${place.price}`}
                </div>
                <button 
                  className="remove-saved-btn" 
                  onClick={() => handleRemovePlace(place.id)}
                  aria-label="Remove from saved"
                >
                  <i className="fas fa-trash"></i>
                </button>
              </div>
              
              <div className="saved-place-details">
                <h3>{place.name}</h3>
                <p>{place.description}</p>
                
                <div className="saved-place-meta">
                  <span><i className="far fa-clock"></i> {place.timeRequired}</span>
                  <span><i className="fas fa-calendar-alt"></i> {place.bestTime}</span>
                </div>
                
                <div className="saved-place-actions">
                  <button 
                    className="view-details-btn" 
                    onClick={() => handleViewDetails(place)}
                  >
                    View Details
                  </button>
                  
                  {place.price > 0 ? (
                    <button 
                      className="book-btn" 
                      onClick={() => handleBookClick(place)}
                    >
                      <i className="fas fa-ticket-alt"></i> Book Now
                    </button>
                  ) : (
                    <button 
                      className="visit-btn" 
                      onClick={() => handleViewDetails(place)}
                    >
                      <i className="fas fa-map-marker-alt"></i> Plan Visit
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showBookingForm && selectedPlace && (
        <BookingForm 
          place={selectedPlace} 
          onClose={() => setShowBookingForm(false)} 
          user={user}
        />
      )}

      {showPlaceDetail && selectedPlace && (
        <PlaceDetail 
          place={selectedPlace} 
          onClose={() => setShowPlaceDetail(false)} 
        />
      )}
    </div>
  );
};

export default SavedPlaces;
