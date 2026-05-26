/**
 * College LMS - Environment Configuration
 * Centralized environment variable management
 */

import dotenv from 'dotenv';

dotenv.config();

const config = {
  // Server
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',

  // Supabase
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseServiceKey: process.env.SUPABASE_SERVICE_ROLE_KEY,

  // JWT
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',

  // Email
  emailHost: process.env.EMAIL_HOST,
  emailPort: process.env.EMAIL_PORT || 587,
  emailUser: process.env.EMAIL_USER,
  emailPass: process.env.EMAIL_PASS,

  // File Upload
  maxFileSize: parseInt(process.env.MAX_FILE_SIZE) || 104857600, // 100MB
  allowedImageTypes: process.env.ALLOWED_IMAGE_TYPES?.split(',') || ['image/jpeg', 'image/png', 'image/webp'],
  allowedVideoTypes: process.env.ALLOWED_VIDEO_TYPES?.split(',') || ['video/mp4', 'video/webm'],
  allowedDocumentTypes: process.env.ALLOWED_DOCUMENT_TYPES?.split(',') || ['application/pdf'],

  // Rate Limiting
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 900000, // 15 minutes
  rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,

  // Certificate
  certificateLogoUrl: process.env.CERTIFICATE_LOGO_URL,
  certificateSignatureUrl: process.env.CERTIFICATE_SIGNATURE_URL,
  collegeName: process.env.COLLEGE_NAME || 'College LMS',
  collegeAddress: process.env.COLLEGE_ADDRESS || '',
  collegeWebsite: process.env.COLLEGE_WEBSITE || '',

  // Validation
  validate() {
    const required = ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'JWT_SECRET'];
    const missing = required.filter(key => !this[key.toLowerCase()]);

    if (missing.length > 0) {
      throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }

    return true;
  },
};

export default config;
