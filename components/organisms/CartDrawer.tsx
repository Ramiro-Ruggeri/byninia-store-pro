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

const WHATSAPP_PHONE = "5493874126730";
const INSTAGRAM_USER = "byninia.store";

export default function CartDrawer() {
  const { items, remove, open, toggle, total } = useCart();

  const hasItems = Array.isArray(items) && items.length > 0;

  // Texto de los productos en el carrito
  const cartLines = hasItems
    ? items
        .map((i: any) => {
          const title = String(i?.title ?? "Producto BYNINIA");
          const qty = Number(i?.quantity ?? 1) || 1;
          return `• ${title} x${qty}`;
        })
        .join("\n")
    : "";

  const totalFormatted = formatARS(total || 0);

  // Mensaje "cool" para cerrar compra
  const message = encodeURIComponent(
    [
      "Hola! 👋 Vengo desde la web BYNINIA.",
      "",
      "Quiero cerrar compra de estos Inchoriables:",
      cartLines || "Todavía no seleccioné nada, pero quiero chusmear modelos.",
      "",
      `Total estimado: ${totalFormatted}`,
      "",
      "Soy [tu nombre] de [tu ciudad]. ¿Me pasás formas de pago y envío? 🔥",
    ].join("\n")
  );

  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${message}`;
  // IG DM (abre chat con la marca; el parámetro ref es opcional)
  const instagramUrl = `https://ig.me/m/${INSTAGRAM_USER}?ref=${message}`;

  const drawerBase =
    "fixed inset-y-0 right-0 z-40 flex flex-col bg-[var(--by-card)] " +
    "border-l border-white/10 shadow-2xl w-full max-w-sm sm:max-w-md " +
    "transition-transform duration-300 ease-out";
  const drawerClass =
    drawerBase + (open ? " translate-x-0" : " translate-x-full");

  return (
    <>
      {/* Overlay sutil para cuando el carrito está abierto */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm"
          onClick={() => toggle(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={drawerClass}
        aria-hidden={!open}
        role="dialog"
        aria-label="Carrito"
      >
        {/* Header */}
        <header className="flex items-center justify-between px-4 pt-4 pb-3 border-b border-white/10">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
              Carrito
            </h2>
            <p className="text-xs text-white/40">
              Inchoriables listos para salir de noche.
            </p>
          </div>
          <button
            onClick={() => toggle(false)}
            aria-label="Cerrar carrito"
            className="rounded-full border border-white/15 px-2 py-1 text-sm text-white/70 hover:bg-white/10"
          >
            ✕
          </button>
        </header>

        {/* Lista de productos */}
        <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
          {hasItems ? (
            items.map((i: any) => (
              <div
                key={i.id}
                className="flex gap-3 items-center rounded-2xl bg-black/20 border border-white/8 p-3"
              >
                {i.thumbnail && (
                  <Image
                    src={i.thumbnail}
                    alt={i.title}
                    width={64}
                    height={64}
                    className="rounded-lg object-cover"
                    unoptimized
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{i.title}</p>
                  <div className="text-xs text-white/50">
                    x{i.quantity} ·{" "}
                    {formatARS((i.price ?? 0) * (i.quantity ?? 1))}
                  </div>
                </div>
                <button
                  onClick={() => remove(i.id)}
                  className="text-xs text-white/40 hover:text-white/80"
                >
                  Eliminar
                </button>
              </div>
            ))
          ) : (
            <p className="text-sm text-white/55">
              No agregaste productos todavía. Probá sumar un Inchoriable y volvé
              acá 😉
            </p>
          )}
        </div>

        {/* Footer / resumen + acciones */}
        <footer className="px-4 pb-5 pt-3 border-t border-white/10 space-y-3 bg-black/30">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/70">Total estimado</span>
            <span className="font-semibold">{totalFormatted}</span>
          </div>

          <Button
            className="w-full mt-1 bg-[rgb(var(--color-accent))] text-black font-semibold rounded-full py-3 text-sm hover:brightness-110"
            onClick={() => {
              if (!hasItems) return;
              window.open(whatsappUrl, "_blank");
            }}
            disabled={!hasItems}
          >
            Completar compra por WhatsApp
          </Button>

          <Button
            className="w-full rounded-full border border-white/25 bg-transparent py-3 text-sm text-white/80 hover:bg-white/5"
            onClick={() => {
              if (!hasItems) return;
              window.open(instagramUrl, "_blank");
            }}
            disabled={!hasItems}
          >
            Enviar carrito por Instagram
          </Button>

          <p className="text-[11px] text-white/40 mt-1">
            No se cobra nada acá — cerrás el pago directo con BYNINIA por chat.
          </p>
        </footer>
      </aside>
    </>
  );
}
