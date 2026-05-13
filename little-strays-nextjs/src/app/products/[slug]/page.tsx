import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ButtonLink } from "@/components/ButtonLink";
import { AddToCartButton } from "@/components/cart/AddToCartButton";
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
    .filter((item) => item.slug !== product.slug)
    .slice(0, 3);

  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_0.9fr] lg:gap-10 lg:px-8 lg:py-20">
        <div className="overflow-hidden rounded-sm bg-oat shadow-soft">
          <img
            src={product.image}
            alt={product.name}
            className="aspect-[4/5] h-full w-full object-cover"
          />
        </div>
        <div className="lg:sticky lg:top-28 lg:self-start">
          <p className="editorial-kicker">{product.category}</p>
          <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl lg:mt-5 lg:text-7xl lg:leading-[0.9]">
            {product.name}
          </h1>
          <div className="mt-5 flex flex-wrap items-center gap-4">
            <p className="text-xl font-semibold">{formatPrice(product.price)}</p>
            <AddToCartButton product={product} />
          </div>
          <p className="mt-5 text-base leading-7 text-muted sm:mt-6 sm:text-lg sm:leading-8">
            {product.description}
          </p>

          <div className="mt-8 grid gap-5 border-y border-clay/15 py-7">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-clay">
                Color
              </p>
              <p className="mt-2 text-sm">{product.color}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-clay">
                Materials
              </p>
              <ul className="mt-2 grid gap-2 text-sm text-muted">
                {product.materials.map((material) => (
                  <li key={material}>{material}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 rounded-sm border border-clay/10 bg-paper p-5 shadow-soft">
            <p className="text-sm leading-6 text-muted">
              Little Strays works by preorder. Added items stay in your browser
              until checkout, then we review and schedule one of two monthly
              local delivery runs.
            </p>
          </div>
          <div className="mt-7">
            <ButtonLink href="/products">Back to products</ButtonLink>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
        <h2 className="text-3xl font-semibold sm:text-4xl">Also in the edit</h2>
        <div className="mt-6 grid gap-4 sm:mt-7 sm:grid-cols-3">
          {relatedProducts.map((item) => (
            <Link
              key={item.slug}
              href={`/products/${item.slug}`}
              className="focus-ring grid grid-cols-[76px_1fr] gap-3 rounded-sm bg-paper p-3 shadow-soft sm:grid-cols-[84px_1fr] sm:gap-4"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-20 w-[76px] rounded-sm object-cover sm:h-24 sm:w-20"
              />
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
      </section>
    </>
  );
}
