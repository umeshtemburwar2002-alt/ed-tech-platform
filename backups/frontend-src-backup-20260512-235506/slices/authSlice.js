import { createSlice } from "@reduxjs/toolkit";

/**
 * ⚠️  DO NOT hydrate `token` from localStorage here.
 *
 * Root cause of auto-login after logout:
 *   - supabase.auth.signOut() clears the Supabase sb-* keys.
 *   - But our custom localStorage["token"] survives if we initialise from it.
 *   - On next page load authSlice boots with that stale token → PrivateRoute
 *     sees a truthy token → lets the user in → dashboard re-opens.
 *
 * Solution: token ALWAYS starts null. The canonical source of truth is the
 * live Supabase session. subscribeSupabaseAuthToStore() in App.js fires
 * onAuthStateChange immediately on mount; if Supabase still has an active
 * session it dispatches setToken(accessToken), otherwise it dispatches
 * setToken(null) and we stay on the login page.
 *
 * authInitialized:
 *   Starts false. Set to true once after the FIRST onAuthStateChange fires.
 *   Until true, PrivateRoute and RoleRoute show a spinner — they NEVER redirect.
 *   This eliminates the race-condition blank screen where:
 *     dispatch(setToken) fires → PrivateRoute passes → RoleRoute runs → user still
 *     null (between async dispatches) → RoleRoute redirects to /login → loop.
 */
const initialState = {
  signupData:       null,
  loading:          false,
  token:            null,  // ← always null; session hydration via onAuthStateChange
  authInitialized:  false, // ← true after first onAuthStateChange event resolves
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setSignupData      (state, { payload }) { state.signupData      = payload; },
    setLoading         (state, { payload }) { state.loading         = payload; },
    setToken           (state, { payload }) { state.token           = payload; },
    setAuthInitialized (state, { payload }) { state.authInitialized = payload; },
  },
});

export const { setSignupData, setLoading, setToken, setAuthInitialized } = authSlice.actions;
export default authSlice.reducer;