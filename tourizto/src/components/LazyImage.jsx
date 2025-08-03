import React, { useState, useEffect, memo } from 'react';
import './LazyImage.css';

// Use public folder for fallback images
const rajwadaImg = '/images/RajwadaPalace.jpg';
const annapurnaImg = '/images/Annapurna-Temple.jpg';
const patalpaniImg = '/images/PatalpaniWaterfalls.jpg';
const sarafaImg = '/images/sarafa.jpg';

/**
 * Enhanced LazyImage component for optimized image loading
 *
 * Features:
 * - Lazy loading with loading="lazy" attribute
 * - Placeholder while loading with category-specific styling
 * - Error handling with fallback to category-specific placeholder
 * - Consistent aspect ratio (16:9 for cards, 21:9 for headers)
 * - Blur-up effect when image loads
 * - Proper alt text for accessibility
 * - Image attribution display
 * - Category badge
 *
 * @param {Object} props Component props
 * @param {string} props.src Image source URL
 * @param {string} props.alt Alt text for accessibility
 * @param {string} props.aspectRatio Aspect ratio (16:9, 4:3, 1:1, etc.)
 * @param {string} props.className Additional CSS classes
 * @param {string} props.placeholderColor Background color while loading
 * @param {string} props.fallbackSrc Fallback image source if main image fails to load
 * @param {string} props.category Category of the place (historical, religious, food, nature)
 * @param {string} props.attribution Image attribution text
 * @param {string} props.name Name of the place to display in error state
 * @param {Function} props.onLoad Callback when image loads successfully
 * @param {Function} props.onError Callback when image fails to load
 */
