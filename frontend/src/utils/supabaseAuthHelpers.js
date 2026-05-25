import { ACCOUNT_TYPE } from "./constants";

export function defaultAvatar(firstName, lastName) {
  const a = firstName || "U";
  const b = lastName || "";
  return `https://api.dicebear.com/5.x/initials/svg?seed=${encodeURIComponent(
    a
  )}%20${encodeURIComponent(b)}`;
}

/** Map `public.profiles` row (+ optional snake_case fallback) into app `user` shape. */
export function profileRowToAppUser(profile) {
  console.log("[supabaseAuthHelpers] profileRowToAppUser called with profile:", profile);
  if (!profile) {
    console.log("[supabaseAuthHelpers] profileRowToAppUser: profile is null, returning null");
    return null;
  }

  // ── Name resolution ───────────────────────────────────────────────────────
  // Priority: full_name → first_name/last_name → empty
  // Guard against Supabase default '' with .trim() check.
  const rawFullName  = (profile.full_name  ?? "").trim();
  const rawFirstName = (profile.first_name ?? profile.firstName ?? "").trim();
  const rawLastName  = (profile.last_name  ?? profile.lastName  ?? "").trim();

  console.log("[supabaseAuthHelpers] profileRowToAppUser names:", { rawFullName, rawFirstName, rawLastName });

  let firstName, lastName, fullName;

  if (rawFullName) {
    // Profile has a combined full_name — split it
    const parts = rawFullName.split(" ");
    firstName = parts[0] || "";
    lastName  = parts.slice(1).join(" ") || "";
    fullName  = rawFullName;
  } else {
    // Fallback to split columns
    firstName = rawFirstName;
    lastName  = rawLastName;
    fullName  = [firstName, lastName].filter(Boolean).join(" ");
  }

  // ── Role resolution ───────────────────────────────────────────────────────
  const raw = String(
    profile.account_type ?? profile.accountType ?? profile.role ?? ACCOUNT_TYPE.STUDENT
  ).toLowerCase();
  let accountType = ACCOUNT_TYPE.STUDENT;
  if (raw === "instructor" || raw === ACCOUNT_TYPE.INSTRUCTOR.toLowerCase())
    accountType = ACCOUNT_TYPE.INSTRUCTOR;
  else if (raw === "admin" || raw === ACCOUNT_TYPE.ADMIN.toLowerCase())
    accountType = ACCOUNT_TYPE.ADMIN;

  console.log("[supabaseAuthHelpers] profileRowToAppUser accountType:", accountType);

  const image =
    profile.image ||
    profile.avatar_url ||
    defaultAvatar(firstName, lastName);

  const result = {
    id:          profile.id,
    email:       profile.email ?? "",
    firstName,
    lastName,
    full_name:   fullName,   // expose so Dashboard can read user.full_name directly
    accountType,
    image,
    provider:    profile.provider ?? "email",
    contactNumber: profile.contact_number ?? "",
    about:       profile.about ?? "",
  };

  console.log("[supabaseAuthHelpers] profileRowToAppUser returning:", result);
  return result;
}

