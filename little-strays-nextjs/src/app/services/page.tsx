import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services"
};

const services = [
  {
    href: "/services/pet-photography",
    title: "Pet Photography",
    description: "Thoughtful portraits that capture your pet's character, quirks, and favorite expressions."
  },
  {
    href: "/services/customization",
    title: "Customization",
    description: "Personal touches and made-for-you details for selected pieces in our collection."
  }
];

export default function ServicesPage() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <h1 className="text-center text-3xl font-semibold sm:text-4xl">Services</h1>
      <p className="mx-auto mt-5 max-w-2xl text-center text-base leading-7 text-muted">
        A little extra care for the animals who make every day better.
      </p>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {services.map((service) => (
          <Link
            key={service.href}
            href={service.href}
            className="focus-ring group rounded-sm bg-paper p-6 text-center shadow-soft transition hover:-translate-y-0.5 sm:p-8"
          >
            <h2 className="text-2xl font-semibold group-hover:text-clay">{service.title}</h2>
            <p className="mt-3 leading-7 text-muted">{service.description}</p>
            <span className="mt-6 inline-block font-semibold text-clay">Learn more →</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
