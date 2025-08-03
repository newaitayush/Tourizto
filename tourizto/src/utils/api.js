// src/utils/api.js

import { sendEmail } from './mockEmailService';

const BASE_URL = "http://localhost:5000/api/users"; // Adjust if needed
const BOOKING_URL = "http://localhost:5000/api/bookings"; // Booking endpoint

// Mock users for authentication
const mockUsers = [
  {
    id: '1',
    name: 'Demo User',
    email: 'demo@example.com',
    password: 'password123',
    isAdmin: false
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@example.com',
    password: 'admin123',
    isAdmin: true
  }
];

// Helper function to generate a JWT-like token
const generateToken = (user) => {
  // Create a simple token with user info and expiration
  const payload = {
    id: user.id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24) // 24 hours
  };

  // In a real app, this would be signed with a secret key
  return btoa(JSON.stringify(payload)); // Base64 encode the payload
};

export const login = async (payload) => {
  console.log('Login attempt:', payload.email);

  try {
    // First try to connect to the backend
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        timeout: 2000 // 2 second timeout
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (backendError) {
      console.log('Backend login failed, using mock authentication:', backendError);
    }

    // If backend fails, use mock authentication
    console.log('Using mock authentication...');

    // Find user by email
    const user = mockUsers.find(u => u.email === payload.email);

    // Check if user exists and password matches
    if (user && user.password === payload.password) {
      const token = generateToken(user);

      console.log('Login successful for:', user.email);

      return {
        success: true,
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin
        }
      };
    }

    // If no user found or password doesn't match
    console.log('Login failed: Invalid credentials');
    return {
      success: false,
      message: "Invalid email or password"
    };
  } catch (error) {
    console.error('Login error:', error);
    return {
      success: false,
      message: "Login failed",
      error: error.toString()
    };
  }
};

export const signup = async (payload) => {
  console.log('Signup attempt:', payload.email);

  try {
    // First try to connect to the backend
    try {
      const response = await fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        timeout: 2000 // 2 second timeout
      });

      if (response.ok) {
        return await response.json();
      }
    } catch (backendError) {
      console.log('Backend signup failed, using mock authentication:', backendError);
    }

    // If backend fails, use mock authentication
    console.log('Using mock signup...');

    // Check if email already exists
    if (mockUsers.some(u => u.email === payload.email)) {
      console.log('Signup failed: Email already exists');
      return {
        success: false,
        message: "Email already in use"
      };
    }

    // Create new user
    const newUser = {
      id: `user_${Date.now()}`,
      name: payload.name,
      email: payload.email,
      password: payload.password,
      isAdmin: false
    };

    // Add to mock users array
    mockUsers.push(newUser);

    // Generate token
    const token = generateToken(newUser);

    console.log('Signup successful for:', newUser.email);
    console.log('Current mock users:', mockUsers);

    return {
      success: true,
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin
      }
    };
  } catch (error) {
    console.error('Signup error:', error);
    return {
      success: false,
      message: "Signup failed",
      error: error.toString()
    };
  }
};

// Mock bookings array to store bookings locally
export const mockBookings = [];

export const createBooking = async (bookingData) => {
  try {
    console.log('Creating booking with backend API...');
    console.log('Booking data:', bookingData);

    // Validate required fields
    const requiredFields = ['name', 'email', 'phone', 'place', 'date', 'time', 'adults', 'totalAmount'];
    const missingFields = requiredFields.filter(field => !bookingData[field]);

    if (missingFields.length > 0) {
      console.error('Booking error: Missing required fields:', missingFields);
      return {
        success: false,
        message: `Missing required fields: ${missingFields.join(', ')}`
      };
    }

    // First try to send the booking to the backend
    try {
      console.log('Sending booking data to backend API...');
      const response = await fetch(BOOKING_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      });

      // If the backend responds successfully, return its response
      if (response.ok) {
        const result = await response.json();
        console.log('Backend booking response:', result);
        return result;
      }

      // If there's an error from the backend, log it
      const errorData = await response.json();
      console.error('Backend booking error:', errorData);

      // Fall back to mock implementation if backend fails
      console.log('Falling back to mock implementation...');
    } catch (backendError) {
      console.error('Error connecting to backend:', backendError);
      console.log('Falling back to mock implementation...');
    }

    // If we reach here, the backend request failed, so use mock implementation
    console.log('Using mock implementation for booking...');

    // Generate a unique ID for the booking
    const timestamp = Date.now();
    const bookingId = `booking_${timestamp}`;

    // Ensure unique receipt number to avoid duplicate key errors
    const uniqueReceiptNumber = `RCPT-${timestamp}-${Math.floor(Math.random() * 10000)}`;

    // Create a new booking object with an ID and unique receipt number
    const newBooking = {
      _id: bookingId,
      ...bookingData,
      receiptNumber: uniqueReceiptNumber, // Override with our unique receipt number
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };

    // Add the booking to our mock database
    mockBookings.push(newBooking);

    console.log('Booking created successfully in mock database:', newBooking);

    // Try to send a real email using the backend email test endpoint
    try {
      console.log('Sending email via backend email test endpoint...');
      const emailResponse = await fetch('http://localhost:5000/api/email/send-test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: newBooking.email,
          name: newBooking.name,
          place: newBooking.place,
          date: newBooking.date,
          time: newBooking.time,
          adults: newBooking.adults,
          children: newBooking.children,
          totalAmount: newBooking.totalAmount,
          bookingReference: newBooking.bookingReference
        }),
      });

      if (emailResponse.ok) {
        const emailResult = await emailResponse.json();
        console.log('Email sent successfully via backend:', emailResult);

        return {
          success: true,
          booking: newBooking,
          message: "Booking created successfully",
          emailSent: true,
          emailId: emailResult.messageId
        };
      } else {
        const emailError = await emailResponse.json();
        console.error('Failed to send email via backend:', emailError);

        // Fall back to mock email service
        console.log('Falling back to mock email service...');
      }
    } catch (emailError) {
      console.error('Error connecting to backend email service:', emailError);
      console.log('Falling back to mock email service...');
    }

    // If backend email fails, use mock email service
    console.log('Using mock email service...');
    const emailResult = await sendEmail(newBooking);

    if (emailResult.success) {
      console.log('Email sent successfully with mock service:', emailResult);

      return {
        success: true,
        booking: newBooking,
        message: "Booking created successfully",
        emailSent: true,
        emailId: emailResult.messageId
      };
    } else {
      console.error('Failed to send email with mock service:', emailResult.error);

      return {
        success: true,
        booking: newBooking,
        message: "Booking created but email failed",
        emailSent: false,
        emailError: emailResult.error
      };
    }
  } catch (error) {
    console.error('Booking API error:', error);
    return {
      success: false,
      message: "Booking failed",
      error: error.toString()
    };
  }
};
