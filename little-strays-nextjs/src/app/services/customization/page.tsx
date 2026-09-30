import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Customization"
};

export default function CustomizationPage() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 lg:px-8 lg:py-20">
      <h1 className="text-center text-3xl font-semibold sm:text-4xl">Customization</h1>
      <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-muted">
        Make selected pieces feel uniquely yours with personalized details for your
        pet, your home, or a thoughtful gift.
      </p>
      <p className="mx-auto mt-5 max-w-2xl leading-7 text-muted">
        Custom options and pricing are coming soon. Tell us what you have in mind,
        and we will let you know what is possible.
      </p>
      <Link
        href="/contact"
        className="focus-ring mt-8 inline-flex w-full justify-center rounded-sm bg-clay px-6 py-3 font-semibold text-white transition hover:bg-ink sm:w-auto"
      >
        Ask about customization
      </Link>
    </section>
  );
}
