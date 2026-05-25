import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useUIStore = create(
  persist(
    (set, get) => ({
      isSidebarOpen: false,
      theme: "dark",
      currentPage: "",
      notifications: [],
      loadingStates: {},

      toggleSidebar: () => set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
      setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
      setTheme: (theme) => set({ theme }),
      setCurrentPage: (page) => set({ currentPage: page }),
      addNotification: (notification) =>
        set((state) => ({
          notifications: [...state.notifications, { id: Date.now(), ...notification }],
        })),
      removeNotification: (id) =>
        set((state) => ({
          notifications: state.notifications.filter((n) => n.id !== id),
        })),
      clearNotifications: () => set({ notifications: [] }),
      setLoading: (key, value) =>
        set((state) => ({
          loadingStates: { ...state.loadingStates, [key]: value },
        })),
    }),
    {
      name: "ui-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useUIStore;
