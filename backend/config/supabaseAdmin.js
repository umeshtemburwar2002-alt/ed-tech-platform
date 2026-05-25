const { createClient } = require("@supabase/supabase-js");
require("dotenv").config();

const url = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !serviceKey) {
    console.error(
        "SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY is missing; admin auth features (e.g. password reset) will fail."
    );
}

const ws = require("ws");

const supabaseAdmin =
    url && serviceKey
        ? createClient(url, serviceKey, {
              auth: {
                  autoRefreshToken: false,
                  persistSession: false,
              },
              realtime: {
                  transport: ws,
              },
          })
        : null;

module.exports = supabaseAdmin;
