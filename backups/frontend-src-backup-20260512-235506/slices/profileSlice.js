import { createSlice } from "@reduxjs/toolkit";

/**
 * ⚠️  DO NOT hydrate `user` from localStorage here.
 *
 * Root cause of auto-login after logout (same as authSlice):
 *   - persistClientSession() wrote user to localStorage["user"].
 *   - If clearClientSessionStores() is not called before refresh, this IIFE
 *     reads it back → Redux starts with a user object → PrivateRoute/RoleRoute
 *     sees a user → dashboard re-opens even though Supabase session is gone.
 *
 * Solution: user ALWAYS starts null. The Supabase onAuthStateChange listener
 * (subscribeSupabaseAuthToStore) is the single authority that sets user after
 * verifying the live session exists.
 *
 * enrolledCourses can safely stay in localStorage because it's not auth-gating.
 */
const initialState = {
  user:            null, // ← always null; set only via onAuthStateChange
  loading:         false,
  enrolledCourses: (() => {
    try {
      const item = localStorage.getItem("enrolledCourses");
      return item ? JSON.parse(item) : [];
    } catch {
      return [];
    }
  })(),
  sidebarLinks: [],
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setUser(state, { payload }) {
      state.user = payload;
    },
    setLoading(state, { payload }) {
      state.loading = payload;
    },
    setSidebarLinks(state, { payload }) {
      state.sidebarLinks = payload;
    },
    setEnrolledCourses(state, { payload }) {
      state.enrolledCourses = payload || [];
      localStorage.setItem("enrolledCourses", JSON.stringify(state.enrolledCourses));
    },
    addToEnrolledCourses(state, { payload }) {
      if (!state.enrolledCourses) state.enrolledCourses = [];
      const exists = state.enrolledCourses.find(
        (c) => (c.id || c._id) === (payload.id || payload._id)
      );
      if (!exists) {
        state.enrolledCourses.push(payload);
        localStorage.setItem("enrolledCourses", JSON.stringify(state.enrolledCourses));
      }
    },
  },
});

export const {
  setUser,
  setLoading,
  setSidebarLinks,
  setEnrolledCourses,
  addToEnrolledCourses,
} = profileSlice.actions;

export default profileSlice.reducer;