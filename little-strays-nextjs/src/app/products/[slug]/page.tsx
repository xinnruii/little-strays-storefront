import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
import { ProductGallery } from "@/components/ProductGallery";
import { formatPrice, getProduct, products } from "@/lib/products";

type ProductDetailProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params
}: ProductDetailProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    return {
      title: "Product not found"
    };
  }

  return {
    title: product.name,
    description: product.shortDescription
  };
}

export default async function ProductDetailPage({ params }: ProductDetailProps) {
  const { slug } = await params;
  const product = getProduct(slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = products
    .filter(
      (item) =>
        item.slug !== product.slug && item.category === product.category
    )
    .slice(0, 3);

  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:gap-10 lg:px-8 lg:py-20">
        <ProductGallery
          name={product.name}
          images={product.images ?? [product.image]}
          preorder={product.preorder}
        />
        <div className="lg:sticky lg:top-28 lg:self-start">
          {product.brand ? (
            <p className="text-sm font-semibold text-muted">
              by{" "}
              <Link
                href={`/products?brand=${encodeURIComponent(product.brand)}`}
                className="focus-ring rounded-sm underline decoration-clay/35 underline-offset-4 transition hover:text-clay hover:decoration-clay"
              >
                {product.brand}
              </Link>
            </p>
          ) : null}
          <h1 className="mt-4 text-center text-2xl font-semibold leading-tight lg:mt-5">
            {product.name}
            {product.preorder ? (
              <span
                className="group/preorder relative ml-2 inline-block cursor-help text-base font-medium text-clay"
                tabIndex={0}
              >
                (Preorder)
                <span
                  role="tooltip"
                  className="pointer-events-none invisible absolute bottom-full left-1/2 z-20 mb-2 w-56 -translate-x-1/2 rounded-sm bg-ink px-3 py-2 text-center text-xs font-normal leading-5 text-white opacity-0 shadow-soft transition group-hover/preorder:visible group-hover/preorder:opacity-100 group-focus/preorder:visible group-focus/preorder:opacity-100"
                >
                  Preorder items have an estimated wait time of about two weeks.
                </span>
              </span>
            ) : null}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <p className="text-xl font-semibold">{formatPrice(product.price)}</p>
            <AddToCartButton product={product} />
          </div>
          <p className="mt-5 text-base leading-7 text-muted sm:mt-6 sm:text-lg sm:leading-8">
            {product.description}
          </p>

          <div className="mt-8 border-y border-clay/15">
            {product.color ? (
              <details className="group border-b border-clay/15 py-1">
                <summary className="focus-ring flex cursor-pointer list-none items-center justify-between rounded-sm py-4 text-xs font-semibold uppercase tracking-[0.2em] text-clay [&::-webkit-details-marker]:hidden">
                  Color
                  <span aria-hidden="true" className="text-xl font-normal transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="pb-5 text-sm text-muted">{product.color}</p>
              </details>
            ) : null}
            <details className="group border-b border-clay/15 py-1">
              <summary className="focus-ring flex cursor-pointer list-none items-center justify-between rounded-sm py-4 text-xs font-semibold uppercase tracking-[0.2em] text-clay [&::-webkit-details-marker]:hidden">
                Materials
                <span aria-hidden="true" className="text-xl font-normal transition-transform group-open:rotate-45">+</span>
              </summary>
              <ul className="grid gap-2 pb-5 text-sm leading-6 text-muted">
                {product.materials.map((material) => (
                  <li key={material} className="relative pl-4 before:absolute before:left-0 before:content-['–']">{material}</li>
                ))}
              </ul>
            </details>
            {product.details?.map((section) => (
              <details key={section.title} className="group border-b border-clay/15 py-1 last:border-b-0">
                <summary className="focus-ring flex cursor-pointer list-none items-center justify-between rounded-sm py-4 text-xs font-semibold uppercase tracking-[0.2em] text-clay [&::-webkit-details-marker]:hidden">
                  {section.title}
                  <span aria-hidden="true" className="text-xl font-normal transition-transform group-open:rotate-45">+</span>
                </summary>
                <ul className="grid gap-2 pb-5 text-sm leading-6 text-muted">
                  {section.items.map((item) => (
                    <li key={item} className="relative pl-4 before:absolute before:left-0 before:content-['–']">
                      {item}
                    </li>
                  ))}
                </ul>
              </details>
            ))}
          </div>

        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
        <h2 className="text-3xl font-semibold sm:text-4xl">Also in the edit</h2>
        <p className="mt-2 text-sm text-muted">More from {product.category}</p>
        {relatedProducts.length > 0 ? (
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {relatedProducts.map((item) => (
            <Link
              key={item.slug}
              href={`/products/${item.slug}`}
              className="focus-ring grid grid-cols-[76px_1fr] gap-3 rounded-sm bg-paper p-3 shadow-soft sm:grid-cols-[84px_1fr] sm:gap-4"
            >
              <span className="relative h-20 w-[76px] overflow-hidden rounded-sm sm:h-24 sm:w-20">
                <Image src={item.image} alt={item.name} fill sizes="84px" className="object-cover" />
              </span>
              <span className="self-center">
                <span className="block text-lg font-semibold leading-tight sm:text-xl">
                  {item.name}
                </span>
                <span className="mt-1 block text-sm text-muted">
                  {formatPrice(item.price)}
                </span>
              </span>
            </Link>
          ))}
        </div>
        ) : (
          <p className="mt-6 text-sm leading-6 text-muted">
            More {product.category.toLowerCase()} products are coming soon.
          </p>
        )}
      </section>
    </>
  );
}
