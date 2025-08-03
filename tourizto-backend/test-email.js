import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

console.log('Email Test Script');
console.log('----------------');
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? 'Set (length: ' + process.env.EMAIL_PASS.length + ')' : 'Not set');

async function testEmail() {
  try {
    // Create a test transporter
    console.log('\nCreating transporter...');
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    
    // Verify connection
    console.log('Verifying connection...');
    await new Promise((resolve, reject) => {
      transporter.verify((error, success) => {
        if (error) {
          console.error('Verification failed:', error);
          reject(error);
        } else {
          console.log('Server is ready to take our messages');
          resolve(success);
        }
      });
    });
    
    // Send test email
    console.log('\nSending test email...');
    const info = await transporter.sendMail({
      from: `"Tourizto Test" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Send to self
      subject: 'Test Email from Tourizto',
      text: 'This is a test email from Tourizto application.',
      html: '<b>This is a test email from Tourizto application.</b>'
    });
    
    console.log('Email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('Response:', info.response);
    
    return true;
  } catch (error) {
    console.error('\nError sending email:');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    if (error.code) console.error('Error code:', error.code);
    if (error.command) console.error('Error command:', error.command);
    if (error.response) console.error('SMTP response:', error.response);
    
    return false;
  }
}

// Run the test
testEmail()
  .then(result => {
    console.log('\nTest result:', result ? 'SUCCESS' : 'FAILED');
    process.exit(result ? 0 : 1);
  })
  .catch(error => {
    console.error('Unexpected error:', error);
    process.exit(1);
  });
