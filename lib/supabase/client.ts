import { createClient } from "@supabase/supabase-js";
import { env, isSupabaseEnabled } from "@/lib/env";

export function getSupabaseBrowserClient() {
  if (!isSupabaseEnabled) return null;
  return createClient(env.supabaseUrl, env.supabaseAnonKey, {
    auth: {
      persistSession: false,
    },
  });
}
