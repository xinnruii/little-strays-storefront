import type { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products"
};

const categoryProductMap = {
  "eat-drink": products.slice(3, 5),
  rest: [products[2], products[5]],
  play: products.filter((product) => product.category === "Play"),
  walk: products.filter((product) => product.category === "Walk"),
  wear: products.filter((product) => product.category === "Wear")
};

type ProductsPageProps = {
  searchParams?: Promise<{
    category?: string;
  }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const category = params?.category;
  const categoryProducts =
    category && category in categoryProductMap
      ? categoryProductMap[category as keyof typeof categoryProductMap]
      : products;

  return (
    <section className="mx-auto max-w-[1720px] px-4 py-16 sm:px-6 lg:px-6 lg:py-20 xl:px-8">
      {categoryProducts.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categoryProducts.map((product) => (
            <ProductCard
              key={product.slug}
              product={product}
              minimal
              squareImage
            />
          ))}
        </div>
      ) : (
        <p className="text-base leading-8 text-muted">
          This category is coming soon.
        </p>
      )}
    </section>
  );
}
