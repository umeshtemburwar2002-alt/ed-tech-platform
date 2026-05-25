/**
 * OAuth Authentication Service
 * Handles Google + GitHub sign-in via Supabase signInWithOAuth.
 *
 * Role-based Flow:
 *  1. User selects role on Login page → stored in sessionStorage
 *  2. signInWithOAuth() redirects to provider
 *  3. Provider redirects back → /auth/callback
 *  4. OAuthCallback calls upsertOAuthProfile() which reads the stored role
 *  5. Profile is saved with correct account_type
 *  6. User is redirected to the correct dashboard
 */
import { supabase } from "../../config/supabaseClient";
import { toast } from "react-hot-toast";

// ─── Constants ────────────────────────────────────────────────────────────────

/**
 * sessionStorage key used to pass the selected role across the OAuth redirect.
 * Exported so Login.jsx and OAuthCallback.jsx use the exact same key.
 */
export const OAUTH_ROLE_KEY = "oauth_selected_role";

// Redirect URL — must match Google Console, GitHub OAuth App, AND Supabase Redirect URLs
const OAUTH_REDIRECT_URL =
  process.env.REACT_APP_OAUTH_REDIRECT_URL ||
  `${window.location.origin}/auth/callback`;

// ─── Core OAuth launcher ──────────────────────────────────────────────────────

/**
 * Launch a Supabase OAuth flow for the given provider.
 * @param {"google"|"github"} provider
 */
export async function signInWithOAuth(provider) {
  const toastId = toast.loading(`Connecting to ${capitalize(provider)}…`);
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: OAUTH_REDIRECT_URL,
        scopes: provider === "github" ? "read:user user:email" : undefined,
        queryParams:
          provider === "google"
            ? { access_type: "offline", prompt: "consent" }
            : undefined,
      },
    });
    // This line only runs if the redirect failed (network error, etc.)
    if (error) throw error;
  } catch (err) {
    console.error(`[OAuth:${provider}]`, err);
    toast.error(err.message || `${capitalize(provider)} sign-in failed`, { id: toastId });
    // Re-throw so Login.jsx can reset the loading state
    throw err;
  }
}

// ─── Convenience wrappers ─────────────────────────────────────────────────────

export const signInWithGoogle = () => signInWithOAuth("google");
export const signInWithGitHub = () => signInWithOAuth("github");

// ─── Post-callback: upsert profile with role ─────────────────────────────────

/**
 * Called by OAuthCallback after session is confirmed.
 *
 * Logic:
 * - If profile ALREADY EXISTS → do NOT overwrite account_type (returning user)
 * - If profile is NEW         → use the role from sessionStorage
 * - Safety fallback           → "Student"
 *
 * @param {import("@supabase/supabase-js").User} user
 * @returns {Promise<string>} The final account_type that was saved
 */
export async function upsertOAuthProfile(user) {
  if (!user?.id) return "Student";

  // ── Parse name from OAuth metadata ──────────────────────────────────────
  const meta = user.user_metadata ?? {};
  const fullName =
    meta.full_name ||
    meta.name ||
    meta.login ||                        // GitHub uses "login" as username
    user.email?.split("@")[0] ||
    "";
  const nameParts = fullName.trim().split(" ");
  const firstName = nameParts[0] || "";
  const lastName  = nameParts.slice(1).join(" ") || "";
  const avatarUrl = meta.avatar_url || meta.picture || "";

  // ── Check if user already has a profile (returning user) ────────────────
  const { data: existing, error: fetchError } = await supabase
    .from("profiles")
    .select("id, account_type")
    .eq("id", user.id)
    .maybeSingle();

  if (fetchError) {
    console.error("[upsertOAuthProfile] fetch error:", fetchError.message);
  }

  // ── Determine role ───────────────────────────────────────────────────────
  let accountType;

  if (existing?.account_type) {
    // RETURNING USER — keep their existing role, don't overwrite
    accountType = existing.account_type;
  } else {
    // NEW USER — read the role they selected before OAuth
    const storedRole = sessionStorage.getItem(OAUTH_ROLE_KEY);
    accountType = normalizeRole(storedRole) ?? "Student";
  }

  // ── Upsert the profile row ───────────────────────────────────────────────
  const { error: upsertError } = await supabase.from("profiles").upsert(
    {
      id:           user.id,
      email:        user.email ?? "",
      first_name:   firstName,
      last_name:    lastName,
      full_name:    fullName || firstName,
      avatar_url:   avatarUrl,
      image:        avatarUrl,            // legacy column compat
      account_type: accountType,
      updated_at:   new Date().toISOString(),
    },
    {
      onConflict: "id",
      // Only update non-role fields for returning users
      ignoreDuplicates: false,
    }
  );

  if (upsertError) {
    console.error("[upsertOAuthProfile] upsert error:", upsertError.message);
  }

  // ── Clean up sessionStorage ──────────────────────────────────────────────
  sessionStorage.removeItem(OAUTH_ROLE_KEY);

  return accountType;
}

// ─── Role-based redirect ──────────────────────────────────────────────────────

/**
 * Returns the dashboard path for a given account_type string.
 * @param {string} accountType
 */
export function getDashboardPath(accountType) {
  const t = String(accountType || "").toLowerCase();
  if (t === "admin")                              return "/admin/dashboard";
  if (t === "instructor" || t === "teacher")      return "/dashboard/instructor";
  return "/dashboard/my-profile"; // student default
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Normalize any role string to canonical DB value.
 * "teacher" and "Teacher" both map to "Instructor".
 */
function normalizeRole(raw) {
  if (!raw) return "Student";
  const lower = raw.toLowerCase();
  if (lower === "instructor" || lower === "teacher") return "Instructor";
  if (lower === "admin")                             return "Admin";
  return "Student";
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
