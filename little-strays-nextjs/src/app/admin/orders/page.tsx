import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  formatCents,
  formatOrderDate,
  getOrderItems,
  preorderDeliveryCopy,
  type OrderWithItems
} from "@/lib/orders";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Admin Orders"
};

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  if (!isSupabaseConfigured()) {
    return (
      <section className="mx-auto max-w-[900px] px-4 py-16 sm:px-6 lg:py-24">
        <p className="editorial-kicker">Admin</p>
        <h1 className="mt-4 text-5xl font-semibold leading-none">
          Supabase setup needed.
        </h1>
      </section>
    );
  }

  const supabase = await createClient();

  if (!supabase) {
    redirect("/login?redirectTo=/admin/orders");
  }

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect("/login?redirectTo=/admin/orders");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .maybeSingle<{ is_admin: boolean | null }>();

  if (profile?.is_admin !== true) {
    return (
      <section className="mx-auto max-w-[900px] px-4 py-16 sm:px-6 lg:py-24">
        <p className="editorial-kicker">Admin</p>
        <h1 className="mt-4 text-5xl font-semibold leading-none">
          Admin access needed.
        </h1>
        <p className="mt-6 max-w-xl text-base leading-7 text-muted">
          This page is only for Little Strays admins.
        </p>
      </section>
    );
  }

  const { data: orders, error } = await supabase
    .from("orders")
    .select(
      "id, user_id, customer_email, customer_name, phone, delivery_address, delivery_notes, status, subtotal_cents, delivery_cadence, created_at, order_items(product_slug, product_name, product_category, product_image, quantity, unit_price_cents, line_total_cents)"
    )
    .order("created_at", { ascending: false });
  const adminOrders = (orders ?? []) as OrderWithItems[];

  return (
    <section className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="editorial-kicker">Admin</p>
          <h1 className="mt-4 text-5xl font-semibold leading-none">
            Preorder dashboard
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-7 text-muted">
            {preorderDeliveryCopy} Download the CSV before each delivery run to
            process orders offline.
          </p>
        </div>
        <a
          href="/admin/orders.csv"
          className="focus-ring inline-flex min-h-12 items-center justify-center rounded-sm border border-clay bg-clay px-5 text-sm font-semibold text-white shadow-soft transition hover:border-ink hover:bg-ink"
        >
          Download CSV
        </a>
      </div>

      {error ? (
        <p className="mt-8 rounded-sm border border-clay/15 bg-linen px-4 py-3 text-sm leading-6 text-muted">
          Order tables not ready: {error.message}
        </p>
      ) : null}

      {!error && adminOrders.length === 0 ? (
        <div className="mt-8 rounded-sm bg-paper p-6 shadow-soft">
          <p className="text-base leading-7 text-muted">
            No preorders yet. New customer checkouts will appear here.
          </p>
        </div>
      ) : null}

      <div className="mt-8 overflow-hidden rounded-sm bg-paper shadow-soft">
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse text-left text-sm">
            <thead className="border-b border-clay/15 text-xs font-semibold uppercase tracking-[0.18em] text-clay">
              <tr>
                <th className="px-4 py-4">Order</th>
                <th className="px-4 py-4">Customer</th>
                <th className="px-4 py-4">Items</th>
                <th className="px-4 py-4">Delivery</th>
                <th className="px-4 py-4">Status</th>
                <th className="px-4 py-4 text-right">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-clay/10">
              {adminOrders.map((order) => {
                const items = getOrderItems(order);

                return (
                  <tr key={order.id} className="align-top">
                    <td className="px-4 py-4">
                      <p className="font-semibold">#{order.id.slice(0, 8)}</p>
                      <p className="mt-1 text-muted">
                        {formatOrderDate(order.created_at)}
                      </p>
                    </td>
                    <td className="px-4 py-4">
                      <p className="font-semibold">{order.customer_name}</p>
                      <p className="mt-1 text-muted">{order.customer_email}</p>
                      {order.phone ? (
                        <p className="mt-1 text-muted">{order.phone}</p>
                      ) : null}
                    </td>
                    <td className="px-4 py-4">
                      <div className="grid gap-2">
                        {items.map((item) => (
                          <p key={`${order.id}-${item.product_slug}`}>
                            {item.quantity} x {item.product_name}
                          </p>
                        ))}
                      </div>
                    </td>
                    <td className="max-w-xs px-4 py-4">
                      <p>{order.delivery_address}</p>
                      {order.delivery_notes ? (
                        <p className="mt-2 text-muted">{order.delivery_notes}</p>
                      ) : null}
                    </td>
                    <td className="px-4 py-4 capitalize">{order.status}</td>
                    <td className="px-4 py-4 text-right font-semibold">
                      {formatCents(order.subtotal_cents)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <Link
        href="/account"
        className="focus-ring mt-8 inline-flex rounded-sm text-sm font-semibold text-clay hover:text-ink"
      >
        Back to account
      </Link>
    </section>
  );
}
