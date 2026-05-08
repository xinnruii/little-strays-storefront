import { NextResponse } from "next/server";
import { csvCell, getOrderItems, type OrderWithItems } from "@/lib/orders";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const supabase = await createClient();

  if (!supabase) {
    return new NextResponse("Supabase is not configured.", { status: 503 });
  }

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return new NextResponse("Please sign in.", { status: 401 });
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .maybeSingle<{ is_admin: boolean | null }>();

  if (profile?.is_admin !== true) {
    return new NextResponse("Admin access needed.", { status: 403 });
  }

  const { data: orders, error } = await supabase
    .from("orders")
    .select(
      "id, customer_email, customer_name, phone, delivery_address, delivery_notes, status, subtotal_cents, delivery_cadence, created_at, order_items(product_slug, product_name, product_category, quantity, unit_price_cents, line_total_cents)"
    )
    .order("created_at", { ascending: false });

  if (error) {
    return new NextResponse(error.message, { status: 500 });
  }

  const rows: Array<Array<string | number>> = [
    [
      "order_id",
      "created_at",
      "status",
      "customer_name",
      "customer_email",
      "phone",
      "delivery_address",
      "delivery_notes",
      "product_slug",
      "product_name",
      "product_category",
      "quantity",
      "unit_price",
      "line_total",
      "order_subtotal",
      "delivery_cadence"
    ]
  ];

  for (const order of (orders ?? []) as OrderWithItems[]) {
    const items = getOrderItems(order);

    if (items.length === 0) {
      rows.push([
        order.id,
        order.created_at,
        order.status,
        order.customer_name,
        order.customer_email,
        order.phone ?? "",
        order.delivery_address,
        order.delivery_notes ?? "",
        "",
        "",
        "",
        "",
        "",
        "",
        (order.subtotal_cents / 100).toFixed(2),
        order.delivery_cadence
      ]);
      continue;
    }

    for (const item of items) {
      rows.push([
        order.id,
        order.created_at,
        order.status,
        order.customer_name,
        order.customer_email,
        order.phone ?? "",
        order.delivery_address,
        order.delivery_notes ?? "",
        item.product_slug,
        item.product_name,
        item.product_category,
        item.quantity,
        (item.unit_price_cents / 100).toFixed(2),
        (item.line_total_cents / 100).toFixed(2),
        (order.subtotal_cents / 100).toFixed(2),
        order.delivery_cadence
      ]);
    }
  }

  const csv = rows.map((row) => row.map(csvCell).join(",")).join("\n");
  const filename = `little-strays-orders-${new Date().toISOString().slice(0, 10)}.csv`;

  return new NextResponse(csv, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`
    }
  });
}
