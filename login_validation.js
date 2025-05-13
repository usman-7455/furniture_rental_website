// Mobile navigation toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Form validation
const loginForm = document.getElementById('loginForm');
const email = document.getElementById('email');
const password = document.getElementById('password');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const emailContainer = document.getElementById('emailContainer');
const passwordContainer = document.getElementById('passwordContainer');

// Function to validate email format
function isValidEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@(gmail|yahoo)\.com$/;
  return emailRegex.test(email);
}

// Clear error messages when typing
email.addEventListener('input', () => {
  emailError.textContent = '';
  emailContainer.classList.remove('error');
});

password.addEventListener('input', () => {
  passwordError.textContent = '';
  passwordContainer.classList.remove('error');
});

// Form submission validation and login logic
loginForm.addEventListener('submit', function (e) {
  e.preventDefault();
  let isValid = true;

  // Email validation
  if (!email.value.trim()) {
    emailError.textContent = 'Email is required';
    emailContainer.classList.add('error');
    isValid = false;
  } else if (!isValidEmail(email.value)) {
    emailError.textContent = 'Please enter a valid email address';
    emailContainer.classList.add('error');
    isValid = false;
  }

  // Password validation
  if (!password.value.trim()) {
    passwordError.textContent = 'Password is required';
    passwordContainer.classList.add('error');
    isValid = false;
  } else if (password.value.length < 6) {
    passwordError.textContent = 'Password must be at least 6 characters';
    passwordContainer.classList.add('error');
    isValid = false;
  }

  // If form is valid, submit login request
  if (isValid) {
    fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value,
        password: password.value
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          alert('Login successful!');
          window.location.href = '/browse-furniture'; // Adjust this based on your routing
        } else {
          alert(data.message || 'Invalid email or password');
        }
      })
      .catch(err => {
        console.error('Login failed:', err);
        alert('Server error. Please try again later.');
      });
  }
});
