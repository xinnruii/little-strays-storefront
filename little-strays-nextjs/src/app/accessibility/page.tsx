import type { Metadata } from "next";
import Link from "next/link";
import { PageIntro } from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "Accessibility"
};

const commitments = [
  "Keeping shopping, cart, checkout, account, and admin order pages usable by keyboard.",
  "Writing clear labels, headings, link text, and button names.",
  "Using readable color contrast and visible focus states.",
  "Providing text alternatives for meaningful images.",
  "Reviewing new checkout and order features for basic WCAG AA issues before launch."
];

export default function AccessibilityPage() {
  return (
    <>
      <PageIntro kicker="Accessibility" title="Access matters here.">
        <p>
          Little Strays is working to make this site usable for customers with
          different vision, mobility, hearing, and cognitive needs.
        </p>
      </PageIntro>

      <section className="mx-auto max-w-4xl px-4 pb-16 sm:px-6 lg:px-8 lg:pb-20">
        <div className="rounded-sm bg-paper p-4 shadow-soft sm:p-8">
          <h2 className="text-2xl font-semibold sm:text-3xl">Our basic standard</h2>
          <p className="mt-4 text-base leading-7 text-muted">
            We aim to follow WCAG 2.1 Level AA guidance where practical for a
            small local business website, especially for product browsing,
            checkout, account access, and order management.
          </p>

          <ul className="mt-6 grid gap-3 text-sm leading-6 text-muted">
            {commitments.map((commitment) => (
              <li key={commitment}>{commitment}</li>
            ))}
          </ul>

          <h2 className="mt-10 text-2xl font-semibold sm:text-3xl">Need help?</h2>
          <p className="mt-4 text-base leading-7 text-muted">
            If something on this site is difficult to use, please contact us and
            include the page, what you were trying to do, and the assistive
            technology or browser you were using if relevant.
          </p>
          <Link
            href="/contact"
            className="focus-ring mt-6 inline-flex min-h-12 w-full items-center justify-center rounded-sm border border-clay bg-clay px-5 text-sm font-semibold text-white shadow-soft transition hover:border-ink hover:bg-ink sm:w-auto"
          >
            Contact Little Strays
          </Link>
        </div>
      </section>
    </>
  );
}
