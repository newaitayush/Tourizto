import React, { useState, useEffect, memo } from 'react';
import './Toast.css';

/**
 * Toast notification component
 * 
 * @param {Object} props Component props
 * @param {string} props.message Toast message
 * @param {string} props.type Toast type (success, error, info, warning)
 * @param {number} props.duration Duration in milliseconds
 * @param {boolean} props.show Whether to show the toast
 * @param {Function} props.onClose Callback when toast closes
 */
const Toast = memo(({ 
  message, 
  type = 'info', 
  duration = 3000, 
  show = false, 
  onClose 
}) => {
  const [visible, setVisible] = useState(show);
  
  useEffect(() => {
    setVisible(show);
    
    if (show) {
      const timer = setTimeout(() => {
        setVisible(false);
        if (onClose) onClose();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [show, duration, onClose]);
  
  const getIcon = () => {
    switch (type) {
      case 'success':
        return <i className="fas fa-check-circle"></i>;
      case 'error':
        return <i className="fas fa-exclamation-circle"></i>;
      case 'warning':
        return <i className="fas fa-exclamation-triangle"></i>;
      case 'info':
      default:
        return <i className="fas fa-info-circle"></i>;
    }
  };
  
  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };
  
  if (!visible) return null;
  
  return (
    <div className={`toast-container ${visible ? 'visible' : ''}`}>
      <div className={`toast ${type}`}>
        <div className="toast-icon">
          {getIcon()}
        </div>
        <div className="toast-content">
          {message}
        </div>
        <button className="toast-close" onClick={handleClose}>
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
});

export default Toast;
