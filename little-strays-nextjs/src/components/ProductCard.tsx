import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { formatPrice, type Product } from "@/lib/products";

export function ProductCard({
  product,
  imageSrc,
  minimal = false,
  squareImage = false
}: {
  product: Product;
  imageSrc?: string;
  minimal?: boolean;
  squareImage?: boolean;
}) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="focus-ring group block overflow-hidden rounded-sm bg-paper shadow-soft"
    >
      <div
        className={`${
          squareImage ? "aspect-square" : "aspect-[4/5]"
        } overflow-hidden bg-oat`}
      >
        <img
          src={imageSrc ?? product.image}
          alt={product.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />
      </div>
      <div className={`${minimal ? "gap-2 p-4 sm:p-5" : "gap-4 p-5"} grid`}>
        {minimal ? (
          <>
            <h3 className="text-xl font-semibold leading-tight">
              {product.name}
            </h3>
            <p className="text-sm font-semibold">{formatPrice(product.price)}</p>
          </>
        ) : (
          <>
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-clay">
                  {product.category}
                </p>
                <h3 className="mt-2 text-2xl font-semibold leading-none">
                  {product.name}
                </h3>
              </div>
              <ArrowUpRight
                aria-hidden="true"
                size={18}
                className="mt-1 shrink-0 text-muted transition group-hover:text-clay"
              />
            </div>
            <p className="text-sm leading-6 text-muted">
              {product.shortDescription}
            </p>
            <p className="text-sm font-semibold">{formatPrice(product.price)}</p>
          </>
        )}
      </div>
    </Link>
  );
}
