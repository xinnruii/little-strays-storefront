import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle } from "lucide-react";
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
  },
  {
    icon: MapPin,
    label: "Studio",
    value: "18 Willow Lane, Portland, OR"
  }
];

export default function ContactPage() {
  return (
    <>
      <PageIntro kicker="Contact" title="Questions, sizing notes, and kind hellos.">
        <p>
          Reach out for product fit guidance, care questions, press notes, or
          future wholesale conversations. The form below is a static template
          for now.
        </p>
      </PageIntro>
      <section className="mx-auto grid max-w-7xl gap-8 px-5 pb-20 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
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
        <form className="rounded-sm bg-paper p-5 shadow-soft sm:p-8">
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
            className="focus-ring mt-6 min-h-12 rounded-sm border border-clay bg-clay px-5 text-sm font-semibold text-white shadow-soft transition hover:border-ink hover:bg-ink"
          >
            Send inquiry
          </button>
        </form>
      </section>
    </>
  );
}
