/**
 * College LMS - Section Controller
 * Handles section CRUD operations and reordering
 */

import { supabase } from '../config/supabase.js';

/**
 * Get sections by course
 * @route GET /api/sections/course/:courseId
 */
export const getSectionsByCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const { data: sections, error } = await supabase
      .from('course_sections')
      .select(`
        *,
        course_lessons (count)
      `)
      .eq('course_id', courseId)
      .order('order_index', { ascending: true });

    if (error) throw error;

    res.status(200).json({
      success: true,
      data: { sections },
    });
  } catch (error) {
    console.error('Get sections error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch sections',
    });
  }
};

/**
 * Get section by ID
 * @route GET /api/sections/:id
 */
export const getSectionById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: section, error } = await supabase
      .from('course_sections')
      .select(`
        *,
        course_lessons (*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;

    res.status(200).json({
      success: true,
      data: { section },
    });
  } catch (error) {
    console.error('Get section error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch section',
    });
  }
};

/**
 * Create section
 * @route POST /api/sections
 */
export const createSection = async (req, res) => {
  try {
    const sectionData = req.body;

    // Get max order_index for this course
    const { data: existingSections } = await supabase
      .from('course_sections')
      .select('order_index')
      .eq('course_id', sectionData.course_id)
      .order('order_index', { ascending: false })
      .limit(1);

    const nextOrderIndex = existingSections && existingSections.length > 0 
      ? existingSections[0].order_index + 1 
      : 0;

    const { data: section, error } = await supabase
      .from('course_sections')
      .insert({
        ...sectionData,
        order_index: nextOrderIndex,
      })
      .select()
      .single();

    if (error) throw error;

    res.status(201).json({
      success: true,
      message: 'Section created successfully',
      data: { section },
    });
  } catch (error) {
    console.error('Create section error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create section',
    });
  }
};

/**
 * Update section
 * @route PUT /api/sections/:id
 */
export const updateSection = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const { data: section, error } = await supabase
      .from('course_sections')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.status(200).json({
      success: true,
      message: 'Section updated successfully',
      data: { section },
    });
  } catch (error) {
    console.error('Update section error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update section',
    });
  }
};

/**
 * Delete section
 * @route DELETE /api/sections/:id
 */
export const deleteSection = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase.from('course_sections').delete().eq('id', id);

    if (error) throw error;

    res.status(200).json({
      success: true,
      message: 'Section deleted successfully',
    });
  } catch (error) {
    console.error('Delete section error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete section',
    });
  }
};

/**
 * Reorder sections
 * @route PUT /api/sections/reorder
 */
export const reorderSections = async (req, res) => {
  try {
    const { sectionIds } = req.body;

    const updates = sectionIds.map((id, index) => ({
      id,
      order_index: index,
    }));

    const { error } = await supabase.from('course_sections').upsert(updates);

    if (error) throw error;

    res.status(200).json({
      success: true,
      message: 'Sections reordered successfully',
    });
  } catch (error) {
    console.error('Reorder sections error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to reorder sections',
    });
  }
};

export default {
  getSectionsByCourse,
  getSectionById,
  createSection,
  updateSection,
  deleteSection,
  reorderSections,
};
