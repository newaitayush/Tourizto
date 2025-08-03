import React, { memo } from 'react';
import './PlaceholderImage.css';

/**
 * Enhanced PlaceholderImage component for places without authentic images
 *
 * Features:
 * - Category-specific styling and icons
 * - Consistent aspect ratio (16:9 for cards, 21:9 for headers)
 * - Visual pattern overlay for better aesthetics
 * - Clear indication that authentic images are coming soon
 *
 * @param {Object} props Component props
 * @param {string} props.category Category of the place (historical, religious, food, nature)
 * @param {string} props.name Name of the place
 * @param {string} props.aspectRatio Aspect ratio (16:9, 4:3, 1:1, etc.)
 * @param {string} props.className Additional CSS classes
 * @param {string} props.message Custom message to display (defaults to "Authentic image coming soon")
 */
const PlaceholderImage = memo(({
  category = 'historical',
  name = 'Indore Attraction',
  aspectRatio = '16:9',
  className = '',
  message = 'Authentic image coming soon'
}) => {
  // Get category-specific styles
  const getCategoryStyles = () => {
    const styles = {
      historical: {
        backgroundColor: 'var(--historical-color, #8e44ad)',
        icon: 'fas fa-landmark',
        pattern: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h20L10 10zm10 10L0 20h20z\' fill=\'%23ffffff\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")'
      },
      religious: {
        backgroundColor: 'var(--religious-color, #e67e22)',
        icon: 'fas fa-pray',
        pattern: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M10 0v20C4.477 20 0 15.523 0 10S4.477 0 10 0zm10 10c0 5.523-4.477 10-10 10 0-5.523 0-10 0-10 0-5.523 4.477-10 10-10 0 5.523 0 10 0 10z\' fill=\'%23ffffff\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")'
      },
      food: {
        backgroundColor: 'var(--food-color, #e74c3c)',
        icon: 'fas fa-utensils',
        pattern: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M10 10l5-5 5 5-5 5-5-5zM5 5l5-5 5 5-5 5-5-5zM0 10l5-5 5 5-5 5-5-5z\' fill=\'%23ffffff\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")'
      },
      nature: {
        backgroundColor: 'var(--nature-color, #27ae60)',
        icon: 'fas fa-tree',
        pattern: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 10c5.523 0 10-4.477 10-10 0 5.523 4.477 10 10 10-5.523 0-10 4.477-10 10 0-5.523-4.477-10-10-10z\' fill=\'%23ffffff\' fill-opacity=\'0.1\' fill-rule=\'evenodd\'/%3E%3C/svg%3E")'
      }
    };

    return styles[category] || styles.historical;
  };

  // Calculate padding based on aspect ratio
  const getPaddingBottom = () => {
    const [width, height] = aspectRatio.split(':').map(Number);
    return `${(height / width) * 100}%`;
  };

  const categoryStyles = getCategoryStyles();

  return (
    <div
      className={`placeholder-image ${className} ${category}`}
      style={{
        paddingBottom: getPaddingBottom(),
        backgroundColor: categoryStyles.backgroundColor
      }}
    >
      {/* Category badge */}
      <div className={`placeholder-category-badge ${category}`}>
        <i className={`${categoryStyles.icon}`}></i> {category}
      </div>

      <div className="placeholder-content">
        <i className={`${categoryStyles.icon} placeholder-icon`}></i>
        <div className="placeholder-text">
          <span className="placeholder-name">{name}</span>
          <span className="placeholder-category">{category}</span>
          <span className="placeholder-message">{message}</span>
        </div>
      </div>

      <div
        className="placeholder-pattern"
        style={{ backgroundImage: categoryStyles.pattern }}
      ></div>
    </div>
  );
});

export default PlaceholderImage;
