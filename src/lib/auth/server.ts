import { createNeonAuth } from "@neondatabase/auth/next/server";

/** Server-only Neon Auth singleton. Used in server components, server actions,
 *  route handlers, and the proxy. Never import this into a client bundle. */
export const auth = createNeonAuth({
  baseUrl: process.env.NEON_AUTH_BASE_URL!,
  cookies: { secret: process.env.NEON_AUTH_COOKIE_SECRET! },
});
