import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatPrice, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="focus-ring group block overflow-hidden rounded-sm bg-paper shadow-soft"
    >
      <div className="aspect-[4/5] overflow-hidden bg-oat">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
      </div>
      <div className="grid gap-4 p-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-clay">
              {product.category}
            </p>
            <h3 className="mt-2 font-serif text-2xl leading-none">
              {product.name}
            </h3>
          </div>
          <ArrowUpRight
            aria-hidden="true"
            size={18}
            className="mt-1 shrink-0 text-ink/40 transition group-hover:text-clay"
          />
        </div>
        <p className="text-sm leading-6 text-ink/62">{product.shortDescription}</p>
        <p className="text-sm font-semibold">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
