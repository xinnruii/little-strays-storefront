import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function ButtonLink({
  href,
  children,
  variant = "dark"
}: {
  href: string;
  children: React.ReactNode;
  variant?: "dark" | "light";
}) {
  const classes =
    variant === "dark"
      ? "border border-clay bg-clay text-white shadow-soft hover:border-ink hover:bg-ink"
      : "border border-clay/20 bg-white text-clay hover:border-clay/40 hover:bg-linen";

  return (
    <Link
      href={href}
      className={`focus-ring inline-flex min-h-12 items-center gap-2 rounded-sm px-5 text-sm font-semibold transition ${classes}`}
    >
      {children}
      <ArrowRight aria-hidden="true" size={16} />
    </Link>
  );
}
