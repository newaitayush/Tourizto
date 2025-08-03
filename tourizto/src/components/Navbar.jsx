import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import AuthModal from "./AuthModal";
import ThemeToggle from "./ThemeToggle";
import "./Navbar.css";
import logo from '../images/logo.jpg'

const Navbar = ({ user, onLogout }) => {
  const [showModal, setShowModal] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  // Check if we're on the home page
  const isHomePage = location.pathname === "/";

  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`navbar ${isScrolled || !isHomePage ? 'scrolled' : ''} ${menuOpen ? 'menu-open' : ''}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src={logo}></img>
        </Link>

        <div className="navbar-toggle" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <ul className={`navbar-menu ${menuOpen ? 'active' : ''}`}>
          <li className="navbar-item">
            <Link to="/" className="navbar-link" onClick={() => setMenuOpen(false)}>
              Home
            </Link>
          </li>
          {user && (
            <li className="navbar-item">
              <Link to="/dashboard" className="navbar-link" onClick={() => setMenuOpen(false)}>
                Dashboard
              </Link>
            </li>
          )}
          {user && (
            <li className="navbar-item">
              <Link to="/places" className="navbar-link" onClick={() => setMenuOpen(false)}>
                Explore
              </Link>
            </li>
          )}
          {user && (
            <li className="navbar-item">
              <Link to="/saved-places" className="navbar-link" onClick={() => setMenuOpen(false)}>
                <i className="fas fa-bookmark"></i> Saved Places
              </Link>
            </li>
          )}
          <li className="navbar-item">
            <Link to="/contact" className="navbar-link" onClick={() => setMenuOpen(false)}>
              Contact Us
            </Link>
          </li>
          {user && user.isAdmin && (
            <li className="navbar-item">
              <Link to="/admin" className="navbar-link admin-link" onClick={() => setMenuOpen(false)}>
                Admin
              </Link>
            </li>
          )}
          {user && user.isAdmin && (
            <li className="navbar-item">
              <Link to="/email-test" className="navbar-link" onClick={() => setMenuOpen(false)}>
                Email Test
              </Link>
            </li>
          )}
        </ul>

        <div className="navbar-auth">
          {user ? (
            <div className="user-info">
              <div className="user-avatar">
                {user.picture ? (
                  <img src={user.picture} alt={user.name} />
                ) : (
                  user.name ? user.name.charAt(0).toUpperCase() : "U"
                )}
              </div>
              <div className="user-dropdown">
                <span className="user-name">Hi, {user.name || user.email}</span>
                <div className="dropdown-content">
                  <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                  <Link to="/places" onClick={() => setMenuOpen(false)}>Explore Places</Link>
                  <Link to="/saved-places" onClick={() => setMenuOpen(false)}>
                    <i className="fas fa-bookmark"></i> Saved Places
                  </Link>
                  {user.isAdmin && <Link to="/admin" onClick={() => setMenuOpen(false)}>Admin Panel</Link>}
                  {user.isAdmin && <Link to="/email-test" onClick={() => setMenuOpen(false)}>Email Test</Link>}
                  <button onClick={onLogout}>Logout</button>
                </div>
              </div>
            </div>
          ) : (
            <button
              className="login-button"
              onClick={() => setShowModal(true)}
            >
              Login / Signup
            </button>
          )}
        </div>
      </div>

      {showModal && <AuthModal onClose={() => setShowModal(false)} />}

      {/* Floating Theme Toggle */}
      <div className="floating-theme-toggle">
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
