import { timingSafeEqual } from "node:crypto";
import { compareSync } from "bcryptjs";

/**
 * Verifies admin login against env. Prefer ADMIN_PASSWORD_HASH (bcrypt) in production.
 * Optional ADMIN_PASSWORD is compared with timing-safe equality (dev / single-tenant only).
 */
export function verifyAdminCredentials(email, password) {
  if (!email || !password || typeof email !== "string" || typeof password !== "string") {
    return false;
  }

  const expectedEmail = process.env.ADMIN_EMAIL?.trim()?.toLowerCase();
  if (!expectedEmail || email.trim()?.toLowerCase() !== expectedEmail) {
    return false;
  }

  const plain = process.env.ADMIN_PASSWORD;
  if (plain != null && plain !== "") {
    try {
      const a = Buffer.from(password, "utf8");
      const b = Buffer.from(plain, "utf8");
      if (a.length !== b.length) return false;
      return timingSafeEqual(a, b);
    } catch {
      return false;
    }
  }

  return false;
}

export function hasAdminCredentialsConfigured() {
  const email = process.env.ADMIN_EMAIL?.trim();
  const hasPlain = process.env.ADMIN_PASSWORD != null && process.env.ADMIN_PASSWORD !== "";
  const secret = process.env.ADMIN_SESSION_SECRET;
  const hasSecret = Boolean(secret && secret.length >= 32);

  return Boolean(email && hasPlain && hasSecret);
}
