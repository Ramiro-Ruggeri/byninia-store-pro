import "./globals.css";
import type { ReactNode } from "react";
// Los componentes que necesitas
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
      {/* Añadimos 'bg-grid' y 'bg-repeat' al body. 
        Esto aplica el fondo negro profundo y la rejilla sutil para un look más técnico/underground.
        También aplicamos un padding general en la parte inferior para que el Footer no se pegue.
      */}
      <body className="bg-by-bg bg-grid bg-repeat pb-16">
        {/* Cursor Glow siempre en la capa más baja del contenido */}
        <CursorGlow />

        {/* El Header ahora es "sticky" y tiene un fondo semitransparente (backdrop-blur) 
          para un efecto moderno tipo "vidrio" que se superpone al contenido.
        */}
        <Header />

        {/* El contenedor principal:
          - max-w-7xl es genial.
          - Cambiamos px-4 por px-6 (más espacio horizontal)
          - Le quitamos el py-10 para controlar el padding en cada sección de 'page.tsx' individualmente.
        */}
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 min-h-[70vh]">
          {children}
        </main>

        {/* El Footer y el Drawer de Carrito */}
        <Footer />
        <CartDrawer />
      </body>
    </html>
  );
}
