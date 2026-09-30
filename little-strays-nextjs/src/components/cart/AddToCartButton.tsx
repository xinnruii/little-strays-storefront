"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Check, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";
import type { Product } from "@/lib/products";

export function AddToCartButton({
  product,
  className = ""
}: {
  product: Product;
  className?: string;
}) {
  const { addItem, items } = useCart();
  const [wasAdded, setWasAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const requiresSize = Boolean(product.sizes?.length);
  const quantity = items
    .filter((item) => item.slug === product.slug)
    .reduce((total, item) => total + item.quantity, 0);

  useEffect(() => {
    if (!wasAdded) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setWasAdded(false);
    }, 1200);

    return () => window.clearTimeout(timeoutId);
  }, [wasAdded]);

  return (
    <>
    <span className="inline-flex items-center gap-2">
      {product.sizes?.length ? (
        <select
          value={selectedSize}
          onChange={(event) => setSelectedSize(event.target.value)}
          className="focus-ring h-10 w-10 appearance-none rounded-full border border-clay/15 bg-white p-0 text-center text-xs font-semibold text-clay shadow-soft"
          aria-label={`Select size for ${product.name}`}
          title="Select size"
        >
          <option value="">–</option>
          {product.sizes.map((size) => (
            <option key={size} value={size}>{size}</option>
          ))}
        </select>
      ) : null}
    <button
      type="button"
      disabled={requiresSize && !selectedSize}
      className={`focus-ring relative grid h-10 w-10 shrink-0 place-items-center rounded-full border border-clay/15 bg-white text-clay shadow-soft transition hover:border-clay/35 hover:bg-linen disabled:cursor-not-allowed disabled:opacity-45 ${className}`}
      aria-label={`${wasAdded ? "Added" : "Add"} ${product.name} to cart`}
      title={`${wasAdded ? "Added" : "Add"} ${product.name} to cart`}
      onClick={() => {
        addItem(product.slug, 1, selectedSize || undefined);
        setWasAdded(true);
      }}
    >
      {wasAdded ? (
        <Check size={16} strokeWidth={2} aria-hidden="true" />
      ) : (
        <ShoppingBag size={17} strokeWidth={1.8} aria-hidden="true" />
      )}
      {quantity > 0 ? (
        <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-clay px-1 text-[11px] font-semibold leading-none text-white">
          {quantity}
        </span>
      ) : null}
    </button>
    </span>
      {wasAdded ? (
        <div
          role="status"
          className="fixed bottom-5 right-5 z-[100] flex max-w-[calc(100vw-2.5rem)] items-center gap-4 rounded-sm border border-clay/15 bg-white px-4 py-3 text-sm shadow-soft"
        >
          <span className="font-semibold">Added to cart</span>
          <Link
            href="/cart"
            className="focus-ring rounded-sm font-semibold text-clay underline underline-offset-4 hover:text-ink"
          >
            View cart
          </Link>
        </div>
      ) : null}
    </>
  );
}
