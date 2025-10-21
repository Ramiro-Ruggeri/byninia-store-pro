// store/cart.ts
"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartItem = {
  id: string;
  title: string;
  price: number; // en centavos
  quantity: number;
  thumbnail?: string;
  slug?: string;
};

type CartState = {
  items: CartItem[];
  open: boolean;

  add: (item: CartItem) => void;
  remove: (id: string) => void;
  increment: (id: string) => void;
  decrement: (id: string) => void;
  clear: () => void;
  toggle: (value?: boolean) => void;

  count: number;
  total: number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      open: false,

      add: (item) => {
        const items = get().items.slice();
        const idx = items.findIndex((i) => i.id === item.id);
        if (idx >= 0) {
          items[idx] = {
            ...items[idx],
            quantity: items[idx].quantity + (item.quantity || 1),
          };
        } else {
          items.push({ ...item, quantity: item.quantity || 1 });
        }
        set({ items });
      },

      remove: (id) => set({ items: get().items.filter((i) => i.id !== id) }),

      increment: (id) =>
        set({
          items: get().items.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        }),

      decrement: (id) =>
        set({
          items: get()
            .items.map((i) =>
              i.id === id ? { ...i, quantity: i.quantity - 1 } : i
            )
            .filter((i) => i.quantity > 0),
        }),

      clear: () => set({ items: [] }),

      toggle: (value) =>
        set({ open: typeof value === "boolean" ? value : !get().open }),

      get count() {
        return get().items.reduce((acc, i) => acc + i.quantity, 0);
      },
      get total() {
        return get().items.reduce((acc, i) => acc + i.price * i.quantity, 0);
      },
    }),
    {
      name: "byninia-cart-v1",
      partialize: (s) => ({ items: s.items }), // solo persisto items
    }
  )
);
