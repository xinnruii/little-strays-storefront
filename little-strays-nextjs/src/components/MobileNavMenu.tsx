"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

type MobileNavItem = {
  href: string;
  label: string;
  children?: MobileNavItem[];
};

export function MobileNavMenu({ items }: { items: MobileNavItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    function handlePointerDown(event: PointerEvent) {
      if (
        menuRef.current &&
        event.target instanceof Node &&
        !menuRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen]);

  return (
    <div ref={menuRef} className="relative justify-self-start lg:hidden">
      <button
        type="button"
        className="focus-ring grid h-10 w-10 place-items-center rounded-full border border-clay/15 text-clay transition hover:border-clay/35 hover:bg-linen"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-navigation-menu"
        onClick={() => setIsOpen((current) => !current)}
      >
        {isOpen ? <X size={18} strokeWidth={1.8} /> : <Menu size={18} strokeWidth={1.8} />}
      </button>

      {isOpen ? (
        <nav
          id="mobile-navigation-menu"
          className="absolute left-0 top-12 z-50 max-h-[calc(100dvh-8rem)] w-[min(82vw,19rem)] overflow-y-auto overscroll-contain rounded-sm border border-clay/15 bg-white p-2 text-sm text-ink shadow-soft"
          aria-label="Mobile navigation"
        >
          {items.map((item) => (
            <div key={item.href}>
              <Link
                href={item.href}
                className="focus-ring block rounded-sm px-4 py-3 font-semibold hover:bg-linen hover:text-clay"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
              {item.children?.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="focus-ring ml-4 block rounded-sm border-l border-clay/15 px-4 py-2 text-muted hover:bg-linen hover:text-clay"
                  onClick={() => setIsOpen(false)}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          ))}
        </nav>
      ) : null}
    </div>
  );
}
