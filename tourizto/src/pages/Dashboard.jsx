import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useSavedPlaces } from '../context/SavedPlacesContext';
import RecommendedPlaces from '../components/RecommendedPlaces';
import PlaceDetail from '../components/PlaceDetail';
import placesData from '../data/placesData';
import imageData from '../data/imageData';
import './Dashboard.css';

const Dashboard = ({ user }) => {
  console.log("Dashboard rendering with user:", user);
  console.log("imageData available:", imageData);
  const { savedPlaces, removePlace } = useSavedPlaces();
  const [activeTab, setActiveTab] = useState('upcoming');

  // Sample upcoming trips (for UI demonstration)
  const upcomingTrips = [
    {
      id: 1,
      name: "Weekend Getaway",
      date: "May 15, 2023",
      places: ["Rajwada Palace", "Sarafa Bazaar"],
      image: imageData.rajwadaPalace.main
    },
    {
      id: 2,
      name: "Heritage Tour",
      date: "June 5, 2023",
      places: ["Lal Bagh Palace", "Krishnapura Chhatris"],
      image: imageData.lalbaghPalace.main
    }
  ];

  // Sample past trips (for UI demonstration)
  const pastTrips = [
    {
      id: 3,
      name: "Nature Retreat",
      date: "March 10, 2023",
      places: ["Patalpani Waterfall", "Choral Dam"],
      image: imageData.patalpani.main
    },
    {
      id: 4,
      name: "Spiritual Journey",
      date: "February 20, 2023",
      places: ["Kanch Mandir", "Annapurna Temple", "Gomatgiri"],
      image: imageData.annapurnaTemple.main
    }
  ];

  // State for place detail view
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [showPlaceDetail, setShowPlaceDetail] = useState(false);

  // Handle view details for recommended places
  const handleViewDetails = (place) => {
    setSelectedPlace(place);
    setShowPlaceDetail(true);
  };

  // Travel inspiration categories
  const travelCategories = [
    {
      id: 1,
      title: "Historical Sites",
      description: "Explore Indore's rich heritage and royal past",
      image: imageData.rajwadaPalace.main,
      places: ["Rajwada Palace", "Lal Bagh Palace", "Central Museum"]
    },
    {
      id: 2,
      title: "Food & Culture",
      description: "Experience the flavors and traditions of Indore",
      image: imageData.sarafa.main,
      places: ["Sarafa Bazaar", "Chappan Dukan", "56 Shops"]
    },
    {
      id: 3,
      title: "Nature Escapes",
      description: "Discover natural beauty around Indore",
      image: imageData.patalpani.main,
      places: ["Patalpani Waterfall", "Choral Dam", "Tincha Falls"]
    },
    {
      id: 4,
      title: "Heritage Palaces",
      description: "Visit magnificent palaces with stunning architecture",
      image: imageData.lalbaghPalace.main,
      places: ["Lal Bagh Palace", "Krishnapura Chhatris", "Gandhi Hall"]
    },
    {
      id: 5,
      title: "Religious Sites",
      description: "Explore the spiritual side of Indore",
      image: imageData.kanchMandir.main,
      places: ["Kanch Mandir", "Annapurna Temple", "Gomatgiri"]
    }
  ];

  return (
    <div className="dashboard-container">
      {/* Hero Section */}
      <div className="dashboard-hero">
        <div className="dashboard-hero-content">
          <h1>{user ? `Welcome to Your Dashboard, ${user.name || 'Explorer'}!` : 'Discover the Heart of Madhya Pradesh'}</h1>
          <p>{user ? 'Plan your trips, save your favorite places, and manage your Indore adventure' : 'Explore the rich heritage, vibrant culture, and hidden gems of Indore'}</p>
          <div className="dashboard-hero-buttons">
            <Link to={user ? "/places" : "#travel-categories"}>
              <button className="hero-btn primary">
                <i className="fas fa-compass"></i> Explore Destinations
              </button>
            </Link>
            {user ? (
              <button className="hero-btn secondary">
                <i className="fas fa-map-marked-alt"></i> View My Trips
              </button>
            ) : (
              <button className="hero-btn secondary" onClick={() => document.querySelector('.login-button').click()}>
                <i className="fas fa-user"></i> Sign In to Plan
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="dashboard-main">
        {/* User-specific sections only shown when logged in */}
        {user && (
          <>
            {/* My Trips Section */}
            <div className="dashboard-section trips-section">
              <div className="section-header">
                <h2><i className="fas fa-suitcase"></i> My Trips</h2>
                <div className="trip-tabs">
                  <button
                    className={`trip-tab ${activeTab === 'upcoming' ? 'active' : ''}`}
                    onClick={() => setActiveTab('upcoming')}
                  >
                    Upcoming
                  </button>
                  <button
                    className={`trip-tab ${activeTab === 'past' ? 'active' : ''}`}
                    onClick={() => setActiveTab('past')}
                  >
                    Past
                  </button>
                </div>
              </div>

              <div className="trips-container">
                {activeTab === 'upcoming' && (
                  <>
                    {upcomingTrips.length > 0 ? (
                      <div className="trips-grid">
                        {upcomingTrips.map(trip => (
                          <div className="trip-card" key={trip.id}>
                            <div className="trip-image" style={{ backgroundImage: `url(${trip.image})` }}>
                              <div className="trip-date">{trip.date}</div>
                            </div>
                            <div className="trip-details">
                              <h3>{trip.name}</h3>
                              <p>{trip.places.join(' • ')}</p>
                              <div className="trip-actions">
                                <button className="trip-btn view">
                                  <i className="fas fa-eye"></i> View
                                </button>
                                <button className="trip-btn edit">
                                  <i className="fas fa-edit"></i> Edit
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                        <div className="trip-card add-trip">
                          <div className="add-trip-content">
                            <div className="add-icon">
                              <i className="fas fa-plus"></i>
                            </div>
                            <h3>Plan a New Trip</h3>
                            <p>Create your custom itinerary</p>
                            <Link to="/places">
                              <button className="trip-btn plan">Start Planning</button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="empty-trips">
                        <div className="empty-icon">
                          <i className="fas fa-calendar-plus"></i>
                        </div>
                        <h3>No Upcoming Trips</h3>
                        <p>You haven't planned any trips yet. Start exploring destinations!</p>
                        <div className="empty-actions">
                          <Link to="/places">
                            <button className="dashboard-btn">
                              <i className="fas fa-map-marker-alt"></i> Browse Destinations
                            </button>
                          </Link>
                          <Link to="/places">
                            <button className="dashboard-btn secondary">
                              <i className="fas fa-calendar-plus"></i> Plan a Trip
                            </button>
                          </Link>
                        </div>
                      </div>
                    )}
                  </>
                )}

                {activeTab === 'past' && (
                  <>
                    {pastTrips.length > 0 ? (
                      <div className="trips-grid">
                        {pastTrips.map(trip => (
                          <div className="trip-card past" key={trip.id}>
                            <div className="trip-image" style={{ backgroundImage: `url(${trip.image})` }}>
                              <div className="trip-date">{trip.date}</div>
                            </div>
                            <div className="trip-details">
                              <h3>{trip.name}</h3>
                              <p>{trip.places.join(' • ')}</p>
                              <div className="trip-actions">
                                <button className="trip-btn view">
                                  <i className="fas fa-eye"></i> View
                                </button>
                                <button className="trip-btn review">
                                  <i className="fas fa-star"></i> Review
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="empty-trips">
                        <div className="empty-icon">
                          <i className="fas fa-history"></i>
                        </div>
                        <h3>No Past Trips</h3>
                        <p>Your completed trips will appear here.</p>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Saved Places Section */}
            <div className="dashboard-section saved-places-section">
              <div className="section-header">
                <h2><i className="fas fa-heart"></i> Saved Places</h2>
                <Link to="/places" className="view-all-link">View All</Link>
              </div>

              {savedPlaces.length > 0 ? (
                <div className="saved-places-grid">
                  {savedPlaces.map(place => (
                    <div className="saved-place-card" key={place.id}>
                      <div className="saved-place-image" style={{ backgroundImage: `url(${place.image})` }}>
                        <button
                          className="remove-saved-btn"
                          onClick={() => removePlace(place.id)}
                          title="Remove from saved places"
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                      <div className="saved-place-details">
                        <h3>{place.name}</h3>
                        <p className="place-price">{place.price === 0 ? 'Free Entry' : `₹${place.price}/person`}</p>
                        <div className="saved-place-actions">
                          <Link to={`/places?id=${place.id}`}>
                            <button className="place-btn details">
                              <i className="fas fa-info-circle"></i> Details
                            </button>
                          </Link>
                          {place.price > 0 ? (
                            <button className="place-btn book">
                              <i className="fas fa-ticket-alt"></i> Book
                            </button>
                          ) : (
                            <button className="place-btn visit">
                              <i className="fas fa-map-marker-alt"></i> Visit
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-saved-places">
                  <div className="empty-icon">
                    <i className="fas fa-heart-broken"></i>
                  </div>
                  <h3>No Saved Places</h3>
                  <p>Save your favorite destinations to plan your perfect trip!</p>
                  <Link to="/places">
                    <button className="dashboard-btn">
                      <i className="fas fa-search"></i> Discover Places
                    </button>
                  </Link>
                </div>
              )}
            </div>

            {/* Profile and Recommendations Section */}
            <div className="dashboard-bottom">
              {/* Profile Card */}
              <div className="profile-card">
                <div className="profile-header">
                  <div className="profile-avatar">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="profile-info">
                    <h3>My Profile</h3>
                    <p className="profile-email">{user?.email || 'Not available'}</p>
                  </div>
                </div>
                <div className="profile-details">
                  <div className="profile-detail">
                    <span className="detail-label">Name</span>
                    <span className="detail-value">{user?.name || 'Not available'}</span>
                  </div>
                  <div className="profile-detail">
                    <span className="detail-label">Member Since</span>
                    <span className="detail-value">May 2023</span>
                  </div>
                  <div className="profile-detail">
                    <span className="detail-label">Trips Planned</span>
                    <span className="detail-value">{upcomingTrips.length + pastTrips.length}</span>
                  </div>
                  <div className="profile-detail">
                    <span className="detail-label">Places Saved</span>
                    <span className="detail-value">{savedPlaces.length}</span>
                  </div>
                </div>
                <button className="dashboard-btn edit-profile">
                  <i className="fas fa-user-edit"></i> Edit Profile
                </button>
              </div>

              {/* Recommendations */}
              <div className="recommendations-card">
                <RecommendedPlaces
                  places={placesData}
                  onViewDetails={handleViewDetails}
                />
              </div>
            </div>
          </>
        )}

        {/* Non-user specific sections - always shown */}
        {!user && (
          <div className="welcome-message">
            <div className="welcome-icon">
              <i className="fas fa-map-marked-alt"></i>
            </div>
            <h2>Welcome to Tourizto</h2>
            <p>Your gateway to exploring the beautiful city of Indore</p>
            <div className="welcome-actions">
              <button className="welcome-btn" onClick={() => document.querySelector('.login-button').click()}>
                <i className="fas fa-user-plus"></i> Sign Up to Plan Your Trip
              </button>
            </div>
          </div>
        )}

        {/* Travel Inspiration Section */}
        <div id="travel-categories" className="dashboard-section inspiration-section">
          <div className="section-header">
            <h2><i className="fas fa-globe-asia"></i> Travel Inspiration</h2>
            <Link to="/places" className="view-all-link">Explore All</Link>
          </div>

          <div className="travel-categories">
            {travelCategories.map(category => (
              <div className="category-card" key={category.id}>
                <div className="category-image" style={{ backgroundImage: `url(${category.image})` }}>
                  <div className="category-overlay">
                    <h3>{category.title}</h3>
                  </div>
                </div>
                <div className="category-details">
                  <p>{category.description}</p>
                  <div className="category-places">
                    {category.places.map((place, index) => (
                      <span key={index} className="place-tag">{place}</span>
                    ))}
                  </div>
                  <Link to="/places">
                    <button className="category-btn">
                      <i className="fas fa-arrow-right"></i> Discover
                    </button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Travel Tips Section */}
        <div className="dashboard-section tips-section">
          <div className="section-header">
            <h2><i className="fas fa-lightbulb"></i> Travel Tips for Indore</h2>
          </div>

          <div className="tips-container">
            <div className="tip-card">
              <div className="tip-icon">
                <i className="fas fa-utensils"></i>
              </div>
              <h3>Food Paradise</h3>
              <p>Don't miss Indore's famous street food at Sarafa Bazaar and Chappan Dukan. Try the local specialties like poha, kachori, and sabudana khichdi.</p>
            </div>

            <div className="tip-card">
              <div className="tip-icon">
                <i className="fas fa-calendar-alt"></i>
              </div>
              <h3>Best Time to Visit</h3>
              <p>October to March offers the most pleasant weather for exploring Indore. Avoid summer months (April-June) when temperatures can soar.</p>
            </div>

            <div className="tip-card">
              <div className="tip-icon">
                <i className="fas fa-map-marked-alt"></i>
              </div>
              <h3>Getting Around</h3>
              <p>Auto-rickshaws and taxis are readily available. For a more authentic experience, try the local city buses or rent a bike for short distances.</p>
            </div>

            <div className="tip-card">
              <div className="tip-icon">
                <i className="fas fa-shopping-bag"></i>
              </div>
              <h3>Shopping</h3>
              <p>Shop for Maheshwari and Chanderi sarees, leather items, and handicrafts. Rajwada area has many traditional markets worth exploring.</p>
            </div>

            <div className="tip-card">
              <div className="tip-icon">
                <i className="fas fa-paw"></i>
              </div>
              <h3>Wildlife</h3>
              <p>Don't miss Ralamandal Wildlife Sanctuary, just 18km from the city. It's the oldest sanctuary in Madhya Pradesh and perfect for nature lovers.</p>
            </div>
          </div>
        </div>

        {/* Wildlife Section */}
        <div className="dashboard-section wildlife-section">
          <div className="section-header">
            <h2><i className="fas fa-leaf"></i> Wildlife Near Indore</h2>
          </div>

          <div className="wildlife-showcase">
            <div className="wildlife-image" style={{ backgroundImage: `url(${imageData.ralamandal.main})` }}>
              <div className="wildlife-overlay">
                <h3>Ralamandal Wildlife Sanctuary</h3>
                <p>Oldest sanctuary in Madhya Pradesh, just 18km from Indore</p>
                <Link to="/places">
                  <button className="wildlife-btn">
                    <i className="fas fa-info-circle"></i> Learn More
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Place Detail Modal */}
      {showPlaceDetail && selectedPlace && (
        <PlaceDetail
          place={selectedPlace}
          onClose={() => setShowPlaceDetail(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
