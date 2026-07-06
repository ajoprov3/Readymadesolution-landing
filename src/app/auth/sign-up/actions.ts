"use server";

import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/server";

export type AuthState = { error?: string };

export async function signUpWithEmail(
  _prev: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!name || !email || !password) {
    return { error: "Name, email, and password are all required." };
  }

  const { error } = await auth.signUp.email({ name, email, password });
  if (error) {
    return { error: error.message ?? "Could not create the account." };
  }

  // redirect() throws internally — must stay outside any try/catch.
  redirect("/portal");
}
