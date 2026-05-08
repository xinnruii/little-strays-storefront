export type OrderStatus = "new" | "processing" | "fulfilled" | "cancelled";

export type OrderItemSnapshot = {
  id?: number;
  product_slug: string;
  product_name: string;
  product_category: string;
  product_image: string;
  quantity: number;
  unit_price_cents: number;
  line_total_cents: number;
};

export type OrderWithItems = {
  id: string;
  user_id?: string;
  customer_email: string;
  customer_name: string;
  phone: string | null;
  delivery_address: string;
  delivery_notes: string | null;
  status: OrderStatus;
  subtotal_cents: number;
  delivery_cadence: string;
  created_at: string;
  order_items?: OrderItemSnapshot[] | OrderItemSnapshot | null;
};

export const preorderDeliveryCopy =
  "Little Strays accepts preorders and delivers locally twice per month. We will confirm your delivery run after reviewing your order.";

export function formatCents(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(cents / 100);
}

export function formatOrderDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(value));
}

export function getOrderItems(order: Pick<OrderWithItems, "order_items">) {
  if (!order.order_items) {
    return [];
  }

  return Array.isArray(order.order_items) ? order.order_items : [order.order_items];
}

export function csvCell(value: string | number | null | undefined) {
  const stringValue = value == null ? "" : String(value);
  return `"${stringValue.replace(/"/g, '""')}"`;
}
