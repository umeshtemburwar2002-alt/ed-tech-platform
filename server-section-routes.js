/**
 * College LMS - Section Routes
 * Routes for section CRUD operations
 */

import express from 'express';
import * as sectionController from '../controllers/section.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * @route   GET /api/sections/course/:courseId
 * @desc    Get sections by course
 * @access  Public
 */
router.get('/course/:courseId', sectionController.getSectionsByCourse);

/**
 * @route   GET /api/sections/:id
 * @desc    Get section by ID
 * @access  Public
 */
router.get('/:id', sectionController.getSectionById);

/**
 * @route   POST /api/sections
 * @desc    Create section
 * @access  Private (Instructor, Admin)
 */
router.post('/', authenticate, authorize('instructor', 'admin'), sectionController.createSection);

/**
 * @route   PUT /api/sections/:id
 * @desc    Update section
 * @access  Private (Instructor, Admin)
 */
router.put('/:id', authenticate, authorize('instructor', 'admin'), sectionController.updateSection);

/**
 * @route   DELETE /api/sections/:id
 * @desc    Delete section
 * @access  Private (Instructor, Admin)
 */
router.delete('/:id', authenticate, authorize('instructor', 'admin'), sectionController.deleteSection);

/**
 * @route   PUT /api/sections/reorder
 * @desc    Reorder sections
 * @access  Private (Instructor, Admin)
 */
router.put('/reorder', authenticate, authorize('instructor', 'admin'), sectionController.reorderSections);

export default router;
