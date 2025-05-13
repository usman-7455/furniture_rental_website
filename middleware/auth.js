const User = require('../models/User');
const { verifyToken } = require('../services/jwtService');
const AppError = require('../utils/appError'); // Custom error class

// Token extraction utility
const getToken = (req) => {
  return req.cookies?.token || 
         req.header('Authorization')?.replace('Bearer ', '') || 
         req.body?.token;
};

const auth = async (req, res, next) => {
  try {
    // 1) Get token
    const token = getToken(req);
    if (!token) {
      return next(new AppError('Authentication required', 401, 'NO_TOKEN'));
    }

    // 2) Verify token
    const { valid, decoded, error } = verifyToken(token);
    if (!valid) {
      return next(new AppError(
        'Invalid token', 
        401, 
        'INVALID_TOKEN', 
        { details: error }
      ));
    }

    // 3) Check expiration (redundant if verifyToken already checks this)
    if (decoded.exp < Date.now() / 1000) {
      return next(new AppError('Token expired', 401, 'TOKEN_EXPIRED'));
    }

    // 4) Get fresh user (with current data)
    const user = await User.findById(decoded.userId).select('+active +verificationStatus');
    if (!user) {
      return next(new AppError('User not found', 401, 'USER_NOT_FOUND'));
    }

    // 5) Check if user changed password after token was issued
    if (user.changedPasswordAfter(decoded.iat)) {
      return next(new AppError(
        'Password was changed. Please log in again.', 
        401, 
        'PASSWORD_CHANGED'
      ));
    }

    // 6) Check verification status
    if (!user.isVerified) {
      return next(new AppError(
        'Please verify your email first', 
        403, 
        'EMAIL_NOT_VERIFIED'
      ));
    }

    // 7) Grant access
    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    next(error); // Pass to global error handler
  }
};

const adminAuth = (req, res, next) => {
  auth(req, res, () => {
    if (req.user.role !== 'admin') {
      return next(new AppError(
        'Admin access required', 
        403, 
        'ADMIN_REQUIRED'
      ));
    }
    next();
  });
};

// Role-based access control (more flexible)
const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError(
        'Insufficient permissions', 
        403, 
        'INSUFFICIENT_PERMISSIONS'
      ));
    }
    next();
  };
};

module.exports = { 
  auth, 
  adminAuth,
  restrictTo
};