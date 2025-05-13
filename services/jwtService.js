const jwt = require('jsonwebtoken');
require('dotenv').config(); // Ensure environment variables are loaded

const generateToken = (userId, role = 'user') => {
  // Recommended to use jwt's built-in expiresIn rather than manual calculation
  return jwt.sign(
    { userId, role },
    process.env.JWT_SECRET,
    { 
      algorithm: 'HS256',
      expiresIn: '24h' // More readable than manual calculation
    }
  );
};

const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return { valid: true, expired: false, decoded };
  } catch (error) {
    return {
      valid: false,
      expired: error.message.includes('jwt expired'),
      error: error.message
    };
  }
};

const decodeToken = (token) => {
  return jwt.decode(token); // decode never throws, so try/catch isn't needed
};

module.exports = {
  generateToken,
  verifyToken,
  decodeToken
};