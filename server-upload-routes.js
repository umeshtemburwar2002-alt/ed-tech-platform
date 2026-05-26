/**
 * College LMS - Upload Routes
 * Routes for file upload operations
 */

import express from 'express';
import * as uploadController from '../controllers/upload.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * @route   POST /api/upload/video
 * @desc    Upload video file
 * @access  Private (Instructor, Admin)
 */
router.post('/video', authenticate, uploadController.upload.single('file'), uploadController.uploadVideo);

/**
 * @route   POST /api/upload/pdf
 * @desc    Upload PDF file
 * @access  Private (Instructor, Admin)
 */
router.post('/pdf', authenticate, uploadController.upload.single('file'), uploadController.uploadPDF);

/**
 * @route   POST /api/upload/resource
 * @desc    Upload resource file
 * @access  Private (Instructor, Admin)
 */
router.post('/resource', authenticate, uploadController.upload.single('file'), uploadController.uploadResource);

/**
 * @route   POST /api/upload/thumbnail
 * @desc    Upload course thumbnail
 * @access  Private (Instructor, Admin)
 */
router.post('/thumbnail', authenticate, uploadController.upload.single('file'), uploadController.uploadThumbnail);

/**
 * @route   POST /api/upload/avatar
 * @desc    Upload user avatar
 * @access  Private
 */
router.post('/avatar', authenticate, uploadController.upload.single('file'), uploadController.uploadAvatar);

/**
 * @route   DELETE /api/upload/file
 * @desc    Delete file from storage
 * @access  Private (Instructor, Admin)
 */
router.delete('/file', authenticate, uploadController.deleteFile);

/**
 * @route   GET /api/upload/signed-url
 * @desc    Get signed URL for private file
 * @access  Private
 */
router.get('/signed-url', authenticate, uploadController.getSignedUrl);

export default router;
