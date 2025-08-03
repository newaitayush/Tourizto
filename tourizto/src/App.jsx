import React, { useEffect, useState, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import { SavedPlacesProvider } from './context/SavedPlacesContext';
import ThemeProvider from './context/ThemeContext';
import ToastProvider from './context/ToastContext';
import { validateToken, logout } from './utils/auth';
import './theme.css';

// Lazy load components for code splitting
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Places = lazy(() => import('./pages/Places'));
const SavedPlaces = lazy(() => import('./pages/SavedPlaces'));
const Contact = lazy(() => import('./pages/Contact'));
const Admin = lazy(() => import('./pages/Admin'));
const EmailTest = lazy(() => import('./pages/EmailTest'));
const Chatbot = lazy(() => import('./components/Chatbot'));
const ImageTest = lazy(() => import('./components/ImageTest'));

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      // Get token from localStorage
      const token = localStorage.getItem("token");

      if (token) {
        // Validate the token using our utility function
        const validatedUser = await validateToken(token);

        if (validatedUser) {
          // Set the user state if token is valid
          setUser(validatedUser);
        } else {
          // Remove the token if it's invalid
          localStorage.removeItem("token");
        }
      }

      // For testing purposes, create a mock admin user if URL has admin=true parameter
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('admin') === 'true') {
        const adminUser = {
          id: 'admin123',
          name: 'Admin User',
          email: 'admin@example.com',
          isAdmin: true
        };

        setUser(adminUser);

        // Create a mock admin token
        const adminToken = btoa(JSON.stringify({
          ...adminUser,
          exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 24 hours
        }));

        // Store the mock token in localStorage
        localStorage.setItem("token", adminToken);
      }

      // Set loading to false once authentication is complete
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const handleLogout = () => {
    // Use our logout utility function
    logout();
    // Update the user state
    setUser(null);
  };

  // Loading spinner component with animation
  const LoadingSpinner = () => (
    <div className="page-loading-spinner">
      <div className="spinner-container">
        <div className="spinner"></div>
        <p>Loading Tourizto...</p>
      </div>
    </div>
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <ThemeProvider>
      <ToastProvider>
        <SavedPlacesProvider>
          <BrowserRouter>
            <Navbar user={user} onLogout={handleLogout} />

            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route
                  path="/"
                  element={user ? <Navigate to="/dashboard" replace /> : <Home />}
                />
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard user={user} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/places"
                  element={
                    <ProtectedRoute>
                      <Places user={user} />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/saved-places"
                  element={
                    <ProtectedRoute>
                      <SavedPlaces user={user} />
                    </ProtectedRoute>
                  }
                />
                <Route path="/contact" element={<Contact />} />
                <Route
                  path="/admin"
                  element={
                    <ProtectedRoute>
                      <Admin user={user} />
                    </ProtectedRoute>
                  }
                />
                <Route path="/email-test" element={<EmailTest />} />
                <Route path="/image-test" element={<ImageTest />} />
              </Routes>
            </Suspense>

            {/* Chatbot available on all pages */}
            <Suspense fallback={<div className="chatbot-loading"></div>}>
              <Chatbot />
            </Suspense>
          </BrowserRouter>
        </SavedPlacesProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default App;
