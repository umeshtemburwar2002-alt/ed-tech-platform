/**
 * College LMS - Progress Controller
 * Handles lesson completion, progress tracking, and watch time
 */

import { supabase } from '../config/supabase.js';

/**
 * Mark lesson as complete
 * @route POST /api/progress/complete
 */
export const markComplete = async (req, res) => {
  try {
    const { lesson_id, student_id } = req.body;

    const { data: progress, error } = await supabase
      .from('lesson_progress')
      .upsert({
        lesson_id,
        student_id,
        completed: true,
        completed_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    res.status(200).json({
      success: true,
      message: 'Lesson marked as complete',
      data: { progress },
    });
  } catch (error) {
    console.error('Mark complete error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to mark lesson complete',
    });
  }
};

/**
 * Mark lesson as incomplete
 * @route POST /api/progress/incomplete
 */
export const markIncomplete = async (req, res) => {
  try {
    const { lesson_id, student_id } = req.body;

    const { data: progress, error } = await supabase
      .from('lesson_progress')
      .update({
        completed: false,
        completed_at: null,
      })
      .eq('lesson_id', lesson_id)
      .eq('student_id', student_id)
      .select()
      .single();

    if (error) throw error;

    res.status(200).json({
      success: true,
      message: 'Lesson marked as incomplete',
      data: { progress },
    });
  } catch (error) {
    console.error('Mark incomplete error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to mark lesson incomplete',
    });
  }
};

/**
 * Save watch time
 * @route POST /api/progress/watch-time
 */
export const saveWatchTime = async (req, res) => {
  try {
    const { lesson_id, student_id, watch_time } = req.body;

    const { data: progress, error } = await supabase
      .from('lesson_progress')
      .upsert({
        lesson_id,
        student_id,
        watch_time,
      })
      .select()
      .single();

    if (error) throw error;

    res.status(200).json({
      success: true,
      data: { progress },
    });
  } catch (error) {
    console.error('Save watch time error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to save watch time',
    });
  }
};

/**
 * Get student progress
 * @route GET /api/progress/student/:studentId
 */
export const getStudentProgress = async (req, res) => {
  try {
    const { studentId } = req.params;
    const { courseId } = req.query;

    let query = supabase
      .from('lesson_progress')
      .select(`
        *,
        course_lessons (
          *,
          course_sections (course_id)
        )
      `)
      .eq('student_id', studentId);

    if (courseId) {
      query = query.eq('course_lessons.course_sections.course_id', courseId);
    }

    const { data: progress, error } = await query;

    if (error) throw error;

    res.status(200).json({
      success: true,
      data: { progress },
    });
  } catch (error) {
    console.error('Get student progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch progress',
    });
  }
};

/**
 * Get course progress percentage
 * @route GET /api/progress/course/:courseId/:studentId
 */
export const getCourseProgress = async (req, res) => {
  try {
    const { courseId, studentId } = req.params;

    // Get total lessons
    const { data: lessons } = await supabase
      .from('course_lessons')
      .select('id')
      .eq('course_id', courseId);

    if (!lessons || lessons.length === 0) {
      return res.status(200).json({
        success: true,
        data: { percentage: 0, completed: 0, total: 0 },
      });
    }

    // Get completed lessons
    const { data: completed } = await supabase
      .from('lesson_progress')
      .select('lesson_id')
      .eq('student_id', studentId)
      .eq('completed', true)
      .in('lesson_id', lessons.map((l) => l.id));

    const percentage = completed ? (completed.length / lessons.length) * 100 : 0;

    res.status(200).json({
      success: true,
      data: {
        percentage: Math.round(percentage),
        completed: completed ? completed.length : 0,
        total: lessons.length,
      },
    });
  } catch (error) {
    console.error('Get course progress error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch course progress',
    });
  }
};

/**
 * Get resume lesson (last watched incomplete lesson)
 * @route GET /api/progress/resume/:courseId/:studentId
 */
export const getResumeLesson = async (req, res) => {
  try {
    const { courseId, studentId } = req.params;

    const { data: progress, error } = await supabase
      .from('lesson_progress')
      .select(`
        *,
        course_lessons (
          *,
          course_sections (course_id)
        )
      `)
      .eq('student_id', studentId)
      .eq('course_lessons.course_sections.course_id', courseId)
      .eq('completed', false)
      .order('updated_at', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') throw error;

    res.status(200).json({
      success: true,
      data: { progress },
    });
  } catch (error) {
    console.error('Get resume lesson error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to get resume lesson',
    });
  }
};

export default {
  markComplete,
  markIncomplete,
  saveWatchTime,
  getStudentProgress,
  getCourseProgress,
  getResumeLesson,
};
