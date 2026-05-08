"use client";

import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import { formatPrice, products } from "@/lib/products";

export function CartPageClient() {
  const { clearCart, items, removeItem, updateQuantity } = useCart();
  const cartLines = items
    .map((item) => {
      const product = products.find((catalogItem) => catalogItem.slug === item.slug);

      if (!product) {
        return null;
      }

      return {
        ...item,
        product,
        lineTotal: product.price * item.quantity
      };
    })
    .filter((item) => item !== null);
  const subtotal = cartLines.reduce((total, item) => total + item.lineTotal, 0);

  if (cartLines.length === 0) {
    return (
      <section className="mx-auto max-w-[900px] px-4 py-16 sm:px-6 lg:py-24">
        <p className="editorial-kicker">Cart</p>
        <h1 className="mt-4 text-5xl font-semibold leading-none">
          Your cart is empty.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
          Add a few favorites, then come back here to review them. Checkout is
          still coming later.
        </p>
        <Link
          href="/products"
          className="focus-ring mt-8 inline-flex min-h-12 items-center rounded-sm border border-clay bg-clay px-5 text-sm font-semibold text-white shadow-soft transition hover:border-ink hover:bg-ink"
        >
          Browse products
        </Link>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-[1200px] px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="editorial-kicker">Cart</p>
          <h1 className="mt-4 text-5xl font-semibold leading-none">
            Your cart
          </h1>
        </div>
        <button
          type="button"
          className="focus-ring self-start rounded-sm text-sm font-semibold text-clay hover:text-ink sm:self-auto"
          onClick={clearCart}
        >
          Clear cart
        </button>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_360px]">
        <div className="grid gap-4">
          {cartLines.map(({ product, quantity, lineTotal }) => (
            <article
              key={product.slug}
              className="grid gap-4 rounded-sm bg-paper p-4 shadow-soft sm:grid-cols-[128px_1fr_auto] sm:items-center"
            >
              <Link
                href={`/products/${product.slug}`}
                className="focus-ring block overflow-hidden rounded-sm bg-oat"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="aspect-square h-full w-full object-cover"
                />
              </Link>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-clay">
                  {product.category}
                </p>
                <Link
                  href={`/products/${product.slug}`}
                  className="focus-ring mt-2 inline-block rounded-sm text-2xl font-semibold leading-tight hover:text-clay"
                >
                  {product.name}
                </Link>
                <p className="mt-2 text-sm font-semibold">
                  {formatPrice(product.price)}
                </p>
              </div>
              <div className="flex items-center justify-between gap-4 sm:grid sm:justify-items-end">
                <div className="flex items-center rounded-sm border border-clay/15 bg-white">
                  <button
                    type="button"
                    className="focus-ring grid h-10 w-10 place-items-center text-clay hover:bg-linen"
                    aria-label={`Decrease ${product.name} quantity`}
                    onClick={() => updateQuantity(product.slug, quantity - 1)}
                  >
                    <Minus size={15} />
                  </button>
                  <span className="grid h-10 min-w-10 place-items-center px-2 text-sm font-semibold">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    className="focus-ring grid h-10 w-10 place-items-center text-clay hover:bg-linen"
                    aria-label={`Increase ${product.name} quantity`}
                    onClick={() => updateQuantity(product.slug, quantity + 1)}
                  >
                    <Plus size={15} />
                  </button>
                </div>
                <div className="flex items-center gap-3">
                  <p className="text-sm font-semibold">
                    {formatPrice(lineTotal)}
                  </p>
                  <button
                    type="button"
                    className="focus-ring grid h-9 w-9 place-items-center rounded-full border border-clay/15 text-clay hover:bg-linen"
                    aria-label={`Remove ${product.name}`}
                    onClick={() => removeItem(product.slug)}
                  >
                    <X size={15} />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="h-fit rounded-sm bg-paper p-5 shadow-soft">
          <h2 className="text-2xl font-semibold">Order note</h2>
          <div className="mt-5 flex items-center justify-between border-y border-clay/15 py-4 text-sm">
            <span className="text-muted">Subtotal</span>
            <span className="font-semibold">{formatPrice(subtotal)}</span>
          </div>
          <p className="mt-5 text-sm leading-6 text-muted">
            Checkout is not enabled yet. This cart is saved in this browser so
            you can keep shaping the shopping flow before adding payments.
          </p>
          <Link
            href="/products"
            className="focus-ring mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-sm border border-clay/15 bg-white px-4 text-sm font-semibold text-clay transition hover:border-clay/35 hover:bg-linen"
          >
            Keep shopping
          </Link>
        </aside>
      </div>
    </section>
  );
}
