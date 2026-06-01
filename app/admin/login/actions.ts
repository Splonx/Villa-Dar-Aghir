"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";
import { ADMIN_COOKIE_NAME, signAdminSession } from "@/lib/auth/session";
import { env, isSupabaseEnabled } from "@/lib/env";
import { getSupabaseServerClient } from "@/lib/supabase/server";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(120),
});

async function verifyCredentials(email: string, password: string) {
  if (email !== env.adminEmail) return false;

  if (isSupabaseEnabled) {
    const supabase = getSupabaseServerClient();
    if (supabase) {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (!error) return true;
    }
  }

  return email === env.adminEmail && password === env.adminPassword;
}

export async function loginAdminAction(formData: FormData) {
  const parsed = loginSchema.safeParse({
    email: (formData.get("email") ?? "").toString().trim(),
    password: (formData.get("password") ?? "").toString(),
  });

  if (!parsed.success) {
    redirect("/admin/login?error=Identifiants+invalides");
  }

  const isValid = await verifyCredentials(parsed.data.email, parsed.data.password);

  if (!isValid) {
    redirect("/admin/login?error=Email+ou+mot+de+passe+incorrect");
  }

  const token = await signAdminSession({
    email: parsed.data.email,
    role: "admin",
  });

  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  redirect("/admin/dashboard");
}
