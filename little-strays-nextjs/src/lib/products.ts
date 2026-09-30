import { mockProducts } from "@/content/mock-products";

export type ProductCategory = "Walk" | "Rest" | "Play" | "Wear" | "Care" | "Home" | "Eat + Drink";

export type ProductDetailSection = {
  title: string;
  items: string[];
};

export type Product = {
  slug: string;
  name: string;
  brand?: string;
  category: ProductCategory;
  price: number | null;
  shortDescription: string;
  description: string;
  materials: string[];
  color?: string;
  image: string;
  images?: string[];
  details?: ProductDetailSection[];
  preorder?: boolean;
  inStock?: boolean;
  sizes?: string[];
  petTypes?: Array<"Cat" | "Dog">;
  featured?: boolean;
};

export const products = mockProducts;

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function formatPrice(price: number | null) {
  if (price === null) return "Price coming soon";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(price);
}
