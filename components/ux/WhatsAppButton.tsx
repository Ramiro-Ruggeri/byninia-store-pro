"use client";

import { useMemo } from "react";
import { useCart } from "@/app/(store)/cart/cart";
import { cn } from "@/lib/motion";

/**
 * WhatsAppButton
 * - Arma un mensaje prellenado con:
 *   • saludo + intención de compra
 *   • resumen del carrito (si hay items)
 *   • URL de la página actual (si existe)
 *
 * Props:
 * - phone: string (obligatorio) -> E.164: "5493510000000"
 * - label?: string
 * - className?: string
 * - variant?: "solid" | "outline"
 */
export default function WhatsAppButton({
  phone,
  label = "Pedir por WhatsApp",
  className,
  variant = "outline",
}: {
  phone: string;
  label?: string;
  className?: string;
  variant?: "solid" | "outline";
}) {
  const { items, total } = useCart();

  // URL segura en cliente
  const url = typeof window !== "undefined" ? window.location.href : "";

  const hasItems = Array.isArray(items) && items.length > 0;

  // Aseguramos tipos/valores para evitar NaN
  const cartLines = hasItems
    ? items
        .map((i) => {
          const title = String(i?.title ?? "Producto");
          const qty = Number(i?.quantity ?? i?.qty ?? 1) || 1;
          const priceCents = Number(i?.price ?? 0) || 0; // centavos
          const price = (priceCents / 100).toFixed(2);
          return `• ${title} x${qty}  $ ${price}`;
        })
        .join("\n")
    : "";

  // total puede ser número o función -> lo normalizamos a centavos (número)
  const totalCents =
    typeof total === "function" ? Number(total() ?? 0) : Number(total ?? 0);

  const message = useMemo(() => {
    const intro =
      "Hola BYNINIA 👋\nQuiero pedir un *Inchoriable* (portaencendedor con cadena).";
    const where = "¿Hay stock? Soy [tu nombre] y estoy en [tu ciudad].";
    const link = url ? `\n\nLink: ${url}` : "";

    const cart = hasItems
      ? `\n\nMi carrito ahora:\n${cartLines}\nTotal aprox.: $ ${(
          totalCents / 100
        ).toFixed(2)}`
      : "";

    const outro =
      "\n\nSi hace falta, te paso detalles (modelo/variante/envío). ¡Gracias!";

    const full = `${intro}${cart}${link}\n\n${where}${outro}`;
    return encodeURIComponent(full);
  }, [cartLines, hasItems, totalCents, url]);

  const href = `https://wa.me/${phone}?text=${message}`;

  const base =
    variant === "solid"
      ? "rounded-2xl px-5 py-3 bg-white text-black font-medium shadow-[0_0_24px_#ffffff22] hover:shadow-[0_0_32px_#ffffff33] transition"
      : "rounded-2xl px-5 py-3 border border-white/20 text-white hover:border-white/40 transition";

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={cn(base, className)}
      aria-label="Abrir WhatsApp con mensaje prellenado"
    >
      {label}
    </a>
  );
}
