import express from 'express';
import Booking from '../models/Booking.js';
import { sendBookingConfirmation } from '../services/emailService.js';

const router = express.Router();

// Create a new booking
router.post('/', async (req, res) => {
  try {
    console.log('Received booking request');
    console.log('Request body:', JSON.stringify(req.body, null, 2));

    const bookingData = req.body;

    // Validate required fields
    if (!bookingData.email) {
      console.error('Missing email in booking data');
      return res.status(400).json({
        success: false,
        message: 'Email is required for booking'
      });
    }

    console.log('Saving booking to database...');

    // Save booking to database
    try {
      console.log('Creating booking with data:', JSON.stringify(bookingData, null, 2));

      // Validate required fields
      const requiredFields = ['name', 'email', 'phone', 'place', 'placeId', 'date', 'time', 'adults', 'totalAmount', 'bookingReference'];
      const missingFields = requiredFields.filter(field => !bookingData[field]);

      if (missingFields.length > 0) {
        console.error('Missing required fields:', missingFields);
        return res.status(400).json({
          success: false,
          message: `Missing required fields: ${missingFields.join(', ')}`,
          missingFields
        });
      }

      // Add receipt number if not provided
      if (!bookingData.receiptNumber) {
        bookingData.receiptNumber = `RCPT-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;
        console.log('Generated receipt number:', bookingData.receiptNumber);
      }

      // Create and save the booking
      const booking = new Booking(bookingData);

      try {
        await booking.save();
        console.log('Booking saved successfully with ID:', booking._id);
      } catch (saveError) {
        console.error('Error saving booking:', saveError);
        console.error('Validation errors:', saveError.errors);

        // Check for specific validation errors
        if (saveError.name === 'ValidationError') {
          const validationErrors = {};
          for (const field in saveError.errors) {
            validationErrors[field] = saveError.errors[field].message;
          }

          return res.status(400).json({
            success: false,
            message: 'Validation error',
            validationErrors
          });
        }

        // Check for duplicate key error
        if (saveError.code === 11000) {
          console.error('Duplicate key error:', saveError.keyValue);

          // Generate new unique values based on which field has a duplicate
          if (saveError.keyValue.bookingReference) {
            bookingData.bookingReference = `TZ-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;
            console.log('Generated new booking reference:', bookingData.bookingReference);
          }

          if (saveError.keyValue.receiptNumber) {
            bookingData.receiptNumber = `RCPT-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 1000)}`;
            console.log('Generated new receipt number:', bookingData.receiptNumber);
          }

          // Try saving again with new values
          try {
            const retryBooking = new Booking(bookingData);
            await retryBooking.save();
            console.log('Booking saved successfully with new unique values. ID:', retryBooking._id);

            // Update the booking variable for the rest of the function
            booking._id = retryBooking._id;
            booking.bookingReference = retryBooking.bookingReference;
            booking.receiptNumber = retryBooking.receiptNumber;
          } catch (retryError) {
            console.error('Failed to save booking even after generating new unique values:', retryError);
            throw retryError;
          }
        } else {
          throw saveError; // Re-throw other errors
        }
      }

      // Send confirmation email
      console.log('Sending confirmation email to:', bookingData.email);
      const emailResult = await sendBookingConfirmation(bookingData);

      if (emailResult.success) {
        console.log('Email sent successfully with ID:', emailResult.messageId);
        res.status(201).json({
          success: true,
          message: 'Booking created and confirmation email sent',
          booking: booking,
          emailId: emailResult.messageId
        });
      } else {
        console.error('Failed to send email:', emailResult.error);
        res.status(201).json({
          success: true,
          message: 'Booking created but failed to send email',
          booking: booking,
          emailError: emailResult.error
        });
      }
    } catch (dbError) {
      console.error('Database error:', dbError);
      console.error('Error stack:', dbError.stack);
      res.status(500).json({
        success: false,
        message: 'Failed to save booking to database',
        error: dbError.message,
        stack: process.env.NODE_ENV === 'development' ? dbError.stack : undefined
      });
    }
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, bookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Get booking by ID
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    res.status(200).json({ success: true, booking });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update booking status
router.patch('/:id/status', async (req, res) => {
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
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
