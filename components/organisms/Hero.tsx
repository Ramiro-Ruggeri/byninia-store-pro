"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Magnetic from "@/components/ux/Magnetic";
import { waLink } from "@/lib/wa"; // ⬅️ helper unificado

export default function Hero() {
  const waMessage =
    "Hola! Vengo de la web BYNINIA. Quiero consultar por los inchoriables: modelo, precio y envíos. ¿Me pasás info?";

  // Botones consistentes con tu tema (sin utilidades custom)
  const PrimaryButtonClass =
    "inline-flex items-center justify-center rounded-lg px-6 md:px-8 py-2.5 md:py-3 text-base md:text-lg font-extrabold text-black transition-transform hover:scale-[1.02]";
  const SecondaryButtonClass =
    "inline-flex items-center justify-center rounded-lg px-6 md:px-8 py-2.5 md:py-3 text-base md:text-lg border-2 border-white/20 text-white/80 hover:border-white/40 transition-colors hover:text-white";

  return (
    <section
      className="relative overflow-hidden rounded-[40px] mt-8 mb-16 p-8 md:p-16 border border-white/10 bg-[var(--by-card)] shadow-2xl"
      aria-label="Presentación BYNINIA"
    >
      {/* Glow superior sutil */}
      <div
        className="pointer-events-none absolute -right-1/4 -top-1/4 h-3/4 w-3/4 rounded-full blur-[110px] opacity-10"
        style={{ background: "rgb(var(--color-accent))" }}
      />

      {/* Velo/gradiente muy sutil */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.06]"
        aria-hidden
      >
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Título grande y compacto */}
        <h1 className="h-title max-w-5xl text-5xl sm:text-7xl md:text-8xl leading-[0.95]">
          BYNINIA: <span className="text-white">Inchoriables</span>
        </h1>

        <p className="p-body mt-6 max-w-3xl text-[18px] md:text-xl text-white/80">
          Portaencendedor con cadena anti-robo. Hecho a mano en{" "}
          <strong className="text-white">Córdoba</strong> con materiales de{" "}
          <strong className="text-white">acero premium</strong>.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          {/* Ver catálogo → /products */}
          <Magnetic strength={0.25}>
            <Link
              href="/products"
              className={PrimaryButtonClass}
              aria-label="Ver catálogo"
              style={{ background: "rgb(var(--color-accent))" }}
            >
              Ver catálogo
            </Link>
          </Magnetic>

          {/* Ir directo a la grilla del catálogo (en /products#catalogo) */}
          <Magnetic strength={0.25}>
            <a
              href="/products#catalogo"
              className={SecondaryButtonClass}
              aria-label="Ir a los diseños destacados"
            >
              Ver todos los diseños
            </a>
          </Magnetic>

          {/* WhatsApp con mensaje prellenado (helper maneja móvil/web) */}
          <Magnetic strength={0.25}>
            <a
              href={waLink(waMessage)}
              target="_blank"
              rel="noreferrer noopener"
              className={SecondaryButtonClass}
              aria-label="Consultar por WhatsApp"
            >
              Pedir por WhatsApp
            </a>
          </Magnetic>
        </div>
      </motion.div>

      {/* Rejilla sutil de fondo, ultra tenue */}
      <div
        className="absolute inset-0 -z-10 bg-grid bg-repeat opacity-[0.05]"
        aria-hidden
      />
    </section>
  );
}
