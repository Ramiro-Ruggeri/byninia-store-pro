"use client";

import { useMemo } from "react";
import { useCart } from "@/app/(store)/cart";
import { cn } from "@/lib/motion";

/**
 * Tipo mínimo esperado de los ítems del carrito.
 * Ajustalo si tu `useCart()` usa otras keys.
 */
type CartItem = {
  id?: string;
  title?: string;
  quantity?: number;
  qty?: number;
  price?: number; // en centavos
};

/**
 * Helper para construir un mensaje con los productos del carrito.
 */
function buildCartMessage(items: CartItem[], totalCents: number, url?: string) {
  const hasItems = Array.isArray(items) && items.length > 0;

  const cartLines = hasItems
    ? items
        .map((i) => {
          const title = String(i?.title ?? "Producto");
          const qty = Number(i?.quantity ?? i?.qty ?? 1) || 1;
          const priceCents = Number(i?.price ?? 0) || 0;
          const price = (priceCents / 100).toFixed(2);
          return `• ${title} x${qty}  $ ${price}`;
        })
        .join("\n")
    : "";

  const intro =
    "Hola BYNINIA 👋\nVengo desde la web y quiero cerrar un pedido de *Inchoriables* (portaencendedor con cadena).";

  const cart = hasItems
    ? `\n\nMi carrito ahora es:\n${cartLines}\nTotal aprox.: $ ${(
        totalCents / 100
      ).toFixed(2)}`
    : "\n\nTodavía no tengo nada cargado en el carrito, pero quiero hacer una consulta.";

  const link = url ? `\n\nLink de la página: ${url}` : "";

  const outro =
    "\n\nSoy [tu nombre] de [tu ciudad]. ¿Me ayudás a definir modelo, pago y envío?";

  const full = `${intro}${cart}${link}${outro}`;
  return full;
}

/**
 * WhatsAppButton
 * - Arma un mensaje prellenado con:
 *   • saludo + intención de compra
 *   • resumen del carrito (si hay items)
 *   • URL de la página actual
 *
 * Props:
 * - phone: string (obligatorio) -> E.164: "5493874126730"
 * - label?: string
 * - className?: string
 * - variant?: "solid" | "outline"
 */
export default function WhatsAppButton({
  phone,
  label = "Cerrar pedido por WhatsApp",
  className,
  variant = "outline",
}: {
  phone: string;
  label?: string;
  className?: string;
  variant?: "solid" | "outline";
}) {
  const { items, total } = useCart() as {
    items: CartItem[];
    total: number | (() => number);
  };

  const url = typeof window !== "undefined" ? window.location.href : "";
  const totalCents =
    typeof total === "function" ? Number(total() ?? 0) : Number(total ?? 0);

  const encodedMessage = useMemo(() => {
    const msg = buildCartMessage(items ?? [], totalCents, url);
    return encodeURIComponent(msg);
  }, [items, totalCents, url]);

  const href = `https://wa.me/${phone}?text=${encodedMessage}`;

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
      aria-label="Abrir WhatsApp con el pedido prellenado"
    >
      {label}
    </a>
  );
}

/**
 * Botón para cerrar pedido por Instagram:
 * - Copia el mensaje al portapapeles
 * - Abre el perfil de Instagram de BYNINIA en una nueva pestaña
 *
 * Cambiá INSTAGRAM_USERNAME por el user real (sin @)
 */
const INSTAGRAM_USERNAME = "byninia"; // <- EDITAR si tu user es otro

export function InstagramCheckoutButton({
  label = "Enviar pedido por Instagram",
  className,
}: {
  label?: string;
  className?: string;
}) {
  const { items, total } = useCart() as {
    items: CartItem[];
    total: number | (() => number);
  };

  const url = typeof window !== "undefined" ? window.location.href : "";
  const totalCents =
    typeof total === "function" ? Number(total() ?? 0) : Number(total ?? 0);

  const plainMessage = useMemo(
    () => buildCartMessage(items ?? [], totalCents, url),
    [items, totalCents, url]
  );

  const handleClick = async () => {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(plainMessage);
      }
    } catch {
      // si falla el copy, no rompemos nada; solo abrimos Instagram
    }
    window.open(
      `https://www.instagram.com/${INSTAGRAM_USERNAME}/`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "rounded-2xl px-5 py-3 border border-white/20 text-white/80 hover:border-white/40 hover:text-white transition",
        className
      )}
      aria-label="Abrir Instagram y copiar el pedido al portapapeles"
    >
      {label}
    </button>
  );
}
