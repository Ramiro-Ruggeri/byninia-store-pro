// app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";
import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";
import CartDrawer from "@/components/organisms/CartDrawer";
import CursorGlow from "@/components/ux/CursorGlow";
import CookieBanner from "@/components/ux/CookieBanner";

export const metadata = {
  title: "BYNINIA – Accesorios de cadena & metal",
  description:
    "Accesorios nocturnos de cadena & metal hechos en Argentina, pensados para subirle el nivel a cualquier outfit. Envíos a todo el país.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-black text-white">
        {/* Glow del cursor (pointer-events: none en CSS) */}
        <CursorGlow />

        {/* Header sticky */}
        <Header />

        {/* 
          main sin max-w ni padding global:
          - el Hero puede ocupar todo el ancho.
          - cada sección interna decide su propio container (max-w-7xl, etc.).
        */}
        <main className="min-h-[70vh]">{children}</main>

        {/* Footer, carrito y banner de cookies */}
        <Footer />
        <CartDrawer />
        <CookieBanner />
      </body>
    </html>
  );
}
