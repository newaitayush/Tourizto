// src/utils/mockEmailService.js

/**
 * Mock email service for simulating email sending in the frontend
 * This is used when the backend email service is not available
 */

// Store sent emails for reference
const sentEmails = [];

/**
 * Generate an HTML email template for booking confirmation
 * @param {Object} booking - The booking data
 * @returns {string} - HTML email content
 */
const generateEmailTemplate = (booking) => {
  const {
    name = 'Valued Customer',
    place = 'Unknown Destination',
    date = 'Not specified',
    time = 'Not specified',
    adults = 0,
    children = 0,
    totalAmount = 0,
    bookingReference = `TZ-${Date.now().toString().slice(-6)}`
  } = booking;

  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #ff7043; margin: 0;">Tourizto</h1>
        <p style="color: #546e7a; margin-top: 5px;">Your Indore Travel Companion</p>
      </div>

      <div style="background-color: #e0f7fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
        <h2 style="color: #00796b; margin-top: 0;">Booking Confirmed!</h2>
        <p>Dear ${name},</p>
        <p>Thank you for booking with Tourizto! Your reservation has been confirmed.</p>
      </div>

      <div style="background-color: #f5f5f5; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
        <h3 style="color: #00796b; margin-top: 0;">Booking Details</h3>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;"><strong>Destination:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;">${place}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;"><strong>Date:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;">${date}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;"><strong>Time:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;">${time}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;"><strong>Guests:</strong></td>
            <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;">${adults} adults, ${children} children</td>
          </tr>
          <tr>
            <td style="padding: 8px 0;"><strong>Total Amount:</strong></td>
            <td style="padding: 8px 0;">₹${totalAmount}</td>
          </tr>
        </table>
      </div>

      <div style="background-color: #fff8e1; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
        <h3 style="color: #ff8f00; margin-top: 0;">E-Ticket Information</h3>
        <p>This email serves as your e-ticket. Please present it (either printed or on your mobile device) when you arrive at the destination.</p>
        <p style="text-align: center; font-size: 18px; font-weight: bold; margin: 15px 0;">Booking Reference: <span style="color: #ff8f00;">${bookingReference}</span></p>
      </div>

      <div style="margin-bottom: 20px;">
        <h3 style="color: #00796b;">Need Help?</h3>
        <p>If you have any questions or need to make changes to your booking, please contact us:</p>
        <p>Email: support@tourizto.com</p>
        <p>Phone: +91 98765 43210</p>
      </div>

      <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0; color: #757575; font-size: 0.9em;">
        <p>Thank you for choosing Tourizto!</p>
        <p>© ${new Date().getFullYear()} Tourizto. All rights reserved.</p>
      </div>
    </div>
  `;
};

/**
 * Simulate sending an email
 * @param {Object} booking - The booking data
 * @returns {Promise<Object>} - Response object with success status
 */
export const sendEmail = async (booking) => {
  console.log('[Mock Email Service] Starting email send process...');
  console.log('[Mock Email Service] Booking data received:', booking);

  return new Promise((resolve) => {
    // Simulate network delay
    setTimeout(() => {
      try {
        if (!booking || !booking.email) {
          console.error('[Mock Email Service] Missing email in booking data');
          resolve({
            success: false,
            error: 'Email address is required'
          });
          return;
        }

        // Generate email content
        const emailContent = generateEmailTemplate(booking);

        // Create email record
        const emailRecord = {
          id: `email_${Date.now()}`,
          to: booking.email,
          subject: 'Your Booking Confirmation - Tourizto',
          html: emailContent,
          sentAt: new Date().toISOString()
        };

        // Store the email
        sentEmails.push(emailRecord);

        console.log(`[Mock Email Service] Email sent to ${booking.email}`);
        console.log(`[Mock Email Service] Total emails sent: ${sentEmails.length}`);

        // Return success
        resolve({
          success: true,
          messageId: emailRecord.id,
          previewAvailable: true
        });
      } catch (error) {
        console.error('[Mock Email Service] Error:', error);
        resolve({
          success: false,
          error: error.message
        });
      }
    }, 1500); // Simulate 1.5 second delay
  });
};

/**
 * Get all sent emails
 * @returns {Array} - Array of sent emails
 */
export const getSentEmails = () => {
  return [...sentEmails];
};

/**
 * Get email by ID
 * @param {string} id - Email ID
 * @returns {Object|null} - Email object or null if not found
 */
export const getEmailById = (id) => {
  return sentEmails.find(email => email.id === id) || null;
};

/**
 * Clear all sent emails
 */
export const clearEmails = () => {
  sentEmails.length = 0;
  console.log('[Mock Email Service] All emails cleared');
};

export default {
  sendEmail,
  getSentEmails,
  getEmailById,
  clearEmails
};
