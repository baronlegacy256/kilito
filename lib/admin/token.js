import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE_NAME = "kilito_admin";

function getSecret() {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s || s.length < 32) {
    throw new Error("ADMIN_SESSION_SECRET must be set (use at least 32 random characters).");
  }
  return s;
}

/** @param {string} email */
export function signAdminSession(email) {
  const exp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7;
  const payload = JSON.stringify({ email, exp });
  const body = Buffer.from(payload, "utf8").toString("base64url");
  const sig = createHmac("sha256", getSecret()).update(body).digest("base64url");
  return `${body}.${sig}`;
}

/** @param {string | undefined} token */
export function verifyAdminSession(token) {
  if (!token || typeof token !== "string") return null;
  const dot = token.lastIndexOf(".");
  if (dot <= 0) return null;
  const body = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  let expected;
  try {
    expected = createHmac("sha256", getSecret()).update(body).digest("base64url");
  } catch {
    return null;
  }
  if (expected.length !== sig.length) return null;
  try {
    if (!timingSafeEqual(Buffer.from(expected, "utf8"), Buffer.from(sig, "utf8"))) {
      return null;
    }
  } catch {
    return null;
  }
  try {
    const json = Buffer.from(body, "base64url").toString("utf8");
    const data = JSON.parse(json);
    if (!data?.email || typeof data.exp !== "number") return null;
    if (data.exp < Math.floor(Date.now() / 1000)) return null;
    return { email: data.email };
  } catch {
    return null;
  }
}
