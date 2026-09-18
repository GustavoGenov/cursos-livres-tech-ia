import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://vlntwbvrudtlpvculezi.supabase.co";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "sb_publishable_kwWcx8RdaqTTjDWZAtne3g_kDdd4Zl0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
