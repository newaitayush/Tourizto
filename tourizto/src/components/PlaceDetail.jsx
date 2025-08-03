import React, { useState, useCallback, memo } from 'react';
import './PlaceDetail.css';
import ImageGallery from './ImageGallery';
import InteractiveMap from './InteractiveMap';
import LocalExpertInsights from './LocalExpertInsights';
import HistoricalTimeline from './HistoricalTimeline';
import LazyImage from './LazyImage';
import PlaceholderImage from './PlaceholderImage';

const PlaceDetail = memo(({ place, onClose }) => {
  const [activeTab, setActiveTab] = useState('info');

  // Tab switching functions - memoized to prevent recreation on each render
  const setInfoTab = useCallback(() => setActiveTab('info'), []);
  const setMapTab = useCallback(() => setActiveTab('map'), []);
  const setTipsTab = useCallback(() => setActiveTab('tips'), []);
  const setImagesTab = useCallback(() => setActiveTab('images'), []);
  const setInsightsTab = useCallback(() => setActiveTab('insights'), []);
  const setHistoryTab = useCallback(() => setActiveTab('history'), []);

  // Function to open Google Images search for the place - memoized to prevent recreation on each render
  const openGoogleImages = useCallback(() => {
    const query = encodeURIComponent(place.name + ' Indore tourism');
    window.open(`https://www.google.com/search?q=${query}&tbm=isch`, '_blank');
  }, [place.name]);

  // Function to open Google Maps directions - memoized to prevent recreation on each render
  const openDirections = useCallback(() => {
    const destination = encodeURIComponent(place.name + ', Indore, Madhya Pradesh, India');
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${destination}`, '_blank');
  }, [place.name]);

  // Function to open Google Maps location - memoized to prevent recreation on each render
  const openMap = useCallback(() => {
    const query = encodeURIComponent(place.name + ', Indore, Madhya Pradesh, India');
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  }, [place.name]);

  // Handle click outside to close modal - memoized to prevent recreation on each render
  const handleOverlayClick = useCallback((e) => {
    if (e.target.className === 'place-detail-overlay') {
      onClose();
    }
  }, [onClose]);

  return (
    <div className="place-detail-overlay" onClick={handleOverlayClick}>
      <div className="place-detail-modal">
        <button className="close-detail-modal" onClick={onClose}>×</button>

        <div className="place-detail-header">
          {place.imageData ? (
            <LazyImage
              src={place.imageData.main || place.image}
              alt={place.imageData.alt || `${place.name} - ${place.category} attraction in Indore`}
              aspectRatio="21:9"
              className="place-detail-header-image"
              category={place.category}
              name={place.name}
              attribution={place.imageData.attribution}
              fallbackSrc={place.image}
            />
          ) : place.image ? (
            <LazyImage
              src={place.image}
              alt={`${place.name} - ${place.category} attraction in Indore`}
              aspectRatio="21:9"
              className="place-detail-header-image"
              category={place.category}
              name={place.name}
            />
          ) : (
            <PlaceholderImage
              category={place.category}
              name={place.name}
              aspectRatio="21:9"
              className="place-detail-header-image"
              message="We're working on authentic images for this attraction"
            />
          )}
          <div className="place-detail-header-content">
            <h2>{place.name}</h2>
            <span className="place-detail-category">{place.category}</span>
          </div>
        </div>

        <div className="place-detail-tabs">
          <button
            className={`tab-btn ${activeTab === 'info' ? 'active' : ''}`}
            onClick={setInfoTab}
          >
            Information
          </button>
          <button
            className={`tab-btn ${activeTab === 'map' ? 'active' : ''}`}
            onClick={setMapTab}
          >
            Map & Directions
          </button>
          <button
            className={`tab-btn ${activeTab === 'tips' ? 'active' : ''}`}
            onClick={setTipsTab}
          >
            Travel Tips
          </button>
          <button
            className={`tab-btn ${activeTab === 'images' ? 'active' : ''}`}
            onClick={setImagesTab}
          >
            Photo Gallery
          </button>
          <button
            className={`tab-btn ${activeTab === 'insights' ? 'active' : ''}`}
            onClick={setInsightsTab}
          >
            Local Insights
          </button>
          <button
            className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
            onClick={setHistoryTab}
          >
            History
          </button>
        </div>

        <div className="place-detail-content">
          {activeTab === 'info' && (
            <div className="place-info-tab">
              <div className="place-detail-description">
                <p>{place.description}</p>
                <p>{place.longDescription || 'More detailed information about this place will be added soon.'}</p>
              </div>

              <div className="place-detail-info-grid">
                <div className="info-item">
                  <span className="info-label">Entry Fee</span>
                  <span className="info-value">{place.price === 0 ? 'Free Entry' : `₹${place.price}/person`}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Best Time to Visit</span>
                  <span className="info-value">{place.bestTime || 'Morning/Evening'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Time Required</span>
                  <span className="info-value">{place.timeRequired || '1-2 hours'}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Opening Hours</span>
                  <span className="info-value">{place.openingHours || '9:00 AM - 6:00 PM'}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'map' && (
            <div className="place-map-tab">
              <InteractiveMap place={place} />
            </div>
          )}

          {activeTab === 'tips' && (
            <div className="place-tips-tab">
              <div className="travel-tips">
                <h4>Travel Tips</h4>
                <ul>
                  {place.travelTips ? (
                    place.travelTips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))
                  ) : (
                    <>
                      <li>Visit during weekdays to avoid crowds</li>
                      <li>Carry water and stay hydrated</li>
                      <li>Wear comfortable footwear</li>
                      <li>Check weather conditions before visiting</li>
                      <li>Respect local customs and traditions</li>
                    </>
                  )}
                </ul>
              </div>

              <div className="best-photo-spots">
                <h4>Best Photo Spots</h4>
                <ul>
                  {place.photoSpots ? (
                    place.photoSpots.map((spot, index) => (
                      <li key={index}>{spot}</li>
                    ))
                  ) : (
                    <>
                      <li>Main entrance</li>
                      <li>Central courtyard</li>
                      <li>Panoramic views from higher points</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'images' && (
            <div className="place-images-tab">
              <ImageGallery place={place} />
            </div>
          )}

          {activeTab === 'insights' && (
            <div className="place-insights-tab">
              <LocalExpertInsights place={place} />
            </div>
          )}

          {activeTab === 'history' && (
            <div className="place-history-tab">
              <HistoricalTimeline place={place} />
            </div>
          )}
        </div>

        <div className="place-detail-footer">
          {place.price > 0 ? (
            <button className="book-now-btn" onClick={place.onBook}>
              <i className="fas fa-ticket-alt"></i> Book Now
            </button>
          ) : (
            <div className="free-entry-info">
              <span className="free-badge">Free Entry</span>
              <p>No booking required. Just visit during opening hours.</p>
              <button className="directions-btn" onClick={openDirections}>
                <i className="fas fa-directions"></i> Get Directions
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

export default PlaceDetail;
