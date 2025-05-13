# Furniture Rental Website with Nodemailer Contact Form

This project is a furniture rental website with a Node.js backend that uses Nodemailer to handle contact form submissions.

## Features

- Responsive furniture rental website
- MVC architecture for the backend
- Contact form with Nodemailer integration
- In-memory model for storing contact submissions

## Prerequisites

- Node.js and npm installed
- Gmail account for sending emails (or any other email service)

## Setup

1. Clone the repository
2. Install dependencies
   ```
   npm install
   ```
3. Create a `.env` file in the root directory with the following variables:
   ```
   PORT=3000
   EMAIL_USER=your-gmail-account@gmail.com
   EMAIL_PASSWORD=your-app-password
   EMAIL_RECEIVER=your-receiving-email@example.com
   ```
   
   Note: For Gmail, you need to use an "App Password". To get one:
   - Enable 2-Step Verification in your Google account
   - Go to Google Account > Security > App passwords
   - Generate a new app password for "Mail" and "Other"
   - Use this password in the `.env` file

4. Start the server
   ```
   npm start
   ```
   
   Or for development with auto-reload:
   ```
   npm run dev
   ```

5. Access the website at `http://localhost:3000`

## Project Structure

```
furniture-rental/
├── controllers/
│   └── contactController.js   # Controller for handling contact submissions
├── models/
│   └── contactModel.js        # Model for contact form data
├── routes/
│   └── contactRoutes.js       # Routes for contact form API
├── public/
│   └── js/                    # Client-side JavaScript
├── views/                     # Optional for more complex views
├── *.html                     # Static HTML files
├── *.css                      # CSS files
├── server.js                  # Main server file
├── package.json               # Project dependencies
└── .env                       # Environment variables (create this)
```

## How It Works

1. User fills out the contact form on the contact page
2. Form data is sent to the server via AJAX
3. The server uses Nodemailer to send an email
4. The submission is stored in memory
5. Response is sent back to the client

## Extending the Project

To extend this project, you might want to:

1. Add a database (MongoDB, MySQL, etc.) for persistent storage
2. Create more advanced email templates
3. Add user authentication for an admin panel
4. Implement more features like furniture booking 