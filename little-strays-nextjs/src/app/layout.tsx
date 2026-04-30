import type { Metadata } from "next";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import "./globals.css";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" }
];

export const metadata: Metadata = {
  title: {
    default: "Little Strays",
    template: "%s | Little Strays"
  },
  description:
    "A soft editorial storefront for thoughtful pet goods, home objects, and everyday companions."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,#f3ded0_0,#fbf6ee_34%,#f7efe4_100%)]">
          <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/88 backdrop-blur-xl">
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
              <Link
                href="/"
                className="focus-ring flex items-center gap-3 rounded-sm"
                aria-label="Little Strays home"
              >
                <span className="grid h-10 w-10 place-items-center rounded-full bg-ink text-paper">
                  <ShoppingBag size={18} strokeWidth={1.8} />
                </span>
                <span>
                  <span className="block font-serif text-2xl leading-none">
                    Little Strays
                  </span>
                  <span className="hidden text-[0.65rem] uppercase tracking-[0.26em] text-ink/55 sm:block">
                    Pet goods
                  </span>
                </span>
              </Link>
              <nav
                className="flex items-center gap-1 overflow-x-auto text-sm text-ink/70"
                aria-label="Primary navigation"
              >
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="focus-ring whitespace-nowrap rounded-sm px-3 py-2 hover:text-ink"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </header>
          <main>{children}</main>
          <footer className="border-t border-ink/10 bg-ink text-paper">
            <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:px-8 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
              <div>
                <p className="font-serif text-3xl">Little Strays</p>
                <p className="mt-4 max-w-sm text-sm leading-6 text-paper/68">
                  Quietly beautiful goods for pets who make a home feel awake,
                  warm, and a little more lived in.
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-paper/50">
                  Shop
                </p>
                <div className="mt-4 grid gap-3 text-sm text-paper/72">
                  <Link href="/products" className="hover:text-paper">
                    All products
                  </Link>
                  <Link href="/shipping-returns" className="hover:text-paper">
                    Shipping & Returns
                  </Link>
                </div>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-paper/50">
                  Visit
                </p>
                <p className="mt-4 text-sm leading-6 text-paper/72">
                  18 Willow Lane
                  <br />
                  Portland, OR
                  <br />
                  hello@littlestrays.test
                </p>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
