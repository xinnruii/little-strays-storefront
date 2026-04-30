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
      ? "bg-ink text-paper hover:bg-clay"
      : "bg-paper text-ink hover:bg-oat";

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
