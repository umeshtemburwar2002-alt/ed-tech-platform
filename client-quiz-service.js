/**
 * College LMS - Quiz Service
 * Quiz operations via API
 */

import api from './api';
import { supabase } from '../lib/supabase';

/**
 * Get quiz by ID
 */
export const getQuiz = async (quizId) => {
  try {
    const { data, error } = await supabase
      .from('quizzes')
      .select(`
        *,
        quiz_questions (*)
      `)
      .eq('id', quizId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Failed to fetch quiz:', error);
    throw error;
  }
};

/**
 * Get quiz by lesson ID
 */
export const getQuizByLesson = async (lessonId) => {
  try {
    const { data, error } = await supabase
      .from('quizzes')
      .select(`
        *,
        quiz_questions (*)
      `)
      .eq('lesson_id', lessonId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;
    return data;
  } catch (error) {
    console.error('Failed to fetch quiz by lesson:', error);
    throw error;
  }
};

/**
 * Create quiz
 */
export const createQuiz = async (quizData) => {
  try {
    const response = await api.post('/quizzes', quizData);
    return response;
  } catch (error) {
    console.error('Failed to create quiz:', error);
    throw error;
  }
};

/**
 * Update quiz
 */
export const updateQuiz = async (quizId, updates) => {
  try {
    const response = await api.put(`/quizzes/${quizId}`, updates);
    return response;
  } catch (error) {
    console.error('Failed to update quiz:', error);
    throw error;
  }
};

/**
 * Delete quiz
 */
export const deleteQuiz = async (quizId) => {
  try {
    const response = await api.delete(`/quizzes/${quizId}`);
    return response;
  } catch (error) {
    console.error('Failed to delete quiz:', error);
    throw error;
  }
};

/**
 * Submit quiz attempt
 */
export const submitAttempt = async (attemptData) => {
  try {
    const response = await api.post('/quizzes/attempt', attemptData);
    return response;
  } catch (error) {
    console.error('Failed to submit quiz attempt:', error);
    throw error;
  }
};

/**
 * Get quiz attempts
 */
export const getAttempts = async (quizId, studentId) => {
  try {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .select('*')
      .eq('quiz_id', quizId)
      .eq('student_id', studentId)
      .order('started_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Failed to fetch quiz attempts:', error);
    throw error;
  }
};

/**
 * Get attempt results
 */
export const getAttemptResults = async (attemptId) => {
  try {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .select('*')
      .eq('id', attemptId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Failed to fetch attempt results:', error);
    throw error;
  }
};

/**
 * Get quiz analytics
 */
export const getQuizAnalytics = async (quizId) => {
  try {
    const response = await api.get(`/quizzes/${quizId}/analytics`);
    return response;
  } catch (error) {
    console.error('Failed to fetch quiz analytics:', error);
    throw error;
  }
};

/**
 * Get all student attempts for a course
 */
export const getCourseQuizAttempts = async (courseId) => {
  try {
    const { data, error } = await supabase
      .from('quiz_attempts')
      .select(`
        *,
        profiles:student_id (full_name, email, roll_number),
        quizzes (
          title,
          course_lessons (
            title,
            course_sections (course_id)
          )
        )
      `)
      .in('quiz_id', 
        supabase
          .from('quizzes')
          .select('id')
          .in('lesson_id',
            supabase
              .from('course_lessons')
              .select('id')
              .in('section_id',
                supabase
                  .from('course_sections')
                  .select('id')
                  .eq('course_id', courseId)
              )
          )
      )
      .order('started_at', { ascending: false });

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Failed to fetch course quiz attempts:', error);
    throw error;
  }
};

const quizService = {
  getQuiz,
  getQuizByLesson,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  submitAttempt,
  getAttempts,
  getAttemptResults,
  getQuizAnalytics,
  getCourseQuizAttempts,
};

export default quizService;
