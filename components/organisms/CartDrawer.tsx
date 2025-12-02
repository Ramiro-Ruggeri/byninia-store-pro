// components/organisms/CartDrawer.tsx
"use client";

import React, { useMemo } from "react";
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

  const hasItems = Array.isArray(items) && items.length > 0;

  // Mensaje humano + listado de productos
  const plainMessage = useMemo(() => {
    if (!hasItems) {
      return (
        "Hola BYNINIA 👋\n" +
        "Vengo desde la web y quiero consultar por los Inchoriables.\n" +
        "Todavía no tengo productos en el carrito, pero me gustaría ver modelos y stock. 🙌"
      );
    }

    const intro =
      "Hola BYNINIA 👋\n" +
      "Vengo desde la web y quiero avanzar con este pedido de Inchoriables:\n";

    const lines = items
      .map((i: any) => {
        const title = String(i?.title ?? "Producto");
        const qty = Number(i?.quantity ?? 1) || 1;
        const priceCents = Number(i?.price ?? 0) || 0;
        const lineTotal = priceCents * qty;
        return `• ${title} x${qty} — ${formatARS(lineTotal)}`;
      })
      .join("\n");

    const totalLine = `\n\nTotal aprox.: ${formatARS(total)}`;

    const outro =
      "\n\n¿Me confirmás stock, formas de pago y envío? 🙌\n" +
      "Soy [tu nombre] y estoy en [tu ciudad].";

    return `${intro}${lines}${totalLine}${outro}`;
  }, [items, total, hasItems]);

  const encodedMessage = encodeURIComponent(plainMessage);

  // Número de WhatsApp BYNINIA
  const WA_PHONE = "5493874126730";
  const waUrl = `https://wa.me/${WA_PHONE}?text=${encodedMessage}`;

  // URL del Instagram de la marca (configurable por env)
  const IG_PROFILE_URL =
    process.env.NEXT_PUBLIC_IG_URL ||
    "https://www.instagram.com/tu_usuario_byninia";

  const handleWhatsAppClick = () => {
    if (typeof window !== "undefined") {
      window.open(waUrl, "_blank");
    }
  };

  const handleInstagramClick = async () => {
    if (typeof window === "undefined") return;

    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(plainMessage);
      }
    } catch {
      // si falla el clipboard, no rompemos nada; solo abrimos IG
    }

    window.open(IG_PROFILE_URL, "_blank");
  };

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
        {items.map((i: any) => (
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

      <footer className="mt-6 space-y-4">
        <div className="flex justify-between text-lg">
          <span>Total</span>
          <span>{formatARS(total)}</span>
        </div>

        {hasItems && (
          <>
            {/* Botón principal: WhatsApp */}
            <Button className="w-full" onClick={handleWhatsAppClick}>
              Finalizar pedido por WhatsApp
            </Button>

            {/* Botón secundario: Instagram */}
            <button
              type="button"
              onClick={handleInstagramClick}
              className="w-full rounded-2xl border border-white/20 px-5 py-3 text-sm font-medium text-white hover:border-white/40 transition"
            >
              Seguir por Instagram (mensaje copiado)
            </button>

            <p className="text-[11px] text-white/40 text-center leading-snug">
              Te abrimos WhatsApp o Instagram con el pedido listo para enviar.
              En Instagram, el mensaje queda copiado para que lo pegues en el
              chat. 🔥
            </p>
          </>
        )}
      </footer>
    </aside>
  );
}
