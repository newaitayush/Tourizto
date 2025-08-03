// src/utils/adminApi.js

import { mockBookings as realBookings } from './api';

const BASE_URL = "http://localhost:5000/api";

// Mock data for users
const mockUsers = [
  {
    _id: "u1",
    name: "John Doe",
    email: "john@example.com",
    createdAt: "2023-05-15T10:30:00Z",
    status: "active"
  },
  {
    _id: "u2",
    name: "Jane Smith",
    email: "jane@example.com",
    createdAt: "2023-06-20T14:45:00Z",
    status: "active"
  },
  {
    _id: "u3",
    name: "Robert Johnson",
    email: "robert@example.com",
    createdAt: "2023-07-10T09:15:00Z",
    status: "inactive"
  },
  {
    _id: "u4",
    name: "Emily Davis",
    email: "emily@example.com",
    createdAt: "2023-08-05T16:20:00Z",
    status: "active"
  },
  {
    _id: "u5",
    name: "Michael Wilson",
    email: "michael@example.com",
    createdAt: "2023-09-12T11:10:00Z",
    status: "suspended"
  }
];

// Mock data for bookings
const mockBookings = [
  {
    id: "b1",
    userId: "u1",
    userName: "John Doe",
    email: "john@example.com",
    phone: "+91 9876543210",
    placeId: 1,
    placeName: "Rajwada Palace",
    date: "2023-10-15",
    time: "10:00 AM",
    guests: 2,
    amount: 100,
    status: "confirmed",
    bookingReference: "TOUR-1234"
  },
  {
    id: "b2",
    userId: "u2",
    userName: "Jane Smith",
    email: "jane@example.com",
    phone: "+91 9876543211",
    placeId: 2,
    placeName: "Sarafa Bazaar",
    date: "2023-10-18",
    time: "8:00 PM",
    guests: 4,
    amount: 800,
    status: "pending",
    bookingReference: "TOUR-1235"
  },
  {
    id: "b3",
    userId: "u3",
    userName: "Robert Johnson",
    email: "robert@example.com",
    phone: "+91 9876543212",
    placeId: 4,
    placeName: "Lal Bagh Palace",
    date: "2023-10-20",
    time: "11:30 AM",
    guests: 3,
    amount: 300,
    status: "cancelled",
    bookingReference: "TOUR-1236"
  },
  {
    id: "b4",
    userId: "u4",
    userName: "Emily Davis",
    email: "emily@example.com",
    phone: "+91 9876543213",
    placeId: 3,
    placeName: "Patalpani Waterfall",
    date: "2023-10-25",
    time: "9:00 AM",
    guests: 2,
    amount: 0,
    status: "confirmed",
    bookingReference: "TOUR-1237"
  },
  {
    id: "b5",
    userId: "u5",
    userName: "Michael Wilson",
    email: "michael@example.com",
    phone: "+91 9876543214",
    placeId: 5,
    placeName: "Annapurna Temple",
    date: "2023-10-30",
    time: "5:00 PM",
    guests: 1,
    amount: 0,
    status: "pending",
    bookingReference: "TOUR-1238"
  }
];

