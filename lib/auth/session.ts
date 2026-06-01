import { SignJWT, jwtVerify } from "jose";
import { env } from "@/lib/env";

export const ADMIN_COOKIE_NAME = "villa_admin_session";

const secret = new TextEncoder().encode(env.sessionSecret);

type AdminPayload = {
  email: string;
  role: "admin";
};

export async function signAdminSession(payload: AdminPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret);
}

export async function verifyAdminSession(token: string | undefined) {
  if (!token) return null;

  try {
    const result = await jwtVerify(token, secret);
    const payload = result.payload as Partial<AdminPayload>;

    if (payload.role !== "admin" || !payload.email) {
      return null;
    }

    return {
      email: payload.email,
      role: payload.role,
    } as AdminPayload;
  } catch {
    return null;
  }
}
