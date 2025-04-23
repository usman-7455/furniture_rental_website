
// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Form validation
const form = document.getElementById('signupForm');
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const termsCheckbox = document.getElementById('termsCheckbox');

// Error messages
const nameError = document.getElementById('nameError');
const emailError = document.getElementById('emailError');
const phoneError = document.getElementById('phoneError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');
const termsError = document.getElementById('termsError');

// Input containers
const nameInputContainer = document.getElementById('nameInputContainer');
const emailInputContainer = document.getElementById('emailInputContainer');
const phoneInputContainer = document.getElementById('phoneInputContainer');
const passwordInputContainer = document.getElementById('passwordInputContainer');
const confirmPasswordInputContainer = document.getElementById('confirmPasswordInputContainer');

// Password strength elements
const strengthText = document.getElementById('strengthText');
const strengthMeter = document.getElementById('strengthMeter');

// Validation patterns
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^\+?[\d\s()-]{10,15}$/;

// Function to show error
function showError(input, container, errorElement, message) {
  container.classList.add('error');
  container.classList.remove('success');
  errorElement.style.display = 'block';
  errorElement.textContent = message;
  return false;
}

// Function to show success
function showSuccess(input, container, errorElement) {
  container.classList.remove('error');
  container.classList.add('success');
  errorElement.style.display = 'none';
  return true;
}

// Validate name
function validateName() {
  if (fullName.value.trim() === '') {
    return showError(fullName, nameInputContainer, nameError, 'Please enter your full name');
  } else if (fullName.value.trim().length < 3) {
    return showError(fullName, nameInputContainer, nameError, 'Name must be at least 3 characters');
  } else {
    return showSuccess(fullName, nameInputContainer, nameError);
  }
}

// Validate email
function validateEmail() {
  if (email.value.trim() === '') {
    return showError(email, emailInputContainer, emailError, 'Email is required');
  } else if (!emailPattern.test(email.value.trim())) {
    return showError(email, emailInputContainer, emailError, 'Please enter a valid email address');
  } else {
    return showSuccess(email, emailInputContainer, emailError);
  }
}

// Validate phone
function validatePhone() {
  if (phone.value.trim() === '') {
    return showError(phone, phoneInputContainer, phoneError, 'Phone number is required');
  } else if (!phonePattern.test(phone.value.trim())) {
    return showError(phone, phoneInputContainer, phoneError, 'Please enter a valid phone number');
  } else {
    return showSuccess(phone, phoneInputContainer, phoneError);
  }
}

// Check password strength
function checkPasswordStrength(password) {
  let strength = 0;
  
  // Length check
  if (password.length >= 8) strength += 1;
  
  // Contains lowercase
  if (/[a-z]/.test(password)) strength += 1;
  
  // Contains uppercase
  if (/[A-Z]/.test(password)) strength += 1;
  
  // Contains number
  if (/[0-9]/.test(password)) strength += 1;
  
  // Contains special char
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;
  
  return strength;
}

// Update password strength meter
function updatePasswordStrength() {
  const strength = checkPasswordStrength(password.value);
  
  if (password.value === '') {
    strengthText.textContent = 'None';
    strengthMeter.style.width = '0%';
    strengthMeter.className = '';
  } else if (strength < 3) {
    strengthText.textContent = 'Weak';
    strengthMeter.style.width = '33%';
    strengthMeter.className = 'weak';
  } else if (strength < 5) {
    strengthText.textContent = 'Medium';
    strengthMeter.style.width = '66%';
    strengthMeter.className = 'medium';
  } else {
    strengthText.textContent = 'Strong';
    strengthMeter.style.width = '100%';
    strengthMeter.className = 'strong';
  }
}

// Validate password
function validatePassword() {
  updatePasswordStrength();
  
  if (password.value === '') {
    return showError(password, passwordInputContainer, passwordError, 'Password is required');
  } else if (password.value.length < 8) {
    return showError(password, passwordInputContainer, passwordError, 'Password must be at least 8 characters');
  } else if (checkPasswordStrength(password.value) < 3) {
    return showError(password, passwordInputContainer, passwordError, 'Password is too weak');
  } else {
    return showSuccess(password, passwordInputContainer, passwordError);
  }
}

// Validate confirm password
function validateConfirmPassword() {
  if (confirmPassword.value === '') {
    return showError(confirmPassword, confirmPasswordInputContainer, confirmPasswordError, 'Please confirm your password');
  } else if (confirmPassword.value !== password.value) {
    return showError(confirmPassword, confirmPasswordInputContainer, confirmPasswordError, 'Passwords do not match');
  } else {
    return showSuccess(confirmPassword, confirmPasswordInputContainer, confirmPasswordError);
  }
}

// Validate terms
function validateTerms() {
  if (!termsCheckbox.checked) {
    termsError.style.display = 'block';
    return false;
  } else {
    termsError.style.display = 'none';
    return true;
  }
}

// Input event listeners
fullName.addEventListener('input', validateName);
email.addEventListener('input', validateEmail);
phone.addEventListener('input', validatePhone);
password.addEventListener('input', validatePassword);
confirmPassword.addEventListener('input', validateConfirmPassword);
termsCheckbox.addEventListener('change', validateTerms);

// Form submit
form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Validate all fields
  const isNameValid = validateName();
  const isEmailValid = validateEmail();
  const isPhoneValid = validatePhone();
  const isPasswordValid = validatePassword();
  const isConfirmPasswordValid = validateConfirmPassword();
  const isTermsValid = validateTerms();
  
  // If all validations pass
  if (isNameValid && isEmailValid && isPhoneValid && isPasswordValid && isConfirmPasswordValid && isTermsValid) {
    // You would typically send data to your server here
    alert('Account created successfully!');
    // form.submit(); // Uncomment this when you have a server endpoint
  }
});
