import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cart"
};

export default function CartPage() {
  return (
    <section className="mx-auto max-w-[900px] px-4 py-16 sm:px-6 lg:py-24">
      <p className="editorial-kicker">Cart</p>
      <h1 className="mt-4 text-5xl font-semibold leading-none">
        Your cart is empty.
      </h1>
      <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
        Add-to-cart actions are coming next. For now, this page gives the cart
        icon a proper destination while the shopping flow is being built.
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
