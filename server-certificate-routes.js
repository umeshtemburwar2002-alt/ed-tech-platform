/**
 * College LMS - Certificate Routes
 * Routes for certificate generation, verification, and retrieval
 */

import express from 'express';
import * as certificateController from '../controllers/certificate.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * @route   POST /api/certificates/generate
 * @desc    Generate certificate for course completion
 * @access  Private (Student, Instructor, Admin)
 */
router.post('/generate', authenticate, certificateController.generateCertificate);

/**
 * @route   GET /api/certificates/verify/:certificateId
 * @desc    Verify certificate by UUID
 * @access  Public
 */
router.get('/verify/:certificateId', certificateController.verifyCertificate);

/**
 * @route   GET /api/certificates/student/:studentId
 * @desc    Get all certificates for a student
 * @access  Private (Student can view own, Instructor/Admin can view all)
 */
router.get('/student/:studentId', authenticate, certificateController.getStudentCertificates);

/**
 * @route   GET /api/certificates/course/:courseId
 * @desc    Get all certificates for a course
 * @access  Private (Instructor, Admin)
 */
router.get('/course/:courseId', authenticate, authorize('instructor', 'admin'), certificateController.getCourseCertificates);

/**
 * @route   GET /api/certificates/download/:certificateId
 * @desc    Download certificate PDF
 * @access  Public (with valid certificate ID)
 */
router.get('/download/:certificateId', certificateController.downloadCertificate);

/**
 * @route   GET /api/certificates/check-eligibility/:courseId/:studentId
 * @desc    Check if student is eligible for certificate
 * @access  Private
 */
router.get('/check-eligibility/:courseId/:studentId', authenticate, certificateController.checkEligibility);

export default router;
