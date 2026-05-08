"use client";

import { useEffect, useState } from "react";
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
  const { addItem } = useCart();
  const [wasAdded, setWasAdded] = useState(false);

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
    <button
      type="button"
      className={`focus-ring grid h-10 w-10 shrink-0 place-items-center rounded-full border border-clay/15 bg-white text-clay shadow-soft transition hover:border-clay/35 hover:bg-linen ${className}`}
      aria-label={`${wasAdded ? "Added" : "Add"} ${product.name} to cart`}
      title={`${wasAdded ? "Added" : "Add"} ${product.name} to cart`}
      onClick={() => {
        addItem(product.slug);
        setWasAdded(true);
      }}
    >
      {wasAdded ? (
        <Check size={16} strokeWidth={2} aria-hidden="true" />
      ) : (
        <ShoppingBag size={17} strokeWidth={1.8} aria-hidden="true" />
      )}
    </button>
  );
}
