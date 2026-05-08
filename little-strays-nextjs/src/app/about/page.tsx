import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About"
};

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:py-20">
        <div className="overflow-hidden rounded-sm bg-oat shadow-soft">
          <img
            src="https://images.unsplash.com/photo-1548767797-d8c844163c4c?auto=format&fit=crop&w=1200&q=80"
            alt="A small dog wrapped in a soft blanket"
            className="aspect-[4/5] h-full w-full object-cover"
          />
        </div>
        <div className="grid content-center gap-8">
          <div>
            <p className="editorial-kicker">Point of view</p>
            <h2 className="mt-3 text-5xl font-semibold leading-none">
              Useful first, beautiful always.
            </h2>
          </div>
          <div className="grid gap-6 text-base leading-8 text-muted">
            <p>
              Our mock collection begins with the things pets actually use:
              bowls, beds, blankets, walk sets, toys, and pouches. Each piece is
              selected as if it will live in the front room, not vanish into a
              closet.
            </p>
            <p>
              As the storefront grows, this page can expand into founder notes,
              sourcing standards, rescue partnerships, maker profiles, and
              product care guides.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
