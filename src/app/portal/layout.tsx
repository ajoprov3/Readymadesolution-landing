import type { Metadata } from "next";
import MuiProvider from "@/components/portal/MuiProvider";
import Shell from "@/components/portal/Shell";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/server";

export const metadata: Metadata = {
  title: "Console — Readymade Solutions",
};

// Uses auth.getSession() → must render dynamically.
export const dynamic = "force-dynamic";

export default async function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Server-side gate: the middleware skips server-action POSTs, so this is the
  // real protection for the console (and hydrates the shell with the user).
  const { data: session } = await auth.getSession();
  if (!session?.user) redirect("/auth/sign-in");
  const user = {
    name: session.user.name ?? "Readymade Team",
    email: session.user.email ?? "",
  };

  return (
    <MuiProvider>
      <Shell user={user}>{children}</Shell>
    </MuiProvider>
  );
}
