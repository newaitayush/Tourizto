import React, { useState, useEffect } from 'react';
import './InteractiveMap.css';

const InteractiveMap = ({ place }) => {
  const [mapLoaded, setMapLoaded] = useState(false);
  const [selectedTransport, setSelectedTransport] = useState('car');
  const [estimatedTime, setEstimatedTime] = useState({
    car: '15-20 min',
    walking: '45-60 min',
    transit: '30-40 min'
  });
  const [nearbyPlaces, setNearbyPlaces] = useState([]);

  // Simulate loading nearby places
  useEffect(() => {
    const loadNearbyPlaces = async () => {
      // In a real implementation, this would be an API call to your backend
      // For now, we'll simulate with a timeout and predefined places
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulated nearby places based on category
      let nearby = [];
      
      if (place.category === 'historical') {
        nearby = [
          { name: 'Krishnapura Chhatris', distance: '1.2 km', type: 'historical' },
          { name: 'Central Museum', distance: '2.5 km', type: 'historical' },
          { name: 'Lal Bagh Palace', distance: '4.8 km', type: 'historical' }
        ];
      } else if (place.category === 'religious') {
        nearby = [
          { name: 'Annapurna Temple', distance: '1.8 km', type: 'religious' },
          { name: 'Kanch Mandir', distance: '2.3 km', type: 'religious' },
          { name: 'Gomatgiri', distance: '7.5 km', type: 'religious' }
        ];
      } else if (place.category === 'food') {
        nearby = [
          { name: 'Chappan Dukan', distance: '1.5 km', type: 'food' },
          { name: 'Sarafa Bazaar', distance: '2.1 km', type: 'food' },
          { name: 'Chhawani Chowpatty', distance: '3.7 km', type: 'food' }
        ];
      } else if (place.category === 'nature') {
        nearby = [
          { name: 'Ralamandal Wildlife Sanctuary', distance: '3.2 km', type: 'nature' },
          { name: 'Patalpani Waterfall', distance: '8.5 km', type: 'nature' },
          { name: 'Tincha Falls', distance: '12.3 km', type: 'nature' }
        ];
      } else {
        nearby = [
          { name: 'Rajwada Palace', distance: '2.3 km', type: 'historical' },
          { name: 'Sarafa Bazaar', distance: '2.8 km', type: 'food' },
          { name: 'Central Museum', distance: '3.5 km', type: 'historical' }
        ];
      }
      
      setNearbyPlaces(nearby);
    };
    
    loadNearbyPlaces();
  }, [place.category]);

  // Function to handle map load event
  const handleMapLoad = () => {
    setMapLoaded(true);
  };

  // Function to open Google Maps directions with selected transport mode
  const openDirections = () => {
    const destination = encodeURIComponent(place.name + ', Indore, Madhya Pradesh, India');
    const travelMode = selectedTransport === 'car' ? 'driving' : 
                      selectedTransport === 'walking' ? 'walking' : 'transit';
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${destination}&travelmode=${travelMode}`, '_blank');
  };

  // Function to open Google Maps location
  const openMap = () => {
    const query = encodeURIComponent(place.name + ', Indore, Madhya Pradesh, India');
    window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
  };

  return (
    <div className="interactive-map-container">
      <div className="map-wrapper">
        <div className={`map-placeholder ${mapLoaded ? 'loaded' : 'loading'}`}>
          {!mapLoaded && (
            <div className="map-loading">
              <div className="loading-spinner"></div>
              <p>Loading map...</p>
            </div>
          )}
          <iframe
            title={`Map of ${place.name}`}
            width="100%"
            height="350"
            frameBorder="0"
            src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(place.name + ', Indore, Madhya Pradesh, India')}`}
            allowFullScreen
            onLoad={handleMapLoad}
          ></iframe>
        </div>
        
        <div className="map-controls">
          <div className="transport-options">
            <h4>Get Directions</h4>
            <div className="transport-buttons">
              <button 
                className={`transport-btn ${selectedTransport === 'car' ? 'active' : ''}`}
                onClick={() => setSelectedTransport('car')}
              >
                <i className="fas fa-car"></i>
                <span>Drive</span>
              </button>
              <button 
                className={`transport-btn ${selectedTransport === 'walking' ? 'active' : ''}`}
                onClick={() => setSelectedTransport('walking')}
              >
                <i className="fas fa-walking"></i>
                <span>Walk</span>
              </button>
              <button 
                className={`transport-btn ${selectedTransport === 'transit' ? 'active' : ''}`}
                onClick={() => setSelectedTransport('transit')}
              >
                <i className="fas fa-bus"></i>
                <span>Transit</span>
              </button>
            </div>
            <div className="estimated-time">
              <p>Estimated time from city center: <strong>{estimatedTime[selectedTransport]}</strong></p>
            </div>
            <button className="directions-btn" onClick={openDirections}>
              <i className="fas fa-directions"></i> Get Directions
            </button>
          </div>
          
          <button className="view-map-btn" onClick={openMap}>
            <i className="fas fa-map-marked-alt"></i> View on Google Maps
          </button>
        </div>
      </div>
      
      <div className="nearby-attractions">
        <h4>Nearby Attractions</h4>
        <div className="nearby-places-list">
          {nearbyPlaces.map((nearby, index) => (
            <div className="nearby-place-item" key={index}>
              <div className="nearby-place-icon">
                <i className={
                  nearby.type === 'historical' ? 'fas fa-landmark' :
                  nearby.type === 'religious' ? 'fas fa-pray' :
                  nearby.type === 'food' ? 'fas fa-utensils' :
                  nearby.type === 'nature' ? 'fas fa-tree' : 'fas fa-map-marker-alt'
                }></i>
              </div>
              <div className="nearby-place-info">
                <h5>{nearby.name}</h5>
                <p>{nearby.distance} away</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="location-info">
        <h4>How to Reach</h4>
        <p>{place.howToReach || `${place.name} is located in Indore, Madhya Pradesh. You can reach here by local transport, auto-rickshaw, or cab from any part of the city. The location is well-connected and easily accessible.`}</p>
      </div>
    </div>
  );
};

export default InteractiveMap;
