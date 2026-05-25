import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL;
const supabaseKey = process.env.REACT_APP_SUPABASE_ANON_KEY;

// Fail-fast validation
if (!supabaseUrl || supabaseUrl.includes("your-project-id")) {
  throw new Error(
    "REACT_APP_SUPABASE_URL is missing or still a placeholder. " +
      "Check frontend/.env and restart your dev server."
  );
}

if (!supabaseKey || supabaseKey.includes("your-anon")) {
  throw new Error(
    "REACT_APP_SUPABASE_ANON_KEY is missing or still a placeholder. " +
      "Check frontend/.env and restart your dev server."
  );
}

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    // Persist session in localStorage so it survives page refreshes
    persistSession: true,
    // Automatically refresh the JWT before it expires
    autoRefreshToken: true,
    // Read the session from the URL hash after OAuth redirect
    detectSessionInUrl: true,
    // Use pkce flow for better security (works with implicit too)
    flowType: "implicit",
  },
});
