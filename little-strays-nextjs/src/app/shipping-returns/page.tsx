import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "Shipping & Returns"
};

const policies = [
  {
    title: "Shipping",
    text: "Little Strays currently supports Los Angeles preorder delivery only. Orders are grouped into two local delivery runs per month, and national shipping is on the way."
  },
  {
    title: "Returns",
    text: "Unused goods may be returned within 30 days. Washed bedding, opened treats, and personalized items would require separate handling in a later commerce phase."
  },
  {
    title: "Exchanges",
    text: "For collars, beds, and walk sets, exchange copy can be expanded once real sizing and inventory systems are connected."
  },
  {
    title: "Care",
    text: "Most textile goods are designed for cool washing and line drying. Ceramic pieces are food-safe and best washed by hand."
  }
];

export default function ShippingReturnsPage() {
  return (
    <>
      <PageIntro kicker="Policy" title="Shipping and returns without the small print fog.">
        <p>
          Little Strays is currently delivering Los Angeles preorders twice per
          month. National shipping is coming soon, and return details will
          expand as wider fulfillment becomes available.
        </p>
      </PageIntro>
      <section className="mx-auto max-w-5xl px-5 pb-20 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-2">
          {policies.map((policy) => (
            <article key={policy.title} className="rounded-sm bg-paper p-6 shadow-soft">
              <h2 className="text-3xl font-semibold">
                {policy.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted">{policy.text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
