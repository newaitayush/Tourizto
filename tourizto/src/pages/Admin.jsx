import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { fetchUsers, fetchBookings, fetchPlaces, updateBookingStatus } from '../utils/adminApi';
import './Admin.css';

const Admin = ({ user }) => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [places, setPlaces] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [userModalOpen, setUserModalOpen] = useState(false);

  // Check if user is admin
  if (!user || !user.isAdmin) {
    return <Navigate to="/" replace />;
  }

  // State to track data refresh
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Function to refresh data
  const refreshData = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  // Fetch real data from backend
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      console.log('Fetching admin data...');

      try {
        // Fetch users
        const usersResponse = await fetchUsers();
        if (usersResponse.success) {
          console.log('Users fetched successfully:', usersResponse.users);
          setUsers(usersResponse.users);
        } else {
          console.error('Failed to fetch users:', usersResponse.message);
          // Set empty array if fetch fails
          setUsers([]);
        }

        // Fetch places
        const placesResponse = await fetchPlaces();
        if (placesResponse.success) {
          console.log('Places fetched successfully:', placesResponse.places);
          setPlaces(placesResponse.places);
        } else {
          console.error('Failed to fetch places:', placesResponse.message);
          setPlaces([]);
        }

        // Fetch bookings
        const bookingsResponse = await fetchBookings();
        if (bookingsResponse.success) {
          console.log('Bookings fetched successfully:', bookingsResponse.bookings);
          setBookings(bookingsResponse.bookings);
        } else {
          console.error('Failed to fetch bookings:', bookingsResponse.message);
          setBookings([]);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Set empty arrays if fetch fails
        setUsers([]);
        setPlaces([]);
        setBookings([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Set up an interval to refresh data every 30 seconds
    const refreshInterval = setInterval(() => {
      console.log('Auto-refreshing admin data...');
      fetchData();
    }, 30000);

    // Clean up interval on component unmount
    return () => clearInterval(refreshInterval);
  }, [refreshTrigger]); // Re-fetch when refreshTrigger changes

  // Filter data based on search term
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPlaces = places.filter(place =>
    place.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    place.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredBookings = bookings.filter(booking =>
    booking.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.placeName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle user click
  const handleUserClick = (user) => {
    setSelectedUser(user);
    setUserModalOpen(true);
  };

  // Close user modal
  const closeUserModal = () => {
    setUserModalOpen(false);
  };

  // Handle user status change
  const handleStatusChange = async (id, newStatus) => {
    try {
      // In a real application, you would call an API to update the user status
      // For now, we'll just update the local state
      setUsers(users.map(user =>
        user.id === id ? { ...user, status: newStatus } : user
      ));

      // Show success message (in a real app, you would wait for API response)
      alert(`User status updated to ${newStatus}`);
    } catch (error) {
      console.error('Error updating user status:', error);
      alert('Failed to update user status');
    }
  };

  // Handle booking status change
  const handleBookingStatusChange = async (id, newStatus) => {
    try {
      // Call API to update booking status
      const response = await updateBookingStatus(id, newStatus);

      if (response.success) {
        // Update local state
        setBookings(bookings.map(booking =>
          booking.id === id ? { ...booking, status: newStatus } : booking
        ));
        alert(`Booking status updated to ${newStatus}`);
      } else {
        alert(`Failed to update booking status: ${response.message}`);
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
      alert('Failed to update booking status');
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-sidebar">
        <div className="admin-logo">
          <h2>Tourizto Admin</h2>
        </div>
        <ul className="admin-menu">
          <li
            className={activeTab === 'dashboard' ? 'active' : ''}
            onClick={() => setActiveTab('dashboard')}
          >
            <i className="fas fa-tachometer-alt"></i> Dashboard
          </li>
          <li
            className={activeTab === 'users' ? 'active' : ''}
            onClick={() => setActiveTab('users')}
          >
            <i className="fas fa-users"></i> Users
          </li>
          <li
            className={activeTab === 'places' ? 'active' : ''}
            onClick={() => setActiveTab('places')}
          >
            <i className="fas fa-map-marker-alt"></i> Places
          </li>
          <li
            className={activeTab === 'bookings' ? 'active' : ''}
            onClick={() => setActiveTab('bookings')}
          >
            <i className="fas fa-ticket-alt"></i> Bookings
          </li>
          <li
            className={activeTab === 'reports' ? 'active' : ''}
            onClick={() => setActiveTab('reports')}
          >
            <i className="fas fa-chart-bar"></i> Reports
          </li>
          <li
            className={activeTab === 'settings' ? 'active' : ''}
            onClick={() => setActiveTab('settings')}
          >
            <i className="fas fa-cog"></i> Settings
          </li>
        </ul>

        <div className="admin-sidebar-footer">
          <button className="admin-help-btn">
            <i className="fas fa-question-circle"></i> Help
          </button>
          <button className="admin-logout-btn">
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        </div>
      </div>

      <div className="admin-content">
        <div className="admin-header">
          <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
          <div className="admin-header-actions">
            <button
              className="refresh-btn"
              onClick={refreshData}
              disabled={loading}
            >
              {loading ? 'Refreshing...' : 'Refresh Data'}
            </button>
            <div className="admin-search">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="admin-main">
          {loading ? (
            <div className="admin-loading">
              <div className="loading-spinner"></div>
              <p>Loading data...</p>
            </div>
          ) : (
            <>
              {activeTab === 'dashboard' && (
                <div className="dashboard-container">
                  <div className="dashboard-welcome">
                    <div className="welcome-text">
                      <h2>Welcome back, Admin!</h2>
                      <p>Here's what's happening with your tourism platform today.</p>
                    </div>
                    <div className="dashboard-actions">
                      <button className="dashboard-btn primary">
                        <i className="fas fa-plus"></i> Add New Place
                      </button>
                      <button className="dashboard-btn secondary">
                        <i className="fas fa-download"></i> Download Report
                      </button>
                    </div>
                  </div>

                  <div className="dashboard-stats">
                    <div className="stat-card">
                      <div className="stat-icon users">
                        <i className="fas fa-users"></i>
                      </div>
                      <div className="stat-content">
                        <h3>Total Users</h3>
                        <p className="stat-number">{users.length}</p>
                        <p className="stat-info">Active: {users.filter(u => u.status === 'active').length}</p>
                      </div>
                      <button className="stat-action-btn">
                        <i className="fas fa-arrow-right"></i>
                      </button>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon places">
                        <i className="fas fa-map-marker-alt"></i>
                      </div>
                      <div className="stat-content">
                        <h3>Total Places</h3>
                        <p className="stat-number">{places.length}</p>
                        <p className="stat-info">Most Popular: Sarafa Bazaar</p>
                      </div>
                      <button className="stat-action-btn">
                        <i className="fas fa-arrow-right"></i>
                      </button>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon bookings">
                        <i className="fas fa-ticket-alt"></i>
                      </div>
                      <div className="stat-content">
                        <h3>Total Bookings</h3>
                        <p className="stat-number">{bookings.length}</p>
                        <p className="stat-info">Confirmed: {bookings.filter(b => b.status === 'confirmed').length}</p>
                      </div>
                      <button className="stat-action-btn">
                        <i className="fas fa-arrow-right"></i>
                      </button>
                    </div>
                    <div className="stat-card">
                      <div className="stat-icon revenue">
                        <i className="fas fa-rupee-sign"></i>
                      </div>
                      <div className="stat-content">
                        <h3>Revenue</h3>
                        <p className="stat-number">₹{bookings.reduce((sum, booking) => sum + (booking.amount || 0), 0)}</p>
                        <p className="stat-info">This Month</p>
                      </div>
                      <button className="stat-action-btn">
                        <i className="fas fa-arrow-right"></i>
                      </button>
                    </div>
                  </div>

                  <div className="dashboard-sections">
                    <div className="dashboard-section recent-bookings">
                      <div className="section-header">
                        <h3>Recent Bookings</h3>
                        <button className="view-all-btn">View All</button>
                      </div>
                      <div className="recent-bookings-list">
                        {bookings.slice(0, 5).map(booking => (
                          <div className="recent-booking-item" key={booking.id}>
                            <div className="booking-user">
                              <div className="user-avatar">{booking.userName.charAt(0)}</div>
                              <div className="user-info">
                                <span className="user-name">{booking.userName}</span>
                                <span className="booking-place">{booking.placeName}</span>
                              </div>
                            </div>
                            <div className="booking-details">
                              <span className="booking-date">{booking.date}</span>
                              <span className={`booking-status ${booking.status}`}>{booking.status}</span>
                            </div>
                            <div className="booking-amount">₹{booking.amount}</div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="dashboard-section popular-places">
                      <div className="section-header">
                        <h3>Popular Places</h3>
                        <button className="view-all-btn">View All</button>
                      </div>
                      <div className="popular-places-grid">
                        {places.slice(0, 4).map(place => (
                          <div className="popular-place-card" key={place.id}>
                            <div className="place-image" style={{ backgroundImage: `url(${place.image})` }}>
                              <div className="place-category">{place.category}</div>
                            </div>
                            <div className="popular-place-info">
                              <h4>{place.name}</h4>
                              <div className="place-stats">
                                <span><i className="fas fa-ticket-alt"></i> {place.bookings || 0}</span>
                                <span><i className="fas fa-star"></i> {place.rating || 4.5}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'users' && (
                <div className="admin-table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Joined Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map(user => (
                        <tr key={user.id}>
                          <td>{user.id}</td>
                          <td>{user.name}</td>
                          <td>{user.email}</td>
                          <td>{user.createdAt}</td>
                          <td>
                            <span className={`status-badge ${user.status}`}>
                              {user.status}
                            </span>
                          </td>
                          <td>
                            <button
                              className="action-btn view"
                              onClick={() => handleUserClick(user)}
                            >
                              View
                            </button>
                            <button
                              className="action-btn edit"
                              onClick={() => handleUserClick(user)}
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'places' && (
                <div className="admin-table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Bookings</th>
                        <th>Rating</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredPlaces.map(place => (
                        <tr key={place.id}>
                          <td>{place.id}</td>
                          <td>{place.name}</td>
                          <td>{place.category}</td>
                          <td>{place.bookings}</td>
                          <td>{place.rating}</td>
                          <td>
                            <button className="action-btn view">View</button>
                            <button className="action-btn edit">Edit</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'bookings' && (
                <div className="admin-table-container">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>User</th>
                        <th>Place</th>
                        <th>Date & Time</th>
                        <th>Guests</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredBookings.map(booking => (
                        <tr key={booking.id}>
                          <td>{booking.id}</td>
                          <td>
                            <div className="user-info-cell">
                              <div>{booking.userName}</div>
                              <div className="small-text">{booking.email}</div>
                              <div className="small-text">{booking.phone}</div>
                            </div>
                          </td>
                          <td>{booking.placeName}</td>
                          <td>
                            <div>{booking.date}</div>
                            <div className="small-text">{booking.time}</div>
                          </td>
                          <td>{booking.guests}</td>
                          <td>₹{booking.amount}</td>
                          <td>
                            <select
                              value={booking.status}
                              onChange={(e) => handleBookingStatusChange(booking.id, e.target.value)}
                              className={`status-select ${booking.status}`}
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td>
                            <button
                              className="action-btn view"
                              onClick={() => alert(`Booking Reference: ${booking.bookingReference || 'N/A'}`)}
                            >
                              View
                            </button>
                            <button
                              className="action-btn edit"
                              onClick={() => alert(`This would open a booking edit form in a real application.`)}
                            >
                              Edit
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'reports' && (
                <div className="reports-container">
                  <div className="reports-header">
                    <h2>Analytics & Reports</h2>
                    <div className="reports-actions">
                      <select className="report-period-select">
                        <option value="7">Last 7 days</option>
                        <option value="30" selected>Last 30 days</option>
                        <option value="90">Last 90 days</option>
                        <option value="365">Last year</option>
                      </select>
                      <button className="export-btn">
                        <i className="fas fa-download"></i> Export
                      </button>
                    </div>
                  </div>

                  <div className="reports-grid">
                    <div className="report-card">
                      <h3>Booking Trends</h3>
                      <div className="chart-placeholder">
                        <div className="chart-bars">
                          <div className="chart-bar" style={{ height: '60%' }}></div>
                          <div className="chart-bar" style={{ height: '80%' }}></div>
                          <div className="chart-bar" style={{ height: '40%' }}></div>
                          <div className="chart-bar" style={{ height: '70%' }}></div>
                          <div className="chart-bar" style={{ height: '90%' }}></div>
                          <div className="chart-bar" style={{ height: '50%' }}></div>
                          <div className="chart-bar" style={{ height: '75%' }}></div>
                        </div>
                      </div>
                      <div className="report-summary">
                        <div className="summary-item">
                          <span className="summary-label">Total Bookings</span>
                          <span className="summary-value">{bookings.length}</span>
                        </div>
                        <div className="summary-item">
                          <span className="summary-label">Growth</span>
                          <span className="summary-value positive">+12.5%</span>
                        </div>
                      </div>
                    </div>

                    <div className="report-card">
                      <h3>Popular Destinations</h3>
                      <div className="popular-places">
                        {places.slice(0, 5).map((place, index) => (
                          <div className="popular-place-item" key={place.id}>
                            <span className="place-rank">{index + 1}</span>
                            <span className="place-name">{place.name}</span>
                            <div className="place-bar-container">
                              <div
                                className="place-bar"
                                style={{ width: `${Math.max(30, 50 + index * 10)}%` }}
                              ></div>
                            </div>
                            <span className="place-value">{place.bookings || 0}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="report-card">
                      <h3>Revenue Overview</h3>
                      <div className="revenue-stats">
                        <div className="revenue-total">
                          <span className="revenue-label">Total Revenue</span>
                          <span className="revenue-value">₹{bookings.reduce((sum, booking) => sum + (booking.amount || 0), 0)}</span>
                        </div>
                        <div className="revenue-chart">
                          <div className="pie-chart">
                            <div className="pie-slice slice1"></div>
                            <div className="pie-slice slice2"></div>
                            <div className="pie-slice slice3"></div>
                          </div>
                        </div>
                        <div className="revenue-legend">
                          <div className="legend-item">
                            <span className="legend-color historical"></span>
                            <span className="legend-label">Historical</span>
                          </div>
                          <div className="legend-item">
                            <span className="legend-color nature"></span>
                            <span className="legend-label">Nature</span>
                          </div>
                          <div className="legend-item">
                            <span className="legend-color food"></span>
                            <span className="legend-label">Food</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="report-card">
                      <h3>User Activity</h3>
                      <div className="user-activity">
                        <div className="activity-stat">
                          <i className="fas fa-user-plus"></i>
                          <div className="stat-details">
                            <span className="stat-value">{users.length}</span>
                            <span className="stat-label">Total Users</span>
                          </div>
                        </div>
                        <div className="activity-stat">
                          <i className="fas fa-ticket-alt"></i>
                          <div className="stat-details">
                            <span className="stat-value">{bookings.length}</span>
                            <span className="stat-label">Bookings</span>
                          </div>
                        </div>
                        <div className="activity-stat">
                          <i className="fas fa-star"></i>
                          <div className="stat-details">
                            <span className="stat-value">4.7</span>
                            <span className="stat-label">Avg. Rating</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'settings' && (
                <div className="settings-container">
                  <h2>Admin Settings</h2>
                  <div className="settings-grid">
                    <div className="settings-card">
                      <h3><i className="fas fa-user-cog"></i> User Settings</h3>
                      <div className="settings-options">
                        <div className="settings-option">
                          <label>
                            <input type="checkbox" checked /> Enable user registration
                          </label>
                        </div>
                        <div className="settings-option">
                          <label>
                            <input type="checkbox" checked /> Email notifications
                          </label>
                        </div>
                        <div className="settings-option">
                          <label>
                            <input type="checkbox" /> Require email verification
                          </label>
                        </div>
                        <button className="settings-btn">Save User Settings</button>
                      </div>
                    </div>

                    <div className="settings-card">
                      <h3><i className="fas fa-globe"></i> Site Settings</h3>
                      <div className="settings-options">
                        <div className="settings-option">
                          <label>Site Name</label>
                          <input type="text" value="Tourizto" />
                        </div>
                        <div className="settings-option">
                          <label>Contact Email</label>
                          <input type="email" value="contact@tourizto.com" />
                        </div>
                        <div className="settings-option">
                          <label>
                            <input type="checkbox" checked /> Maintenance Mode
                          </label>
                        </div>
                        <button className="settings-btn">Save Site Settings</button>
                      </div>
                    </div>

                    <div className="settings-card">
                      <h3><i className="fas fa-palette"></i> Appearance</h3>
                      <div className="settings-options">
                        <div className="settings-option">
                          <label>Theme</label>
                          <select>
                            <option>Light</option>
                            <option>Dark</option>
                            <option>System Default</option>
                          </select>
                        </div>
                        <div className="settings-option">
                          <label>Primary Color</label>
                          <input type="color" value="#ff7043" />
                        </div>
                        <div className="settings-option">
                          <label>
                            <input type="checkbox" checked /> Show animations
                          </label>
                        </div>
                        <button className="settings-btn">Save Appearance</button>
                      </div>
                    </div>

                    <div className="settings-card">
                      <h3><i className="fas fa-shield-alt"></i> Security</h3>
                      <div className="settings-options">
                        <div className="settings-option">
                          <label>
                            <input type="checkbox" checked /> Two-factor authentication
                          </label>
                        </div>
                        <div className="settings-option">
                          <label>Session Timeout (minutes)</label>
                          <input type="number" value="30" min="5" max="120" />
                        </div>
                        <div className="settings-option">
                          <label>
                            <input type="checkbox" checked /> HTTPS Only
                          </label>
                        </div>
                        <button className="settings-btn">Save Security Settings</button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {userModalOpen && selectedUser && (
        <div className="modal-overlay">
          <div className="user-modal">
            <button className="close-modal" onClick={closeUserModal}>×</button>
            <h2>User Details</h2>
            <div className="user-details">
              <div className="user-avatar-large">
                {selectedUser.name.charAt(0).toUpperCase()}
              </div>
              <div className="user-info-group">
                <label>Name:</label>
                <p>{selectedUser.name}</p>
              </div>
              <div className="user-info-group">
                <label>Email:</label>
                <p>{selectedUser.email}</p>
              </div>
              <div className="user-info-group">
                <label>Joined Date:</label>
                <p>{selectedUser.createdAt}</p>
              </div>
              <div className="user-info-group">
                <label>Status:</label>
                <select
                  value={selectedUser.status}
                  onChange={(e) => handleStatusChange(selectedUser.id, e.target.value)}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>
            </div>
            <div className="modal-actions">
              <button className="modal-btn save">Save Changes</button>
              <button className="modal-btn cancel" onClick={closeUserModal}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;
