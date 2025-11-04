// app/layout.tsx
import "./globals.css";
import type { ReactNode } from "react";
import Header from "@/components/organisms/Header";
import Footer from "@/components/organisms/Footer";
import CartDrawer from "@/components/organisms/CartDrawer";
import CursorGlow from "@/components/ux/CursorGlow";

export const metadata = {
  title: "BYNINIA – Inchoriables | Accesorios Anti-Robo",
  description:
    "Portaencendedor con cadena anti-robo. Hecho a mano en Córdoba para el outfit nocturno.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      {/*
        Notas importantes:
        - NO usamos `bg-by-bg` porque no existe en tu tailwind.config.ts.
        - El color base y tipografía ya los aplica globals.css en <html>/<body>.
        - Si querés rejilla de fondo, la aplicamos al main, NO al body,
          así evitamos cualquier efecto "empañado" global.
      */}
      <body>
        {/* CursorGlow: debajo del contenido, no intercepta clicks (pointer-events:none en CSS) */}
        <CursorGlow />

        {/* Header sticky con blur (lo maneja su propio componente) */}
        <Header />

        {/* Contenedor principal del site */}
        <main className="mx-auto min-h-[70vh] max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Si querés la rejilla técnica, activá la siguiente envoltura: */}
          {/* <div className="bg-grid rounded-3xl"> */}
          {children}
          {/* </div> */}
        </main>

        {/* Footer y Cart Drawer */}
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
