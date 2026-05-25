import { supabase } from "../config/supabaseClient";
import { setToken, setAuthInitialized } from "../slices/authSlice";
import { setUser } from "../slices/profileSlice";
import {
  buildAppUserFromSession,
  persistClientSession,
  clearClientSessionStores,
} from "../utils/supabaseAuthHelpers";
import { OAUTH_ROLE_KEY } from "../services/operations/googleAuthAPI";

// ── Nuclear clear — wipes ALL auth-related storage ───────────────────────────
// Called on SIGNED_OUT to guarantee nothing survives a page refresh.
function nuclearClear() {
  // 1. Our custom keys
  clearClientSessionStores();

  // 2. Any Supabase sb-* auth keys that may have been left behind
  //    (Supabase normally clears these itself, but we do it explicitly)
  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL ?? "";
  const projectRef  = supabaseUrl.split("//")[1]?.split(".")[0] ?? "";
  if (projectRef) {
    localStorage.removeItem(`sb-${projectRef}-auth-token`);
    localStorage.removeItem(`sb-${projectRef}-provider-token`);
  }

  // 3. OAuth role key from sessionStorage
  sessionStorage.removeItem(OAUTH_ROLE_KEY);
}

// ── Main session subscriber ───────────────────────────────────────────────────
/**
 * subscribeSupabaseAuthToStore
 *
 * Bridges Supabase session events → Redux store → localStorage.
 * Called once in App.js on mount.
 *
 * Events handled:
 *   SIGNED_IN     → fetch profile → dispatch user + token
 *   TOKEN_REFRESHED → update token only (profile unchanged)
 *   SIGNED_OUT    → nuclear clear → dispatch null
 *   PASSWORD_RECOVERY → set token only (for update-password page)
 *
 * Race condition fix (OAuth):
 *   When SIGNED_IN fires during OAuth login, the profile may not yet have the
 *   correct role (OAuthCallback hasn't run upsertOAuthProfile() yet).
 *   If sessionStorage has OAUTH_ROLE_KEY, we skip the profile fetch here and
 *   let OAuthCallback call refreshAuthStateInStore() after upsert completes.
 */
export function subscribeSupabaseAuthToStore(dispatch) {
  async function applySession(event, session) {
    // ── SIGNED_OUT or null session ────────────────────────────────────────
    if (event === "SIGNED_OUT" || !session?.access_token) {
      nuclearClear();
      dispatch(setToken(null));
      dispatch(setUser(null));
      return;
    }

    // ── PASSWORD_RECOVERY: set token only (user updates password on next page)
    if (event === "PASSWORD_RECOVERY") {
      dispatch(setToken(session.access_token));
      return;
    }

    // ── SIGNED_IN with a pending OAuth role ──────────────────────────────
    // OAuthCallback will call refreshAuthStateInStore() after upsert.
    // We only set the token here so API calls in OAuthCallback can proceed.
    const hasPendingOAuthRole = !!sessionStorage.getItem(OAUTH_ROLE_KEY);
    if (event === "SIGNED_IN" && hasPendingOAuthRole) {
      dispatch(setToken(session.access_token));
      return;
    }

    // ── Normal SIGNED_IN / TOKEN_REFRESHED / INITIAL_SESSION ─────────────
    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .maybeSingle();

    const appUser = buildAppUserFromSession(session, profile);

    if (!appUser) {
      // Profile not found — treat as unauthenticated
      nuclearClear();
      dispatch(setToken(null));
      dispatch(setUser(null));
      return;
    }

    dispatch(setToken(session.access_token));
    dispatch(setUser(appUser));
    persistClientSession(session.access_token, appUser);
  }

  // Subscribe — applySession is called for every auth event.
  // We wrap it so setAuthInitialized(true) fires regardless of success/failure.
  const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
    try {
      await applySession(event, session);
    } catch (err) {
      console.error("[syncSupabaseSession] applySession threw:", err);
      // Still mark initialized so guards don't spin forever
    } finally {
      // ← THE KEY FIX: after first event, guards are allowed to make decisions
      dispatch(setAuthInitialized(true));
    }
  });

  return () => data.subscription.unsubscribe();
}

/**
 * refreshAuthStateInStore
 *
 * Force-refresh Redux from the live Supabase session.
 * Called by OAuthCallback AFTER upsertOAuthProfile() writes the correct role.
 * This fixes the race condition where onAuthStateChange fired before the DB
 * profile had the correct account_type.
 */
export async function refreshAuthStateInStore(dispatch) {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session?.access_token) return;

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", session.user.id)
    .maybeSingle();

  const appUser = buildAppUserFromSession(session, profile);
  if (!appUser) return;

  dispatch(setToken(session.access_token));
  dispatch(setUser(appUser));
  persistClientSession(session.access_token, appUser);
}

/**
 * performLogout
 *
 * Single authoritative logout function. Call this from anywhere (Navbar,
 * profile dropdown, settings). Handles:
 *   1. Supabase sign out (clears sb-* tokens on the server + client)
 *   2. Nuclear local storage clear
 *   3. Redux state reset
 *   4. Navigation to /login
 */
export async function performLogout(dispatch, navigate) {
  try {
    // scope: 'global' kills all sessions (including OAuth refresh tokens)
    await supabase.auth.signOut({ scope: "global" });
  } catch {
    // signOut failed (e.g. already signed out) — continue anyway
  }

  // Belt-and-suspenders: clear everything ourselves too
  nuclearClear();
  dispatch(setToken(null));
  dispatch(setUser(null));

  if (navigate) {
    navigate("/login", { replace: true });
  }
}
