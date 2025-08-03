import React, { useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import './SocialLogin.css';

const SocialLogin = ({ onLoginSuccess }) => {
  // Google client ID from Google Cloud Console
  const googleClientId = "866104432624-83r9fuau87si9g91u5nrv0jm1ac1qo1i.apps.googleusercontent.com";

  // Flag to determine if we should use real authentication
  const useRealAuth = true;

  // Handle Google login success
  const handleGoogleSuccess = (credentialResponse) => {
    try {
      // Decode the JWT token from Google
      const decoded = jwtDecode(credentialResponse.credential);
      console.log("Google login success:", decoded);

      // Create a user object from the Google profile
      const user = {
        id: decoded.sub,
        name: decoded.name,
        email: decoded.email,
        picture: decoded.picture,
        provider: 'google',
        // Store the original credential for potential backend validation
        googleCredential: credentialResponse.credential
      };

      // In a real application, you would send this token to your backend for validation
      // For example:
      // const response = await fetch('/api/auth/google', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify({ credential: credentialResponse.credential })
      // });
      // const data = await response.json();
      // if (data.success) {
      //   localStorage.setItem("token", data.token);
      //   onLoginSuccess(data.user);
      // }

      // For now, we'll create a token that includes the user information
      const token = btoa(JSON.stringify({
        ...user,
        exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 24 hours
      }));

      // Store the token in localStorage
      localStorage.setItem("token", token);

      // Call the onLoginSuccess callback
      onLoginSuccess(user);
    } catch (error) {
      console.error("Error decoding Google token:", error);
      alert("Failed to login with Google. Please try again.");
    }
  };

  // Handle Google login error
  const handleGoogleError = (error) => {
    console.error("Google login failed:", error);
    alert("Failed to login with Google. Please try again.");
  };

  // For development/testing, we'll use a mock login with a prompt
  const handleMockGoogleLogin = () => {
    // Show a mock Google login prompt
    const userName = prompt("Enter your name for mock Google login:", "");

    if (!userName) {
      console.log("Mock Google login cancelled");
      return;
    }

    // Generate a random email based on the name
    const email = userName.toLowerCase().replace(/\s+/g, '.') +
      Math.floor(Math.random() * 1000) + '@gmail.com';

    const mockUser = {
      id: 'google_' + Math.random().toString(36).substring(2, 15),
      name: userName,
      email: email,
      picture: `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=4285F4&color=fff`,
      provider: 'google'
    };

    console.log("Mock Google login successful:", mockUser);

    // Create a mock token
    const token = btoa(JSON.stringify({
      ...mockUser,
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 24 hours
    }));

    // Store the token in localStorage
    localStorage.setItem("token", token);

    // Call the onLoginSuccess callback
    onLoginSuccess(mockUser);
  };

  // Handle Facebook login success
  const handleFacebookLogin = (response) => {
    if (response.status === 'connected') {
      // Get user information from Facebook
      FB.api('/me', { fields: 'id,name,email,picture' }, (userInfo) => {
        const user = {
          id: userInfo.id,
          name: userInfo.name,
          email: userInfo.email,
          picture: userInfo.picture?.data?.url,
          provider: 'facebook',
          accessToken: response.authResponse.accessToken
        };

        // In a real application, you would send this token to your backend for validation
        // and receive a session token in return
        // For now, we'll create a token that includes the user information
        const token = btoa(JSON.stringify({
          ...user,
          exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 24 hours
        }));

        // Store the token in localStorage
        localStorage.setItem("token", token);

        // Call the onLoginSuccess callback
        onLoginSuccess(user);
      });
    } else {
      console.error("Facebook login failed");
    }
  };

  // For development/testing, we'll use a mock login with a prompt
  const handleMockFacebookLogin = () => {
    // Show a mock Facebook login prompt
    const userName = prompt("Enter your name for mock Facebook login:", "");

    if (!userName) {
      console.log("Mock Facebook login cancelled");
      return;
    }

    // Generate a random email based on the name
    const email = userName.toLowerCase().replace(/\s+/g, '.') +
      Math.floor(Math.random() * 1000) + '@facebook.com';

    const mockUser = {
      id: 'facebook_' + Math.random().toString(36).substring(2, 15),
      name: userName,
      email: email,
      picture: `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=3b5998&color=fff`,
      provider: 'facebook'
    };

    console.log("Mock Facebook login successful:", mockUser);

    // Create a mock token
    const token = btoa(JSON.stringify({
      ...mockUser,
      exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 24 hours
    }));

    // Store the token in localStorage
    localStorage.setItem("token", token);

    // Call the onLoginSuccess callback
    onLoginSuccess(mockUser);
  };

  // Initialize Facebook SDK
  useEffect(() => {
    // Load the Facebook SDK asynchronously
    window.fbAsyncInit = function() {
      FB.init({
        appId: '1234567890123456', // Replace with your actual Facebook App ID when you have one
        cookie: true,
        xfbml: true,
        version: 'v18.0'
      });

      FB.AppEvents.logPageView();
    };

    // Load the SDK
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);

  // Handle Facebook login button click
  const initiateRealFacebookLogin = () => {
    if (window.FB) {
      FB.login(handleFacebookLogin, { scope: 'public_profile,email' });
    } else {
      console.error("Facebook SDK not loaded");
      // Fall back to mock login for development
      handleMockFacebookLogin();
    }
  };

  return (
    <div className="social-login-container">
      <div className="social-login-divider">
        <span>or continue with</span>
      </div>

      <div className="social-login-buttons">
        {/* Google login button */}
        {useRealAuth ? (
          <GoogleOAuthProvider clientId={googleClientId}>
            <div className="google-login-wrapper">
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
                useOneTap
                theme="filled_blue"
                text="continue_with"
                shape="pill"
                width="100%"
              />
            </div>
          </GoogleOAuthProvider>
        ) : (
          <button
            className="social-login-button google"
            onClick={handleMockGoogleLogin}
            title="Sign in with Google (Mock)"
          >
            <i className="fab fa-google"></i>
            <span>Google</span>
          </button>
        )}

        {/* Facebook login button */}
        <button
          className="social-login-button facebook"
          onClick={useRealAuth ? initiateRealFacebookLogin : handleMockFacebookLogin}
          title={useRealAuth ? "Sign in with Facebook" : "Sign in with Facebook (Mock)"}
        >
          <i className="fab fa-facebook-f"></i>
          <span>Facebook</span>
        </button>
      </div>

      {!useRealAuth && (
        <div className="social-login-note">
          <small>Note: These are mock implementations for demonstration purposes.</small>
        </div>
      )}
    </div>
  );
};

export default SocialLogin;
