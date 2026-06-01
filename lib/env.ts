export const env = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
  supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY ?? "",
  adminEmail: process.env.ADMIN_EMAIL ?? "admin@daraghir.com",
  adminPassword: process.env.ADMIN_PASSWORD ?? "ChangeMeNow!2026",
  sessionSecret:
    process.env.SESSION_SECRET ?? "dev-session-secret-change-this-in-production",
};

export const isSupabaseEnabled = Boolean(env.supabaseUrl && env.supabaseAnonKey);
export const isSupabaseAdminEnabled = Boolean(
  env.supabaseUrl && env.supabaseServiceRoleKey,
);
