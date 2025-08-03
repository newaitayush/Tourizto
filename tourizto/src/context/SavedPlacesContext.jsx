import React, { createContext, useState, useEffect, useContext } from 'react';

// Create context
export const SavedPlacesContext = createContext();

// Custom hook to use the context
export const useSavedPlaces = () => useContext(SavedPlacesContext);

// Provider component
export const SavedPlacesProvider = ({ children }) => {
  const [savedPlaces, setSavedPlaces] = useState([]);
  
  // Load saved places from localStorage on initial render
  useEffect(() => {
    const storedPlaces = localStorage.getItem('savedPlaces');
    if (storedPlaces) {
      setSavedPlaces(JSON.parse(storedPlaces));
    }
  }, []);
  
  // Save to localStorage whenever savedPlaces changes
  useEffect(() => {
    localStorage.setItem('savedPlaces', JSON.stringify(savedPlaces));
  }, [savedPlaces]);
  
  // Add a place to saved places
  const savePlace = (place) => {
    // Check if place is already saved
    if (!savedPlaces.some(savedPlace => savedPlace.id === place.id)) {
      setSavedPlaces([...savedPlaces, place]);
      return true; // Successfully saved
    }
    return false; // Already saved
  };
  
  // Remove a place from saved places
  const removePlace = (placeId) => {
    setSavedPlaces(savedPlaces.filter(place => place.id !== placeId));
  };
  
  // Check if a place is saved
  const isPlaceSaved = (placeId) => {
    return savedPlaces.some(place => place.id === placeId);
  };
  
  // Value to be provided to consumers
  const value = {
    savedPlaces,
    savePlace,
    removePlace,
    isPlaceSaved
  };
  
  return (
    <SavedPlacesContext.Provider value={value}>
      {children}
    </SavedPlacesContext.Provider>
  );
};
