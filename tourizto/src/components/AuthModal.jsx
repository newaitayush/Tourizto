import React, { useState } from "react";
import "./AuthModal.css";
import { signup } from "../utils/api";
import { loginWithEmailPassword } from "../utils/auth";
import SocialLogin from "./SocialLogin";

const AuthModal = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSwitch = () => {
    setIsLogin(!isLogin);
    setName("");
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!email || !password || (!isLogin && !name)) {
      alert("Please fill in all required fields");
      return;
    }

    // Show loading state
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = isLogin ? "Logging in..." : "Signing up...";
    submitBtn.disabled = true;

    try {
      let res;

      if (isLogin) {
        // Use our auth utility for login
        res = await loginWithEmailPassword({ email, password });
      } else {
        // For signup, we'll still use the API function
        // In a real app, you would have a registerWithEmailPassword function in auth.js
        const payload = {
          email,
          password,
          name
        };
        res = await signup(payload);
      }

      if (res.success && res.token) {
        localStorage.setItem("token", res.token);
        onClose();
        // Redirect to dashboard after successful login/signup
        window.location.href = "/dashboard";
      } else {
        alert(res.message || "Authentication failed. Please try again.");
      }
    } catch (error) {
      console.error("Authentication error:", error);
      alert("An unexpected error occurred. Please try again.");
    } finally {
      // Reset button state
      submitBtn.textContent = originalBtnText;
      submitBtn.disabled = false;
    }
  };

  // Handle social login success
  const handleSocialLoginSuccess = (user) => {
    console.log("Social login successful:", user);
    onClose();
    // Redirect to dashboard after successful login
    window.location.href = "/dashboard";
  };

  return (
    <div className="auth-modal-overlay">
      <div className="auth-modal">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h2>{isLogin ? "Welcome Back!" : "Join Tourizto"}</h2>
        <p className="subtitle">
          {isLogin
            ? "Log in to explore amazing destinations"
            : "Sign up and start your journey"}
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="auth-btn">
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {/* Social Login Component */}
        <SocialLogin onLoginSuccess={handleSocialLoginSuccess} />

        <p className="toggle-text">
          {isLogin ? "Don't have an account?" : "Already a member?"}
          <span onClick={handleSwitch}>
            {isLogin ? " Sign up" : " Log in"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
