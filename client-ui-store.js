/**
 * College LMS - UI Store (Zustand)
 * Manages UI state: sidebar, dark mode, filters, loading states
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUIStore = create(
  persist(
    (set, get) => ({
      // State
      sidebarOpen: true,
      darkMode: true,
      mobileMenuOpen: false,
      loading: false,
      globalError: null,

      // Filters
      activeFilters: {
        status: 'all',
        department: null,
        semester: null,
        category: null,
        level: null,
        language: null,
        rating: null,
        price: null,
      },

      searchQuery: '',

      // Pagination
      currentPage: 1,
      itemsPerPage: 12,

      // Actions
      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

      setSidebarOpen: (open) => set({ sidebarOpen: open }),

      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

      setDarkMode: (dark) => set({ darkMode: dark }),

      toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),

      setMobileMenuOpen: (open) => set({ mobileMenuOpen: open }),

      setLoading: (loading) => set({ loading }),

      setGlobalError: (error) => set({ globalError: error }),

      clearGlobalError: () => set({ globalError: null }),

      // Filter actions
      setActiveFilters: (filters) =>
        set((state) => ({
          activeFilters: { ...state.activeFilters, ...filters },
        })),

      resetFilters: () =>
        set({
          activeFilters: {
            status: 'all',
            department: null,
            semester: null,
            category: null,
            level: null,
            language: null,
            rating: null,
            price: null,
          },
        }),

      setSearchQuery: (query) => set({ searchQuery: query }),

      // Pagination actions
      setCurrentPage: (page) => set({ currentPage: page }),

      setItemsPerPage: (items) => set({ itemsPerPage: items }),

      nextPage: () =>
        set((state) => ({ currentPage: state.currentPage + 1 })),

      prevPage: () =>
        set((state) => ({
          currentPage: Math.max(1, state.currentPage - 1),
        })),

      resetPagination: () => set({ currentPage: 1 }),

      // Reset all
      reset: () =>
        set({
          sidebarOpen: true,
          darkMode: true,
          mobileMenuOpen: false,
          loading: false,
          globalError: null,
          activeFilters: {
            status: 'all',
            department: null,
            semester: null,
            category: null,
            level: null,
            language: null,
            rating: null,
            price: null,
          },
          searchQuery: '',
          currentPage: 1,
          itemsPerPage: 12,
        }),
    }),
    {
      name: 'ui-storage',
      partialize: (state) => ({
        sidebarOpen: state.sidebarOpen,
        darkMode: state.darkMode,
      }),
    }
  )
);

export default useUIStore;
