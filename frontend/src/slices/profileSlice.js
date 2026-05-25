import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user:            null,
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
