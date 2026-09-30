import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pet Photography"
};

export default function PetPhotographyPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 lg:px-8 lg:py-20">
      <h1 className="text-center text-3xl font-semibold sm:text-4xl">Pet Photography</h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted">
        Relaxed, personality-first photography for cats and dogs. We create warm,
        natural portraits that feel like your pet—not a posed version of them.
      </p>
      <p className="mx-auto mt-5 max-w-2xl leading-7 text-muted">
        Session details and booking information are coming soon. Contact us to ask
        about availability in Los Angeles.
      </p>
      <Link
        href="/contact"
        className="focus-ring mt-8 inline-flex w-full justify-center rounded-sm bg-clay px-6 py-3 font-semibold text-white transition hover:bg-ink sm:w-auto"
      >
        Ask about photography
      </Link>
    </section>
  );
}
