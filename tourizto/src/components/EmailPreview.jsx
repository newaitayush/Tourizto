import React, { useState } from 'react';
import './EmailPreview.css';

/**
 * Email Preview Component
 * Shows a preview of the email that would be sent to the user
 */
const EmailPreview = ({ booking, onClose }) => {
  const [showFullEmail, setShowFullEmail] = useState(false);

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'Not specified';

    // If it's already formatted, return as is
    if (typeof dateString === 'string' && dateString.includes(',')) {
      return dateString;
    }

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return dateString || 'Not specified';
    }
  };

  // Generate email HTML content
  const generateEmailContent = () => {
    const {
      name = 'Valued Customer',
      email = 'customer@example.com',
      place = 'Unknown Destination',
      date = 'Not specified',
      time = 'Not specified',
      adults = 0,
      children = 0,
      totalAmount = 0,
      bookingReference = `TZ-${Date.now().toString().slice(-6)}`,
      receiptNumber
    } = booking || {};

    console.log('Generating email preview with booking data:', booking);

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
              <td style="padding: 8px 0; border-bottom: 1px solid #e0e0e0;">${formatDate(date)}</td>
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
        <p style="text-align: center; font-size: 16px; margin: 10px 0;">Receipt Number: <span style="color: #ff8f00;">${receiptNumber || 'Not Available'}</span></p>
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

  return (
    <div className="email-preview-overlay">
      <div className="email-preview-container">
        <button className="close-preview" onClick={onClose}>×</button>

        <div className="email-preview-header">
          <h2>Email Preview</h2>
          <p>This is a preview of the confirmation email that would be sent to {booking?.email}</p>
        </div>

        {showFullEmail ? (
          <div className="email-preview-content">
            <div
              className="email-html-content"
              dangerouslySetInnerHTML={{ __html: generateEmailContent() }}
            />
          </div>
        ) : (
          <div className="email-preview-summary">
            <div className="email-field">
              <span className="email-label">From:</span>
              <span className="email-value">Tourizto Travel &lt;support@tourizto.com&gt;</span>
            </div>
            <div className="email-field">
              <span className="email-label">To:</span>
              <span className="email-value">{booking?.email}</span>
            </div>
            <div className="email-field">
              <span className="email-label">Subject:</span>
              <span className="email-value">Your Booking Confirmation - Tourizto</span>
            </div>
            <div className="email-field">
              <span className="email-label">Booking Reference:</span>
              <span className="email-value">{booking?.bookingReference || `TZ-${Date.now().toString().slice(-6)}`}</span>
            </div>
            <button
              className="view-full-email-btn"
              onClick={() => setShowFullEmail(true)}
            >
              View Full Email
            </button>
          </div>
        )}

        <div className="email-preview-footer">
          <p className="email-note">
            <strong>Note:</strong> In a real application, this email would be sent to your inbox.
          </p>
          <button
            className="close-preview-btn"
            onClick={onClose}
          >
            Close Preview
          </button>
        </div>
      </div>
    </div>
  );
};

export default EmailPreview;
