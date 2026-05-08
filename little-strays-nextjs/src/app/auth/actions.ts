"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

function getStringValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function getRedirectPath(formData: FormData) {
  const redirectTo = getStringValue(formData, "redirectTo");

  if (!redirectTo || !redirectTo.startsWith("/") || redirectTo.startsWith("//")) {
    return "/account";
  }

  return redirectTo;
}

function redirectWithMessage(path: string, message: string): never {
  redirect(`${path}?message=${encodeURIComponent(message)}`);
}

async function getOrigin() {
  const headerStore = await headers();
  return (
    headerStore.get("origin") ??
    process.env.NEXT_PUBLIC_SITE_URL ??
    "http://localhost:3000"
  );
}

export async function signIn(formData: FormData) {
  const supabase = await createClient();

  if (!supabase) {
    redirectWithMessage(
      "/login",
      "Supabase is not configured yet. Add your project URL and publishable key."
    );
  }

  const email = getStringValue(formData, "email");
  const password = getStringValue(formData, "password");
  const redirectTo = getRedirectPath(formData);

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    redirectWithMessage("/login", error.message);
  }

  revalidatePath("/", "layout");
  redirect(redirectTo);
}

export async function signUp(formData: FormData) {
  const supabase = await createClient();

  if (!supabase) {
    redirectWithMessage(
      "/signup",
      "Supabase is not configured yet. Add your project URL and publishable key."
    );
  }

  const fullName = getStringValue(formData, "fullName");
  const email = getStringValue(formData, "email");
  const password = getStringValue(formData, "password");
  const origin = await getOrigin();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName
      },
      emailRedirectTo: `${origin}/auth/confirm`
    }
  });

  if (error) {
    redirectWithMessage("/signup", error.message);
  }

  if (!data.session) {
    redirectWithMessage(
      "/login",
      "Check your email to confirm your account, then sign in."
    );
  }

  revalidatePath("/", "layout");
  redirect("/account");
}

export async function signOut() {
  const supabase = await createClient();

  if (supabase) {
    await supabase.auth.signOut();
  }

  revalidatePath("/", "layout");
  redirectWithMessage("/login", "You are signed out.");
}

export async function updateProfile(formData: FormData) {
  const supabase = await createClient();

  if (!supabase) {
    redirectWithMessage(
      "/account",
      "Supabase is not configured yet. Add your project URL and publishable key."
    );
  }

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login?redirectTo=/account");
  }

  const { error } = await supabase.from("profiles").upsert({
    id: user.id,
    full_name: getStringValue(formData, "fullName"),
    phone: getStringValue(formData, "phone"),
    pet_names: getStringValue(formData, "petNames"),
    delivery_address: getStringValue(formData, "deliveryAddress"),
    delivery_notes: getStringValue(formData, "deliveryNotes")
  });

  if (error) {
    redirectWithMessage("/account", error.message);
  }

  revalidatePath("/account");
  redirectWithMessage("/account", "Profile updated.");
}
