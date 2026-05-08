import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { signOut, updateProfile } from "@/app/auth/actions";
import { blankProfile, type Profile } from "@/lib/supabase/profile";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const metadata: Metadata = {
  title: "Account"
};

export const dynamic = "force-dynamic";

type AccountPageProps = {
  searchParams?: Promise<{
    message?: string;
  }>;
};

export default async function AccountPage({ searchParams }: AccountPageProps) {
  const params = await searchParams;

  if (!isSupabaseConfigured()) {
    return (
      <section className="mx-auto max-w-[900px] px-4 py-16 sm:px-6 lg:py-24">
        <p className="editorial-kicker">Account</p>
        <h1 className="mt-4 text-5xl font-semibold leading-none">
          Supabase setup needed.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-7 text-muted">
          Add `NEXT_PUBLIC_SUPABASE_URL` and
          `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` to `.env.local`, then run the
          SQL in `supabase/schema.sql` in your Supabase project.
        </p>
      </section>
    );
  }

  const supabase = await createClient();

  if (!supabase) {
    redirect("/login?redirectTo=/account");
  }

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login?redirectTo=/account");
  }

  const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("full_name, phone, pet_names, delivery_notes")
    .eq("id", user.id)
    .maybeSingle<Pick<Profile, "full_name" | "phone" | "pet_names" | "delivery_notes">>();
  const profileValues = {
    ...blankProfile,
    full_name: profile?.full_name ?? "",
    phone: profile?.phone ?? "",
    pet_names: profile?.pet_names ?? "",
    delivery_notes: profile?.delivery_notes ?? ""
  };

  return (
    <section className="mx-auto grid max-w-[1180px] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:py-24">
      <div>
        <p className="editorial-kicker">Account</p>
        <h1 className="mt-4 text-5xl font-semibold leading-none">
          Your profile
        </h1>
        <p className="mt-6 max-w-md text-base leading-7 text-muted">
          Keep your local delivery details and pet notes in one place. Checkout
          and order history can connect here later.
        </p>
        <form action={signOut} className="mt-8">
          <button
            type="submit"
            className="focus-ring rounded-sm text-sm font-semibold text-clay hover:text-ink"
          >
            Log out
          </button>
        </form>
      </div>

      <form
        action={updateProfile}
        className="rounded-sm bg-paper p-5 shadow-soft sm:p-8"
      >
        {params?.message ? (
          <p className="mb-5 rounded-sm border border-clay/15 bg-linen px-4 py-3 text-sm leading-6 text-muted">
            {params.message}
          </p>
        ) : null}
        {profileError ? (
          <p className="mb-5 rounded-sm border border-clay/15 bg-linen px-4 py-3 text-sm leading-6 text-muted">
            Profile table not ready: {profileError.message}
          </p>
        ) : null}
        <div className="grid gap-5 sm:grid-cols-2">
          <label className="grid gap-2 text-sm font-semibold">
            Name
            <input
              name="fullName"
              defaultValue={profileValues.full_name}
              className="focus-ring min-h-12 rounded-sm border border-clay/16 bg-linen px-4 font-normal text-ink placeholder:text-muted"
              placeholder="Your name"
            />
          </label>
          <label className="grid gap-2 text-sm font-semibold">
            Email
            <input
              value={user.email ?? ""}
              readOnly
              className="min-h-12 rounded-sm border border-clay/16 bg-linen px-4 font-normal text-muted outline-none"
            />
          </label>
        </div>
        <label className="mt-5 grid gap-2 text-sm font-semibold">
          Phone
          <input
            name="phone"
            type="tel"
            defaultValue={profileValues.phone}
            className="focus-ring min-h-12 rounded-sm border border-clay/16 bg-linen px-4 font-normal text-ink placeholder:text-muted"
            placeholder="Best local delivery number"
          />
        </label>
        <label className="mt-5 grid gap-2 text-sm font-semibold">
          Pet names
          <input
            name="petNames"
            defaultValue={profileValues.pet_names}
            className="focus-ring min-h-12 rounded-sm border border-clay/16 bg-linen px-4 font-normal text-ink placeholder:text-muted"
            placeholder="May, Lucky, Joe, Pika..."
          />
        </label>
        <label className="mt-5 grid gap-2 text-sm font-semibold">
          Delivery notes
          <textarea
            name="deliveryNotes"
            defaultValue={profileValues.delivery_notes}
            className="focus-ring min-h-32 rounded-sm border border-clay/16 bg-linen px-4 py-3 font-normal text-ink placeholder:text-muted"
            placeholder="Gate code, preferred drop-off spot, or anything helpful."
          />
        </label>
        <button
          type="submit"
          className="focus-ring mt-6 min-h-12 rounded-sm border border-clay bg-clay px-5 text-sm font-semibold text-white shadow-soft transition hover:border-ink hover:bg-ink"
        >
          Save profile
        </button>
      </form>
    </section>
  );
}
