import type { Metadata } from "next";
import { ProductCard } from "@/components/ProductCard";
import { ProductFilters } from "@/components/ProductFilters";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Products"
};

type ProductsPageProps = {
  searchParams?: Promise<{
    category?: string | string[];
    brand?: string | string[];
    availability?: string;
    pet?: string;
    sort?: string;
  }>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const categoryNames: Record<string, string> = {
    "eat-drink": "Eat + Drink", rest: "Rest", play: "Play", walk: "Walk", wear: "Wear"
  };
  const selectedCategoryKeys = Array.isArray(params?.category) ? params.category : params?.category ? [params.category] : [];
  const selectedCategories = selectedCategoryKeys.map((category) => categoryNames[category]).filter(Boolean);
  const selectedBrands = Array.isArray(params?.brand) ? params.brand : params?.brand ? [params.brand] : [];
  const categoryProducts = products.filter((product) => {
    const availability = product.preorder ? "preorder" : product.inStock === false ? "out-of-stock" : "in-stock";
    return (selectedCategories.length === 0 || selectedCategories.includes(product.category)) &&
      (selectedBrands.length === 0 || Boolean(product.brand && selectedBrands.includes(product.brand))) &&
      (!params?.availability || availability === params.availability) &&
      (!params?.pet || product.petTypes?.includes(params.pet as "Cat" | "Dog"));
  }).sort((first, second) => {
    if (params?.sort === "name-asc") return first.name.localeCompare(second.name);
    if (params?.sort === "name-desc") return second.name.localeCompare(first.name);
    if (params?.sort === "price-asc") {
      if (first.price === null) return second.price === null ? 0 : 1;
      if (second.price === null) return -1;
      return first.price - second.price;
    }
    if (params?.sort === "price-desc") {
      if (first.price === null) return second.price === null ? 0 : 1;
      if (second.price === null) return -1;
      return second.price - first.price;
    }
    return Number(Boolean(second.featured)) - Number(Boolean(first.featured));
  });
  const brands = Array.from(new Set(products.flatMap((product) => product.brand ? [product.brand] : []))).sort();
  const activeFilterCount = selectedBrands.length + selectedCategories.length + [params?.availability, params?.pet].filter(Boolean).length;
  const selectedFilters = Object.fromEntries(Object.entries(params ?? {}).filter(([, value]) => value));
  const filterOptions = [
    { name: "pet", label: "Pet", options: ["Cat", "Dog"].map((value) => ({ value, label: value })) },
    { name: "availability", label: "Availability", options: ["in-stock", "preorder", "out-of-stock"].map((value) => ({ value, label: value.replaceAll("-", " ") })) },
    { name: "category", label: "Category", multiple: true, options: Object.entries(categoryNames).map(([value, label]) => ({ value, label })) },
    { name: "brand", label: "Brand", multiple: true, options: brands.map((value) => ({ value, label: value })) }
  ];
  const pageHeading = activeFilterCount === 0
    ? "All products"
    : activeFilterCount === 1 && selectedBrands.length === 1
      ? `Products by ${selectedBrands[0]}`
      : activeFilterCount === 1 && selectedCategories.length === 1
        ? selectedCategories[0]
        : `${activeFilterCount} filters applied`;

  return (
    <section className="mx-auto max-w-[1720px] px-4 py-10 sm:px-6 lg:px-6 lg:py-20 xl:px-8">
      <div className="mb-6 flex items-end justify-between gap-4">
        <div className="w-full">
          <h1 className="text-center text-3xl font-semibold sm:text-4xl">{pageHeading}</h1>
        </div>
      </div>
      <div className="mb-8">
        <ProductFilters filters={filterOptions} selected={selectedFilters} activeCount={activeFilterCount} productCount={categoryProducts.length} />
      </div>
      {categoryProducts.length > 0 ? (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
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
