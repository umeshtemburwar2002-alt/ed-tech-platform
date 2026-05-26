/**
 * College LMS - Course Store (Zustand)
 * Manages current course state, sections, lessons, and selected lesson
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCourseStore = create(
  persist(
    (set, get) => ({
      // State
      currentCourse: null,
      sections: [],
      lessons: [],
      selectedLesson: null,
      selectedSection: null,
      loading: false,
      error: null,

      // Actions
      setCurrentCourse: (course) => set({ currentCourse: course }),

      setSections: (sections) => set({ sections }),

      setLessons: (lessons) => set({ lessons }),

      setSelectedLesson: (lesson) => set({ selectedLesson: lesson }),

      setSelectedSection: (section) => set({ selectedSection: section }),

      addSection: (section) =>
        set((state) => ({ sections: [...state.sections, section] })),

      updateSection: (sectionId, updates) =>
        set((state) => ({
          sections: state.sections.map((s) =>
            s.id === sectionId ? { ...s, ...updates } : s
          ),
        })),

      deleteSection: (sectionId) =>
        set((state) => ({
          sections: state.sections.filter((s) => s.id !== sectionId),
        })),

      reorderSections: (sectionIds) =>
        set((state) => {
          const sectionMap = new Map(state.sections.map((s) => [s.id, s]));
          return {
            sections: sectionIds.map((id, index) => ({
              ...sectionMap.get(id),
              order_index: index,
            })),
          };
        }),

      addLesson: (lesson) =>
        set((state) => ({ lessons: [...state.lessons, lesson] })),

      updateLesson: (lessonId, updates) =>
        set((state) => ({
          lessons: state.lessons.map((l) =>
            l.id === lessonId ? { ...l, ...updates } : l
          }),
          selectedLesson:
            state.selectedLesson?.id === lessonId
              ? { ...state.selectedLesson, ...updates }
              : state.selectedLesson,
        })),

      deleteLesson: (lessonId) =>
        set((state) => ({
          lessons: state.lessons.filter((l) => l.id !== lessonId),
          selectedLesson:
            state.selectedLesson?.id === lessonId ? null : state.selectedLesson,
        })),

      reorderLessons: (lessonIds) =>
        set((state) => {
          const lessonMap = new Map(state.lessons.map((l) => [l.id, l]));
          return {
            lessons: lessonIds.map((id, index) => ({
              ...lessonMap.get(id),
              order_index: index,
            })),
          };
        }),

      setLoading: (loading) => set({ loading }),

      setError: (error) => set({ error }),

      reset: () =>
        set({
          currentCourse: null,
          sections: [],
          lessons: [],
          selectedLesson: null,
          selectedSection: null,
          loading: false,
          error: null,
        }),

      // Getters
      getLessonById: (lessonId) => {
        return get().lessons.find((l) => l.id === lessonId);
      },

      getSectionById: (sectionId) => {
        return get().sections.find((s) => s.id === sectionId);
      },

      getLessonsBySection: (sectionId) => {
        return get().lessons.filter((l) => l.section_id === sectionId);
      },

      getTotalLessons: () => {
        return get().lessons.length;
      },

      getCompletedLessons: () => {
        return get().lessons.filter((l) => l.status === 'published').length;
      },
    }),
    {
      name: 'course-storage',
      partialize: (state) => ({
        currentCourse: state.currentCourse,
        sections: state.sections,
        lessons: state.lessons,
      }),
    }
  )
);

export default useCourseStore;
