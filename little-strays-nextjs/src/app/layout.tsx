import type { Metadata } from "next";
import Link from "next/link";
import { UserRound } from "lucide-react";
import { CartLink } from "@/components/cart/CartLink";
import { CartProvider } from "@/components/cart/CartProvider";
import { ScrollToTop } from "@/components/ScrollToTop";
import "./globals.css";

const navItems = [
  { href: "/products", label: "All" },
  { href: "/products?category=eat-drink", label: "Eat + Drink" },
  { href: "/products?category=rest", label: "Rest" },
  { href: "/products?category=play", label: "Play" },
  { href: "/products?category=walk", label: "Walk" },
  { href: "/products?category=wear", label: "Wear" }
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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@100..1000&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        <CartProvider>
          <ScrollToTop />
          <div className="min-h-screen bg-ground text-ink">
            <header className="sticky top-0 z-50 border-b border-clay/15 bg-white/92 backdrop-blur-xl">
              <div className="border-b border-clay/10 bg-linen px-5 py-2 text-center text-xs font-medium leading-5 text-muted sm:px-8 sm:text-sm">
                Local Los Angeles preorders are delivered twice per month.
                National shipping is on the way.
              </div>
              <div className="mx-auto grid max-w-[1720px] grid-cols-[1fr_auto_1fr] items-center gap-3 px-4 py-4 sm:px-6 lg:gap-6 lg:px-6 xl:px-8">
                <nav
                  className="hidden items-center gap-1 justify-self-start text-sm text-muted lg:flex"
                  aria-label="Primary navigation categories"
                >
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="focus-ring whitespace-nowrap rounded-sm px-3 py-2 hover:text-clay"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
                <Link
                  href="/"
                  className="focus-ring flex shrink-0 items-center justify-self-center overflow-hidden rounded-full"
                  aria-label="Little Strays home"
                >
                  <img
                    src="/images/little-strays-logo.jpg"
                    alt=""
                    className="h-12 w-12 rounded-full object-cover sm:h-16 sm:w-16 lg:h-[72px] lg:w-[72px]"
                  />
                </Link>
                <div className="flex items-center gap-2 justify-self-end">
                  <Link
                    href="/account"
                    className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-clay/15 text-clay transition hover:border-clay/35 hover:bg-linen"
                    aria-label="Account"
                  >
                    <UserRound size={18} strokeWidth={1.8} />
                  </Link>
                  <CartLink />
                </div>
                <nav
                  className="col-span-3 flex items-center justify-center gap-1 overflow-x-auto text-sm text-muted lg:hidden"
                  aria-label="Primary navigation"
                >
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="focus-ring whitespace-nowrap rounded-sm px-3 py-2 hover:text-clay"
                    >
                      {item.label}
                    </Link>
                  ))}
                </nav>
              </div>
            </header>
            <main>{children}</main>
            <footer className="border-t border-clay/15 bg-white text-ink">
              <div className="mx-auto grid max-w-[1720px] gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-6 xl:px-8">
                <div>
                  <p className="text-3xl font-semibold">Little Strays</p>
                  <p className="mt-4 max-w-sm text-sm leading-6 text-muted">
                    Quietly beautiful goods for pets who make a home feel awake,
                    warm, and a little more lived in.
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay">
                    Shop
                  </p>
                  <div className="mt-4 grid gap-3 text-sm text-muted">
                    <Link href="/products" className="hover:text-clay">
                      All products
                    </Link>
                    <Link href="/about" className="hover:text-clay">
                      About
                    </Link>
                    <Link href="/contact" className="hover:text-clay">
                      Contact
                    </Link>
                    <Link href="/shipping-returns" className="hover:text-clay">
                      Shipping & Returns
                    </Link>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-clay">
                    Little notes
                  </p>
                  <p className="mt-4 max-w-xs text-sm leading-6 text-muted">
                    New arrivals, care notes, and tiny approvals from our four
                    bosses.
                  </p>
                  {/* TODO: Connect newsletter signup to an email provider. */}
                  <form className="mt-4 flex max-w-xs overflow-hidden rounded-sm border border-clay/15 bg-linen">
                    <input
                      type="email"
                      aria-label="Email address"
                      placeholder="Email address"
                      className="min-h-11 min-w-0 flex-1 bg-transparent px-3 text-sm text-ink outline-none placeholder:text-muted"
                    />
                    <button
                      type="button"
                      className="bg-clay px-4 text-sm font-semibold text-white transition hover:bg-ink"
                    >
                      Join
                    </button>
                  </form>
                </div>
              </div>
            </footer>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
