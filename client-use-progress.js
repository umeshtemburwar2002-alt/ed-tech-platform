/**
 * College LMS - useProgress Hook
 * Track lesson completion, overall course percentage, and resume lesson
 */

import { useState, useCallback, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import toast from 'react-hot-toast';

export const useProgress = (studentId = null, courseId = null) => {
  const [progress, setProgress] = useState([]);
  const [overallProgress, setOverallProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fetch progress for student (filtered by course if provided)
   */
  const fetchProgress = useCallback(async (sid = studentId, cid = courseId) => {
    setLoading(true);
    setError(null);
    try {
      let query = supabase
        .from('lesson_progress')
        .select(`
          *,
          course_lessons (
            *,
            course_sections (course_id)
          )
        `)
        .eq('student_id', sid);

      if (cid) {
        query = query.eq('course_lessons.course_sections.course_id', cid);
      }

      const { data, error: fetchError } = await query;

      if (fetchError) throw fetchError;

      setProgress(data || []);

      // Calculate overall progress for course
      if (cid) {
        const { data: lessons } = await supabase
          .from('course_lessons')
          .select('id')
          .eq('course_id', cid);

        if (lessons) {
          const completedCount = data.filter((p) => p.completed).length;
          const percentage = lessons.length > 0 ? (completedCount / lessons.length) * 100 : 0;
          setOverallProgress(Math.round(percentage));
        }
      }

      return data;
    } catch (err) {
      setError(err.message);
      toast.error('Failed to fetch progress');
      return [];
    } finally {
      setLoading(false);
    }
  }, [studentId, courseId]);

  /**
   * Mark lesson as complete
   */
  const markComplete = useCallback(async (lessonId, sid = studentId) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: markError } = await supabase
        .from('lesson_progress')
        .upsert({
          lesson_id: lessonId,
          student_id: sid,
          completed: true,
          completed_at: new Date().toISOString(),
        })
        .select()
        .single();

      if (markError) throw markError;

      setProgress((prev) => {
        const existing = prev.find((p) => p.lesson_id === lessonId);
        if (existing) {
          return prev.map((p) =>
            p.lesson_id === lessonId ? { ...p, ...data } : p
          );
        }
        return [...prev, data];
      });

      toast.success('Lesson marked as complete');
      return data;
    } catch (err) {
      setError(err.message);
      toast.error('Failed to mark lesson complete');
      return null;
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  /**
   * Mark lesson as incomplete
   */
  const markIncomplete = useCallback(async (lessonId, sid = studentId) => {
    setLoading(true);
    setError(null);
    try {
      const { data, error: markError } = await supabase
        .from('lesson_progress')
        .update({
          completed: false,
          completed_at: null,
        })
        .eq('lesson_id', lessonId)
        .eq('student_id', sid)
        .select()
        .single();

      if (markError) throw markError;

      setProgress((prev) =>
        prev.map((p) => (p.lesson_id === lessonId ? { ...p, ...data } : p))
      );

      toast.success('Lesson marked as incomplete');
      return data;
    } catch (err) {
      setError(err.message);
      toast.error('Failed to mark lesson incomplete');
      return null;
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  /**
   * Save watch time
   */
  const saveWatchTime = useCallback(async (lessonId, watchTime, sid = studentId) => {
    try {
      const { error: saveError } = await supabase
        .from('lesson_progress')
        .upsert({
          lesson_id: lessonId,
          student_id: sid,
          watch_time: watchTime,
        });

      if (saveError) throw saveError;

      setProgress((prev) => {
        const existing = prev.find((p) => p.lesson_id === lessonId);
        if (existing) {
          return prev.map((p) =>
            p.lesson_id === lessonId ? { ...p, watch_time } : p
          );
        }
        return prev;
      });
    } catch (err) {
      console.error('Failed to save watch time:', err);
      // Don't show toast for watch time errors (happens frequently)
    }
  }, [studentId]);

  /**
   * Get resume lesson (last watched incomplete lesson)
   */
  const getResumeLesson = useCallback(async (cid = courseId, sid = studentId) => {
    try {
      const { data, error } = await supabase
        .from('lesson_progress')
        .select(`
          *,
          course_lessons (
            *,
            course_sections (course_id)
          )
        `)
        .eq('student_id', sid)
        .eq('course_lessons.course_sections.course_id', cid)
        .eq('completed', false)
        .order('updated_at', { ascending: false })
        .limit(1)
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      return data;
    } catch (err) {
      console.error('Failed to get resume lesson:', err);
      return null;
    }
  }, [courseId, studentId]);

  /**
   * Get course completion percentage
   */
  const getCourseProgress = useCallback(async (cid, sid = studentId) => {
    try {
      const { data: lessons } = await supabase
        .from('course_lessons')
        .select('id')
        .eq('course_id', cid);

      if (!lessons || lessons.length === 0) return 0;

      const { data: completed } = await supabase
        .from('lesson_progress')
        .select('lesson_id')
        .eq('student_id', sid)
        .eq('completed', true)
        .in('lesson_id', lessons.map((l) => l.id));

      const percentage = completed ? (completed.length / lessons.length) * 100 : 0;
      return Math.round(percentage);
    } catch (err) {
      console.error('Failed to get course progress:', err);
      return 0;
    }
  }, [studentId]);

  // Fetch progress on mount
  useEffect(() => {
    if (studentId) {
      fetchProgress();
    }
  }, [fetchProgress, studentId]);

  return {
    progress,
    overallProgress,
    loading,
    error,
    fetchProgress,
    markComplete,
    markIncomplete,
    saveWatchTime,
    getResumeLesson,
    getCourseProgress,
  };
};

export default useProgress;
