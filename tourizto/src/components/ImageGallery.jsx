import React, { useState, useEffect, useCallback, memo } from 'react';
import LazyImage from './LazyImage';
import './ImageGallery.css';

const ImageGallery = memo(({ place }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState({});
  const [selectedImage, setSelectedImage] = useState(0);
  const [error, setError] = useState(null);

  // Function to preload images
  const preloadImage = useCallback((src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(src);
      img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
    });
  }, []);

  // Function to fetch curated images for the place
  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      setImageLoading({});

      try {
        let allImages = [];

        // Use imageData gallery if available
        if (place.imageData && place.imageData.gallery && place.imageData.gallery.length > 0) {
          allImages = [...place.imageData.gallery];
        } else if (place.image) {
          // Fallback to main image
          const mainImage = place.image;

          // If the image is a string (path), use it directly
          if (typeof mainImage === 'string') {
            allImages = [mainImage];
          } else {
            // If it's an imported image module, use its default property
            allImages = [mainImage];
          }

          // Duplicate the image to create a gallery effect
          allImages = [allImages[0], allImages[0], allImages[0]];
        } else {
          // No image available, use a placeholder based on category
          const categoryPlaceholder = `../images/${place.category || 'historical'}.jpg`;
          allImages = [categoryPlaceholder, categoryPlaceholder, categoryPlaceholder];
        }

        // Set initial loading state for each image
        const initialLoadingState = {};
        allImages.forEach((src, index) => {
          initialLoadingState[index] = true;
        });
        setImageLoading(initialLoadingState);

        // Set images immediately to show loading state
        setImages(allImages);
        setLoading(false);

        // Preload images in the background
        const preloadPromises = allImages.map((src, index) =>
          preloadImage(src)
            .then(() => {
              setImageLoading(prev => ({
                ...prev,
                [index]: false
              }));
              return src;
            })
            .catch(err => {
              console.error(`Error preloading image ${index}:`, err);
              return src; // Keep the image URL even if it fails to load
            })
        );

        // Wait for all images to preload
        await Promise.all(preloadPromises);

      } catch (err) {
        console.error('Error fetching images:', err);
        setError('Failed to load images. Please try again later.');
        setLoading(false);
      }
    };

    fetchImages();
  }, [place.image, place.category, place.imageData, preloadImage]);

  // Navigate to previous image
  const prevImage = () => {
    setSelectedImage(prev => (prev > 0 ? prev - 1 : images.length - 1));
  };

  // Navigate to next image
  const nextImage = () => {
    setSelectedImage(prev => (prev < images.length - 1 ? prev + 1 : 0));
  };

  // Function to open Google Images search for the place
  const openGoogleImages = () => {
    const query = encodeURIComponent(place.name + ' Indore tourism');
    window.open(`https://www.google.com/search?q=${query}&tbm=isch`, '_blank');
  };

  if (loading) {
    return (
      <div className="gallery-loading">
        <div className="loading-spinner"></div>
        <p>Loading authentic images...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="gallery-error">
        <p>{error}</p>
        <button className="google-images-btn" onClick={openGoogleImages}>
          <i className="fas fa-images"></i> View Images on Google
        </button>
      </div>
    );
  }

  return (
    <div className="image-gallery-container">
      <div className="gallery-info">
        <h4>Authentic Images of {place.name}</h4>
        <p>Browse through our curated collection of images to get a better visual experience of this place.</p>
      </div>

      <div className="main-image-wrapper">
        <div className="main-image-container">
          <LazyImage
            src={images[selectedImage]}
            alt={`${place.name} - View ${selectedImage + 1}`}
            aspectRatio="16:9"
            className="main-gallery-image"
            category={place.category}
            name={place.name}
            attribution={place.imageData?.attribution || "Photo of Indore attraction"}
            onLoad={() => {
              setImageLoading(prev => ({
                ...prev,
                [selectedImage]: false
              }));
            }}
            onError={() => {
              setImageLoading(prev => ({
                ...prev,
                [selectedImage]: false
              }));
            }}
            fallbackSrc={place.imageData?.main || place.image}
          />
          <div className="image-counter">{selectedImage + 1} / {images.length}</div>
        </div>

        <button
          className="gallery-nav-btn prev"
          onClick={prevImage}
          aria-label="Previous image"
          disabled={imageLoading[selectedImage]}
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button
          className="gallery-nav-btn next"
          onClick={nextImage}
          aria-label="Next image"
          disabled={imageLoading[selectedImage]}
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>

      <div className="image-thumbnails">
        {images.map((img, index) => (
          <div
            key={index}
            className={`thumbnail-container ${selectedImage === index ? 'active' : ''}`}
            onClick={() => setSelectedImage(index)}
          >
            <LazyImage
              src={img}
              alt={`${place.name} thumbnail ${index + 1}`}
              aspectRatio="1:1"
              className={`thumbnail-image ${selectedImage === index ? 'active' : ''}`}
              category={place.category}
              name={place.name}
              onLoad={() => {
                setImageLoading(prev => ({
                  ...prev,
                  [index]: false
                }));
              }}
              onError={() => {
                setImageLoading(prev => ({
                  ...prev,
                  [index]: false
                }));
              }}
              fallbackSrc={place.imageData?.main || place.image}
            />
          </div>
        ))}
      </div>

      <div className="gallery-actions">
        <button className="google-images-btn" onClick={openGoogleImages}>
          <i className="fas fa-images"></i> View More Images on Google
        </button>
      </div>
    </div>
  );
});

export default ImageGallery;
