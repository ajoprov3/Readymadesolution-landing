import { auth } from "@/lib/auth/server";

// Next 16 renamed middleware.ts -> proxy.ts. Only /portal is gated;
// unauthenticated requests are redirected to /auth/sign-in.
export default auth.middleware({ loginUrl: "/auth/sign-in" });

// Gate /portal navigations, but SKIP server-action POSTs (they carry a
// `next-action` header): the auth proxy rewrites the session cookie on gated
// POSTs, which corrupts the RSC/server-action response. Those are protected
// server-side in the portal layout + the actions themselves instead.
export const config = {
  matcher: [
    {
      source: "/portal/:path*",
      missing: [{ type: "header", key: "next-action" }],
    },
  ],
};
