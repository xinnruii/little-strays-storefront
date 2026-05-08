import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { signOut, updateProfile } from "@/app/auth/actions";
import {
  formatCents,
  formatOrderDate,
  getOrderItems,
  type OrderWithItems
} from "@/lib/orders";
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
    .select("full_name, phone, pet_names, delivery_address, delivery_notes, is_admin")
    .eq("id", user.id)
    .maybeSingle<
      Pick<
        Profile,
        | "full_name"
        | "phone"
        | "pet_names"
        | "delivery_address"
        | "delivery_notes"
        | "is_admin"
      >
    >();
  const profileValues = {
    ...blankProfile,
    full_name: profile?.full_name ?? "",
    phone: profile?.phone ?? "",
    pet_names: profile?.pet_names ?? "",
    delivery_address: profile?.delivery_address ?? "",
    delivery_notes: profile?.delivery_notes ?? ""
  };
  const isAdmin = profile?.is_admin === true;
  const { data: orders, error: ordersError } = await supabase
    .from("orders")
    .select(
      "id, customer_email, customer_name, phone, delivery_address, delivery_notes, status, subtotal_cents, delivery_cadence, created_at, order_items(product_slug, product_name, product_category, product_image, quantity, unit_price_cents, line_total_cents)"
    )
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(8);
  const orderHistory = (orders ?? []) as OrderWithItems[];

  return (
    <section className="mx-auto max-w-[1180px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="editorial-kicker">Account</p>
          <h1 className="mt-4 text-5xl font-semibold leading-none">
            Your profile
          </h1>
          <p className="mt-6 max-w-md text-base leading-7 text-muted">
            Keep your local delivery details, pet notes, and preorder history in
            one place. Little Strays delivers twice per month.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            {isAdmin ? (
              <Link
                href="/admin/orders"
                className="focus-ring rounded-sm text-sm font-semibold text-clay hover:text-ink"
              >
                Admin orders
              </Link>
            ) : null}
            <form action={signOut}>
              <button
                type="submit"
                className="focus-ring rounded-sm text-sm font-semibold text-clay hover:text-ink"
              >
                Log out
              </button>
            </form>
          </div>
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
            Delivery address
            <textarea
              name="deliveryAddress"
              defaultValue={profileValues.delivery_address}
              className="focus-ring min-h-28 rounded-sm border border-clay/16 bg-linen px-4 py-3 font-normal text-ink placeholder:text-muted"
              placeholder="Street address, unit, city, and ZIP"
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
      </div>

      <div className="mt-14">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="editorial-kicker">Order history</p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight">
              Your preorders
            </h2>
          </div>
          <Link
            href="/products"
            className="focus-ring self-start rounded-sm text-sm font-semibold text-clay hover:text-ink sm:self-auto"
          >
            Shop again
          </Link>
        </div>

        {ordersError ? (
          <p className="mt-6 rounded-sm border border-clay/15 bg-linen px-4 py-3 text-sm leading-6 text-muted">
            Order tables not ready: {ordersError.message}
          </p>
        ) : null}

        {!ordersError && orderHistory.length === 0 ? (
          <div className="mt-6 rounded-sm bg-paper p-6 shadow-soft">
            <p className="text-base leading-7 text-muted">
              No preorders yet. When you checkout, your order will appear here
              for easy reference.
            </p>
          </div>
        ) : null}

        <div className="mt-6 grid gap-4">
          {orderHistory.map((order) => (
            <article key={order.id} className="rounded-sm bg-paper p-5 shadow-soft">
              <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-clay">
                    {formatOrderDate(order.created_at)}
                  </p>
                  <h3 className="mt-2 text-2xl font-semibold">
                    Preorder #{order.id.slice(0, 8)}
                  </h3>
                </div>
                <div className="text-sm sm:text-right">
                  <p className="font-semibold capitalize">{order.status}</p>
                  <p className="mt-1 text-muted">{formatCents(order.subtotal_cents)}</p>
                </div>
              </div>
              <div className="mt-5 grid gap-3 border-t border-clay/15 pt-4">
                {getOrderItems(order).map((item) => (
                  <div
                    key={`${order.id}-${item.product_slug}`}
                    className="flex items-center justify-between gap-4 text-sm"
                  >
                    <span>
                      {item.quantity} x {item.product_name}
                    </span>
                    <span className="font-semibold">
                      {formatCents(item.line_total_cents)}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-sm leading-6 text-muted">
                Local delivery address: {order.delivery_address}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
