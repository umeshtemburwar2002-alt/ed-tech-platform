/**
 * College LMS - Lesson Routes
 * Routes for lesson CRUD operations
 */

import express from 'express';
import * as lessonController from '../controllers/lesson.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * @route   GET /api/lessons/section/:sectionId
 * @desc    Get lessons by section
 * @access  Public
 */
router.get('/section/:sectionId', lessonController.getLessonsBySection);

/**
 * @route   GET /api/lessons/:id
 * @desc    Get lesson by ID
 * @access  Public
 */
router.get('/:id', lessonController.getLessonById);

/**
 * @route   POST /api/lessons
 * @desc    Create lesson
 * @access  Private (Instructor, Admin)
 */
router.post('/', authenticate, authorize('instructor', 'admin'), lessonController.createLesson);

/**
 * @route   PUT /api/lessons/:id
 * @desc    Update lesson
 * @access  Private (Instructor, Admin)
 */
router.put('/:id', authenticate, authorize('instructor', 'admin'), lessonController.updateLesson);

/**
 * @route   DELETE /api/lessons/:id
 * @desc    Delete lesson
 * @access  Private (Instructor, Admin)
 */
router.delete('/:id', authenticate, authorize('instructor', 'admin'), lessonController.deleteLesson);

/**
 * @route   PUT /api/lessons/reorder
 * @desc    Reorder lessons
 * @access  Private (Instructor, Admin)
 */
router.put('/reorder', authenticate, authorize('instructor', 'admin'), lessonController.reorderLessons);

/**
 * @route   PUT /api/lessons/:id/toggle-status
 * @desc    Toggle lesson status
 * @access  Private (Instructor, Admin)
 */
router.put('/:id/toggle-status', authenticate, authorize('instructor', 'admin'), lessonController.toggleLessonStatus);

export default router;
