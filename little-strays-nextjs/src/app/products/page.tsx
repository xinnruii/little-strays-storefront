import type { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { PageIntro } from "@/components/PageIntro";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products"
};

export default function ProductsPage() {
  const categories = Array.from(new Set(products.map((product) => product.category)));

  return (
    <>
      <PageIntro kicker="Shop" title="A considered edit for cats, dogs, and home.">
        <p>
          Browse the first Little Strays collection: tactile essentials for
          care, rest, walking, and play. Product data is mocked for now, with
          checkout and payments intentionally saved for a later phase.
        </p>
      </PageIntro>
      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8">
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-clay/15 bg-paper px-4 py-2 text-sm text-muted"
            >
              {category}
            </span>
          ))}
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
