import type { Metadata } from "next";
import Link from "next/link";
import { signUp } from "@/app/auth/actions";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const metadata: Metadata = {
  title: "Create Account"
};

type SignUpPageProps = {
  searchParams?: Promise<{
    message?: string;
  }>;
};

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const params = await searchParams;
  const isConfigured = isSupabaseConfigured();

  return (
    <section className="mx-auto grid max-w-[1100px] gap-8 px-4 py-12 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 lg:px-8 lg:py-24">
      <div>
        <p className="editorial-kicker">Little Strays</p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl sm:leading-none">
          Create an account
        </h1>
        <p className="mt-6 max-w-md text-base leading-7 text-muted">
          Save profile details for local delivery, pet notes, and future order
          history.
        </p>
        <p className="mt-6 text-sm leading-6 text-muted">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-clay hover:text-ink">
            Log in
          </Link>
        </p>
      </div>

      <form action={signUp} className="rounded-sm bg-paper p-4 shadow-soft sm:p-8">
        {params?.message ? (
          <p className="mb-5 rounded-sm border border-clay/15 bg-linen px-4 py-3 text-sm leading-6 text-muted">
            {params.message}
          </p>
        ) : null}
        {!isConfigured ? (
          <p className="mb-5 rounded-sm border border-clay/15 bg-linen px-4 py-3 text-sm leading-6 text-muted">
            Add Supabase environment variables before creating accounts.
          </p>
        ) : null}
        <label className="grid gap-2 text-sm font-semibold">
          Name
          <input
            name="fullName"
            required
            className="focus-ring min-h-12 rounded-sm border border-clay/16 bg-linen px-4 font-normal text-ink placeholder:text-muted"
            placeholder="Your name"
          />
        </label>
        <label className="mt-5 grid gap-2 text-sm font-semibold">
          Email
          <input
            name="email"
            type="email"
            required
            className="focus-ring min-h-12 rounded-sm border border-clay/16 bg-linen px-4 font-normal text-ink placeholder:text-muted"
            placeholder="you@example.com"
          />
        </label>
        <label className="mt-5 grid gap-2 text-sm font-semibold">
          Password
          <input
            name="password"
            type="password"
            required
            minLength={6}
            className="focus-ring min-h-12 rounded-sm border border-clay/16 bg-linen px-4 font-normal text-ink placeholder:text-muted"
            placeholder="At least 6 characters"
          />
        </label>
        <button
          type="submit"
          disabled={!isConfigured}
          className="focus-ring mt-6 min-h-12 w-full rounded-sm border border-clay bg-clay px-5 text-sm font-semibold text-white shadow-soft transition hover:border-ink hover:bg-ink disabled:cursor-not-allowed disabled:border-clay/20 disabled:bg-clay/40"
        >
          Create account
        </button>
      </form>
    </section>
  );
}
