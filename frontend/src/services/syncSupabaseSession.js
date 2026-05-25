import { supabase } from "../config/supabaseClient";
import { setToken, setAuthInitialized } from "../slices/authSlice";
import { setUser } from "../slices/profileSlice";
import {
  buildAppUserFromSession,
  persistClientSession,
  clearClientSessionStores,
} from "../utils/supabaseAuthHelpers";
import { OAUTH_ROLE_KEY } from "../services/operations/googleAuthAPI";

function nuclearClear() {
  clearClientSessionStores();

  const supabaseUrl = process.env.REACT_APP_SUPABASE_URL ?? "";
  const projectRef  = supabaseUrl.split("//")[1]?.split(".")[0] ?? "";
  if (projectRef) {
    localStorage.removeItem(`sb-${projectRef}-auth-token`);
    localStorage.removeItem(`sb-${projectRef}-provider-token`);
  }

  sessionStorage.removeItem(OAUTH_ROLE_KEY);
}

export function subscribeSupabaseAuthToStore(dispatch) {
  async function applySession(event, session) {
    if (event === "SIGNED_OUT" || !session?.access_token) {
      nuclearClear();
      dispatch(setToken(null));
      dispatch(setUser(null));
      return;
    }

    if (event === "PASSWORD_RECOVERY") {
      dispatch(setToken(session.access_token));
      return;
    }

    const hasPendingOAuthRole = !!sessionStorage.getItem(OAUTH_ROLE_KEY);
    if (event === "SIGNED_IN" && hasPendingOAuthRole) {
      dispatch(setToken(session.access_token));
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .maybeSingle();

    const appUser = buildAppUserFromSession(session, profile);

    if (!appUser) {
      nuclearClear();
      dispatch(setToken(null));
      dispatch(setUser(null));
      return;
    }

    dispatch(setToken(session.access_token));
    dispatch(setUser(appUser));
    persistClientSession(session.access_token, appUser);
  }

  async function initializeAuth() {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      await applySession("INITIAL_SESSION", session);
    } catch (err) {
      console.error("[syncSupabaseSession] initializeAuth threw:", err);
    } finally {
      dispatch(setAuthInitialized(true));
    }
  }

  initializeAuth();

  const { data } = supabase.auth.onAuthStateChange(async (event, session) => {
    try {
      await applySession(event, session);
    } catch (err) {
      console.error("[syncSupabaseSession] applySession threw:", err);
    } finally {
      dispatch(setAuthInitialized(true));
    }
  });

  return () => data.subscription.unsubscribe();
}

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

export async function performLogout(dispatch, navigate) {
  try {
    await supabase.auth.signOut({ scope: "global" });
  } catch {
  }

  nuclearClear();
  dispatch(setToken(null));
  dispatch(setUser(null));

  if (navigate) {
    navigate("/login", { replace: true });
  }
}
