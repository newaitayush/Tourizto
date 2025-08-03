import React, { createContext, useState, useContext, useCallback } from 'react';
import Toast from '../components/Toast';

// Create context
const ToastContext = createContext();

// Custom hook to use the toast context
export const useToast = () => {
  return useContext(ToastContext);
};

// Provider component
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  // Show a toast notification
  const showToast = useCallback((message, type = 'info', duration = 3000) => {
    const id = Date.now();
    setToasts(prevToasts => [...prevToasts, { id, message, type, duration }]);
    
    // Automatically remove toast after duration
    setTimeout(() => {
      removeToast(id);
    }, duration);
    
    return id;
  }, []);

  // Remove a toast notification
  const removeToast = useCallback((id) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  }, []);

  // Shorthand methods for different toast types
  const success = useCallback((message, duration) => showToast(message, 'success', duration), [showToast]);
  const error = useCallback((message, duration) => showToast(message, 'error', duration), [showToast]);
  const warning = useCallback((message, duration) => showToast(message, 'warning', duration), [showToast]);
  const info = useCallback((message, duration) => showToast(message, 'info', duration), [showToast]);

  // Context value
  const value = {
    showToast,
    removeToast,
    success,
    error,
    warning,
    info
  };

  return (
    <ToastContext.Provider value={value}>
      {children}
      
      {/* Render all active toasts */}
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          show={true}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
