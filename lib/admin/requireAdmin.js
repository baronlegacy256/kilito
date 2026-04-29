import { cookies } from "next/headers";
import { ADMIN_COOKIE_NAME, verifyAdminSession } from "./token";

/** @returns {Promise<{ email: string } | null>} */
export async function requireAdminSession() {
  let token;
  try {
    const jar = await cookies();
    token = jar.get(ADMIN_COOKIE_NAME)?.value;
  } catch {
    return null;
  }
  return verifyAdminSession(token);
}
