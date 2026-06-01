import { createClient } from "@supabase/supabase-js";
import { env, isSupabaseEnabled } from "@/lib/env";

export function getSupabaseServerClient() {
  if (!isSupabaseEnabled) return null;
  return createClient(env.supabaseUrl, env.supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
