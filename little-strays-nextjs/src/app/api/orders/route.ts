import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { products } from "@/lib/products";

type CheckoutItem = {
  slug?: unknown;
  quantity?: unknown;
};

type CheckoutPayload = {
  items?: CheckoutItem[];
  customerName?: unknown;
  phone?: unknown;
  deliveryAddress?: unknown;
  deliveryNotes?: unknown;
};

function getString(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeQuantity(value: unknown) {
  const quantity = typeof value === "number" ? value : Number(value);

  if (!Number.isFinite(quantity)) {
    return 0;
  }

  return Math.min(99, Math.max(1, Math.floor(quantity)));
}

function errorResponse(message: string, status = 400) {
  return NextResponse.json({ error: message }, { status });
}

export async function POST(request: Request) {
  const supabase = await createClient();

  if (!supabase) {
    return errorResponse("Supabase is not configured yet.", 503);
  }

  const {
    data: { user },
    error: userError
  } = await supabase.auth.getUser();

  if (userError || !user) {
    return errorResponse("Please sign in before placing a preorder.", 401);
  }

  let payload: CheckoutPayload;

  try {
    payload = await request.json();
  } catch {
    return errorResponse("Could not read checkout details.");
  }

  const customerName = getString(payload.customerName);
  const phone = getString(payload.phone);
  const deliveryAddress = getString(payload.deliveryAddress);
  const deliveryNotes = getString(payload.deliveryNotes);

  if (!customerName) {
    return errorResponse("Please add your name.");
  }

  if (!deliveryAddress) {
    return errorResponse("Please add a local delivery address.");
  }

  if (!Array.isArray(payload.items) || payload.items.length === 0) {
    return errorResponse("Your cart is empty.");
  }

  const itemSnapshots = payload.items
    .map((item) => {
      const slug = getString(item.slug);
      const product = products.find((catalogItem) => catalogItem.slug === slug);
      const quantity = normalizeQuantity(item.quantity);

      if (!product || quantity <= 0) {
        return null;
      }

      const unitPriceCents = Math.round(product.price * 100);

      return {
        product_slug: product.slug,
        product_name: product.name,
        product_category: product.category,
        product_image: product.image,
        quantity,
        unit_price_cents: unitPriceCents,
        line_total_cents: unitPriceCents * quantity
      };
    })
    .filter((item) => item !== null);

  if (itemSnapshots.length === 0) {
    return errorResponse("Your cart no longer matches available products.");
  }

  const subtotalCents = itemSnapshots.reduce(
    (total, item) => total + item.line_total_cents,
    0
  );

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      customer_email: user.email ?? "",
      customer_name: customerName,
      phone: phone || null,
      delivery_address: deliveryAddress,
      delivery_notes: deliveryNotes || null,
      subtotal_cents: subtotalCents
    })
    .select("id")
    .single<{ id: string }>();

  if (orderError || !order) {
    return errorResponse(orderError?.message ?? "Could not create preorder.", 500);
  }

  const { error: itemsError } = await supabase.from("order_items").insert(
    itemSnapshots.map((item) => ({
      order_id: order.id,
      ...item
    }))
  );

  if (itemsError) {
    await supabase.from("orders").delete().eq("id", order.id);
    return errorResponse(itemsError.message, 500);
  }

  await supabase.from("profiles").upsert({
    id: user.id,
    full_name: customerName,
    phone: phone || null,
    delivery_address: deliveryAddress,
    delivery_notes: deliveryNotes || null
  });

  return NextResponse.json({ orderId: order.id });
}
