/**
 * College LMS - Auth Middleware
 * Middleware for verifying JWT tokens and protecting routes
 */

import { verifyToken, getUserProfile } from '../config/supabase.js';

/**
 * Verify authentication middleware
 * Checks if user is authenticated via valid JWT token
 */
export const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        success: false,
        message: 'No token provided',
      });
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    const { user, error } = await verifyToken(token);

    if (error || !user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid or expired token',
      });
    }

    // Attach user to request object
    req.user = user;

    // Fetch user profile and attach to request
    const { profile } = await getUserProfile(user.id);
    req.profile = profile;

    next();
  } catch (error) {
    console.error('Auth middleware error:', error);
    return res.status(500).json({
      success: false,
      message: 'Authentication error',
    });
  }
};

/**
 * Role-based access control middleware factory
 * Creates middleware that checks if user has required role
 * @param {string[]} allowedRoles - Array of allowed roles
 */
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.profile) {
      return res.status(401).json({
        success: false,
        message: 'User profile not found',
      });
    }

    if (!allowedRoles.includes(req.profile.role)) {
      return res.status(403).json({
        success: false,
        message: 'Insufficient permissions',
      });
    }

    next();
  };
};

/**
 * Check if user is student
 */
export const isStudent = authorize('student');

/**
 * Check if user is instructor
 */
export const isInstructor = authorize('instructor');

/**
 * Check if user is HOD
 */
export const isHOD = authorize('hod');

/**
 * Check if user is admin
 */
export const isAdmin = authorize('admin');

/**
 * Check if user is instructor, HOD, or admin
 */
export const isInstructorOrAdmin = authorize('instructor', 'hod', 'admin');

/**
 * Check if user is student or instructor
 */
export const isStudentOrInstructor = authorize('student', 'instructor');

/**
 * Optional authentication middleware
 * Attaches user if token is valid but doesn't require it
 */
export const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next();
    }

    const token = authHeader.substring(7);
    const { user, error } = await verifyToken(token);

    if (!error && user) {
      req.user = user;
      const { profile } = await getUserProfile(user.id);
      req.profile = profile;
    }

    next();
  } catch (error) {
    // Continue without authentication on error
    next();
  }
};

export default {
  authenticate,
  authorize,
  isStudent,
  isInstructor,
  isHOD,
  isAdmin,
  isInstructorOrAdmin,
  isStudentOrInstructor,
  optionalAuth,
};
