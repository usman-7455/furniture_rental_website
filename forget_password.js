
// Mobile navigation toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Form validation
const forgotPasswordForm = document.getElementById('forgotPasswordForm');
const email = document.getElementById('email');
const emailError = document.getElementById('emailError');
const emailContainer = document.getElementById('emailContainer');
const successMessage = document.getElementById('successMessage');

// Function to validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Clear error messages when typing
email.addEventListener('input', () => {
  emailError.textContent = '';
  emailContainer.classList.remove('error');
  successMessage.style.display = 'none';
});

// Form submission validation
forgotPasswordForm.addEventListener('submit', function(e) {
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

  // If form is valid, submit it
  if (isValid) {
    console.log('Password reset requested for:', email.value);
    
    // Show success message
    successMessage.style.display = 'block';
    
    // Clear input field
    email.value = '';
    
    // Uncomment the line below to actually submit the form
    // forgotPasswordForm.submit();
  }
});
