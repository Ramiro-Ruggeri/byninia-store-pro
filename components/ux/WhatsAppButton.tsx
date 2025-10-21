"use client";

import { useMemo } from "react";
import { useCart } from "@/store/cart";
import { cn } from "@/lib/motion";

/**
 * WhatsAppButton
 * - Arma un mensaje prellenado con:
 *   • saludo humano + intención de compra
 *   • resumen del carrito (si hay items)
 *   • URL de la página actual (si existe)
 * - Abre wa.me listo para tocar "Enviar".
 *
 * Props:
 * - phone: string (obligatorio) -> en formato internacional, ej: "5493510000000"
 * - label: string (texto del botón)
 * - className: estilos extra
 * - variant: "solid" | "outline"
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

  const url = typeof window !== "undefined" ? window.location.href : "";
  const hasItems = items && items.length > 0;

  const cartLines = hasItems
    ? items
        .map(
          (i) => `• ${i.title} x${i.quantity}  $ ${(i.price / 100).toFixed(2)}`
        )
        .join("\n")
    : "";

  const message = useMemo(() => {
    const intro =
      "Hola BYNINIA 👋\nQuiero pedir un *Inchoriable* (portaencendedor con cadena).";
    const where = "¿Hay stock? Soy [tu nombre] y estoy en [tu ciudad].";
    const link = url ? `\n\nLink: ${url}` : "";

    const cart = hasItems
      ? `\n\nMi carrito ahora:\n${cartLines}\nTotal aprox.: $ ${(
          total() / 100
        ).toFixed(2)}`
      : "";

    const outro =
      "\n\nSi hace falta, te paso detalles (modelo/variante/envío). ¡Gracias!";

    const full = `${intro}${cart}${link}\n\n${where}${outro}`;
    return encodeURIComponent(full);
  }, [cartLines, hasItems, total, url]);

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
