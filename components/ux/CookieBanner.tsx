"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const STORAGE_KEY = "byninia_cookies_accepted_v1";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Solo se muestra si todavía no se aceptó
    const accepted =
      typeof window !== "undefined"
        ? window.localStorage.getItem(STORAGE_KEY)
        : null;

    if (!accepted) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, "true");
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40">
      <div className="mx-auto max-w-5xl px-4 pb-4">
        <div className="rounded-2xl border border-white/15 bg-black/85 backdrop-blur-md px-5 py-4 md:px-6 md:py-5 shadow-[0_18px_70px_rgba(0,0,0,0.7)] flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div className="text-xs md:text-sm text-white/80">
            Usamos cookies para mejorar tu experiencia en BYNINIA (analytics
            básicos y recordar tu carrito).{" "}
            <span className="text-white/50">Podés leer más en nuestra</span>{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 text-white/80 hover:text-white"
            >
              política de privacidad
            </Link>
            .
          </div>

          <div className="flex items-center gap-3 self-end md:self-auto">
            <button
              type="button"
              onClick={handleAccept}
              className="rounded-full px-5 py-2 text-xs md:text-sm font-semibold text-black"
              style={{ background: "rgb(var(--color-accent))" }}
            >
              Aceptar cookies
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
