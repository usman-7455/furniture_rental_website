const nodemailer = require('nodemailer');
const Contact = require('../models/contactModel');
require('dotenv').config();

const emailUser = process.env.EMAIL_USER;
const emailPassword = process.env.EMAIL_PASSWORD;
const emailReceiver = process.env.EMAIL_RECEIVER || 'omnimarket.core@gmail.com';

let transporter;

// Initialize Gmail SMTP transporter
(async function initTransporter() {
  if (emailUser && emailPassword) {
    console.log('Attempting to use Gmail SMTP...');
    try {
      transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: emailUser,
          pass: emailPassword
        },
        debug: true
      });

      await transporter.verify();
      console.log('Gmail SMTP server connection successful');
    } catch (err) {
      console.error('Gmail SMTP connection error:', err);
      transporter = null; // Explicitly disable email sending if setup fails
    }
  } else {
    console.error('Email credentials not found. Email sending disabled.');
    transporter = null;
  }
})();

exports.sendContactEmail = async (req, res) => {
  try {
    const { name, email, message, subject } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Please provide all required fields' });
    }

    const contactEntry = new Contact({
      name,
      email,
      subject: subject || 'Contact Form Submission',
      message,
      date: new Date()
    });

    await contactEntry.save();

    if (!transporter) {
      console.error('Email transporter is not configured. Cannot send email.');
      return res.status(500).json({
        success: false,
        message: 'Email service is currently unavailable. Please try again later.'
      });
    }

    const mailOptions = {
      from: emailUser || 'Furniture Rental <no-reply@furniturerental.com>',
      to: emailReceiver,
      subject: subject || `Furniture Rental Contact Form: ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
      replyTo: email
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Email sent with message ID:', info.messageId);

    return res.status(200).json({ success: true, message: 'Form submitted successfully' });
  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'Error sending your message. Please try again later.' 
    });
  }
};
