"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice, products } from "@/lib/products";
import { formatCents, preorderDeliveryCopy } from "@/lib/orders";

type CheckoutPageClientProps = {
  email: string;
  profile: {
    full_name: string;
    phone: string;
    delivery_address: string;
    delivery_notes: string;
  };
};

export function CheckoutPageClient({ email, profile }: CheckoutPageClientProps) {
  const router = useRouter();
  const { clearCart, items } = useCart();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cartLines = useMemo(
    () =>
      items
        .map((item) => {
          const product = products.find(
            (catalogItem) => catalogItem.slug === item.slug
          );

          if (!product) {
            return null;
          }

          return {
            ...item,
            product,
            lineTotal: product.price * item.quantity
          };
        })
        .filter((item) => item !== null),
    [items]
  );

  const subtotal = cartLines.reduce((total, item) => total + item.lineTotal, 0);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData(event.currentTarget);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          customerName: formData.get("customerName"),
          phone: formData.get("phone"),
          deliveryAddress: formData.get("deliveryAddress"),
          deliveryNotes: formData.get("deliveryNotes"),
          items: cartLines.map((line) => ({
            slug: line.product.slug,
            quantity: line.quantity
          }))
        })
      });

      const result = (await response.json()) as { error?: string; orderId?: string };

      if (!response.ok) {
        setError(result.error ?? "Could not place preorder.");
        setIsSubmitting(false);
        return;
      }

      clearCart();
      router.push(
        "/account?message=Preorder%20received.%20We%20will%20confirm%20your%20delivery%20run%20by%20email."
      );
    } catch {
      setError("Could not place preorder. Please try again.");
      setIsSubmitting(false);
    }
  }

  if (cartLines.length === 0) {
    return (
      <section className="mx-auto max-w-[900px] px-4 py-12 sm:px-6 lg:py-24">
        <p className="editorial-kicker">Checkout</p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl sm:leading-none">
          Your cart is empty.
        </h1>
        <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:mt-6 sm:text-lg sm:leading-8">
          Add a few favorites before placing a preorder.
        </p>
        <Link
          href="/products"
          className="focus-ring mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-sm border border-clay bg-clay px-5 text-sm font-semibold text-white shadow-soft transition hover:border-ink hover:bg-ink sm:w-auto"
        >
          Browse products
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[1180px] px-4 py-12 sm:px-6 lg:px-8 lg:py-24">
      <div className="max-w-3xl">
        <p className="editorial-kicker">Preorder checkout</p>
        <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl sm:leading-none">
          Confirm your local delivery details.
        </h1>
        <p className="mt-6 text-base leading-7 text-muted">
          {preorderDeliveryCopy} No payment is collected here; this creates an
          order for Little Strays to review and process.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mt-8 grid gap-6 lg:mt-10 lg:grid-cols-[1fr_360px] lg:gap-8"
      >
        <div className="rounded-sm bg-paper p-4 shadow-soft sm:p-8">
          {error ? (
            <p className="mb-5 rounded-sm border border-clay/15 bg-linen px-4 py-3 text-sm leading-6 text-muted">
              {error}
            </p>
          ) : null}

          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold">
              Name
              <input
                name="customerName"
                required
                defaultValue={profile.full_name}
                className="focus-ring min-h-12 rounded-sm border border-clay/16 bg-linen px-4 font-normal text-ink placeholder:text-muted"
                placeholder="Your name"
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              Email
              <input
                value={email}
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
              defaultValue={profile.phone}
              className="focus-ring min-h-12 rounded-sm border border-clay/16 bg-linen px-4 font-normal text-ink placeholder:text-muted"
              placeholder="Best local delivery number"
            />
          </label>

          <label className="mt-5 grid gap-2 text-sm font-semibold">
            Local delivery address
            <textarea
              name="deliveryAddress"
              required
              defaultValue={profile.delivery_address}
              className="focus-ring min-h-28 rounded-sm border border-clay/16 bg-linen px-4 py-3 font-normal text-ink placeholder:text-muted"
              placeholder="Street address, unit, city, and ZIP"
            />
          </label>

          <label className="mt-5 grid gap-2 text-sm font-semibold">
            Delivery notes
            <textarea
              name="deliveryNotes"
              defaultValue={profile.delivery_notes}
              className="focus-ring min-h-32 rounded-sm border border-clay/16 bg-linen px-4 py-3 font-normal text-ink placeholder:text-muted"
              placeholder="Gate code, preferred drop-off spot, pet notes, or timing details."
            />
          </label>
        </div>

        <aside className="h-fit rounded-sm bg-paper p-4 shadow-soft sm:p-5 lg:sticky lg:top-28">
          <h2 className="text-2xl font-semibold">Preorder summary</h2>
          <div className="mt-5 grid gap-4 border-y border-clay/15 py-4">
            {cartLines.map(({ product, quantity, lineTotal }) => (
              <div
                key={product.slug}
                className="grid grid-cols-[1fr_auto] gap-3 text-sm"
              >
                <div>
                  <p className="font-semibold">{product.name}</p>
                  <p className="mt-1 text-muted">
                    {quantity} x {formatPrice(product.price)}
                  </p>
                </div>
                <p className="font-semibold">{formatPrice(lineTotal)}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-muted">Subtotal</span>
            <span className="font-semibold">{formatCents(subtotal * 100)}</span>
          </div>
          <p className="mt-5 text-sm leading-6 text-muted">
            Delivery is scheduled in two monthly local runs. We will follow up
            with your delivery window after the preorder is reviewed.
          </p>
          <button
            type="submit"
            disabled={isSubmitting}
            className="focus-ring mt-6 min-h-12 w-full rounded-sm border border-clay bg-clay px-5 text-sm font-semibold text-white shadow-soft transition hover:border-ink hover:bg-ink disabled:cursor-not-allowed disabled:border-clay/20 disabled:bg-clay/40"
          >
            {isSubmitting ? "Placing preorder..." : "Place preorder"}
          </button>
          <Link
            href="/cart"
            className="focus-ring mt-3 inline-flex min-h-11 w-full items-center justify-center rounded-sm border border-clay/15 bg-white px-4 text-sm font-semibold text-clay transition hover:border-clay/35 hover:bg-linen"
          >
            Review cart
          </Link>
        </aside>
      </form>
    </section>
  );
}
