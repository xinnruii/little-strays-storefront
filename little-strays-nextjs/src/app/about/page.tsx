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
        <div className="grid content-start gap-6 px-4 pt-8 sm:px-6 lg:max-w-2xl lg:gap-8 lg:px-0 lg:pr-8 lg:pt-20">
          <div>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl sm:leading-none">
              Our bosses have paws.
            </h1>
          </div>
          <div className="grid gap-5 text-base leading-7 text-muted sm:gap-6 sm:leading-8">
            <p>
              Little Strays was inspired by four adopted little ones: May,
              Lucky, Joe, and Pika. They are our CEO, CTO, CFO, and CPO,
              although they mostly work in naps, snack inspections, quality
              control, and emotional support.
            </p>
            <p>
              The humans? We are just the employees.
            </p>
            <p>
              Our job is simple: listen to what they need, notice what makes
              their days softer, and find beautiful, practical goods that make
              life with pets feel easier, warmer, and more joyful.
            </p>
            <p>
              Everything we carry is chosen with our four tiny bosses in mind.
              Many pieces are inspected, tested, sat on, sniffed, chased, or
              approved by May, Lucky, Joe, and Pika themselves.
            </p>
            <p>
              If they love it, it earns a place at Little Strays.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
