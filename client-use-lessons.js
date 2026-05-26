/**
 * College LMS - useLessons Hook
 * Lesson CRUD operations with type switching, status toggle, and autosave
 */

import { useState, useCallback, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import lessonService from '../services/lessonService';
import toast from 'react-hot-toast';

export const useLessons = (sectionId = null) => {
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const autosaveTimerRef = useRef(null);

  /**
   * Fetch lessons (filtered by section if provided)
   */
  const fetchLessons = useCallback(async (secId = sectionId) => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase
        .from('course_lessons')
        .select(`
          *,
          lesson_resources (*)
        `)
        .order('order_index', { ascending: true });

      if (secId) {
        query = query.eq('section_id', secId);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      setLessons(data || []);
      return data;
    } catch (err) {
      setError(err.message);
      toast.error('Failed to fetch lessons');
      return [];
    } finally {
      setLoading(false);
    }
  }, [sectionId]);

  /**
   * Fetch single lesson by ID
   */
  const fetchLessonById = useCallback(async (lessonId) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from('course_lessons')
        .select(`
          *,
          lesson_resources (*)
        `)
        .eq('id', lessonId)
        .single();

      if (fetchError) throw fetchError;

      return data;
    } catch (err) {
      setError(err.message);
      toast.error('Failed to fetch lesson');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Create new lesson
   */
  const createLesson = useCallback(async (lessonData) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: createError } = await lessonService.createLesson(lessonData);

      if (createError) throw createError;

      setLessons((prev) => [...prev, data]);
      toast.success('Lesson created successfully');
      return data;
    } catch (err) {
      setError(err.message);
      toast.error('Failed to create lesson');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Update lesson with autosave debounce
   */
  const updateLesson = useCallback(
    async (lessonId, updates, debounceMs = 1000) => {
      // Clear existing timer
      if (autosaveTimerRef.current) {
        clearTimeout(autosaveTimerRef.current);
      }

      // Set new timer for debounced save
      autosaveTimerRef.current = setTimeout(async () => {
        setSaving(true);
        setError(null);
        try {
          const { data, error: updateError } = await lessonService.updateLesson(lessonId, updates);

          if (updateError) throw updateError;

          setLessons((prev) =>
            prev.map((lesson) => (lesson.id === lessonId ? { ...lesson, ...data } : lesson))
          );
          toast.success('Lesson saved');
        } catch (err) {
          setError(err.message);
          toast.error('Failed to save lesson');
        } finally {
          setSaving(false);
        }
      }, debounceMs);

      // Update local state immediately for optimistic UI
      setLessons((prev) =>
        prev.map((lesson) => (lesson.id === lessonId ? { ...lesson, ...updates } : lesson))
      );
    },
    []
  );

  /**
   * Delete lesson
   */
  const deleteLesson = useCallback(async (lessonId) => {
    setLoading(true);
    setError(null);
    try {
      const { error: deleteError } = await lessonService.deleteLesson(lessonId);

      if (deleteError) throw deleteError;

      setLessons((prev) => prev.filter((lesson) => lesson.id !== lessonId));
      toast.success('Lesson deleted successfully');
      return true;
    } catch (err) {
      setError(err.message);
      toast.error('Failed to delete lesson');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Reorder lessons
   */
  const reorderLessons = useCallback(async (lessonIds) => {
    setLoading(true);
    setError(null);
    try {
      const { error: reorderError } = await lessonService.reorderLessons(lessonIds);

      if (reorderError) throw reorderError;

      // Update local state with new order
      setLessons((prev) => {
        const lessonMap = new Map(prev.map((l) => [l.id, l]));
        return lessonIds.map((id, index) => ({
          ...lessonMap.get(id),
          order_index: index,
        }));
      });

      toast.success('Lessons reordered successfully');
      return true;
    } catch (err) {
      setError(err.message);
      toast.error('Failed to reorder lessons');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Toggle lesson status (draft/published)
   */
  const toggleLessonStatus = useCallback(async (lessonId) => {
    const lesson = lessons.find((l) => l.id === lessonId);
    if (!lesson) return;

    const newStatus = lesson.status === 'published' ? 'draft' : 'published';
    return updateLesson(lessonId, { status: newStatus }, 0); // No debounce for status toggle
  }, [lessons, updateLesson]);

  /**
   * Switch lesson type
   */
  const switchLessonType = useCallback(async (lessonId, newType) => {
    return updateLesson(lessonId, { type: newType }, 0); // No debounce for type switch
  }, [updateLesson]);

  // Cleanup autosave timer on unmount
  useEffect(() => {
    return () => {
      if (autosaveTimerRef.current) {
        clearTimeout(autosaveTimerRef.current);
      }
    };
  }, []);

  // Fetch lessons on mount
  useEffect(() => {
    if (sectionId) {
      fetchLessons();
    }
  }, [fetchLessons, sectionId]);

  return {
    lessons,
    loading,
    error,
    saving,
    fetchLessons,
    fetchLessonById,
    createLesson,
    updateLesson,
    deleteLesson,
    reorderLessons,
    toggleLessonStatus,
    switchLessonType,
  };
};

export default useLessons;
