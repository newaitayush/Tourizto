// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  // For testing purposes, always allow access
  // In production, uncomment the line below
  // const token = localStorage.getItem("token");
  const token = true; // Temporary for testing

  return token ? children : <Navigate to="/" replace />;
};

export default ProtectedRoute;
