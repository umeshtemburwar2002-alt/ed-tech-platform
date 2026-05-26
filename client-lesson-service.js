/**
 * College LMS - Lesson Service
 * Lesson CRUD operations via API
 */

import api from './api';
import { supabase } from '../lib/supabase';

/**
 * Get lessons by section
 */
export const getLessons = async (sectionId) => {
  try {
    const { data, error } = await supabase
      .from('course_lessons')
      .select(`
        *,
        lesson_resources (*)
      `)
      .eq('section_id', sectionId)
      .order('order_index', { ascending: true });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Failed to fetch lessons:', error);
    throw error;
  }
};

/**
 * Get lesson by ID
 */
export const getLessonById = async (lessonId) => {
  try {
    const { data, error } = await supabase
      .from('course_lessons')
      .select(`
        *,
        lesson_resources (*),
        course_sections (
          course_id,
          title
        )
      `)
      .eq('id', lessonId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Failed to fetch lesson:', error);
    throw error;
  }
};

/**
 * Create lesson
 */
export const createLesson = async (lessonData) => {
  try {
    const { data, error } = await supabase
      .from('course_lessons')
      .insert(lessonData)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Failed to create lesson:', error);
    throw error;
  }
};

/**
 * Update lesson
 */
export const updateLesson = async (lessonId, updates) => {
  try {
    const { data, error } = await supabase
      .from('course_lessons')
      .update(updates)
      .eq('id', lessonId)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Failed to update lesson:', error);
    throw error;
  }
};

/**
 * Delete lesson
 */
export const deleteLesson = async (lessonId) => {
  try {
    const { error } = await supabase
      .from('course_lessons')
      .delete()
      .eq('id', lessonId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Failed to delete lesson:', error);
    throw error;
  }
};

/**
 * Reorder lessons
 */
export const reorderLessons = async (lessonIds) => {
  try {
    const updates = lessonIds.map((id, index) => ({
      id,
      order_index: index,
    }));

    const { error } = await supabase
      .from('course_lessons')
      .upsert(updates);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Failed to reorder lessons:', error);
    throw error;
  }
};

/**
 * Add lesson resource
 */
export const addLessonResource = async (resourceData) => {
  try {
    const { data, error } = await supabase
      .from('lesson_resources')
      .insert(resourceData)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Failed to add resource:', error);
    throw error;
  }
};

/**
 * Delete lesson resource
 */
export const deleteLessonResource = async (resourceId) => {
  try {
    const { error } = await supabase
      .from('lesson_resources')
      .delete()
      .eq('id', resourceId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Failed to delete resource:', error);
    throw error;
  }
};

/**
 * Get lesson progress
 */
export const getLessonProgress = async (lessonId, studentId) => {
  try {
    const { data, error } = await supabase
      .from('lesson_progress')
      .select('*')
      .eq('lesson_id', lessonId)
      .eq('student_id', studentId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  } catch (error) {
    console.error('Failed to fetch lesson progress:', error);
    throw error;
  }
};

const lessonService = {
  getLessons,
  getLessonById,
  createLesson,
  updateLesson,
  deleteLesson,
  reorderLessons,
  addLessonResource,
  deleteLessonResource,
  getLessonProgress,
};

export default lessonService;
