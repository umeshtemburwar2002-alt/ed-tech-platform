/**
 * College LMS - Admin Routes
 * Routes for admin operations
 */

import express from 'express';
import * as adminController from '../controllers/admin.controller.js';
import { authenticate, authorize } from '../middleware/auth.middleware.js';

const router = express.Router();

/**
 * @route   GET /api/admin/stats
 * @desc    Get platform statistics
 * @access  Private (Admin)
 */
router.get('/stats', authenticate, authorize('admin'), adminController.getPlatformStats);

/**
 * @route   GET /api/admin/users
 * @desc    Get all users with filters
 * @access  Private (Admin)
 */
router.get('/users', authenticate, authorize('admin'), adminController.getAllUsers);

/**
 * @route   PUT /api/admin/users/:id/role
 * @desc    Update user role
 * @access  Private (Admin)
 */
router.put('/users/:id/role', authenticate, authorize('admin'), adminController.updateUserRole);

/**
 * @route   DELETE /api/admin/users/:id
 * @desc    Delete user
 * @access  Private (Admin)
 */
router.delete('/users/:id', authenticate, authorize('admin'), adminController.deleteUser);

/**
 * @route   GET /api/admin/courses/pending
 * @desc    Get pending courses
 * @access  Private (Admin)
 */
router.get('/courses/pending', authenticate, authorize('admin'), adminController.getPendingCourses);

/**
 * @route   PUT /api/admin/courses/:id/approve
 * @desc    Approve course
 * @access  Private (Admin)
 */
router.put('/courses/:id/approve', authenticate, authorize('admin'), adminController.approveCourse);

/**
 * @route   PUT /api/admin/courses/:id/reject
 * @desc    Reject course
 * @access  Private (Admin)
 */
router.put('/courses/:id/reject', authenticate, authorize('admin'), adminController.rejectCourse);

/**
 * @route   GET /api/admin/users/export
 * @desc    Export users to CSV
 * @access  Private (Admin)
 */
router.get('/users/export', authenticate, authorize('admin'), adminController.exportUsersCSV);

export default router;
