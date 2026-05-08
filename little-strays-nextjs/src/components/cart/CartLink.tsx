"use client";

import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart/CartProvider";

export function CartLink() {
  const { itemCount } = useCart();

  return (
    <Link
      href="/cart"
      className="focus-ring relative grid h-10 w-10 place-items-center justify-self-end rounded-full border border-clay/15 text-clay transition hover:border-clay/35 hover:bg-linen"
      aria-label={`Shopping cart${itemCount > 0 ? `, ${itemCount} item${itemCount === 1 ? "" : "s"}` : ""}`}
    >
      <ShoppingBag size={18} strokeWidth={1.8} />
      {itemCount > 0 ? (
        <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-clay px-1 text-[11px] font-semibold leading-none text-white">
          {itemCount}
        </span>
      ) : null}
    </Link>
  );
}
