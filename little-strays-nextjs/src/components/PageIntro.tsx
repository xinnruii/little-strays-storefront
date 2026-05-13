export function PageIntro({
  kicker,
  titleClassName = "text-4xl font-semibold leading-tight sm:text-5xl lg:text-7xl lg:leading-[0.95]",
  title,
  children
}: {
  kicker?: string;
  titleClassName?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      {kicker ? <p className="editorial-kicker">{kicker}</p> : null}
      <div className={`${kicker ? "mt-5" : ""} grid gap-5 md:grid-cols-[0.95fr_1fr] md:items-end lg:gap-6`}>
        <h1 className={titleClassName}>
          {title}
        </h1>
        <div className="max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
          {children}
        </div>
      </div>
    </section>
  );
}
