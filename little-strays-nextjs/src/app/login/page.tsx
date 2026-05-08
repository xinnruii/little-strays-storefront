import type { Metadata } from "next";
import Link from "next/link";
import { signIn } from "@/app/auth/actions";
import { isSupabaseConfigured } from "@/lib/supabase/env";

export const metadata: Metadata = {
  title: "Log in"
};

type LoginPageProps = {
  searchParams?: Promise<{
    message?: string;
    redirectTo?: string;
  }>;
};

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams;
  const isConfigured = isSupabaseConfigured();
  const redirectTo =
    params?.redirectTo &&
    params.redirectTo.startsWith("/") &&
    !params.redirectTo.startsWith("//")
      ? params.redirectTo
      : "/account";

  return (
    <section className="mx-auto grid max-w-[1100px] gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-8 lg:py-24">
      <div>
        <p className="editorial-kicker">Account</p>
        <h1 className="mt-4 text-5xl font-semibold leading-none">Log in</h1>
        <p className="mt-6 max-w-md text-base leading-7 text-muted">
          Sign in to manage your Little Strays profile, delivery notes, and pet
          details.
        </p>
        <p className="mt-6 text-sm leading-6 text-muted">
          New here?{" "}
          <Link href="/signup" className="font-semibold text-clay hover:text-ink">
            Create an account
          </Link>
        </p>
      </div>

      <form action={signIn} className="rounded-sm bg-paper p-5 shadow-soft sm:p-8">
        {params?.message ? (
          <p className="mb-5 rounded-sm border border-clay/15 bg-linen px-4 py-3 text-sm leading-6 text-muted">
            {params.message}
          </p>
        ) : null}
        {!isConfigured ? (
          <p className="mb-5 rounded-sm border border-clay/15 bg-linen px-4 py-3 text-sm leading-6 text-muted">
            Add Supabase environment variables before logging in.
          </p>
        ) : null}
        <input type="hidden" name="redirectTo" value={redirectTo} />
        <label className="grid gap-2 text-sm font-semibold">
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
            placeholder="Your password"
          />
        </label>
        <button
          type="submit"
          disabled={!isConfigured}
          className="focus-ring mt-6 min-h-12 w-full rounded-sm border border-clay bg-clay px-5 text-sm font-semibold text-white shadow-soft transition hover:border-ink hover:bg-ink disabled:cursor-not-allowed disabled:border-clay/20 disabled:bg-clay/40"
        >
          Log in
        </button>
      </form>
    </section>
  );
}
