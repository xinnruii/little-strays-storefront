import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "Shipping & Returns"
};

const policies = [
  {
    title: "Shipping",
    text: "Orders currently ship in 2 to 4 business days in reusable or curbside-recyclable packaging. Delivery windows shown here are sample copy for the initial storefront."
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
          These policies are starter content for the Little Strays storefront.
          They keep the page structure ready while fulfillment and inventory
          details are finalized.
        </p>
      </PageIntro>
      <section className="mx-auto max-w-5xl px-5 pb-20 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-2">
          {policies.map((policy) => (
            <article key={policy.title} className="rounded-sm bg-paper p-6 shadow-soft">
              <h2 className="font-serif text-3xl">{policy.title}</h2>
              <p className="mt-4 text-sm leading-7 text-ink/66">{policy.text}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
