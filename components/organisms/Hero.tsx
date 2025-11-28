// components/organisms/Hero.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Magnetic from "@/components/ux/Magnetic";
import { waLink } from "@/lib/wa";

const SLIDES = [
  { src: "/hero/look-1.jpg", alt: "Accesorios BYNINIA look 1" },
  { src: "/hero/look-2.jpg", alt: "Accesorios BYNINIA look 2" },
  { src: "/hero/look-3.jpg", alt: "Accesorios BYNINIA look 3" },
  { src: "/hero/look-4.jpg", alt: "Accesorios BYNINIA look 4" },
];

const INTERVAL = 4200;

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setIndex((prev) => (prev + 1) % SLIDES.length),
      INTERVAL
    );
    return () => clearInterval(id);
  }, []);

  const waMessage =
    "Hola! Vengo de la web BYNINIA. Quiero info de los accesorios de cadena & metal.";

  const primaryBtn =
    "inline-flex items-center justify-center rounded-full px-7 py-3 text-sm md:text-base font-extrabold text-black tracking-tight";
  const ghostBtn =
    "inline-flex items-center justify-center rounded-full px-7 py-3 text-sm md:text-base border border-white/25 text-white/80 hover:border-white hover:text-white";

  return (
    <section
      aria-label="Hero BYNINIA"
      className="w-full border-b border-white/10"
    >
      <div className="mx-auto max-w-6xl lg:max-w-7xl px-4 md:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-10 py-10 md:py-14 lg:py-16 min-h-[70vh]">
          {/* TEXTO */}
          <div className="flex-1 flex flex-col justify-center max-w-xl">
            {/* Faja superior sutil */}
            <p className="text-[11px] md:text-xs tracking-[0.25em] uppercase text-white/50 mb-3">
              BYNINIA • ACCESORIOS DE CADENA &amp; METAL · HECHO EN ARGENTINA
            </p>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight">
              BYNINIA
            </h1>

            <p className="mt-4 text-sm md:text-base text-white/75 max-w-md">
              Accesorios nocturnos de cadena &amp; metal que le suben el nivel a
              cualquier outfit en segundos, con envíos a toda Argentina.
            </p>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <Magnetic strength={0.25}>
                <Link
                  href="/products"
                  className={primaryBtn}
                  style={{ background: "rgb(var(--color-accent))" }}
                >
                  Ver catálogo
                </Link>
              </Magnetic>

              <Magnetic strength={0.25}>
                <a
                  href={waLink(waMessage)}
                  target="_blank"
                  rel="noreferrer"
                  className={ghostBtn}
                >
                  Hablar por WhatsApp
                </a>
              </Magnetic>
            </div>

            <button
              className="mt-4 text-[11px] text-white/55 underline-offset-4 hover:underline w-fit"
              onClick={() =>
                document
                  .getElementById("catalogo")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Ver todos los accesorios
            </button>

            {/* Línea discreta abajo */}
            <p className="mt-8 text-[11px] md:text-[12px] tracking-[0.28em] uppercase text-white/40">
              accesorios de cadena &amp; metal
            </p>
          </div>

          {/* SLIDER IMÁGENES */}
          <div className="flex-1 lg:min-h-[430px] xl:min-h-[480px] relative">
            <div className="relative h-[320px] sm:h-[380px] md:h-[420px] lg:h-full w-full">
              <AnimatePresence initial={false} mode="wait">
                {SLIDES.map(
                  (slide, i) =>
                    i === index && (
                      <motion.div
                        key={slide.src}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        className="absolute inset-0"
                      >
                        <Image
                          src={slide.src}
                          alt={slide.alt}
                          fill
                          className="object-contain object-center"
                          sizes="(min-width: 1024px) 50vw, 100vw"
                          priority={i === 0}
                        />
                      </motion.div>
                    )
                )}
              </AnimatePresence>

              {/* Gradiente suave para mobile */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-l from-black/40 via-transparent to-black/10 lg:bg-none" />

              {/* Dots inferiores derecha */}
              <div className="absolute bottom-4 right-4 flex gap-1.5">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIndex(i)}
                    className={`h-[2px] sm:h-[3px] rounded-full transition-all ${
                      i === index ? "w-6 bg-white" : "w-3 bg-white/40"
                    }`}
                    aria-label={`Ver look ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
