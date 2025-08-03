import { jwtDecode } from 'jwt-decode';

/**
 * Validates a token and returns the decoded user information if valid
 * @param {string} token - The token to validate
 * @returns {Object|null} - The decoded user information or null if invalid
 */
export const validateToken = async (token) => {
  if (!token) {
    return null;
  }

  try {
    let decoded;
    let isValidToken = true;

    try {
      // Try to decode as base64 (our mock token)
      decoded = JSON.parse(atob(token));
    } catch (error) {
      try {
        // If that fails, try to decode as JWT
        decoded = jwtDecode(token);
      } catch (jwtError) {
        console.error("Failed to decode token:", jwtError);
        isValidToken = false;
      }
    }

    if (!isValidToken || !decoded) {
      console.error("Invalid token format");
      return null;
    }

    // Check if token is expired
    if (decoded.exp && decoded.exp < Math.floor(Date.now() / 1000)) {
      console.log("Token expired");
      return null;
    }

    // In a real application, you would validate the token with your backend
    // For example:
    // const response = await fetch('/api/auth/validate', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${token}`
    //   }
    // });
    // 
    // if (!response.ok) {
    //   throw new Error('Token validation failed');
    // }
    // 
    // const data = await response.json();
    // return data.user;

    // For now, we'll just return the decoded token
    return {
      ...decoded,
      // If isAdmin is not in the token, default to false
      isAdmin: decoded.isAdmin || false
    };
  } catch (err) {
    console.error("Token validation error:", err);
    return null;
  }
};

/**
 * Creates a token for a user
 * @param {Object} user - The user object
 * @param {number} expiresIn - The number of seconds until the token expires
 * @returns {string} - The token
 */
export const createToken = (user, expiresIn = 86400) => { // Default to 24 hours
  const tokenData = {
    ...user,
    exp: Math.floor(Date.now() / 1000) + expiresIn
  };

  // In a real application, you would use a JWT library to sign the token
  // For now, we'll just use base64 encoding
  return btoa(JSON.stringify(tokenData));
};

/**
 * Logs in a user with email and password
 * @param {Object} credentials - The user credentials
 * @returns {Promise<Object>} - The login result
 */
export const loginWithEmailPassword = async (credentials) => {
  // In a real application, you would send the credentials to your backend
  // For now, we'll just simulate a successful login
  const { email, password } = credentials;

  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      // Mock validation (in a real app, this would be done on the server)
      if (email && password) {
        const user = {
          id: 'user_' + Math.random().toString(36).substring(2, 15),
          name: email.split('@')[0],
          email,
          isAdmin: email.includes('admin')
        };

        const token = createToken(user);

        resolve({
          success: true,
          user,
          token
        });
      } else {
        resolve({
          success: false,
          message: 'Invalid credentials'
        });
      }
    }, 500);
  });
};

/**
 * Logs out the current user
 */
export const logout = () => {
  localStorage.removeItem('token');
  // In a real application, you might also want to invalidate the token on the server
  // window.location.href = '/';
};

/**
 * Checks if a user is authenticated
 * @returns {Promise<boolean>} - Whether the user is authenticated
 */
export const isAuthenticated = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return false;
  }

  const user = await validateToken(token);
  return !!user;
};

/**
 * Gets the current user
 * @returns {Promise<Object|null>} - The current user or null if not authenticated
 */
export const getCurrentUser = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }

  return await validateToken(token);
};
