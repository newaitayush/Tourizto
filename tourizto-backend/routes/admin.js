import express from 'express';
import User from '../models/User.js';
import Booking from '../models/Booking.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware to check if user is admin
const isAdmin = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token, authorization denied' });
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from database
    const user = await User.findById(decoded.id);
    
    // Check if user exists and is admin
    if (!user || !user.isAdmin) {
      return res.status(403).json({ success: false, message: 'Not authorized as admin' });
    }
    
    // Set user in request
    req.user = user;
    next();
  } catch (error) {
    console.error('Admin auth error:', error);
    res.status(401).json({ success: false, message: 'Token is not valid' });
  }
};

// Get all users (admin only)
router.get('/users', isAdmin, async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get all bookings (admin only)
router.get('/bookings', isAdmin, async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update booking status (admin only)
router.patch('/bookings/:id/status', isAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['pending', 'confirmed', 'cancelled'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }
    
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    
    res.status(200).json({ success: true, booking });
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Get user by ID (admin only)
router.get('/users/:id', isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// Update user status (admin only)
router.patch('/users/:id/status', isAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['active', 'inactive', 'suspended'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }
    
    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    
    res.status(200).json({ success: true, user });
  } catch (error) {
    console.error('Error updating user status:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

export default router;
