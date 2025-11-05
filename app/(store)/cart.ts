"use client";

import { useEffect, useState } from "react";

export type CartItem = {
  id: string;
  title: string;
  price: number; // en centavos
  quantity: number;
  thumbnail?: string;
};

function readCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem("byninia:cart");
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

/**
 * Hook mínimo para leer carrito desde localStorage.
 * - No agrega ni quita ítems (no lo necesitás para el deploy actual).
 * - Devuelve items y total() (en centavos) que tu WhatsAppButton ya usa.
 */
export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(readCart());

    // si en el futuro querés reaccionar a cambios
    const onStorage = (e: StorageEvent) => {
      if (e.key === "byninia:cart") setItems(readCart());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const total = () => items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return { items, total };
}
