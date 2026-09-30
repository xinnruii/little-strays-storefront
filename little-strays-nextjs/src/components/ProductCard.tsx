import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
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
    <article className="group grid overflow-hidden rounded-sm bg-paper shadow-soft">
      <Link
        href={`/products/${product.slug}`}
        className="focus-ring block rounded-sm"
      >
        <div
          className={`${
            squareImage ? "aspect-square" : "aspect-[4/5]"
          } relative overflow-hidden bg-oat`}
        >
          <Image
            src={imageSrc ?? product.image}
            alt={product.name}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-700 group-hover:scale-105"
          />
          <span className={`absolute right-3 top-3 z-10 rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] shadow-soft ${
            product.preorder
              ? "bg-oat text-clay"
              : "bg-[#e7d6a6]/95 text-[#665323]"
          }`}>
            {product.preorder ? "Preorder" : "In stock"}
          </span>
        </div>
      </Link>
      <div className={`${minimal ? "gap-3 p-4 sm:p-5" : "gap-4 p-4 sm:p-5"} grid`}>
        {minimal ? (
          <>
            <Link
              href={`/products/${product.slug}`}
              className="focus-ring rounded-sm hover:text-clay"
            >
              <h3 className="text-lg font-semibold leading-tight sm:text-xl">
                {product.name}
                {product.preorder ? (
                  <span title="Estimated wait time: about two weeks"> (Preorder)</span>
                ) : null}
              </h3>
            </Link>
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold">
                {formatPrice(product.price)}
              </p>
              <AddToCartButton product={product} />
            </div>
          </>
        ) : (
          <>
            <Link
              href={`/products/${product.slug}`}
              className="focus-ring flex items-start justify-between gap-4 rounded-sm hover:text-clay"
            >
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-clay">
                  {product.category}
                </p>
                <h3 className="mt-2 text-xl font-semibold leading-tight sm:text-2xl sm:leading-none">
                  {product.name}
                  {product.preorder ? (
                    <span title="Estimated wait time: about two weeks"> (Preorder)</span>
                  ) : null}
                </h3>
              </div>
              <ArrowUpRight
                aria-hidden="true"
                size={18}
                className="mt-1 shrink-0 text-muted transition group-hover:text-clay"
              />
            </Link>
            <p className="text-sm leading-6 text-muted">
              {product.shortDescription}
            </p>
            <div className="flex items-center justify-between gap-4">
              <p className="text-sm font-semibold">
                {formatPrice(product.price)}
              </p>
              <AddToCartButton product={product} />
            </div>
          </>
        )}
      </div>
    </article>
  );
}
