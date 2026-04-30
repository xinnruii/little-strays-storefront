export function PageIntro({
  kicker,
  title,
  children
}: {
  kicker: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:py-20">
      <p className="editorial-kicker">{kicker}</p>
      <div className="mt-5 grid gap-6 md:grid-cols-[0.95fr_1fr] md:items-end">
        <h1 className="font-serif text-5xl leading-[0.95] sm:text-6xl lg:text-7xl">
          {title}
        </h1>
        <div className="max-w-2xl text-base leading-8 text-ink/66 sm:text-lg">
          {children}
        </div>
      </div>
    </section>
  );
}
