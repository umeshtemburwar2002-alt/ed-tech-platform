/**
 * College LMS - Quiz Routes
 * Routes for quiz operations
 */

import express from 'express';
import * as quizController from '../controllers/quiz.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * @route   GET /api/quizzes/:id
 * @desc    Get quiz by ID
 * @access  Public
 */
router.get('/:id', quizController.getQuiz);

/**
 * @route   POST /api/quizzes
 * @desc    Create quiz
 * @access  Private (Instructor, Admin)
 */
router.post('/', authenticate, authorize('instructor', 'admin'), quizController.createQuiz);

/**
 * @route   PUT /api/quizzes/:id
 * @desc    Update quiz
 * @access  Private (Instructor, Admin)
 */
router.put('/:id', authenticate, authorize('instructor', 'admin'), quizController.updateQuiz);

/**
 * @route   DELETE /api/quizzes/:id
 * @desc    Delete quiz
 * @access  Private (Instructor, Admin)
 */
router.delete('/:id', authenticate, authorize('instructor', 'admin'), quizController.deleteQuiz);

/**
 * @route   POST /api/quizzes/attempt
 * @desc    Submit quiz attempt
 * @access  Private (Student)
 */
router.post('/attempt', authenticate, authorize('student'), quizController.submitAttempt);

/**
 * @route   GET /api/quizzes/:quizId/attempts/:studentId
 * @desc    Get quiz attempts for student
 * @access  Private
 */
router.get('/:quizId/attempts/:studentId', authenticate, quizController.getAttempts);

/**
 * @route   GET /api/quizzes/:id/analytics
 * @desc    Get quiz analytics
 * @access  Private (Instructor, Admin)
 */
router.get('/:id/analytics', authenticate, authorize('instructor', 'admin'), quizController.getQuizAnalytics);

export default router;
