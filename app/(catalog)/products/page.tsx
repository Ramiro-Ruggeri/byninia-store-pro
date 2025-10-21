"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

// --- Tipos de Datos Simulados ---
type FeaturedProduct = {
  id: string;
  title: string;
  handle: string;
  price: number;
  imageUrl: string;
};

// --- SIMULACIÓN DE DATOS DE PRODUCTOS DESTACADOS ---
const FEATURED_PRODUCTS: FeaturedProduct[] = [
  {
    id: "fp_01",
    title: "Portaencendedor Pink Metal",
    handle: "portaencendedor-pink-metal",
    price: 19999,
    imageUrl: "https://placehold.co/800x1000/262626/f1f1f1?text=ACCESORIO+01",
  },
  {
    id: "fp_02",
    title: "Anillo Duality",
    handle: "anillo-duality",
    price: 9500,
    imageUrl: "https://placehold.co/800x1000/0a0a0a/f1f1f1?text=JOYERIA+02",
  },
  {
    id: "fp_03",
    title: "Collar Cadena Iridiscente",
    handle: "collar-iridiscente",
    price: 15499,
    imageUrl: "https://placehold.co/800x1000/171717/f1f1f1?text=COLLAR+03",
  },
];

const formatPrice = (p: number) => {
  // Formateo para Argentina (ARS, sin decimales)
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(p);
};

// --- COMPONENTE DE TARJETA DE PRODUCTO ---
const ProductCard = ({ product }: { product: FeaturedProduct }) => (
  <a href={`/products/${product.handle}`} className="group block h-full">
    <div className="aspect-[4/5] overflow-hidden bg-gray-100 transition duration-300 group-hover:shadow-lg rounded-sm">
      <img
        src={product.imageUrl}
        alt={product.title}
        className="w-full h-full object-cover transition duration-500 group-hover:scale-[1.03]"
        onError={(e) =>
          (e.currentTarget.src = `https://placehold.co/800x1000/F3F4F6/6B7280?text=SIN+IMAGEN`)
        }
      />
    </div>
    <div className="pt-4 text-center">
      <h3 className="text-base font-medium text-gray-900 group-hover:underline transition duration-150">
        {product.title}
      </h3>
      <p className="mt-1 text-sm text-gray-500">{formatPrice(product.price)}</p>
    </div>
  </a>
);

// --- COMPONENTE PRINCIPAL DE LA PÁGINA ---
export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* 1. Hero Section (Máximo Minimalismo) */}
      <header className="py-24 md:py-36 flex flex-col items-center justify-center text-center px-4">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-tight max-w-4xl leading-tight text-gray-900">
          Diseño que Susurra, No Grita.
        </h1>
        <p className="mt-6 max-w-xl text-lg text-gray-600 font-light">
          BYNINIA: Joyería y accesorios que redefinen la sutileza y la
          atemporalidad. Piezas creadas para durar.
        </p>
        <a
          href="/catalog"
          className="mt-10 inline-flex items-center text-base font-medium py-3 px-6 rounded-md transition-all duration-200 
                     bg-gray-900 text-white shadow-lg hover:bg-gray-700 uppercase tracking-wider"
        >
          Explorar Colección
          <ArrowRight className="w-4 h-4 ml-2" />
        </a>
      </header>

      {/* 2. Sección de Productos Destacados */}
      <section className="py-16 md:py-24 border-t border-gray-100 px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-light text-center text-gray-900 mb-12 uppercase tracking-wider">
          Piezas Destacadas
        </h2>

        {/* Grid de Productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
          {FEATURED_PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* CTA para ver más */}
        <div className="text-center mt-16">
          <a
            href="/catalog"
            className="inline-flex items-center text-sm font-medium transition-all duration-200 
                           text-gray-700 border-b border-gray-400 hover:text-gray-900 hover:border-gray-900 uppercase tracking-widest pb-1"
          >
            Ver todo el Catálogo
          </a>
        </div>
      </section>

      {/* 3. Sección de Filosofía/Manifiesto Sutil */}
      <section className="py-20 bg-gray-50 border-t border-gray-100 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="text-xl font-light text-gray-900 mb-4">
            "La elegancia es un rechazo."
          </h3>
          <p className="text-gray-600 text-sm italic max-w-2xl mx-auto">
            En BYNINIA, creemos en el poder del diseño minimalista. Creamos
            accesorios funcionales y joyas que complementan, no que dominan.
            Materiales premium, durabilidad garantizada y una estética atemporal
            que trasciende las modas pasajeras.
          </p>
        </div>
      </section>

      {/* FOOTER ESPACIO RESERVADO (Simple) */}
      <footer className="py-8 text-center text-xs text-gray-400 border-t border-gray-100">
        © 2025 BYNINIA. Todos los derechos reservados.
      </footer>
    </div>
  );
}
