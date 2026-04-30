import { mockProducts } from "@/content/mock-products";

export type Product = {
  slug: string;
  name: string;
  category: "Walk" | "Rest" | "Play" | "Care" | "Home";
  price: number;
  shortDescription: string;
  description: string;
  materials: string[];
  color: string;
  image: string;
  featured?: boolean;
};

export const products = mockProducts;

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(price);
}
