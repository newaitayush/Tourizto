import React, { createContext, useState, useEffect, useContext } from 'react';

// Create context
export const ThemeContext = createContext();

// Custom hook to use the context
export const useTheme = () => useContext(ThemeContext);

// Provider component
export const ThemeProvider = ({ children }) => {
  // Check if user has a theme preference in localStorage
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('darkMode');
    // Also check system preference if no saved preference
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    return savedTheme ? JSON.parse(savedTheme) : prefersDark;
  });
  
  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };
  
  // Save to localStorage whenever darkMode changes
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    
    // Apply dark mode class to body
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);
  
  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
