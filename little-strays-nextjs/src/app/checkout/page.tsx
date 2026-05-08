import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { CheckoutPageClient } from "@/components/checkout/CheckoutPageClient";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { blankProfile, type Profile } from "@/lib/supabase/profile";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Checkout"
};

export const dynamic = "force-dynamic";

export default async function CheckoutPage() {
  if (!isSupabaseConfigured()) {
    return (
      <section className="mx-auto max-w-[900px] px-4 py-16 sm:px-6 lg:py-24">
        <p className="editorial-kicker">Checkout</p>
        <h1 className="mt-4 text-5xl font-semibold leading-none">
          Supabase setup needed.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-7 text-muted">
          Add your Supabase environment variables before accepting preorders.
        </p>
      </section>
    );
  }

  const supabase = await createClient();

  if (!supabase) {
    redirect("/login?redirectTo=/checkout");
  }

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login?redirectTo=/checkout");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, phone, delivery_address, delivery_notes")
    .eq("id", user.id)
    .maybeSingle<
      Pick<Profile, "full_name" | "phone" | "delivery_address" | "delivery_notes">
    >();

  return (
    <CheckoutPageClient
      email={user.email ?? ""}
      profile={{
        ...blankProfile,
        full_name: profile?.full_name ?? "",
        phone: profile?.phone ?? "",
        delivery_address: profile?.delivery_address ?? "",
        delivery_notes: profile?.delivery_notes ?? ""
      }}
    />
  );
}
