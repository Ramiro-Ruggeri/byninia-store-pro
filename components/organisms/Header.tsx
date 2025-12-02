"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/store/cart";

/* ---------------- Helpers ---------------- */
const FALLBACK_WA = "5493874126730";
function getWaPhone(): string {
  const env = process.env.NEXT_PUBLIC_WA_PHONE?.trim();
  return env && /^\d+$/.test(env) ? env : FALLBACK_WA;
}
function waUrl(message?: string) {
  const base = `https://wa.me/${getWaPhone()}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

/** Link compacto y accesible (interno) */
function NavLink({
  href,
  children,
  onClick,
  className = "",
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`text-sm text-zinc-300 hover:text-white transition ${className}`}
    >
      {children}
    </Link>
  );
}

export default function Header() {
  const { toggle, items } = useCart();
  const count = items.reduce((a, i) => a + i.quantity, 0);
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/55 backdrop-blur-md">
      {/* Barra principal */}
      <div className="mx-auto max-w-7xl px-4 h-16 grid grid-cols-3 items-center">
        {/* IZQ: (oculto en desktop porque pediste menu hamburguesa) */}
        <div className="flex items-center gap-2">
          {/* Botón menú (desktop + mobile) */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
            className="rounded-md border border-white/20 px-3 py-1 text-sm hover:border-white/40 transition"
          >
            {/* icono hamburguesa simple */}☰
          </button>
        </div>

        {/* CENTRO: logo */}
        <div className="justify-self-center">
          <Link href="/" aria-label="Inicio BYNINIA" className="block">
            <div className="relative h-9 w-[180px] md:h-10 md:w-[220px]">
              <Image
                src="/logos/TITULO.png"
                alt="BYNINIA"
                fill
                priority
                sizes="220px"
                className="object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.08)] logo-shine"
              />
            </div>
          </Link>
        </div>

        {/* DER: carrito */}
        <div className="flex items-center justify-end gap-3">
          <button
            onClick={() => toggle(true)}
            className="rounded-full border border-white/20 px-3 py-1 text-sm hover:border-white/40 transition"
            aria-label={`Abrir carrito (${count})`}
          >
            Carrito ({count})
          </button>
        </div>
      </div>

      {/* DRAWER MENÚ (izquierda) */}
      {open && (
        <div
          role="dialog"
          aria-label="Menú"
          className="fixed inset-0 z-[60]"
          onClick={() => setOpen(false)}
        >
          {/* backdrop */}
          <div className="absolute inset-0 bg-black/50" />

          {/* panel */}
          <aside
            className="absolute left-0 top-0 h-dvh w-[92vw] sm:w-[420px] bg-by-card border-r border-white/10 shadow-2xl p-5 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* header del panel */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 text-sm text-white/70">
                <span className="inline-block h-2 w-2 rounded-full bg-by-accent" />
                Menú
              </div>
              <button
                onClick={() => setOpen(false)}
                aria-label="Cerrar menú"
                className="rounded-md border border-white/20 px-3 py-1 text-sm hover:border-white/40 transition"
              >
                ✕
              </button>
            </div>

            {/* items */}
            <nav className="mt-2 flex-1 overflow-y-auto pr-1">
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/products"
                    onClick={() => setOpen(false)}
                    className="navfx-underline block rounded-xl px-3 py-3 text-[15px] text-white/90 hover:text-white transition"
                  >
                    Catálogo
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    onClick={() => setOpen(false)}
                    className="navfx-underline block rounded-xl px-3 py-3 text-[15px] text-white/90 hover:text-white transition"
                  >
                    Sobre
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    onClick={() => setOpen(false)}
                    className="navfx-underline block rounded-xl px-3 py-3 text-[15px] text-white/90 hover:text-white transition"
                  >
                    Contacto
                  </Link>
                </li>
                <li>
                  <Link
                    href="/policies"
                    onClick={() => setOpen(false)}
                    className="navfx-underline block rounded-xl px-3 py-3 text-[15px] text-white/90 hover:text-white transition"
                  >
                    Envíos & Devoluciones
                  </Link>
                </li>

                {/* EXTERNOS */}
                <li className="pt-2">
                  <a
                    href="https://www.instagram.com/byninia"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="navfx-underline block rounded-xl px-3 py-3 text-[15px] text-white/90 hover:text-white transition"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href={waUrl(
                      "Hola! Vengo de la web BYNINIA. Quiero consultar por los inchoriables."
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="navfx-underline block rounded-xl px-3 py-3 text-[15px] text-white/90 hover:text-white transition"
                  >
                    WhatsApp
                  </a>
                </li>
              </ul>
            </nav>

            {/* CTA al final */}
            <div className="pt-3 border-t border-white/10">
              <Link
                href="/products"
                onClick={() => setOpen(false)}
                className="block text-center w-full rounded-xl bg-white text-black font-semibold px-4 py-3 hover:bg-white/90 transition"
              >
                Ver catálogo
              </Link>
            </div>
          </aside>
        </div>
      )}
    </header>
  );
}
