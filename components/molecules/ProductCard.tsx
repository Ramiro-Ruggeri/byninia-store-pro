"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useMemo } from "react";

export type ProductCardProps = {
  id: string;
  slug: string;
  title: string;
  price: number; // en centavos
  thumbnail?: string; // /public, http(s) o data-uri
  isNew?: boolean;
  lowStock?: boolean;
};

const FALLBACK_SVG =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='800'>
      <rect width='100%' height='100%' fill='#111213'/>
      <text x='50%' y='50%' fill='#ffffff' font-size='28' font-family='Arial, sans-serif'
        dominant-baseline='middle' text-anchor='middle'>BYNINIA</text>
    </svg>`
  );

// Acepta rutas locales (/), data-uri y http(s)
function isGoodUrl(u?: string) {
  if (!u) return false;
  if (u.startsWith("/")) return true;
  if (u.startsWith("data:image")) return true;
  return /^https?:\/\//i.test(u);
}

function formatARS(cents: number) {
  const safe = Number.isFinite(cents) ? cents : 0;
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(Math.round(safe / 100));
}

export default function ProductCard({
  slug,
  title,
  price,
  thumbnail,
  isNew,
  lowStock,
}: ProductCardProps) {
  const href = useMemo(() => `/products/${encodeURIComponent(slug)}`, [slug]);

  const initialSrc = isGoodUrl(thumbnail)
    ? (thumbnail as string)
    : FALLBACK_SVG;
  const [src, setSrc] = useState<string>(initialSrc);

  return (
    <article className="group rounded-3xl border border-white/10 bg-by-card shadow-innerSoft overflow-hidden">
      <Link
        href={href}
        aria-label={`Ver ${title}`}
        prefetch={false}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-3xl"
      >
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={src}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            sizes="(min-width:1280px) 25vw, (min-width:768px) 33vw, 100vw"
            unoptimized
            onError={() => setSrc(FALLBACK_SVG)}
            priority={false}
          />

          {(isNew || lowStock) && (
            <div className="absolute top-3 left-3 flex gap-2">
              {isNew && (
                <span className="rounded-full bg-white/95 text-black text-[11px] font-semibold px-2.5 py-1 shadow">
                  Nuevo
                </span>
              )}
              {lowStock && (
                <span className="rounded-full bg-black/70 backdrop-blur text-white/85 text-[11px] px-2.5 py-1 border border-white/20">
                  Pocas unidades
                </span>
              )}
            </div>
          )}
        </div>

        <div className="p-4 flex items-center justify-between">
          <h3 className="text-white font-semibold leading-tight line-clamp-2 pr-3">
            {title}
          </h3>
          <span className="text-white/90 text-sm font-bold whitespace-nowrap">
            {formatARS(price)}
          </span>
        </div>
      </Link>
    </article>
  );
}
