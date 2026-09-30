export function PageIntro({
  titleClassName = "text-center text-3xl font-semibold leading-tight sm:text-4xl",
  title,
  children
}: {
  titleClassName?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <div className="grid gap-5 md:grid-cols-[0.95fr_1fr] md:items-end lg:gap-6">
        <h1 className={`${titleClassName} md:col-span-2`}>
          {title}
        </h1>
        <div className="max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8 md:col-span-2 md:mx-auto md:text-center">
          {children}
        </div>
      </div>
    </section>
  );
}
