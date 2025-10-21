"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Magnetic from "@/components/ux/Magnetic";

/* WhatsApp helper */
const FALLBACK_WA = "5493510000000";
function buildWhatsAppUrl(message?: string) {
  const phone = process.env.NEXT_PUBLIC_WA_PHONE?.trim() || FALLBACK_WA;
  const base = `https://wa.me/${phone}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

export default function Hero() {
  const waMessage =
    "Hola! Vengo de la web BYNINIA. Quiero consultar por los inchoriables: modelo, precio y envíos. ¿Me pasás info?";

  const PrimaryButtonClass =
    "btn-metal btn-shine inline-flex items-center justify-center text-base md:text-lg px-6 md:px-8 py-2.5 md:py-3";
  const SecondaryButtonClass =
    "btn-secondary inline-flex items-center justify-center text-base md:text-lg px-6 md:px-8 py-2.5 md:py-3";

  return (
    <section
      className="relative overflow-hidden rounded-[40px] mt-8 mb-16 p-8 md:p-16 border border-by-line bg-by-card shadow-innerSoft"
      aria-label="Presentación BYNINIA"
    >
      <div
        className="pointer-events-none absolute -right-1/4 -top-1/4 h-3/4 w-3/4
                   rounded-full blur-[110px] opacity-10 bg-white"
      />
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
        <h1 className="h-title max-w-5xl text-5xl sm:text-7xl md:text-8xl leading-[0.95]">
          BYNINIA: <span className="text-by-metal">Inchoriables</span>
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
            >
              Ver catálogo
            </Link>
          </Magnetic>

          {/* Ancla a la grilla (si estás en la home con listado) */}
          <Magnetic strength={0.25}>
            <a
              href="#catalogo"
              className={SecondaryButtonClass}
              aria-label="Ir a los diseños destacados"
            >
              Ver todos los diseños
            </a>
          </Magnetic>

          {/* WhatsApp con mensaje */}
          <Magnetic strength={0.25}>
            <a
              href={buildWhatsAppUrl(waMessage)}
              target="_blank"
              rel="noreferrer"
              className={SecondaryButtonClass}
              aria-label="Consultar por WhatsApp"
            >
              Pedir por WhatsApp
            </a>
          </Magnetic>
        </div>
      </motion.div>

      <div
        className="absolute inset-0 -z-10 bg-grid bg-repeat opacity-[0.05]"
        aria-hidden
      />
    </section>
  );
}
