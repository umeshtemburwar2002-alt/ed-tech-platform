require("dotenv").config();

const { createClient } = require("@supabase/supabase-js");
const ws = require("ws");

const SUPABASE_URL = process.env.SUPABASE_URL;
// Accept either SUPABASE_SERVICE_KEY or SUPABASE_SERVICE_ROLE_KEY from .env
const SUPABASE_SERVICE_KEY =
  process.env.SUPABASE_SERVICE_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error("ERROR: Missing Supabase environment variables!");
  console.error("- SUPABASE_URL:", SUPABASE_URL ? "✅" : "❌");
  console.error(
    "- SUPABASE_SERVICE_KEY / SUPABASE_SERVICE_ROLE_KEY:",
    SUPABASE_SERVICE_KEY ? "✅" : "❌"
  );
  process.exit(1);
}

const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_SERVICE_KEY,
  {
    realtime: {
      transport: ws,
    },
  }
);

module.exports = supabase;
