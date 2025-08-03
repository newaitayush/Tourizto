import express from 'express';
import { sendBookingConfirmation } from '../services/emailService.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

const router = express.Router();

// Test route for sending a confirmation email
router.post('/send-test', async (req, res) => {
  try {
    const {
      email,
      name = 'Test User',
      place = 'Rajwada Palace',
      date = 'May 20, 2023',
      time = '10:00 AM',
      adults = 2,
      children = 1,
      totalAmount = 150,
      bookingReference = `TZ-${Date.now().toString().slice(-6)}`
    } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Email is required'
      });
    }

    console.log('Sending test/booking email to:', email);
    console.log('Using EMAIL_USER:', process.env.EMAIL_USER);

    // Create a booking object with provided data or defaults
    const bookingData = {
      name,
      email,
      place,
      date,
      time,
      adults,
      children,
      totalAmount,
      bookingReference
    };

    console.log('Booking data for email:', bookingData);

    // Send the email
    const result = await sendBookingConfirmation(bookingData);

    if (result.success) {
      res.status(200).json({
        success: true,
        message: 'Email sent successfully',
        messageId: result.messageId,
        response: result.response
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to send email',
        error: result.error,
        code: result.code
      });
    }
  } catch (error) {
    console.error('Error in email route:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message,
      stack: error.stack
    });
  }
});

// Simple GET endpoint to check if the email service is configured
router.get('/status', (req, res) => {
  try {
    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    res.status(200).json({
      success: true,
      configured: !!(emailUser && emailPass),
      emailUser: emailUser || 'Not set',
      emailPassSet: !!emailPass
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error checking email configuration',
      error: error.message
    });
  }
});

export default router;
