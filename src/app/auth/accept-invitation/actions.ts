"use server";

import { eq } from "drizzle-orm";
import { db } from "@/db";
import { authInvitation } from "@/db/schema";

/** Look up a pending invitation's email so the accept form can prefill it.
 *  Reads the Neon Auth invitation table directly (server-side). */
export async function getInviteEmail(
  invitationId: string,
): Promise<{ email: string } | { error: string }> {
  if (!invitationId) return { error: "Missing invitation id." };
  try {
    const [inv] = await db
      .select({ email: authInvitation.email, status: authInvitation.status })
      .from(authInvitation)
      .where(eq(authInvitation.id, invitationId))
      .limit(1);
    if (!inv) return { error: "This invitation could not be found." };
    if (inv.status !== "pending")
      return { error: "This invitation is no longer active." };
    return { email: inv.email ?? "" };
  } catch {
    return { error: "Could not load the invitation." };
  }
}
