import type { Metadata } from "next";
import Link from "next/link";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Brands"
};

export default function BrandsPage() {
  const brands = Array.from(
    new Set(products.flatMap((product) => (product.brand ? [product.brand] : [])))
  ).sort((first, second) => first.localeCompare(second));

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <h1 className="text-center text-3xl font-semibold sm:text-4xl">Brands</h1>
      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {brands.map((brand) => (
          <Link
            key={brand}
            href={`/products?brand=${encodeURIComponent(brand)}`}
            className="focus-ring flex min-h-20 items-center justify-between rounded-sm bg-paper px-5 py-4 text-xl font-semibold shadow-soft transition hover:text-clay"
          >
            {brand}
            <span aria-hidden="true">→</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
