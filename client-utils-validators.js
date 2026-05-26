/**
 * College LMS - Validators Utility
 * Common validation functions
 */

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} - Is valid email
 */
export const isValidEmail = (email) => {
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate roll number (format: e.g., CS2023001)
 * @param {string} rollNumber - Roll number to validate
 * @returns {boolean} - Is valid roll number
 */
export const isValidRollNumber = (rollNumber) => {
  if (!rollNumber) return false;
  // Format: 2-4 letter department code + 4 digit year + 3 digit number
  const rollRegex = /^[A-Z]{2,4}\d{7}$/;
  return rollRegex.test(rollNumber.toUpperCase());
};

/**
 * Validate phone number (10 digits)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - Is valid phone
 */
export const isValidPhone = (phone) => {
  if (!phone) return false;
  const phoneRegex = /^\d{10}$/;
  return phoneRegex.test(phone.replace(/\D/g, ''));
};

/**
 * Validate file size
 * @param {File} file - File to validate
 * @param {number} maxSizeMB - Max size in MB
 * @returns {boolean} - Is valid size
 */
export const isValidFileSize = (file, maxSizeMB = 10) => {
  if (!file) return false;
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
};

/**
 * Validate file type
 * @param {File} file - File to validate
 * @param {string[]} allowedTypes - Array of allowed MIME types
 * @returns {boolean} - Is valid type
 */
export const isValidFileType = (file, allowedTypes) => {
  if (!file || !allowedTypes) return false;
  return allowedTypes.includes(file.type);
};

/**
 * Validate image file
 * @param {File} file - File to validate
 * @returns {boolean} - Is valid image
 */
export const isValidImage = (file) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
  return isValidFileType(file, allowedTypes);
};

/**
 * Validate video file
 * @param {File} file - File to validate
 * @returns {boolean} - Is valid video
 */
export const isValidVideo = (file) => {
  const allowedTypes = ['video/mp4', 'video/webm', 'video/mov'];
  return isValidFileType(file, allowedTypes);
};

/**
 * Validate PDF file
 * @param {File} file - File to validate
 * @returns {boolean} - Is valid PDF
 */
export const isValidPDF = (file) => {
  return isValidFileType(file, ['application/pdf']);
};

/**
 * Validate URL
 * @param {string} url - URL to validate
 * @returns {boolean} - Is valid URL
 */
export const isValidURL = (url) => {
  if (!url) return false;
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} - Validation result with strength score
 */
export const validatePassword = (password) => {
  if (!password) {
    return { valid: false, strength: 0, message: 'Password is required' };
  }

  let strength = 0;
  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    numbers: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  Object.values(checks).forEach((check) => {
    if (check) strength++;
  });

  const strengthLevels = {
    0: { valid: false, message: 'Very weak' },
    1: { valid: false, message: 'Weak' },
    2: { valid: false, message: 'Fair' },
    3: { valid: true, message: 'Good' },
    4: { valid: true, message: 'Strong' },
    5: { valid: true, message: 'Very strong' },
  };

  return {
    valid: strength >= 3,
    strength,
    message: strengthLevels[strength].message,
    checks,
  };
};

/**
 * Validate required field
 * @param {any} value - Value to validate
 * @returns {boolean} - Is valid (not empty)
 */
export const isRequired = (value) => {
  if (value === null || value === undefined) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
};

/**
 * Validate minimum length
 * @param {string} value - Value to validate
 * @param {number} min - Minimum length
 * @returns {boolean} - Is valid
 */
export const minLength = (value, min) => {
  if (!value) return false;
  return value.length >= min;
};

/**
 * Validate maximum length
 * @param {string} value - Value to validate
 * @param {number} max - Maximum length
 * @returns {boolean} - Is valid
 */
export const maxLength = (value, max) => {
  if (!value) return true;
  return value.length <= max;
};

/**
 * Validate number range
 * @param {number} value - Value to validate
 * @param {number} min - Minimum value
 * @param {number} max - Maximum value
 * @returns {boolean} - Is valid
 */
export const isInRange = (value, min, max) => {
  if (value === null || value === undefined) return false;
  return value >= min && value <= max;
};

export default {
  isValidEmail,
  isValidRollNumber,
  isValidPhone,
  isValidFileSize,
  isValidFileType,
  isValidImage,
  isValidVideo,
  isValidPDF,
  isValidURL,
  validatePassword,
  isRequired,
  minLength,
  maxLength,
  isInRange,
};
