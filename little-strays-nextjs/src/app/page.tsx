import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

const featuredProducts = products.filter((product) => product.featured);

export default function Home() {
  return (
    <>
      <section className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-[1720px] gap-8 px-4 py-8 sm:px-6 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-10 lg:px-6 lg:py-10 xl:px-8">
        <div className="max-w-xl lg:max-w-[640px]">
          <h1 className="text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl">
            Beautiful things for beloved little strays.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-muted">
            Little Strays gathers tactile, home-minded goods for dogs and cats:
            walk sets, nap beds, toys, bowls, and the small practical pieces
            that make everyday care feel tender.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/products">Shop the edit</ButtonLink>
            <ButtonLink href="/about" variant="light">
              Our story
            </ButtonLink>
          </div>
        </div>
        <div className="relative min-h-[460px] overflow-hidden rounded-sm bg-oat shadow-soft sm:min-h-[600px] lg:min-h-[740px]">
          <img
            src="/images/homepage-picture.jpg"
            alt="A dog and cat resting together at home"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </section>

      <section className="mx-auto max-w-[1720px] px-4 py-16 sm:px-6 lg:px-6 lg:py-20 xl:px-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-5xl font-semibold leading-none">
              Our favorites
            </h2>
          </div>
          <Link
            href="/products"
            className="focus-ring rounded-sm text-sm font-semibold text-clay hover:text-ink"
          >
            View all products
          </Link>
        </div>
        <div className="mt-9 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.slug}
              product={product}
              minimal
              squareImage
            />
          ))}
        </div>
      </section>
    </>
  );
}
