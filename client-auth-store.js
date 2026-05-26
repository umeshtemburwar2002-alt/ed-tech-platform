/**
 * College LMS - Auth Store (Zustand)
 * Manages authentication state, user data, and role-based access
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase, signIn, signUp, signOut, getSession, getCurrentUser, updateProfile } from '../lib/supabase';

const useAuthStore = create(
  persist(
    (set, get) => ({
      // State
      user: null,
      profile: null,
      session: null,
      loading: true,
      isAuthenticated: false,

      // Actions
      initializeAuth: async () => {
        set({ loading: true });
        try {
          const { session } = await getSession();
          const { user } = await getCurrentUser();

          if (session && user) {
            // Fetch user profile
            const { data: profile } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', user.id)
              .single();

            set({
              user,
              profile,
              session,
              isAuthenticated: true,
              loading: false,
            });
          } else {
            set({
              user: null,
              profile: null,
              session: null,
              isAuthenticated: false,
              loading: false,
            });
          }
        } catch (error) {
          console.error('Auth initialization error:', error);
          set({
            user: null,
            profile: null,
            session: null,
            isAuthenticated: false,
            loading: false,
          });
        }
      },

      login: async (email, password) => {
        set({ loading: true });
        try {
          const { data, error } = await signIn({ email, password });

          if (error) throw error;

          // Fetch user profile
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', data.user.id)
            .single();

          set({
            user: data.user,
            profile,
            session: data.session,
            isAuthenticated: true,
            loading: false,
          });

          return { success: true, error: null };
        } catch (error) {
          console.error('Login error:', error);
          set({ loading: false });
          return { success: false, error: error.message };
        }
      },

      register: async (userData) => {
        set({ loading: true });
        try {
          const { data, error } = await signUp({
            email: userData.email,
            password: userData.password,
            metadata: {
              full_name: userData.full_name,
              role: userData.role,
              roll_number: userData.roll_number,
              department_id: userData.department_id,
              semester: userData.semester,
            },
          });

          if (error) throw error;

          set({ loading: false });
          return { success: true, error: null, data };
        } catch (error) {
          console.error('Register error:', error);
          set({ loading: false });
          return { success: false, error: error.message };
        }
      },

      logout: async () => {
        set({ loading: true });
        try {
          await signOut();
          set({
            user: null,
            profile: null,
            session: null,
            isAuthenticated: false,
            loading: false,
          });
          return { success: true };
        } catch (error) {
          console.error('Logout error:', error);
          set({ loading: false });
          return { success: false, error: error.message };
        }
      },

      updateProfile: async (profileData) => {
        set({ loading: true });
        try {
          const { profile, error } = await updateProfile(profileData);

          if (error) throw error;

          set((state) => ({
            profile: { ...state.profile, ...profile },
            loading: false,
          }));

          return { success: true, error: null };
        } catch (error) {
          console.error('Update profile error:', error);
          set({ loading: false });
          return { success: false, error: error.message };
        }
      },

      refreshProfile: async () => {
        const { user } = get();
        if (!user) return;

        try {
          const { data: profile } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          set({ profile });
        } catch (error) {
          console.error('Refresh profile error:', error);
        }
      },

      // Role-based helpers
      isStudent: () => {
        const { profile } = get();
        return profile?.role === 'student';
      },

      isInstructor: () => {
        const { profile } = get();
        return profile?.role === 'instructor';
      },

      isHOD: () => {
        const { profile } = get();
        return profile?.role === 'hod';
      },

      isAdmin: () => {
        const { profile } = get();
        return profile?.role === 'admin';
      },

      hasRole: (roles) => {
        const { profile } = get();
        return profile ? roles.includes(profile.role) : false;
      },

      canAccessCourse: (courseId) => {
        const { profile } = get();
        if (!profile) return false;

        // Instructors can access their own courses
        if (profile.role === 'instructor' || profile.role === 'hod' || profile.role === 'admin') {
          return true;
        }

        // Students need to be enrolled
        return false; // This would need enrollment check
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        profile: state.profile,
        session: state.session,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Set up auth state change listener
supabase.auth.onAuthStateChange((event, session) => {
  if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
    useAuthStore.setState({ session, isAuthenticated: true });
  } else if (event === 'SIGNED_OUT') {
    useAuthStore.setState({
      user: null,
      profile: null,
      session: null,
      isAuthenticated: false,
    });
  }
});

export default useAuthStore;
