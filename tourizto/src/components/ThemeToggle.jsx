import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <div className="theme-toggle">
      <input
        type="checkbox"
        id="theme-toggle-checkbox"
        className="theme-toggle-checkbox"
        checked={darkMode}
        onChange={toggleDarkMode}
      />
      <label htmlFor="theme-toggle-checkbox" className="theme-toggle-label">
        <span className="theme-toggle-inner">
          <span className="theme-toggle-icon">
            {darkMode ? '🌙' : '☀️'}
          </span>
        </span>
      </label>
    </div>
  );
};

export default ThemeToggle;
