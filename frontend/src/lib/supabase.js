import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://bjfwdidbkbmlhowzuklk.supabase.co";
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJqZndkaWRia2JtbGhvd3p1a2xrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc5OTg0MzcsImV4cCI6MjA5MzU3NDQzN30.R2ZYpD0ijPzu8DO063jGvGu_4r9ds1vvGkIF4SLAtUc";

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
