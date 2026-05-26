/**
 * College LMS - Course Routes
 * Routes for course CRUD operations
 */

import express from 'express';
import * as courseController from '../controllers/course.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * @route   GET /api/courses
 * @desc    Get all courses with filters
 * @access  Public
 */
router.get('/', courseController.getCourses);

/**
 * @route   GET /api/courses/:id
 * @desc    Get course by ID
 * @access  Public
 */
router.get('/:id', courseController.getCourseById);

/**
 * @route   POST /api/courses
 * @desc    Create new course
 * @access  Private (Instructor, Admin)
 */
router.post('/', authenticate, authorize('instructor', 'admin'), courseController.createCourse);

/**
 * @route   PUT /api/courses/:id
 * @desc    Update course
 * @access  Private (Course Instructor, Admin)
 */
router.put('/:id', authenticate, courseController.updateCourse);

/**
 * @route   DELETE /api/courses/:id
 * @desc    Delete course
 * @access  Private (Course Instructor, Admin)
 */
router.delete('/:id', authenticate, authorize('instructor', 'admin'), courseController.deleteCourse);

/**
 * @route   POST /api/courses/:id/duplicate
 * @desc    Duplicate course
 * @access  Private (Instructor, Admin)
 */
router.post('/:id/duplicate', authenticate, authorize('instructor', 'admin'), courseController.duplicateCourse);

/**
 * @route   PUT /api/courses/:id/publish
 * @desc    Publish course
 * @access  Private (Course Instructor, Admin)
 */
router.put('/:id/publish', authenticate, authorize('instructor', 'admin'), courseController.publishCourse);

export default router;
