import { createClient } from "@supabase/supabase-js";
import { env, isSupabaseAdminEnabled } from "@/lib/env";

export function getSupabaseAdminClient() {
  if (!isSupabaseAdminEnabled) return null;
  return createClient(env.supabaseUrl, env.supabaseServiceRoleKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}
