/**
 * College LMS - useCourses Hook
 * CRUD operations for courses, sections, and lessons
 * Combines Supabase direct queries with Node API calls
 */

import { useState, useCallback, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import courseService from '../services/courseService';
import toast from 'react-hot-toast';

export const useCourses = (instructorId = null) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch all courses (filtered by instructor if provided)
   */
  const fetchCourses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase
        .from('courses')
        .select(`
          *,
          profiles:instructor_id (full_name, avatar_url),
          departments (name, code),
          course_tags (tag),
          enrollments (count)
        `);

      if (instructorId) {
        query = query.eq('instructor_id', instructorId);
      }

      const { data, error: fetchError } = await query.order('created_at', { ascending: false });

      if (fetchError) throw fetchError;

      setCourses(data || []);
    } catch (err) {
      setError(err.message);
      toast.error('Failed to fetch courses');
    } finally {
      setLoading(false);
    }
  }, [instructorId]);

  /**
   * Fetch single course by ID with full details
   */
  const fetchCourseById = useCallback(async (courseId) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from('courses')
        .select(`
          *,
          profiles:instructor_id (full_name, avatar_url),
          departments (name, code),
          course_tags (tag),
          course_outcomes (*),
          course_requirements (*),
          course_sections (
            *,
            course_lessons (*)
          )
        `)
        .eq('id', courseId)
        .single();

      if (fetchError) throw fetchError;

      return data;
    } catch (err) {
      setError(err.message);
      toast.error('Failed to fetch course');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Create new course
   */
  const createCourse = useCallback(async (courseData) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: createError } = await courseService.createCourse(courseData);

      if (createError) throw createError;

      setCourses((prev) => [data, ...prev]);
      toast.success('Course created successfully');
      return data;
    } catch (err) {
      setError(err.message);
      toast.error('Failed to create course');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Update existing course
   */
  const updateCourse = useCallback(async (courseId, updates) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: updateError } = await courseService.updateCourse(courseId, updates);

      if (updateError) throw updateError;

      setCourses((prev) =>
        prev.map((course) => (course.id === courseId ? { ...course, ...data } : course))
      );
      toast.success('Course updated successfully');
      return data;
    } catch (err) {
      setError(err.message);
      toast.error('Failed to update course');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Delete course
   */
  const deleteCourse = useCallback(async (courseId) => {
    setLoading(true);
    setError(null);
    try {
      const { error: deleteError } = await courseService.deleteCourse(courseId);

      if (deleteError) throw deleteError;

      setCourses((prev) => prev.filter((course) => course.id !== courseId));
      toast.success('Course deleted successfully');
      return true;
    } catch (err) {
      setError(err.message);
      toast.error('Failed to delete course');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Duplicate course
   */
  const duplicateCourse = useCallback(async (courseId) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: duplicateError } = await courseService.duplicateCourse(courseId);

      if (duplicateError) throw duplicateError;

      setCourses((prev) => [data, ...prev]);
      toast.success('Course duplicated successfully');
      return data;
    } catch (err) {
      setError(err.message);
      toast.error('Failed to duplicate course');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Publish course
   */
  const publishCourse = useCallback(async (courseId) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: publishError } = await courseService.publishCourse(courseId);

      if (publishError) throw publishError;

      setCourses((prev) =>
        prev.map((course) => (course.id === courseId ? { ...course, ...data } : course))
      );
      toast.success('Course published successfully');
      return data;
    } catch (err) {
      setError(err.message);
      toast.error('Failed to publish course');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Fetch courses on mount
  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  return {
    courses,
    loading,
    error,
    fetchCourses,
    fetchCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
    duplicateCourse,
    publishCourse,
  };
};

export default useCourses;
