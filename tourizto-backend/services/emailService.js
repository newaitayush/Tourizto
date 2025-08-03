import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '../.env') });

// Create a Gmail transporter
const createGmailTransporter = () => {
  const emailUser = process.env.EMAIL_USER;
  const emailPass = process.env.EMAIL_PASS;

  console.log('Setting up Gmail transporter with:', emailUser);
  console.log('Email password length:', emailPass ? emailPass.length : 'Not set');

  if (!emailUser || !emailPass) {
    console.error('Email credentials are missing! Check your .env file.');
    console.error('EMAIL_USER:', emailUser ? 'Set' : 'Missing');
    console.error('EMAIL_PASS:', emailPass ? 'Set' : 'Missing');
    throw new Error('Email credentials are missing');
  }

  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPass
    }
  });
};

// Create a transporter object
let transporter;
try {
  transporter = createGmailTransporter();
  console.log('Gmail transporter created successfully');
} catch (error) {
  console.error('Failed to create Gmail transporter:', error);
  // Create a fallback transporter that will log instead of sending
  transporter = {
    sendMail: (mailOptions) => {
      console.log('Would send email:', mailOptions);
      return Promise.resolve({
        messageId: 'fake-id-' + Date.now(),
        response: 'Email sending skipped due to configuration error'
      });
    }
  };
}

// Verify connection configuration
if (transporter.verify) {
  try {
    transporter.verify(function(error, success) {
      if (error) {
        console.error('Email transporter error:', error);
      } else {
        console.log('Email server is ready to take our messages');
      }
    });
  } catch (error) {
    console.error('Failed to verify email transporter:', error);
  }
} else {
  console.log('Using fallback transporter (emails will be logged but not sent)');
}

// Function to send booking confirmation email
const sendBookingConfirmation = async (booking) => {
  try {
    console.log('Attempting to send booking confirmation email...');

    // Validate booking data
    if (!booking) {
      console.error('No booking data provided!');
      return { success: false, error: 'No booking data provided' };
    }

    const {
      name = 'Valued Customer',
      email,
      place = 'Unknown Destination',
      date = 'Not specified',
      time = 'Not specified',
      adults = 0,
      children = 0,
      totalAmount = 0,
      bookingReference = `TZ-${Date.now().toString().slice(-6)}`
    } = booking;

    if (!email) {
      console.error('No recipient email provided!');
      return { success: false, error: 'No recipient email provided' };
    }

    console.log(`Preparing email to send to: ${email}`);

    // Email content
    const mailOptions = {
      from: `"Tourizto Travel" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Your Booking Confirmation - Tourizto',
      text: `
Booking Confirmation

Dear ${name},

Thank you for booking with Tourizto! Your reservation has been confirmed.

Booking Details:
- Destination: ${place}
- Date: ${date}
- Time: ${time}
- Guests: ${adults} adults, ${children} children
- Total Amount: ₹${totalAmount}

Booking Reference: ${bookingReference}

This email serves as your e-ticket. Please present it when you arrive at the destination.

Need Help?
If you have any questions or need to make changes to your booking, please contact us:
Email: support@tourizto.com
Phone: +91 98765 43210

Thank you for choosing Tourizto!
© ${new Date().getFullYear()} Tourizto. All rights reserved.
      `,
      html: `
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

          <div style="margin-bottom: 20px;">
            <h3 style="color: #00796b;">Booking Details:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e0e0e0;"><strong>Destination:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #e0e0e0;">${place}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e0e0e0;"><strong>Date:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #e0e0e0;">${date}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e0e0e0;"><strong>Time:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #e0e0e0;">${time}</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e0e0e0;"><strong>Guests:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #e0e0e0;">${adults} adults, ${children} children</td>
              </tr>
              <tr>
                <td style="padding: 8px; border-bottom: 1px solid #e0e0e0;"><strong>Total Amount:</strong></td>
                <td style="padding: 8px; border-bottom: 1px solid #e0e0e0;">₹${totalAmount}</td>
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
      `
    };

    // Send email
    console.log('Sending email to:', email);

    try {
      const info = await transporter.sendMail(mailOptions);

      console.log('Email sent successfully!');
      console.log('Message ID:', info.messageId);

      return {
        success: true,
        messageId: info.messageId,
        response: info.response
      };
    } catch (sendError) {
      console.error('Error sending email:');
      console.error('Error name:', sendError.name);
      console.error('Error message:', sendError.message);

      // Log additional details if available
      if (sendError.code) console.error('Error code:', sendError.code);
      if (sendError.command) console.error('Error command:', sendError.command);
      if (sendError.response) console.error('SMTP response:', sendError.response);

      // Try with a different configuration as a fallback
      console.log('Trying alternative email configuration...');

      try {
        // Create a one-time transporter with different settings
        const altTransporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false, // use TLS
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          },
          tls: {
            rejectUnauthorized: false
          }
        });

        const altInfo = await altTransporter.sendMail(mailOptions);

        console.log('Email sent successfully with alternative configuration!');
        console.log('Message ID:', altInfo.messageId);

        return {
          success: true,
          messageId: altInfo.messageId,
          response: altInfo.response
        };
      } catch (altError) {
        console.error('Alternative email configuration also failed:', altError.message);
        return {
          success: false,
          error: `Failed to send email: ${sendError.message}. Alternative method also failed: ${altError.message}`,
          code: sendError.code
        };
      }
    }
  } catch (error) {
    console.error('Error in email preparation:');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Error stack:', error.stack);

    return {
      success: false,
      error: `Email preparation failed: ${error.message}`,
      stack: error.stack
    };
  }
};

export { sendBookingConfirmation };
