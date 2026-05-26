/**
 * College LMS - Course Service
 * Course CRUD operations via API
 */

import api from './api';
import { supabase } from '../lib/supabase';

/**
 * Get all courses
 */
export const getCourses = async (filters = {}) => {
  try {
    const response = await api.get('/courses', { params: filters });
    return response;
  } catch (error) {
    console.error('Failed to fetch courses:', error);
    throw error;
  }
};

/**
 * Get course by ID
 */
export const getCourseById = async (courseId) => {
  try {
    const response = await api.get(`/courses/${courseId}`);
    return response;
  } catch (error) {
    console.error('Failed to fetch course:', error);
    throw error;
  }
};

/**
 * Create new course
 */
export const createCourse = async (courseData) => {
  try {
    const response = await api.post('/courses', courseData);
    return response;
  } catch (error) {
    console.error('Failed to create course:', error);
    throw error;
  }
};

/**
 * Update course
 */
export const updateCourse = async (courseId, updates) => {
  try {
    const response = await api.put(`/courses/${courseId}`, updates);
    return response;
  } catch (error) {
    console.error('Failed to update course:', error);
    throw error;
  }
};

/**
 * Delete course
 */
export const deleteCourse = async (courseId) => {
  try {
    const response = await api.delete(`/courses/${courseId}`);
    return response;
  } catch (error) {
    console.error('Failed to delete course:', error);
    throw error;
  }
};

/**
 * Duplicate course
 */
export const duplicateCourse = async (courseId) => {
  try {
    const response = await api.post(`/courses/${courseId}/duplicate`);
    return response;
  } catch (error) {
    console.error('Failed to duplicate course:', error);
    throw error;
  }
};

/**
 * Publish course
 */
export const publishCourse = async (courseId) => {
  try {
    const response = await api.put(`/courses/${courseId}/publish`);
    return response;
  } catch (error) {
    console.error('Failed to publish course:', error);
    throw error;
  }
};

/**
 * Get course sections
 */
export const getCourseSections = async (courseId) => {
  try {
    const { data, error } = await supabase
      .from('course_sections')
      .select('*')
      .eq('course_id', courseId)
      .order('order_index', { ascending: true });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Failed to fetch course sections:', error);
    throw error;
  }
};

/**
 * Get course lessons
 */
export const getCourseLessons = async (courseId) => {
  try {
    const { data, error } = await supabase
      .from('course_lessons')
      .select(`
        *,
        lesson_resources (*)
      `)
      .eq('course_id', courseId)
      .order('order_index', { ascending: true });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Failed to fetch course lessons:', error);
    throw error;
  }
};

/**
 * Get course enrollments
 */
export const getCourseEnrollments = async (courseId) => {
  try {
    const { data, error } = await supabase
      .from('enrollments')
      .select(`
        *,
        profiles:student_id (full_name, email, roll_number, avatar_url)
      `)
      .eq('course_id', courseId)
      .order('enrolled_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Failed to fetch course enrollments:', error);
    throw error;
  }
};

/**
 * Get course reviews
 */
export const getCourseReviews = async (courseId) => {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .select(`
        *,
        profiles:student_id (full_name, avatar_url)
      `)
      .eq('course_id', courseId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Failed to fetch course reviews:', error);
    throw error;
  }
};

/**
 * Add course review
 */
export const addCourseReview = async (reviewData) => {
  try {
    const { data, error } = await supabase
      .from('reviews')
      .insert(reviewData)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Failed to add review:', error);
    throw error;
  }
};

/**
 * Toggle wishlist
 */
export const toggleWishlist = async (courseId, studentId) => {
  try {
    const { data: existing } = await supabase
      .from('wishlists')
      .select('*')
      .eq('course_id', courseId)
      .eq('student_id', studentId)
      .single();

    if (existing) {
      const { error } = await supabase
        .from('wishlists')
        .delete()
        .eq('course_id', courseId)
        .eq('student_id', studentId);

      if (error) throw error;
      return { action: 'removed' };
    } else {
      const { data, error } = await supabase
        .from('wishlists')
        .insert({ course_id: courseId, student_id })
        .select()
        .single();

      if (error) throw error;
      return { action: 'added', data };
    }
  } catch (error) {
    console.error('Failed to toggle wishlist:', error);
    throw error;
  }
};

/**
 * Get student wishlist
 */
export const getStudentWishlist = async (studentId) => {
  try {
    const { data, error } = await supabase
      .from('wishlists')
      .select(`
        *,
        courses (*)
      `)
      .eq('student_id', studentId);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Failed to fetch wishlist:', error);
    throw error;
  }
};

const courseService = {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  duplicateCourse,
  publishCourse,
  getCourseSections,
  getCourseLessons,
  getCourseEnrollments,
  getCourseReviews,
  addCourseReview,
  toggleWishlist,
  getStudentWishlist,
};

export default courseService;
