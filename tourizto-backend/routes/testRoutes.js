import express from 'express';
import { sendTestEmail } from '../services/testEmailService.js';

const router = express.Router();

// Test route for email
router.post('/email', async (req, res) => {
  try {
    console.log('Test email route called');
    
    // Create a sample booking
    const sampleBooking = {
      name: 'Test User',
      email: req.body.email || 'newaitayush@gmail.com', // Use provided email or default
      place: 'Rajwada Palace',
      date: 'June 15, 2023',
      time: '10:00 AM',
      adults: 2,
      children: 1,
      totalAmount: 200,
      bookingReference: `TZ-${Date.now().toString().slice(-6)}`
    };
    
    console.log('Sending test email to:', sampleBooking.email);
    
    // Send test email
    const result = await sendTestEmail(sampleBooking);
    
    if (result.success) {
      res.status(200).json({
        success: true,
        message: 'Test email sent successfully',
        messageId: result.messageId,
        previewUrl: result.previewUrl
      });
    } else {
      res.status(500).json({
        success: false,
        message: 'Failed to send test email',
        error: result.error
      });
    }
  } catch (error) {
    console.error('Test email error:', error);
    res.status(500).json({
      success: false,
      message: 'Error in test email route',
      error: error.message
    });
  }
});

export default router;
