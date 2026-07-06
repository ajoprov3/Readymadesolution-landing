"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/server";

export type AuthState = { error?: string };

export async function signInWithEmail(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Enter your email and password." };
  }

  const { error } = await auth.signIn.email({ email, password });
  if (error) {
    return { error: error.message ?? "Sign-in failed. Check your credentials." };
  }

  // redirect() throws internally — must stay outside any try/catch.
  redirect("/portal");
}
