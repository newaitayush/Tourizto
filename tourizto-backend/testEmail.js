import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

console.log('Starting email test script...');
console.log('Email user:', process.env.EMAIL_USER);
console.log('Email pass length:', process.env.EMAIL_PASS ? process.env.EMAIL_PASS.length : 'not set');

// Function to test Gmail
async function testGmail() {
  console.log('\n--- Testing Gmail ---');
  
  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    
    console.log('Transporter created, verifying connection...');
    
    // Verify connection
    await transporter.verify();
    console.log('Connection verified successfully!');
    
    // Send test email
    console.log('Sending test email...');
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
    console.error('Gmail test failed:');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    if (error.code) console.error('Error code:', error.code);
    if (error.command) console.error('Error command:', error.command);
    if (error.response) console.error('SMTP response:', error.response);
    
    return false;
  }
}

// Function to test Ethereal (fake SMTP service)
async function testEthereal() {
  console.log('\n--- Testing Ethereal ---');
  
  try {
    // Create test account
    console.log('Creating test account...');
    const testAccount = await nodemailer.createTestAccount();
    console.log('Test account created:');
    console.log('- Email:', testAccount.user);
    console.log('- Password:', testAccount.pass);
    
    // Create transporter
    const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass
      }
    });
    
    console.log('Transporter created, verifying connection...');
    
    // Verify connection
    await transporter.verify();
    console.log('Connection verified successfully!');
    
    // Send test email
    console.log('Sending test email...');
    const info = await transporter.sendMail({
      from: `"Tourizto Test" <${testAccount.user}>`,
      to: process.env.EMAIL_USER,
      subject: 'Test Email from Tourizto (Ethereal)',
      text: 'This is a test email from Tourizto application using Ethereal.',
      html: '<b>This is a test email from Tourizto application using Ethereal.</b>'
    });
    
    console.log('Email sent successfully!');
    console.log('Message ID:', info.messageId);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
    
    return true;
  } catch (error) {
    console.error('Ethereal test failed:');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    
    return false;
  }
}

// Run tests
async function runTests() {
  console.log('Running email tests...\n');
  
  // Test Gmail
  const gmailResult = await testGmail();
  
  // Test Ethereal
  const etherealResult = await testEthereal();
  
  // Summary
  console.log('\n--- Test Results ---');
  console.log('Gmail test:', gmailResult ? 'PASSED' : 'FAILED');
  console.log('Ethereal test:', etherealResult ? 'PASSED' : 'FAILED');
  
  if (!gmailResult && etherealResult) {
    console.log('\nRecommendation: Consider using a different email service like SendGrid or Mailgun.');
  }
}

// Run the tests
runTests().catch(console.error);
