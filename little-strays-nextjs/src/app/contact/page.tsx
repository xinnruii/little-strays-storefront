import type { Metadata } from "next";
import { Mail, MessageCircle } from "lucide-react";
import { PageIntro } from "@/components/PageIntro";

export const metadata: Metadata = {
  title: "Contact"
};

const contactItems = [
  {
    icon: Mail,
    label: "Email",
    value: "hello@littlestrays.test"
  },
  {
    icon: MessageCircle,
    label: "Response time",
    value: "Monday through Friday, within one business day"
  }
];

export default function ContactPage() {
  return (
    <>
      <PageIntro
        title="Questions, sizing notes, and kind hellos."
        titleClassName="text-4xl font-semibold leading-tight sm:text-5xl sm:leading-none"
      >
        <p>
          Reach out for product fit guidance, care questions, press notes, or
          future wholesale conversations. The form below is a static template
          for now.
        </p>
      </PageIntro>
      <section className="mx-auto grid max-w-7xl gap-6 px-4 pb-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-8 lg:px-8 lg:pb-20">
        <div className="grid gap-4">
          {contactItems.map((item) => (
            <div key={item.label} className="rounded-sm bg-paper p-5 shadow-soft">
              <item.icon size={20} className="text-clay" aria-hidden="true" />
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.2em] text-clay">
                {item.label}
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">{item.value}</p>
            </div>
          ))}
        </div>
        {/* TODO: Wire this form to a real contact submission flow. */}
        <form className="rounded-sm bg-paper p-4 shadow-soft sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="grid gap-2 text-sm font-semibold">
              Name
              <input
                className="focus-ring min-h-12 rounded-sm border border-clay/16 bg-linen px-4 font-normal text-ink placeholder:text-muted"
                placeholder="Your name"
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold">
              Email
              <input
                type="email"
                className="focus-ring min-h-12 rounded-sm border border-clay/16 bg-linen px-4 font-normal text-ink placeholder:text-muted"
                placeholder="you@example.com"
              />
            </label>
          </div>
          <label className="mt-5 grid gap-2 text-sm font-semibold">
            Message
            <textarea
              className="focus-ring min-h-40 rounded-sm border border-clay/16 bg-linen px-4 py-3 font-normal text-ink placeholder:text-muted"
              placeholder="Tell us what you are looking for."
            />
          </label>
          <button
            type="button"
            className="focus-ring mt-6 min-h-12 w-full rounded-sm border border-clay bg-clay px-5 text-sm font-semibold text-white shadow-soft transition hover:border-ink hover:bg-ink sm:w-auto"
          >
            Send inquiry
          </button>
        </form>
      </section>
    </>
  );
}
