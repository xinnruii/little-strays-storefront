"use client";

import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode
} from "react";
import { products } from "@/lib/products";

type CartItem = {
  slug: string;
  quantity: number;
  size?: string;
};

type CartContextValue = {
  items: CartItem[];
  itemCount: number;
  addItem: (slug: string, quantity?: number, size?: string) => void;
  updateQuantity: (slug: string, quantity: number, size?: string) => void;
  removeItem: (slug: string, size?: string) => void;
  clearCart: () => void;
};

const STORAGE_KEY = "little-strays-cart-v2";
const catalogSlugs = new Set(products.map((product) => product.slug));
const emptyCart: CartItem[] = [];
const listeners = new Set<() => void>();
let cachedStoredCart = "";
let cachedItems: CartItem[] = emptyCart;

const CartContext = createContext<CartContextValue | null>(null);

function normalizeQuantity(quantity: number) {
  return Math.min(99, Math.max(1, Math.floor(quantity)));
}

function parseStoredCart(storedCart: string | null) {
  try {
    if (!storedCart) {
      return emptyCart;
    }

    const parsedCart = JSON.parse(storedCart);

    if (!Array.isArray(parsedCart)) {
      return emptyCart;
    }

    return parsedCart
      .filter(
        (item): item is CartItem =>
          typeof item?.slug === "string" &&
          catalogSlugs.has(item.slug) &&
          Number.isFinite(item?.quantity) &&
          item.quantity > 0
      )
      .map((item) => ({
        slug: item.slug,
        quantity: normalizeQuantity(item.quantity),
        size: typeof item.size === "string" ? item.size : undefined
      }));
  } catch {
    return emptyCart;
  }
}

function notifyCartListeners() {
  listeners.forEach((listener) => listener());
}

function getCartSnapshot() {
  if (typeof window === "undefined") {
    return emptyCart;
  }

  const storedCart = window.localStorage.getItem(STORAGE_KEY) ?? "";

  if (storedCart === cachedStoredCart) {
    return cachedItems;
  }

  cachedStoredCart = storedCart;
  cachedItems = parseStoredCart(storedCart);
  return cachedItems;
}

function writeCartSnapshot(items: CartItem[]) {
  if (typeof window === "undefined") {
    return;
  }

  const storedCart = JSON.stringify(items);
  cachedStoredCart = storedCart;
  cachedItems = items;
  window.localStorage.setItem(STORAGE_KEY, storedCart);
  notifyCartListeners();
}

function subscribeToCart(listener: () => void) {
  listeners.add(listener);

  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      notifyCartListeners();
    }
  };

  window.addEventListener("storage", handleStorage);

  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", handleStorage);
  };
}

export function CartProvider({ children }: { children: ReactNode }) {
  const items = useSyncExternalStore(
    subscribeToCart,
    getCartSnapshot,
    () => emptyCart
  );

  const value = useMemo<CartContextValue>(() => {
    const addItem = (slug: string, quantity = 1, size?: string) => {
      const currentItems = getCartSnapshot();
      const existingItem = currentItems.find(
        (item) => item.slug === slug && item.size === size
      );

      if (!existingItem) {
        writeCartSnapshot([
          ...currentItems,
          {
            slug,
            quantity: normalizeQuantity(quantity),
            size
          }
        ]);
        return;
      }

      writeCartSnapshot(
        currentItems.map((item) =>
          item.slug === slug && item.size === size
            ? {
                ...item,
                quantity: normalizeQuantity(item.quantity + quantity)
              }
            : item
        )
      );
    };

    const updateQuantity = (slug: string, quantity: number, size?: string) => {
      const currentItems = getCartSnapshot();

      if (quantity <= 0) {
        writeCartSnapshot(currentItems.filter((item) => !(item.slug === slug && item.size === size)));
        return;
      }

      writeCartSnapshot(
        currentItems.map((item) =>
          item.slug === slug && item.size === size
            ? { ...item, quantity: normalizeQuantity(quantity) }
            : item
        )
      );
    };

    const removeItem = (slug: string, size?: string) => {
      writeCartSnapshot(getCartSnapshot().filter((item) => !(item.slug === slug && item.size === size)));
    };

    const clearCart = () => {
      writeCartSnapshot([]);
    };

    return {
      items,
      itemCount: items.reduce((total, item) => total + item.quantity, 0),
      addItem,
      updateQuantity,
      removeItem,
      clearCart
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const cart = useContext(CartContext);

  if (!cart) {
    throw new Error("useCart must be used within CartProvider");
  }

  return cart;
}