/** Build app user from Supabase session + optional `profiles` row (PRD: JWT + profile). */
export function buildAppUserFromSession(session, profile) {
  console.log("[supabaseAuthHelpers] buildAppUserFromSession called with session:", !!session, "profile:", !!profile);
  const u  = session?.user;
  const md = u?.user_metadata ?? {};
  console.log("[supabaseAuthHelpers] buildAppUserFromSession user:", u, "metadata:", md);

  // ── Extract name from JWT metadata ───────────────────────────────────────
  // raw_user_meta_data always has the name entered during signup or from OAuth.
  // This is our authoritative name source when the DB profile has empty strings.
  const metaFullName =
    (md.full_name  ||   // email signup: we pass full_name in signUp options.data
     md.name       ||   // Google OAuth: provides "name"
     ""                 // GitHub: we do NOT use md.login (username ≠ display name)
    ).trim();
  const metaFirstName = (md.firstName || md.first_name || "").trim();
  const metaLastName  = (md.lastName  || md.last_name  || "").trim();

  console.log("[supabaseAuthHelpers] buildAppUserFromSession meta names:", { metaFullName, metaFirstName, metaLastName });

  // Derive first/last from metaFullName if it's available
  const metaParts = metaFullName.split(" ");
  const jwtFirst  = metaFullName ? (metaParts[0] || "")                  : metaFirstName;
  const jwtLast   = metaFullName ? (metaParts.slice(1).join(" ") || "")  : metaLastName;
  const jwtFull   = metaFullName || [jwtFirst, jwtLast].filter(Boolean).join(" ");

  // ── Build from profiles row ───────────────────────────────────────────────
  const rowUser = profileRowToAppUser(profile);
  console.log("[supabaseAuthHelpers] buildAppUserFromSession rowUser:", rowUser);

  if (rowUser) {
    // Profile exists — use it for role + id + email (most authoritative).
    // But ONLY use its name if it's actually populated.
    // Supabase's default trigger sets first_name='' — we must fall back to JWT.
    const nameIsEmpty = !rowUser.firstName && !rowUser.full_name;
    console.log("[supabaseAuthHelpers] buildAppUserFromSession nameIsEmpty:", nameIsEmpty);

    if (nameIsEmpty && jwtFirst) {
      // Profile has empty name but JWT has the real name → merge
      const result = {
        ...rowUser,
        firstName: jwtFirst,
        lastName:  jwtLast,
        full_name: jwtFull,
        image:     rowUser.image || md.avatar_url || md.picture || defaultAvatar(jwtFirst, jwtLast),
      };
      console.log("[supabaseAuthHelpers] buildAppUserFromSession returning merged result:", result);
      return result;
    }

    // Profile has a real name → return as-is
    console.log("[supabaseAuthHelpers] buildAppUserFromSession returning rowUser:", rowUser);
    return rowUser;
  }

  // ── No profile row at all — build entirely from JWT ───────────────────────
  if (!u) {
    console.log("[supabaseAuthHelpers] buildAppUserFromSession: no user in session, returning null");
    return null;
  }

  // Role from metadata (email signup passes accountType in options.data)
  let accountType = md.accountType ?? ACCOUNT_TYPE.STUDENT;
  if (typeof accountType === "string") {
    const lower = accountType.toLowerCase();
    if (lower === "instructor" || lower === "teacher") accountType = ACCOUNT_TYPE.INSTRUCTOR;
    else if (lower === "admin")                        accountType = ACCOUNT_TYPE.ADMIN;
    else                                               accountType = ACCOUNT_TYPE.STUDENT;
  }

  const result = {
    id:         u.id,
    email:      u.email ?? "",
    firstName:  jwtFirst,
    lastName:   jwtLast,
    full_name:  jwtFull,
    accountType,
    image:      md.avatar_url || md.picture || defaultAvatar(jwtFirst, jwtLast),
    provider:   u.app_metadata?.provider ?? "email",
  };
  console.log("[supabaseAuthHelpers] buildAppUserFromSession returning JWT-only result:", result);
  return result;
}



/** Read JWT from localStorage (supports legacy JSON-stringified tokens). */
export function getStoredAccessToken() {
  const t = localStorage.getItem("token");
  if (!t) return null;
  try {
    const parsed = JSON.parse(t);
    return typeof parsed === "string" ? parsed : null;
  } catch {
    return t;
  }
}

export function persistClientSession(accessToken, user) {
  if (accessToken) {
    const raw =
      typeof accessToken === "string" ? accessToken : String(accessToken ?? "");
    localStorage.setItem("token", raw);
  }
  if (user) {
    localStorage.setItem("user", JSON.stringify(user));
  }
  localStorage.setItem("isLoggedIn", "true");
  const roleKey =
    user?.accountType === ACCOUNT_TYPE.INSTRUCTOR
      ? "teacher"
      : String(user?.accountType ?? "student").toLowerCase();
  localStorage.setItem("userRole", roleKey);
}

export function clearClientSessionStores() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("userRole");
}
