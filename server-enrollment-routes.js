/**
 * College LMS - Enrollment Routes
 * Routes for enrollment operations
 */

import express from 'express';
import * as enrollmentController from '../controllers/enrollment.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * @route   POST /api/enrollments
 * @desc    Enroll student in course
 * @access  Private (Student)
 */
router.post('/', authenticate, authorize('student'), enrollmentController.enroll);

/**
 * @route   DELETE /api/enrollments
 * @desc    Unenroll student from course
 * @access  Private (Student)
 */
router.delete('/', authenticate, authorize('student'), enrollmentController.unenroll);

/**
 * @route   GET /api/enrollments/check/:courseId/:studentId
 * @desc    Check if student is enrolled
 * @access  Private
 */
router.get('/check/:courseId/:studentId', authenticate, enrollmentController.checkEnrolled);

/**
 * @route   GET /api/enrollments/student/:studentId
 * @desc    Get student enrollments
 * @access  Private
 */
router.get('/student/:studentId', authenticate, enrollmentController.getStudentEnrollments);

/**
 * @route   GET /api/enrollments/course/:courseId
 * @desc    Get course enrollments
 * @access  Private (Instructor, Admin)
 */
router.get('/course/:courseId', authenticate, authorize('instructor', 'admin'), enrollmentController.getCourseEnrollments);

export default router;
