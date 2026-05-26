/**
 * College LMS - useRealtime Hook
 * Supabase Realtime subscriptions for enrollments, lesson_progress, announcements, course status
 */

import { useEffect, useCallback, useRef } from 'react';
import { supabase } from '../lib/supabase';
import useCourseStore from '../store/courseStore';
import toast from 'react-hot-toast';

export const useRealtime = (instructorId = null, studentId = null) => {
  const channelsRef = useRef([]);

  /**
   * Subscribe to new enrollments for instructor's courses
   */
  const subscribeToEnrollments = useCallback(() => {
    if (!instructorId) return;

    const channel = supabase
      .channel('enrollments-channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'enrollments',
          filter: `course_id=in.(select id from courses where instructor_id=eq.${instructorId})`,
        },
        (payload) => {
          toast.success(`New student enrolled in course!`);
          // Update course store to increment student count
          useCourseStore.getState().setCurrentCourse((prev) => ({
            ...prev,
            student_count: (prev.student_count || 0) + 1,
          }));
        }
      )
      .subscribe();

    channelsRef.current.push(channel);
  }, [instructorId]);

  /**
   * Subscribe to lesson progress updates for student
   */
  const subscribeToProgress = useCallback(() => {
    if (!studentId) return;

    const channel = supabase
      .channel('progress-channel')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'lesson_progress',
          filter: `student_id=eq.${studentId}`,
        },
        (payload) => {
          // Sync progress across devices
          console.log('Progress updated:', payload);
        }
      )
      .subscribe();

    channelsRef.current.push(channel);
  }, [studentId]);

  /**
   * Subscribe to announcements for current course
   */
  const subscribeToAnnouncements = useCallback((courseId) => {
    if (!courseId) return;

    const channel = supabase
      .channel('announcements-channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'announcements',
          filter: `course_id=eq.${courseId}`,
        },
        (payload) => {
          toast.success(`New announcement: ${payload.new.title}`);
        }
      )
      .subscribe();

    channelsRef.current.push(channel);
  }, []);

  /**
   * Subscribe to course status updates (admin approval)
   */
  const subscribeToCourseStatus = useCallback(() => {
    if (!instructorId) return;

    const channel = supabase
      .channel('course-status-channel')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'courses',
          filter: `instructor_id=eq.${instructorId}`,
        },
        (payload) => {
          const { new: newStatus, old: oldStatus } = payload;
          if (newStatus.status !== oldStatus.status) {
            toast.success(`Course status changed to: ${newStatus.status}`);
            // Update course store
            useCourseStore.getState().setCurrentCourse(newStatus);
          }
        }
      )
      .subscribe();

    channelsRef.current.push(channel);
  }, [instructorId]);

  /**
   * Subscribe to quiz attempts for instructor's quizzes
   */
  const subscribeToQuizAttempts = useCallback(() => {
    if (!instructorId) return;

    const channel = supabase
      .channel('quiz-attempts-channel')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'quiz_attempts',
          filter: `quiz_id=in.(select id from quizzes where lesson_id=in.(select id from course_lessons where section_id=in.(select id from course_sections where course_id=in.(select id from courses where instructor_id=eq.${instructorId}))))`,
        },
        (payload) => {
          toast.success(`New quiz attempt submitted`);
        }
      )
      .subscribe();

    channelsRef.current.push(channel);
  }, [instructorId]);

  /**
   * Unsubscribe from all channels
   */
  const unsubscribeAll = useCallback(() => {
    channelsRef.current.forEach((channel) => {
      supabase.removeChannel(channel);
    });
    channelsRef.current = [];
  }, []);

  // Subscribe on mount
  useEffect(() => {
    subscribeToEnrollments();
    subscribeToProgress();
    subscribeToCourseStatus();
    subscribeToQuizAttempts();

    // Cleanup on unmount
    return () => {
      unsubscribeAll();
    };
  }, [
    subscribeToEnrollments,
    subscribeToProgress,
    subscribeToCourseStatus,
    subscribeToQuizAttempts,
    unsubscribeAll,
  ]);

  return {
    subscribeToAnnouncements,
    unsubscribeAll,
  };
};

export default useRealtime;