const LazyImage = memo(({
  src,
  alt,
  aspectRatio = '16:9',
  className = '',
  placeholderColor = '#f0f0f0',
  fallbackSrc = '',
  category = '',
  attribution = '',
  name = '',
  onLoad,
  onError
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 2;

  // Calculate padding based on aspect ratio
  const getPaddingBottom = () => {
    const [width, height] = aspectRatio.split(':').map(Number);
    return `${(height / width) * 100}%`;
  };

  // Get category-specific placeholder color
  const getCategoryColor = () => {
    const colors = {
      historical: 'var(--historical-color, #8e44ad)',
      religious: 'var(--religious-color, #e67e22)',
      food: 'var(--food-color, #e74c3c)',
      nature: 'var(--nature-color, #27ae60)'
    };

    // If category is not recognized, use a default color based on the first letter of the name
    if (!colors[category]) {
      const defaultColors = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6', '#1abc9c'];
      const nameHash = name ? name.charCodeAt(0) % defaultColors.length : 0;
      return defaultColors[nameHash];
    }

    return colors[category] || placeholderColor;
  };

  // Get category-specific icon
  const getCategoryIcon = () => {
    const icons = {
      historical: 'fas fa-landmark',
      religious: 'fas fa-pray',
      food: 'fas fa-utensils',
      nature: 'fas fa-tree'
    };

    // If we have a specific icon for this category, use it
    if (icons[category]) {
      return icons[category];
    }

    // Otherwise, choose an icon based on the name
    if (name) {
      const nameIcons = [
        'fas fa-image',
        'fas fa-camera',
        'fas fa-map-marker-alt',
        'fas fa-map',
        'fas fa-compass',
        'fas fa-mountain'
      ];
      const nameHash = name.charCodeAt(0) % nameIcons.length;
      return nameIcons[nameHash];
    }

    // Default fallback
    return 'fas fa-image';
  };

  // Reset loading state when src changes
  useEffect(() => {
    setIsLoading(true);
    setHasError(false);

    // Check if the src is a valid URL or path
    if (!src || src === '') {
      console.log(`Invalid image source for ${name}`);
      setHasError(true);
      setIsLoading(false);

      // Use category-specific fallback
      if (category === 'religious') {
        const religiousFallback = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Khajrana_Ganesh_Temple.jpg/1200px-Khajrana_Ganesh_Temple.jpg';
        console.log(`Using religious fallback: ${religiousFallback}`);
        setImageSrc(religiousFallback);
        setHasError(false);
      } else if (category === 'nature') {
        const natureFallback = 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/e0/c3/c9/choral-dam.jpg?w=1200&h=-1&s=1';
        console.log(`Using nature fallback: ${natureFallback}`);
        setImageSrc(natureFallback);
        setHasError(false);
      } else if (fallbackSrc && fallbackSrc !== '') {
        console.log(`Using provided fallback: ${fallbackSrc}`);
        setImageSrc(fallbackSrc);
        setHasError(false);
      }
    } else {
      // For religious places, use specific images
      if (category === 'religious' && name.includes('Bada Ganpati')) {
        const specificImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Bada_Ganpati_Temple%2C_Indore.jpg/1200px-Bada_Ganpati_Temple%2C_Indore.jpg';
        console.log(`Using specific image for ${name}: ${specificImage}`);
        setImageSrc(specificImage);
      } else if (category === 'religious' && name.includes('Khajrana')) {
        const specificImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e9/Khajrana_Ganesh_Temple.jpg/1200px-Khajrana_Ganesh_Temple.jpg';
        console.log(`Using specific image for ${name}: ${specificImage}`);
        setImageSrc(specificImage);
      } else if (category === 'religious' && name.includes('Devguradia')) {
        const specificImage = 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/07/cb/f2/a5/devguradia-shiva-mandir.jpg?w=1200&h=-1&s=1';
        console.log(`Using specific image for ${name}: ${specificImage}`);
        setImageSrc(specificImage);
      } else {
        console.log(`Using provided source: ${src}`);
        setImageSrc(src);
      }
      setRetryCount(0);
    }
  }, [src, category, name, fallbackSrc]);

  // Handle successful image load
  const handleImageLoad = () => {
    console.log(`Image loaded successfully: ${imageSrc}`);
    setIsLoading(false);
    setHasError(false);
    if (onLoad) onLoad();
  };

  // Handle image load error
  const handleImageError = () => {
    console.log(`Image error for: ${src}`);

    // Try to reload the image a few times (sometimes network glitches occur)
    if (retryCount < MAX_RETRIES) {
      setRetryCount(prev => prev + 1);
      // Add a cache-busting parameter to force reload
      const cacheBuster = `?retry=${Date.now()}`;
      setImageSrc(`${src}${cacheBuster}`);
      return;
    }

    setIsLoading(false);
    setHasError(true);

    // Use category-specific fallback images from local files
    if (category === 'historical') {
      // Use directly imported historical image as fallback
      console.log(`Using local historical fallback`);
      setImageSrc(rajwadaImg);
      setHasError(false);
      return;
    } else if (category === 'religious') {
      // Use directly imported religious image as fallback
      console.log(`Using local religious fallback`);
      setImageSrc(annapurnaImg);
      setHasError(false);
      return;
    } else if (category === 'nature') {
      // Use directly imported nature image as fallback
      console.log(`Using local nature fallback`);
      setImageSrc(patalpaniImg);
      setHasError(false);
      return;
    } else if (category === 'food') {
      // Use directly imported food image as fallback
      console.log(`Using local food fallback`);
      setImageSrc(sarafaImg);
      setHasError(false);
      return;
    }

    // Use fallback image if provided and it's different from the original source
    if (fallbackSrc && fallbackSrc !== src) {
      console.log(`Trying fallback image: ${fallbackSrc}`);
      setImageSrc(fallbackSrc);
      setHasError(false);
    } else {
      // If no fallback or fallback is the same as original, we'll show the error state
      // The error state will be rendered as a colored placeholder with an icon
      console.log(`No suitable fallback found, showing placeholder for ${name}`);
    }

    if (onError) onError();
  };

  // Get category-specific placeholder background
  const placeholderBg = getCategoryColor();

  // Always use the provided source for local images
  let directImageSrc = src;

  // Use the direct image if available, otherwise use the provided src
  const finalImageSrc = directImageSrc || imageSrc;

  // Add a cache-busting parameter to force reload
  const cacheBuster = `?t=${Date.now()}`;
  const finalSrcWithCache = `${finalImageSrc}${cacheBuster}`;

  console.log(`Rendering image for ${name} with src: ${finalImageSrc}`);

  return (
    <div
      className={`lazy-image-container ${className} ${category}`}
      style={{
        paddingBottom: getPaddingBottom(),
        backgroundColor: placeholderBg
      }}
    >
      {/* Category badge if provided */}
      {category && (
        <div className={`category-badge ${category}`}>
          <i className={getCategoryIcon()}></i> {category}
        </div>
      )}

      {/* Loading indicator */}
      {isLoading && (
        <div className="lazy-image-placeholder">
          <div className="loading-indicator" />
          <span className="loading-text">Loading authentic image...</span>
        </div>
      )}

      {/* The actual image - using direct image source for reliability */}
      <img
        src={finalSrcWithCache}
        alt={alt || 'Indore attraction'}
        loading="lazy"
        onLoad={handleImageLoad}
        onError={handleImageError}
        className={`lazy-image ${isLoading ? 'loading' : 'loaded'}`}
        style={{ opacity: 1, position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }}
      />

      {/* Attribution if provided */}
      {attribution && !isLoading && !hasError && (
        <div className="image-attribution">
          {attribution}
        </div>
      )}

      {/* Error state */}
      {hasError && (
        <div className="lazy-image-error" style={{ backgroundColor: getCategoryColor() }}>
          <i className={getCategoryIcon()}></i>
          <span>{name || 'Indore Attraction'}</span>
          <span className="error-subtitle">Authentic image coming soon</span>
        </div>
      )}
    </div>
  );
});

export default LazyImage;
