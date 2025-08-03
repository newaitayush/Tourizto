import React from 'react';
import './LoginPrompt.css';
import SocialLogin from './SocialLogin';

const LoginPrompt = ({ onClose, onLogin }) => {
  // Handle social login success
  const handleSocialLoginSuccess = (user) => {
    console.log("Social login successful:", user);
    onClose();
    // Redirect to dashboard after successful login
    window.location.href = "/dashboard";
  };

  return (
    <div className="login-prompt-overlay">
      <div className="login-prompt">
        <button className="close-btn" onClick={onClose}>×</button>
        <div className="login-prompt-content">
          <h2>Login Required</h2>
          <p>Please login or sign up to explore our amazing travel destinations in Indore!</p>
          <div className="login-prompt-buttons">
            <button className="login-prompt-btn primary" onClick={onLogin}>
              Login / Sign Up
            </button>
            <button className="login-prompt-btn secondary" onClick={onClose}>
              Maybe Later
            </button>
          </div>

          {/* Social Login Component */}
          <SocialLogin onLoginSuccess={handleSocialLoginSuccess} />
        </div>
      </div>
    </div>
  );
};

export default LoginPrompt;
