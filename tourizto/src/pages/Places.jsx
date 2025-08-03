import React, { useState, useEffect, useCallback, memo } from 'react';
import { useSavedPlaces } from '../context/SavedPlacesContext';
import { useToast } from '../context/ToastContext';
import BookingForm from '../components/BookingForm';
import PlaceDetail from '../components/PlaceDetail';
import LazyImage from '../components/LazyImage';
import placesData from '../data/placesData';
import './Places.css';



const Places = memo(({ user }) => {
  const [filter, setFilter] = useState('all');
  const { savePlace, removePlace, isPlaceSaved } = useSavedPlaces();
  const toast = useToast();
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [showPlaceDetail, setShowPlaceDetail] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // Use the imported places data
  const places = placesData;

  // Debug: Log the first place to see its structure
  console.log("First place data:", places[0]);
  console.log("First place image:", places[0].image);

  // Handle search functionality
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setIsSearching(false);
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    const query = searchQuery.toLowerCase().trim();

    const results = places.filter(place =>
      place.name.toLowerCase().includes(query) ||
      place.description.toLowerCase().includes(query) ||
      place.category.toLowerCase().includes(query)
    );

    setSearchResults(results);
  }, [searchQuery, places]);

  // Get filtered places based on category filter
  const getFilteredPlaces = () => {
    if (isSearching) {
      return searchResults;
    }

    return filter === 'all'
      ? places
      : places.filter(place => place.category === filter);
  };

  const filteredPlaces = getFilteredPlaces();

  // Handle save/unsave place
  const handleSaveToggle = (place) => {
    if (isPlaceSaved(place.id)) {
      removePlace(place.id);
      showNotification(`${place.name} removed from saved places`, 'success');
    } else {
      savePlace(place);
      showNotification(`${place.name} added to saved places`, 'success');
    }
  };

  // Show notification using toast
  const showNotification = useCallback((message, type) => {
    toast[type](message);
  }, [toast]);

  // Handle booking
  const handleBooking = (place) => {
    setSelectedPlace(place);
    setShowBookingForm(true);
  };

  // Close booking form
  const closeBookingForm = () => {
    setShowBookingForm(false);
    if (!showPlaceDetail) {
      setSelectedPlace(null);
    }
  };

  // Handle view details
  const handleViewDetails = (place) => {
    setSelectedPlace(place);
    setShowPlaceDetail(true);
  };

  // Close place detail
  const closePlaceDetail = () => {
    setShowPlaceDetail(false);
    if (!showBookingForm) {
      setSelectedPlace(null);
    }
  };

  // Group places by category for section display
  const placesByCategory = {
    historical: places.filter(place => place.category === 'historical'),
    food: places.filter(place => place.category === 'food'),
    nature: places.filter(place => place.category === 'nature'),
    religious: places.filter(place => place.category === 'religious')
  };

  // Get category name for display
  const getCategoryName = (category) => {
    const names = {
      'historical': 'Historical Places',
      'food': 'Food & Culinary Experiences',
      'nature': 'Nature & Outdoor Attractions',
      'religious': 'Religious & Spiritual Sites'
    };
    return names[category] || category;
  };

  return (
    <div className="places-container">

      <div className="places-header">
        <h1>Explore Indore's Top Destinations</h1>
        <p>Welcome, {user?.name || 'Explorer'}! Discover the best places to visit in Indore.</p>

        <div className="search-container">
          <div className="search-input-wrapper">
            <i className="fas fa-search search-icon"></i>
            <input
              type="text"
              className="search-input"
              placeholder="Search places, categories, or descriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <i className="fas fa-times"></i>
              </button>
            )}
          </div>

          {isSearching && (
            <div className="search-results-info">
              Found {searchResults.length} {searchResults.length === 1 ? 'place' : 'places'} matching "{searchQuery}"
              {searchResults.length === 0 && (
                <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
                  Clear Search
                </button>
              )}
            </div>
          )}
        </div>

        <div className="filter-container">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === 'historical' ? 'active historical' : ''}`}
            onClick={() => setFilter('historical')}
          >
            <i className="fas fa-landmark"></i> Historical
          </button>
          <button
            className={`filter-btn ${filter === 'food' ? 'active food' : ''}`}
            onClick={() => setFilter('food')}
          >
            <i className="fas fa-utensils"></i> Food
          </button>
          <button
            className={`filter-btn ${filter === 'nature' ? 'active nature' : ''}`}
            onClick={() => setFilter('nature')}
          >
            <i className="fas fa-tree"></i> Nature
          </button>
          <button
            className={`filter-btn ${filter === 'religious' ? 'active religious' : ''}`}
            onClick={() => setFilter('religious')}
          >
            <i className="fas fa-pray"></i> Religious
          </button>
        </div>
      </div>

      {filter === 'all' ? (
        // Display by categories when "All" is selected
        Object.keys(placesByCategory).map(category => (
          placesByCategory[category].length > 0 && (
            <div className="category-section" key={category}>
              <h2 className="category-title">
                {getCategoryName(category)}
                <span className="category-count">{placesByCategory[category].length} places</span>
              </h2>
              <div className="places-grid">
                {placesByCategory[category].map(place => (
                  <div className={`place-card ${place.category}`} key={place.id}>
                    <div className="place-image-container">
                      <LazyImage
                        src={place.imageData?.main || place.image}
                        alt={place.imageData?.alt || `${place.name} - ${place.category} attraction in Indore`}
                        aspectRatio="16:9"
                        className="place-image"
                        category={place.category}
                        name={place.name}
                        attribution={place.imageData?.attribution}
                      />
                      <div className={`place-price ${place.price === 0 ? 'free' : ''}`}>
                        {place.price === 0 ? 'Free Entry' : `₹${place.price}/person`}
                      </div>
                      <div className="place-category-tag">{place.category}</div>
                      <button
                        className={`save-btn ${isPlaceSaved(place.id) ? 'saved' : ''}`}
                        onClick={() => handleSaveToggle(place)}
                        title={isPlaceSaved(place.id) ? "Remove from saved places" : "Save this place"}
                      >
                        {isPlaceSaved(place.id) ? '★' : '☆'}
                      </button>
                    </div>
                    <div className="place-details">
                      <h3>{place.name}</h3>
                      <p>{place.description}</p>
                      <div className="place-meta">
                        <span><i className="far fa-clock"></i> {place.timeRequired || "1-2 hours"}</span>
                        <span><i className="far fa-calendar-alt"></i> {place.bestTime || "Anytime"}</span>
                      </div>
                      <div className="place-actions">
                        <button
                          className="view-details-btn"
                          onClick={() => handleViewDetails(place)}
                        >
                          <i className="fas fa-info-circle"></i> View Details
                        </button>
                        {place.price > 0 ? (
                          <button
                            className="book-btn"
                            onClick={() => handleBooking(place)}
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
                        <button
                          className={`save-text-btn ${isPlaceSaved(place.id) ? 'saved' : ''}`}
                          onClick={() => handleSaveToggle(place)}
                        >
                          {isPlaceSaved(place.id) ? 'Saved' : 'Save'}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        ))
      ) : (
        // Display filtered places when a specific category is selected
        <div className="places-grid">
          {filteredPlaces.map(place => (
            <div className={`place-card ${place.category}`} key={place.id}>
              <div className="place-image-container">
                <LazyImage
                  src={place.imageData?.main || place.image}
                  alt={place.imageData?.alt || `${place.name} - ${place.category} attraction in Indore`}
                  aspectRatio="16:9"
                  className="place-image"
                  category={place.category}
                  name={place.name}
                  attribution={place.imageData?.attribution}
                />
                <div className={`place-price ${place.price === 0 ? 'free' : ''}`}>
                  {place.price === 0 ? 'Free Entry' : `₹${place.price}/person`}
                </div>
                <div className="place-category-tag">{place.category}</div>
                <button
                  className={`save-btn ${isPlaceSaved(place.id) ? 'saved' : ''}`}
                  onClick={() => handleSaveToggle(place)}
                  title={isPlaceSaved(place.id) ? "Remove from saved places" : "Save this place"}
                >
                  {isPlaceSaved(place.id) ? '★' : '☆'}
                </button>
              </div>
              <div className="place-details">
                <h3>{place.name}</h3>
                <p>{place.description}</p>
                <div className="place-meta">
                  <span><i className="far fa-clock"></i> {place.timeRequired || "1-2 hours"}</span>
                  <span><i className="far fa-calendar-alt"></i> {place.bestTime || "Anytime"}</span>
                </div>
                <div className="place-actions">
                  <button
                    className="view-details-btn"
                    onClick={() => handleViewDetails(place)}
                  >
                    <i className="fas fa-info-circle"></i> View Details
                  </button>
                  {place.price > 0 ? (
                    <button
                      className="book-btn"
                      onClick={() => handleBooking(place)}
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
                  <button
                    className={`save-text-btn ${isPlaceSaved(place.id) ? 'saved' : ''}`}
                    onClick={() => handleSaveToggle(place)}
                  >
                    {isPlaceSaved(place.id) ? 'Saved' : 'Save'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Booking Form */}
      {showBookingForm && selectedPlace && (
        <BookingForm
          place={selectedPlace}
          onClose={closeBookingForm}
        />
      )}

      {/* Place Detail */}
      {showPlaceDetail && selectedPlace && (
        <PlaceDetail
          place={{
            ...selectedPlace,
            onBook: () => {
              setShowPlaceDetail(false);
              setShowBookingForm(true);
            }
          }}
          onClose={closePlaceDetail}
        />
      )}
    </div>
  );
});

export default Places;
