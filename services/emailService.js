// services/emailService.js
const nodemailer = require('nodemailer');
require('dotenv').config();

// Debug logging for email configuration
console.log('Email Configuration:');
console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASSWORD:', process.env.EMAIL_PASSWORD ? 'Set' : 'Not set');
console.log('ADMIN_EMAIL:', process.env.ADMIN_EMAIL);

// Create a transporter using Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  },
  debug: true // Enable debug logging
});

// Verify transporter configuration
transporter.verify(function(error, success) {
  if (error) {
    console.error('Transporter verification failed:', error);
  } else {
    console.log('Transporter is ready to send emails');
  }
});

// Function to send contact form emails
const sendContactEmail = async (contactData) => {
  try {
    const { name, email, subject, message } = contactData;

    // Validate required environment variables
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD || !process.env.ADMIN_EMAIL) {
      throw new Error('Email configuration is incomplete. Please check your .env file.');
    }

    // Validate input data
    if (!name || !email || !subject || !message) {
      throw new Error('Missing required contact form fields');
    }

    console.log('Preparing to send emails with data:', {
      name,
      email,
      subject,
      messageLength: message.length
    });

    // Email to admin
    const adminMailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
    };

    // Email to user (confirmation)
    const userMailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Thank you for contacting Furniture Rental',
      html: `
        <h2>Thank you for contacting us!</h2>
        <p>Dear ${name},</p>
        <p>We have received your message and will get back to you as soon as possible.</p>
        <p>Here's a copy of your message:</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <br>
        <p>Best regards,</p>
        <p>Furniture Rental Team</p>
      `
    };

    console.log('Attempting to send admin email...');
    await transporter.sendMail(adminMailOptions);
    console.log('Admin email sent successfully');

    console.log('Attempting to send user confirmation email...');
    await transporter.sendMail(userMailOptions);
    console.log('User confirmation email sent successfully');

    return true;
  } catch (error) {
    console.error('Error sending email:', {
      message: error.message,
      code: error.code,
      command: error.command,
      stack: error.stack
    });
    throw error;
  }
};

module.exports = {
  sendContactEmail
};