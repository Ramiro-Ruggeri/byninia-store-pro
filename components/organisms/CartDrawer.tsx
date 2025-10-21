// components/organisms/CartDrawer.tsx
"use client";

import React from "react";
import Image from "next/image";
import Button from "@/components/atoms/Button";
import { useCart } from "@/store/cart";

function formatARS(cents: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(Math.round(cents / 100));
}

export default function CartDrawer() {
  // total ahora es un number (no una función)
  const { items, remove, open, toggle, total } = useCart();

  // Evitamos template strings largos que a veces se rompen al copiar
  const classes =
    "fixed right-0 top-0 h-dvh w-[92vw] sm:w-[420px] bg-by-card " +
    "border-l border-by-line shadow-2xl p-5 transition-transform " +
    (open ? "translate-x-0" : "translate-x-full");

  return (
    <aside
      className={classes}
      aria-hidden={!open}
      role="dialog"
      aria-label="Carrito"
    >
      <header className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Tu carrito</h2>
        <button onClick={() => toggle(false)} aria-label="Cerrar carrito">
          ✕
        </button>
      </header>

      <div className="mt-4 space-y-4 overflow-y-auto max-h-[70vh] pr-2">
        {items.map((i) => (
          <div key={i.id} className="flex gap-3 items-center">
            {i.thumbnail && (
              <Image
                src={i.thumbnail}
                alt={i.title}
                width={64}
                height={64}
                className="rounded-md"
                unoptimized
              />
            )}
            <div className="flex-1">
              <p className="font-medium">{i.title}</p>
              <div className="text-sm text-zinc-400">x{i.quantity}</div>
            </div>
            <button
              onClick={() => remove(i.id)}
              className="text-sm text-zinc-400 hover:text-white"
            >
              Eliminar
            </button>
          </div>
        ))}
        {items.length === 0 && (
          <p className="text-sm text-white/60">
            No agregaste productos todavía.
          </p>
        )}
      </div>

      <footer className="mt-6 space-y-3">
        <div className="flex justify-between text-lg">
          <span>Total</span>
          {/* 👇 usar total como number + ARS */}
          <span>{formatARS(total)}</span>
        </div>
        <Button
          className="w-full"
          onClick={() => (location.href = "/checkout")}
        >
          Ir a pagar
        </Button>
      </footer>
    </aside>
  );
}
