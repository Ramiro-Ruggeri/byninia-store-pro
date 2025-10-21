"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/store/cart";

/** Link compacto y accesible */
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
      {/* Barra principal: 3 zonas en desktop, fila simple en mobile */}
      <div className="mx-auto max-w-7xl px-4 h-16 grid grid-cols-3 items-center">
        {/* IZQUIERDA: navegación principal (desktop) */}
        <nav className="hidden md:flex items-center gap-6">
          <NavLink href="/products">Catálogo</NavLink>
          <NavLink href="/about">Sobre</NavLink>
          <NavLink href="/contact">Contacto</NavLink>
          <NavLink href="/policies">Envíos & Devoluciones</NavLink>
        </nav>

        {/* CENTRO: logo (siempre visible) */}
        <div className="justify-self-center">
          <Link href="/" aria-label="Inicio BYNINIA" className="block">
            {/* Ajustá alto/ancho para el protagonismo */}
            <div className="relative h-9 w-[180px] md:h-10 md:w-[220px]">
              <Image
                src="/logos/TITULO.png" // <-- tu archivo
                alt="BYNINIA"
                fill
                priority
                sizes="220px"
                className="object-contain drop-shadow-[0_0_20px_rgba(255,255,255,0.08)] logo-shine"
              />
            </div>
          </Link>
        </div>

        {/* DERECHA: acciones (cart + redes). En mobile, sólo cart + menú */}
        <div className="flex items-center justify-end gap-3">
          {/* Redes visibles en desktop */}
          <a
            href="https://www.instagram.com/byninia"
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline text-sm text-zinc-300 hover:text-white transition"
          >
            Instagram
          </a>
          <a
            href="https://wa.me/5493510000000"
            target="_blank"
            rel="noreferrer"
            className="hidden md:inline text-sm text-zinc-300 hover:text-white transition"
          >
            WhatsApp
          </a>

          {/* Carrito */}
          <button
            onClick={() => toggle(true)}
            className="rounded-full border border-white/20 px-3 py-1 text-sm hover:border-white/40 transition"
            aria-label={`Abrir carrito (${count})`}
          >
            Carrito ({count})
          </button>

          {/* Menú hamburguesa (solo mobile) */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            className="md:hidden rounded-md border border-white/20 px-3 py-1 text-sm hover:border-white/40 transition"
          >
            Menú
          </button>
        </div>
      </div>

      {/* MENÚ MOBILE: drawer simple */}
      {open && (
        <div className="md:hidden border-t border-white/10 bg-black/92">
          <div className="mx-auto max-w-7xl px-4 py-4 grid gap-3">
            <NavLink href="/products" onClick={() => setOpen(false)}>
              Catálogo
            </NavLink>
            <NavLink href="/about" onClick={() => setOpen(false)}>
              Sobre
            </NavLink>
            <NavLink href="/contact" onClick={() => setOpen(false)}>
              Contacto
            </NavLink>
            <NavLink href="/policies" onClick={() => setOpen(false)}>
              Envíos & Devoluciones
            </NavLink>
            <a
              href="https://www.instagram.com/byninia"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-zinc-300 hover:text-white transition"
              onClick={() => setOpen(false)}
            >
              Instagram
            </a>
            <a
              href="https://wa.me/5493510000000"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-zinc-300 hover:text-white transition"
              onClick={() => setOpen(false)}
            >
              WhatsApp
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
