import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useCourseStore = create(
  persist(
    (set, get) => ({
      courses: [],
      currentCourse: null,
      loading: false,
      error: null,

      setCourses: (courses) => set({ courses }),
      setCurrentCourse: (course) => set({ currentCourse: course }),
      addCourse: (course) => set((state) => ({ courses: [...state.courses, course] })),
      updateCourse: (id, updates) =>
        set((state) => ({
          courses: state.courses.map((c) => (c.id === id ? { ...c, ...updates } : c)),
          currentCourse: state.currentCourse?.id === id ? { ...state.currentCourse, ...updates } : state.currentCourse,
        })),
      deleteCourse: (id) =>
        set((state) => ({
          courses: state.courses.filter((c) => c.id !== id),
          currentCourse: state.currentCourse?.id === id ? null : state.currentCourse,
        })),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      clearError: () => set({ error: null }),
    }),
    {
      name: "course-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useCourseStore;
