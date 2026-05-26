/**
 * College LMS - Lesson Controller
 * Handles lesson CRUD operations, reordering, and status toggle
 */

import { supabase } from '../config/supabase.js';

/**
 * Get lessons by section
 * @route GET /api/lessons/section/:sectionId
 */
export const getLessonsBySection = async (req, res) => {
  try {
    const { sectionId } = req.params;

    const { data: lessons, error } = await supabase
      .from('course_lessons')
      .select(`
        *,
        lesson_resources (*)
      `)
      .eq('section_id', sectionId)
      .order('order_index', { ascending: true });

    if (error) throw error;

    res.status(200).json({
      success: true,
      data: { lessons },
    });
  } catch (error) {
    console.error('Get lessons error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch lessons',
    });
  }
};

/**
 * Get lesson by ID
 * @route GET /api/lessons/:id
 */
export const getLessonById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: lesson, error } = await supabase
      .from('course_lessons')
      .select(`
        *,
        lesson_resources (*),
        course_sections (
          course_id,
          title
        )
      `)
      .eq('id', id)
      .single();

    if (error) throw error;

    res.status(200).json({
      success: true,
      data: { lesson },
    });
  } catch (error) {
    console.error('Get lesson error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch lesson',
    });
  }
};

/**
 * Create lesson
 * @route POST /api/lessons
 */
export const createLesson = async (req, res) => {
  try {
    const lessonData = req.body;

    // Get max order_index for this section
    const { data: existingLessons } = await supabase
      .from('course_lessons')
      .select('order_index')
      .eq('section_id', lessonData.section_id)
      .order('order_index', { ascending: false })
      .limit(1);

    const nextOrderIndex = existingLessons && existingLessons.length > 0 
      ? existingLessons[0].order_index + 1 
      : 0;

    const { data: lesson, error } = await supabase
      .from('course_lessons')
      .insert({
        ...lessonData,
        order_index: nextOrderIndex,
        status: 'draft',
      })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: 'Lesson created successfully',
      data: { lesson },
    });
  } catch (error) {
    console.error('Create lesson error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create lesson',
    });
  }
};

/**
 * Update lesson
 * @route PUT /api/lessons/:id
 */
export const updateLesson = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const { data: lesson, error } = await supabase
      .from('course_lessons')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.status(200).json({
      success: true,
      message: 'Lesson updated successfully',
      data: { lesson },
    });
  } catch (error) {
    console.error('Update lesson error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update lesson',
    });
  }
};

/**
 * Delete lesson
 * @route DELETE /api/lessons/:id
 */
export const deleteLesson = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase.from('course_lessons').delete().eq('id', id);

    if (error) throw error;

    res.status(200).json({
      success: true,
      message: 'Lesson deleted successfully',
    });
  } catch (error) {
    console.error('Delete lesson error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete lesson',
    });
  }
};

/**
 * Reorder lessons
 * @route PUT /api/lessons/reorder
 */
export const reorderLessons = async (req, res) => {
  try {
    const { lessonIds } = req.body;

    const updates = lessonIds.map((id, index) => ({
      id,
      order_index: index,
    }));

    const { error } = await supabase.from('course_lessons').upsert(updates);

    if (error) throw error;

    res.status(200).json({
      success: true,
      message: 'Lessons reordered successfully',
    });
  } catch (error) {
    console.error('Reorder lessons error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reorder lessons',
    });
  }
};

/**
 * Toggle lesson status
 * @route PUT /api/lessons/:id/toggle-status
 */
export const toggleLessonStatus = async (req, res) => {
  try {
    const { id } = req.params;

    // Get current status
    const { data: currentLesson } = await supabase
      .from('course_lessons')
      .select('status')
      .eq('id', id)
      .single();

    const newStatus = currentLesson.status === 'published' ? 'draft' : 'published';

    const { data: lesson, error } = await supabase
      .from('course_lessons')
      .update({ status: newStatus })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.status(200).json({
      success: true,
      message: `Lesson ${newStatus}`,
      data: { lesson },
    });
  } catch (error) {
    console.error('Toggle lesson status error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to toggle lesson status',
    });
  }
};

export default {
  getLessonsBySection,
  getLessonById,
  createLesson,
  updateLesson,
  deleteLesson,
  reorderLessons,
  toggleLessonStatus,
};
