/**
 * College LMS - Course Controller
 * Handles course CRUD operations, duplicate, and publish workflow
 */

import { supabase } from '../config/supabase.js';

/**
 * Get all courses with filters
 * @route GET /api/courses
 */
export const getCourses = async (req, res) => {
  try {
    const { instructor_id, status, department_id, search, page = 1, limit = 12 } = req.query;

    let query = supabase
      .from('courses')
      .select(`
        *,
        profiles:instructor_id (full_name, avatar_url),
        departments (name, code),
        enrollments (count)
      `, { count: 'exact' });

    if (instructor_id) {
      query = query.eq('instructor_id', instructor_id);
    }

    if (status) {
      query = query.eq('status', status);
    }

    if (department_id) {
      query = query.eq('department_id', department_id);
    }

    if (search) {
      query = query.or(`title.ilike.%${search}%,description.ilike.%${search}%`);
    }

    const from = (page - 1) * limit;
    const to = from + limit - 1;

    const { data: courses, count, error } = await query
      .range(from, to)
      .order('created_at', { ascending: false });

    if (error) throw error;

    res.status(200).json({
      success: true,
      data: { courses, total: count, page, limit },
    });
  } catch (error) {
    console.error('Get courses error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch courses',
    });
  }
};

/**
 * Get course by ID
 * @route GET /api/courses/:id
 */
export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: course, error } = await supabase
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
      .eq('id', id)
      .single();

    if (error) throw error;

    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found',
      });
    }

    res.status(200).json({
      success: true,
      data: { course },
    });
  } catch (error) {
    console.error('Get course error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch course',
    });
  }
};

/**
 * Create new course
 * @route POST /api/courses
 */
export const createCourse = async (req, res) => {
  try {
    const { user } = req;
    const courseData = req.body;

    const { data: course, error } = await supabase
      .from('courses')
      .insert({
        ...courseData,
        instructor_id: user.id,
        slug: generateSlug(courseData.title),
        status: 'draft',
      })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: 'Course created successfully',
      data: { course },
    });
  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create course',
    });
  }
};

/**
 * Update course
 * @route PUT /api/courses/:id
 */
export const updateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Generate slug if title is being updated
    if (updates.title) {
      updates.slug = generateSlug(updates.title);
    }

    const { data: course, error } = await supabase
      .from('courses')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.status(200).json({
      success: true,
      message: 'Course updated successfully',
      data: { course },
    });
  } catch (error) {
    console.error('Update course error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update course',
    });
  }
};

/**
 * Delete course
 * @route DELETE /api/courses/:id
 */
export const deleteCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase.from('courses').delete().eq('id', id);

    if (error) throw error;

    res.status(200).json({
      success: true,
      message: 'Course deleted successfully',
    });
  } catch (error) {
    console.error('Delete course error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete course',
    });
  }
};

/**
 * Duplicate course
 * @route POST /api/courses/:id/duplicate
 */
export const duplicateCourse = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;

    // Fetch original course with all related data
    const { data: originalCourse, error: fetchError } = await supabase
      .from('courses')
      .select(`
        *,
        course_tags (tag),
        course_outcomes (*),
        course_requirements (*)
      `)
      .eq('id', id)
      .single();

    if (fetchError) throw fetchError;

    // Create duplicate course
    const { data: newCourse, error: createError } = await supabase
      .from('courses')
      .insert({
        title: `${originalCourse.title} (Copy)`,
        slug: `${originalCourse.slug}-copy-${Date.now()}`,
        description: originalCourse.description,
        thumbnail_url: originalCourse.thumbnail_url,
        price: originalCourse.price,
        discount: originalCourse.discount,
        level: originalCourse.level,
        language: originalCourse.language,
        department_id: originalCourse.department_id,
        semester: originalCourse.semester,
        subject_code: originalCourse.subject_code,
        instructor_id: user.id,
        status: 'draft',
        is_free: originalCourse.is_free,
      })
      .select()
      .single();

    if (createError) throw createError;

    // Duplicate tags
    if (originalCourse.course_tags && originalCourse.course_tags.length > 0) {
      const tags = originalCourse.course_tags.map((t) => ({
        course_id: newCourse.id,
        tag: t.tag,
      }));
      await supabase.from('course_tags').insert(tags);
    }

    // Duplicate outcomes
    if (originalCourse.course_outcomes && originalCourse.course_outcomes.length > 0) {
      const outcomes = originalCourse.course_outcomes.map((o) => ({
        course_id: newCourse.id,
        outcome: o.outcome,
        order_index: o.order_index,
      }));
      await supabase.from('course_outcomes').insert(outcomes);
    }

    // Duplicate requirements
    if (originalCourse.course_requirements && originalCourse.course_requirements.length > 0) {
      const requirements = originalCourse.course_requirements.map((r) => ({
        course_id: newCourse.id,
        requirement: r.requirement,
        order_index: r.order_index,
      }));
      await supabase.from('course_requirements').insert(requirements);
    }

    res.status(201).json({
      success: true,
      message: 'Course duplicated successfully',
      data: { course: newCourse },
    });
  } catch (error) {
    console.error('Duplicate course error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to duplicate course',
    });
  }
};

/**
 * Publish course
 * @route PUT /api/courses/:id/publish
 */
export const publishCourse = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: course, error } = await supabase
      .from('courses')
      .update({ status: 'published' })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.status(200).json({
      success: true,
      message: 'Course published successfully',
      data: { course },
    });
  } catch (error) {
    console.error('Publish course error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to publish course',
    });
  }
};

/**
 * Helper function to generate URL-friendly slug
 */
function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

export default {
  getCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  duplicateCourse,
  publishCourse,
};