// Function to fetch all users (tries real backend first, falls back to mock)
export const fetchUsers = async () => {
  try {
    // First try to fetch from backend
    try {
      console.log('Fetching users from backend...');
      const response = await fetch(`${BASE_URL}/admin/users`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Backend users response:', result);

        if (result.success && result.users && result.users.length > 0) {
          // Format the users to match our expected format
          const formattedUsers = result.users.map(user => ({
            id: user._id,
            name: user.name,
            email: user.email,
            createdAt: new Date(user.createdAt || Date.now()).toLocaleDateString(),
            status: user.status || 'active'
          }));

          return {
            success: true,
            users: formattedUsers
          };
        }
      }

      // If we get here, the backend request failed or returned no users
      console.log('No users from backend, using mock data...');
    } catch (backendError) {
      console.error('Error connecting to backend for users:', backendError);
      console.log('Using mock user data...');
    }

    // Get any real users from localStorage
    const token = localStorage.getItem('token');
    let realUsers = [];

    if (token) {
      try {
        // If we have a token, we have at least one real user (the current user)
        const currentUser = JSON.parse(atob(token.split('.')[1]));

        if (currentUser) {
          realUsers.push({
            _id: currentUser.id || 'current_user',
            name: currentUser.name || 'Current User',
            email: currentUser.email || 'user@example.com',
            createdAt: new Date().toISOString(),
            status: 'active'
          });
        }
      } catch (tokenError) {
        console.error('Error parsing token:', tokenError);
      }
    }

    // Format real users
    const formattedRealUsers = realUsers.map(user => ({
      id: user._id,
      name: user.name,
      email: user.email,
      createdAt: new Date(user.createdAt || Date.now()).toLocaleDateString(),
      status: user.status || 'active'
    }));

    // Combine with mock users, but avoid duplicates by email
    const existingEmails = formattedRealUsers.map(user => user.email);
    const filteredMockUsers = mockUsers.filter(user => !existingEmails.includes(user.email));

    const combinedUsers = [...formattedRealUsers, ...filteredMockUsers];

    return {
      success: true,
      users: combinedUsers
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    return { success: false, message: "Failed to fetch users", error };
  }
};

// Function to fetch all bookings (using real bookings from api.js)
export const fetchBookings = async () => {
  try {
    // First try to fetch from backend
    try {
      console.log('Fetching bookings from backend...');
      const response = await fetch(`${BASE_URL}/admin/bookings`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Backend bookings response:', result);

        if (result.success && result.bookings && result.bookings.length > 0) {
          // Format the bookings to match our expected format
          const formattedBookings = result.bookings.map(booking => ({
            id: booking._id,
            userId: booking.userId || 'unknown',
            userName: booking.name,
            email: booking.email,
            phone: booking.phone,
            placeId: booking.placeId,
            placeName: booking.place,
            date: booking.date,
            time: booking.time,
            guests: (booking.adults || 0) + (booking.children || 0),
            amount: booking.totalAmount,
            status: booking.status,
            bookingReference: booking.bookingReference
          }));

          return {
            success: true,
            bookings: formattedBookings
          };
        }
      }

      // If we get here, the backend request failed or returned no bookings
      console.log('No bookings from backend, using local data...');
    } catch (backendError) {
      console.error('Error connecting to backend for bookings:', backendError);
      console.log('Using local booking data...');
    }

    // If backend fails, use local bookings from api.js
    // First check if we have any real bookings
    if (realBookings && realBookings.length > 0) {
      console.log('Using real bookings from local storage:', realBookings);

      // Format the real bookings to match our expected format
      const formattedRealBookings = realBookings.map(booking => ({
        id: booking._id,
        userId: booking.userId || 'unknown',
        userName: booking.name,
        email: booking.email,
        phone: booking.phone,
        placeId: booking.placeId,
        placeName: booking.place,
        date: booking.date,
        time: booking.time,
        guests: (booking.adults || 0) + (booking.children || 0),
        amount: booking.totalAmount,
        status: booking.status,
        bookingReference: booking.bookingReference
      }));

      // Combine with mock bookings for demonstration
      const combinedBookings = [...formattedRealBookings, ...mockBookings];

      return {
        success: true,
        bookings: combinedBookings
      };
    }

    // If no real bookings, fall back to mock bookings
    console.log('No real bookings found, using mock bookings');
    return {
      success: true,
      bookings: mockBookings
    };
  } catch (error) {
    console.error("Error fetching bookings:", error);
    return { success: false, message: "Failed to fetch bookings", error };
  }
};

// Function to update booking status (tries backend first, falls back to mock)
export const updateBookingStatus = async (bookingId, status) => {
  try {
    // First try to update via backend
    try {
      console.log('Updating booking status via backend...');
      const response = await fetch(`${BASE_URL}/admin/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Backend update response:', result);

        if (result.success) {
          return result;
        }
      }

      // If we get here, the backend request failed
      console.log('Backend update failed, using local implementation...');
    } catch (backendError) {
      console.error('Error connecting to backend for update:', backendError);
      console.log('Using local update implementation...');
    }

    // If backend fails, try to update in local real bookings first
    if (realBookings && realBookings.length > 0) {
      // Find in real bookings
      const realBookingIndex = realBookings.findIndex(b => b._id === bookingId);

      if (realBookingIndex !== -1) {
        // Update the real booking
        realBookings[realBookingIndex].status = status;
        console.log('Updated real booking:', realBookings[realBookingIndex]);

        // Also try to update in mock bookings array to ensure consistency
        const mockIndex = mockBookings.findIndex(b => b.id === bookingId);
        if (mockIndex !== -1) {
          mockBookings[mockIndex].status = status;
        }

        return {
          success: true,
          booking: {
            id: realBookings[realBookingIndex]._id,
            status: realBookings[realBookingIndex].status
          }
        };
      }
    }

    // If not found in real bookings, try mock bookings
    const bookingIndex = mockBookings.findIndex(b => b.id === bookingId);

    if (bookingIndex !== -1) {
      mockBookings[bookingIndex].status = status;
      return {
        success: true,
        booking: mockBookings[bookingIndex]
      };
    }

    return {
      success: false,
      message: "Booking not found"
    };
  } catch (error) {
    console.error("Error updating booking status:", error);
    return { success: false, message: "Failed to update booking status", error };
  }
};

// Function to fetch all places (using the places from Places.jsx since there's no backend endpoint yet)
export const fetchPlaces = async () => {
  try {
    // This is a placeholder - in a real app, you would fetch from the backend
    // For now, we'll return the same places data that's in Places.jsx
    const places = [
      {
        id: 1,
        name: "Rajwada Palace",
        description: "A historical 7-story palace from the Holkar dynasty, featuring a blend of Maratha and Mughal architecture.",
        price: 50,
        image: "https://www.tourmyindia.com/states/madhyapradesh/images/rajwada-palace-indore1.jpg",
        category: "historical",
        bookings: 45,
        rating: 4.7
      },
      {
        id: 2,
        name: "Sarafa Bazaar",
        description: "Famous night food street that comes alive after 8 PM with delicious street food options.",
        price: 200,
        image: "https://www.holidify.com/images/cmsuploads/compressed/sarafa_20190411143306.jpg",
        category: "food",
        bookings: 78,
        rating: 4.9
      },
      {
        id: 3,
        name: "Patalpani Waterfall",
        description: "A beautiful 300-foot waterfall located 35km from Indore, perfect for nature lovers.",
        price: 0,
        image: "https://www.holidify.com/images/cmsuploads/compressed/shutterstock_1235279001_20191024173857.jpg",
        category: "nature",
        bookings: 56,
        rating: 4.6
      },
      {
        id: 4,
        name: "Lal Bagh Palace",
        description: "A magnificent palace built by the Holkar dynasty with European architectural style and beautiful gardens.",
        price: 100,
        image: "https://www.tourmyindia.com/states/madhyapradesh/images/lalbagh-palace.jpg",
        category: "historical",
        bookings: 32,
        rating: 4.5
      },
      {
        id: 5,
        name: "Annapurna Temple",
        description: "A beautiful temple dedicated to the goddess of food, featuring intricate architecture.",
        price: 0,
        image: "https://www.tourmyindia.com/states/madhyapradesh/images/annapurna-temple-indore.jpg",
        category: "religious",
        bookings: 28,
        rating: 4.4
      }
    ];

    return { success: true, places };
  } catch (error) {
    console.error("Error fetching places:", error);
    return { success: false, message: "Failed to fetch places", error };
  }
};
