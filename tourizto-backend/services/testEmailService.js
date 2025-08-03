import nodemailer from 'nodemailer';

// Create a test account on Ethereal (fake SMTP service for testing)
const createTestAccount = async () => {
  console.log('Creating test email account...');
  try {
    const testAccount = await nodemailer.createTestAccount();
    console.log('Test email account created:');
    console.log('- Email:', testAccount.user);
    console.log('- Password:', testAccount.pass);
    return testAccount;
  } catch (error) {
    console.error('Failed to create test account:', error);
    throw error;
  }
};

// Send a test email using Ethereal
const sendTestEmail = async (booking) => {
  try {
    console.log('Setting up test email service...');
    const testAccount = await createTestAccount();
    
    // Create a transporter using the test account
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
    
    console.log('Test transporter created successfully');
    
    const { name, email, place, date, time, adults, children, totalAmount, bookingReference } = booking;
    
    // Email content
    const mailOptions = {
      from: `"Tourizto Travel" <${testAccount.user}>`,
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
        </div>
      `
    };
    
    // Send email
    console.log('Sending test email...');
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Test email sent successfully!');
    console.log('Message ID:', info.messageId);
    
    // Preview URL (only works with Ethereal)
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    
    return {
      success: true,
      messageId: info.messageId,
      previewUrl: nodemailer.getTestMessageUrl(info)
    };
  } catch (error) {
    console.error('Error sending test email:', error);
    return { success: false, error: error.message };
  }
};

export { sendTestEmail };
