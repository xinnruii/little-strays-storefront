import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About"
};

export default function AboutPage() {
  return (
    <>
      <section className="grid gap-8 pb-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-12 lg:pb-20">
        <div className="bg-oat">
          <img
            src="/images/About_Page_2.jpeg"
            alt="A small dog wrapped in a soft blanket"
            className="block aspect-square w-full object-cover"
          />
        </div>
        <div className="mx-auto grid w-full content-center gap-6 px-2 py-10 sm:px-6 lg:-translate-y-6 lg:max-w-3xl lg:gap-8 lg:px-10 lg:py-12 xl:px-12">
          <div>
            <h1 className="text-center text-[clamp(0.95rem,4vw,1.5rem)] font-semibold leading-tight tracking-tight">
              <span className="block whitespace-nowrap">
                Animal-owned first, women-owned second.
              </span>
              <span className="block whitespace-nowrap">
                We simply handle operations on their behalf.
              </span>
            </h1>
          </div>
          <div className="grid gap-5 text-sm leading-6 text-muted sm:gap-6 sm:text-base sm:leading-8">
            <p>
              Little Strays began with four rescues — Mimi, Lucky, Joe, and Pika
              — who slowly changed the way we moved through everyday life. We
              started noticing the small things: softer fabrics, gentler
              ingredients, pieces that felt safe enough to live alongside the
              animals we love most.
            </p>
            <p>
              Over time, choosing carefully became second nature.
            </p>
            <p>
              This shop is a collection of things we genuinely use, trust, and
              return to again and again. Many have already been tested by our
              in-house panel — sat on, carried around, stared at suspiciously,
              or claimed as personal property.
            </p>
            <p>
              The ones they keep coming back to end up here.
            </p>
            <p>
              Here’s to the small things that make a life!
            </p>
            <p>
              Bonne trouvaille.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
