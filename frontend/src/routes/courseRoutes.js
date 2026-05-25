// Course Routes Configuration
// This file contains all course page routes with authentication protection

import React from 'react';

// Course route configuration
export const courseRoutes = [];

// Course categories with their respective courses
export const courseCategories = {};

// Helper function to get all courses
export const getAllCourses = () => {
  return [];
};

// Helper function to get courses by category
export const getCoursesByCategory = (category) => {
  return [];
};

// Helper function to check if user has access to course
export const hasAccessToCourse = (user, courseId) => {
  return user && user.accountType && ['Student', 'Instructor', 'Admin'].includes(user.accountType);
};
