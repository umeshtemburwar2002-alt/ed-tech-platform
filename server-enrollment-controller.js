/**
 * College LMS - Enrollment Controller
 * Handles enrollment, unenrollment, and enrollment checks
 */

import { supabase } from '../config/supabase.js';

/**
 * Enroll student in course
 * @route POST /api/enrollments
 */
export const enroll = async (req, res) => {
  try {
    const { course_id, student_id } = req.body;

    // Check if already enrolled
    const { data: existing } = await supabase
      .from('enrollments')
      .select('*')
      .eq('course_id', course_id)
      .eq('student_id', student_id)
      .single();

    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'Already enrolled in this course',
      });
    }

    const { data: enrollment, error } = await supabase
      .from('enrollments')
      .insert({
        course_id,
        student_id,
        status: 'active',
        enrolled_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: 'Enrolled successfully',
      data: { enrollment },
    });
  } catch (error) {
    console.error('Enroll error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to enroll',
    });
  }
};

/**
 * Unenroll student from course
 * @route DELETE /api/enrollments
 */
export const unenroll = async (req, res) => {
  try {
    const { course_id, student_id } = req.body;

    const { error } = await supabase
      .from('enrollments')
      .delete()
      .eq('course_id', course_id)
      .eq('student_id', student_id);

    if (error) throw error;

    res.status(200).json({
      success: true,
      message: 'Unenrolled successfully',
    });
  } catch (error) {
    console.error('Unenroll error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to unenroll',
    });
  }
};

/**
 * Check if student is enrolled
 * @route GET /api/enrollments/check/:courseId/:studentId
 */
export const checkEnrolled = async (req, res) => {
  try {
    const { courseId, studentId } = req.params;

    const { data: enrollment, error } = await supabase
      .from('enrollments')
      .select('*')
      .eq('course_id', courseId)
      .eq('student_id', studentId)
      .single();

    if (error && error.code !== 'PGRST116') throw error;

    res.status(200).json({
      success: true,
      data: {
        enrolled: !!enrollment,
        enrollment,
      },
    });
  } catch (error) {
    console.error('Check enrolled error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to check enrollment',
    });
  }
};

/**
 * Get student enrollments
 * @route GET /api/enrollments/student/:studentId
 */
export const getStudentEnrollments = async (req, res) => {
  try {
    const { studentId } = req.params;

    const { data: enrollments, error } = await supabase
      .from('enrollments')
      .select(`
        *,
        courses (*)
      `)
      .eq('student_id', studentId)
      .order('enrolled_at', { ascending: false });

    if (error) throw error;

    res.status(200).json({
      success: true,
      data: { enrollments },
    });
  } catch (error) {
    console.error('Get student enrollments error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch enrollments',
    });
  }
};

/**
 * Get course enrollments
 * @route GET /api/enrollments/course/:courseId
 */
export const getCourseEnrollments = async (req, res) => {
  try {
    const { courseId } = req.params;

    const { data: enrollments, error } = await supabase
      .from('enrollments')
      .select(`
        *,
        profiles:student_id (full_name, email, roll_number, avatar_url)
      `)
      .eq('course_id', courseId)
      .order('enrolled_at', { ascending: false });

    if (error) throw error;

    res.status(200).json({
      success: true,
      data: { enrollments },
    });
  } catch (error) {
    console.error('Get course enrollments error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch enrollments',
    });
  }
};

export default {
  enroll,
  unenroll,
  checkEnrolled,
  getStudentEnrollments,
  getCourseEnrollments,
};
