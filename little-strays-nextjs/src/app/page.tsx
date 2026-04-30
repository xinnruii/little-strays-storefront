import Link from "next/link";
import { Leaf, PackageCheck, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import { ProductCard } from "@/components/ProductCard";
import { products } from "@/lib/products";

const featuredProducts = products.filter((product) => product.featured);

const principles = [
  {
    icon: Leaf,
    title: "Soft materials",
    text: "Cotton, linen, stoneware, and recycled fills chosen for daily use."
  },
  {
    icon: Sparkles,
    title: "Small pleasures",
    text: "Objects that feel good in the hand and easy in the room."
  },
  {
    icon: PackageCheck,
    title: "Considered shipping",
    text: "Plastic-light packing and practical delivery windows."
  }
];

export default function Home() {
  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
        <div className="max-w-2xl">
          <p className="editorial-kicker">Boutique pet goods</p>
          <h1 className="mt-5 font-serif text-6xl leading-[0.9] sm:text-7xl lg:text-8xl">
            Beautiful things for beloved little strays.
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-8 text-ink/66">
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
        <div className="relative min-h-[520px] overflow-hidden rounded-sm bg-oat shadow-soft">
          <img
            src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1400&q=80"
            alt="A dog and cat resting together at home"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/78 to-transparent p-6 pt-28 text-paper sm:p-8">
            <p className="max-w-sm font-serif text-3xl leading-tight">
              A curated first collection for walks, naps, rituals, and play.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-ink py-12 text-paper">
        <div className="mx-auto grid max-w-7xl gap-6 px-5 sm:px-8 md:grid-cols-3">
          {principles.map((item) => (
            <div key={item.title} className="flex gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-paper/10">
                <item.icon size={19} strokeWidth={1.8} />
              </span>
              <div>
                <h2 className="font-serif text-2xl">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-paper/68">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
        <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="editorial-kicker">First arrivals</p>
            <h2 className="mt-3 font-serif text-5xl leading-none">
              The house favorites
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
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-linen py-16 lg:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
          <div>
            <p className="editorial-kicker">Journal note</p>
            <h2 className="mt-3 font-serif text-5xl leading-none">
              Goods for the room you already love.
            </h2>
          </div>
          <p className="text-lg leading-8 text-ink/68">
            We favor honest textures, muted color, and pieces that can stay out
            in the open. A pet shop can be useful without feeling loud; it can
            live beside your favorite chair, your morning shoes, and the sunny
            window ledge everyone claims by noon.
          </p>
        </div>
      </section>
    </>
  );
}
