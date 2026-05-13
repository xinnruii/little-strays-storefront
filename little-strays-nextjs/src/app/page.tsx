import Link from "next/link";
import { ButtonLink } from "@/components/ButtonLink";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

const featuredProducts = products.filter((product) => product.featured);

export default function Home() {
  return (
    <>
      <section className="mx-auto grid max-w-[1720px] gap-8 px-4 py-10 sm:px-6 lg:min-h-[calc(100vh-8rem)] lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:gap-10 lg:px-6 lg:py-10 xl:px-8">
        <div className="max-w-xl lg:max-w-[640px]">
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
            Beautiful things for beloved little strays.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-7 text-muted sm:mt-7 sm:text-lg sm:leading-8">
            Little Strays gathers tactile, home-minded goods for dogs and cats:
            walk sets, nap beds, toys, bowls, and the small practical pieces
            that make everyday care feel tender.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href="/products">Shop the edit</ButtonLink>
            <ButtonLink href="/about" variant="light">
              Our story
            </ButtonLink>
          </div>
        </div>
        <div className="relative min-h-[320px] overflow-hidden rounded-sm bg-oat shadow-soft sm:min-h-[460px] lg:min-h-[740px]">
          <img
            src="/images/homepage-picture.jpg"
            alt="A dog and cat resting together at home"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </section>

      <section className="mx-auto max-w-[1720px] px-4 py-12 sm:px-6 lg:px-6 lg:py-20 xl:px-8">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-4xl font-semibold leading-tight sm:text-5xl sm:leading-none">
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
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:mt-9 lg:grid-cols-3 lg:gap-6">
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
