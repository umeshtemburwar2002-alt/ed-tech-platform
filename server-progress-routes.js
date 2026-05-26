/**
 * College LMS - Progress Routes
 * Routes for progress tracking operations
 */

import express from 'express';
import * as progressController from '../controllers/progress.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * @route   POST /api/progress/complete
 * @desc    Mark lesson as complete
 * @access  Private (Student)
 */
router.post('/complete', authenticate, progressController.markComplete);

/**
 * @route   POST /api/progress/incomplete
 * @desc    Mark lesson as incomplete
 * @access  Private (Student)
 */
router.post('/incomplete', authenticate, progressController.markIncomplete);

/**
 * @route   POST /api/progress/watch-time
 * @desc    Save watch time
 * @access  Private (Student)
 */
router.post('/watch-time', authenticate, progressController.saveWatchTime);

/**
 * @route   GET /api/progress/student/:studentId
 * @desc    Get student progress
 * @access  Private
 */
router.get('/student/:studentId', authenticate, progressController.getStudentProgress);

/**
 * @route   GET /api/progress/course/:courseId/:studentId
 * @desc    Get course progress percentage
 * @access  Private
 */
router.get('/course/:courseId/:studentId', authenticate, progressController.getCourseProgress);

/**
 * @route   GET /api/progress/resume/:courseId/:studentId
 * @desc    Get resume lesson
 * @access  Private
 */
router.get('/resume/:courseId/:studentId', authenticate, progressController.getResumeLesson);

export default router;
