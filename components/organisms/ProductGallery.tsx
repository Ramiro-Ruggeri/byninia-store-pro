// components/organisms/ProductGallery.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Share2, X, ZoomIn } from "lucide-react";

type Props = {
  images: { url: string; alt: string }[];
  title: string;
};

export default function ProductGallery({ images, title }: Props) {
  const safeImages =
    images && images.length > 0
      ? images
      : [{ url: "/placeholder-product.jpg", alt: title }];

  const [index, setIndex] = useState(0);
  const [zoomOpen, setZoomOpen] = useState(false);

  const current = safeImages[index];

  const goNext = () => {
    setIndex((prev) => (prev + 1) % safeImages.length);
  };

  const goPrev = () => {
    setIndex((prev) => (prev - 1 + safeImages.length) % safeImages.length);
  };

  const handleShare = async () => {
    try {
      const url = window.location.href;
      const data = { title, url };

      if (navigator.share) {
        await navigator.share(data);
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
        alert("Link del producto copiado al portapapeles.");
      } else {
        alert("No se pudo compartir automáticamente este enlace.");
      }
    } catch {
      // silencioso
    }
  };

  return (
    <>
      {/* CONTENEDOR PRINCIPAL */}
      <div className="space-y-4">
        {/* Imagen grande */}
        <div className="relative w-full aspect-[4/5] md:aspect-[4/4] overflow-hidden rounded-3xl border border-white/10 bg-black/60">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.url}
              className="relative w-full h-full"
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -16 }}
              transition={{ duration: 0.25 }}
            >
              <Image
                src={current.url}
                alt={current.alt}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-contain md:object-cover"
                onClick={() => setZoomOpen(true)}
                priority={false}
              />

              {/* Botón de zoom (esquina inferior derecha) */}
              <button
                type="button"
                onClick={() => setZoomOpen(true)}
                className="absolute bottom-4 right-4 inline-flex items-center gap-1 rounded-full bg-black/70 px-3 py-1.5 text-xs text-white/80 border border-white/20 backdrop-blur hover:bg-black/80 transition"
              >
                <ZoomIn size={14} />
                <span>Zoom</span>
              </button>
            </motion.div>
          </AnimatePresence>

          {/* Flechas del slider */}
          {safeImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={goPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 border border-white/20 text-white/80 hover:bg-black/80 transition"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-2 border border-white/20 text-white/80 hover:bg-black/80 transition"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}

          {/* Botón compartir estilo iOS (arriba derecha) */}
          <button
            type="button"
            onClick={handleShare}
            className="absolute top-4 right-4 inline-flex items-center gap-2 rounded-full bg-black/70 px-3.5 py-1.5 text-xs md:text-sm text-white/85 border border-white/20 backdrop-blur hover:bg-black/80 transition"
          >
            <Share2 size={14} />
            <span>Compartir producto</span>
          </button>
        </div>

        {/* Thumbnails */}
        {safeImages.length > 1 && (
          <div className="flex justify-center md:justify-start gap-3">
            {safeImages.map((img, i) => (
              <button
                key={img.url + i}
                type="button"
                onClick={() => setIndex(i)}
                className={`relative h-20 w-16 md:h-24 md:w-20 overflow-hidden rounded-2xl border ${
                  i === index
                    ? "border-[rgb(var(--color-accent))]"
                    : "border-white/15 hover:border-white/40"
                } bg-black/70`}
              >
                <Image
                  src={img.url}
                  alt={img.alt}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* MODAL DE ZOOM */}
      <AnimatePresence>
        {zoomOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              onClick={() => setZoomOpen(false)}
              className="absolute top-4 right-4 inline-flex items-center justify-center rounded-full bg-black/80 p-2 text-white border border-white/30 hover:bg-black transition"
            >
              <X size={18} />
            </button>

            <div className="relative w-[92vw] max-w-3xl aspect-[4/5]">
              <Image
                src={current.url}
                alt={current.alt}
                fill
                className="object-contain"
                sizes="(min-width: 1024px) 50vw, 92vw"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
