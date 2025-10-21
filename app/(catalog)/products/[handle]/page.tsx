"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Send, ChevronDown, ShoppingBag } from "lucide-react";

// --- Tipos de Datos Simulados de Medusa ---
type ProductVariant = {
  id: string;
  title: string;
  price: number;
};

type Product = {
  id: string;
  title: string;
  handle: string;
  description: string;
  images: { url: string }[];
  variants: ProductVariant[];
  basePrice: number;
};

// --- SIMULACIÓN DE DATOS Y FETCHING ---
const SIMULATED_PRODUCTS: Record<string, Product> = {
  "portaencendedor-pink-metal": {
    id: "prod_01",
    title: "Portaencendedor 'Pink Metal' | BYNINIA",
    handle: "portaencendedor-pink-metal",
    description:
      "Portaencendedor de acero inoxidable con baño de titanio iridiscente. Incluye cadena larga anti-robo (70cm). Diseño ultra resistente y 100% original. Una pieza de declaración sutil y atemporal.",
    images: [
      { url: "https://placehold.co/800x1000/262626/f1f1f1?text=BYNINIA+01" },
      { url: "https://placehold.co/800x1000/171717/f1f1f1?text=BYNINIA+02" },
      { url: "https://placehold.co/800x1000/0a0a0a/f1f1f1?text=BYNINIA+03" },
    ],
    basePrice: 19999,
    variants: [
      { id: "var_01", title: "Cadena 60cm (Minimal)", price: 19999 },
      { id: "var_02", title: "Cadena 70cm (Estándar)", price: 21999 },
      { id: "var_03", title: "Cadena 90cm (Maxi)", price: 23999 },
    ],
  },
};

const formatPrice = (p: number) => {
  // Formateo para Argentina (ARS, sin decimales)
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(p);
};

// --- WhatsApp helper ---
const FALLBACK_WA = "5493510000000";
function buildWhatsAppUrl(message?: string) {
  const phone = FALLBACK_WA;
  const base = `https://wa.me/${phone}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}

// --- COMPONENTE PRINCIPAL: ProductDetailPage ---
// Se añade un valor por defecto para 'params' para evitar el error de desestructuración
// cuando se renderiza en el entorno de previsualización sin props.
export default function ProductDetailPage({
  params = { handle: "portaencendedor-pink-metal" },
}: {
  params?: { handle: string };
}) {
  const { handle } = params;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null
  );
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Lógica de Carga (Simulación)
  useEffect(() => {
    setLoading(true);
    const data = SIMULATED_PRODUCTS[handle];
    if (data) {
      setProduct(data);
      // Selecciona la primera variante por defecto
      setSelectedVariant(data.variants[0]);
    } else {
      setProduct(null);
    }
    setLoading(false);
  }, [handle]);

  // Lógica de Precios y Mensaje WA
  const currentPrice = selectedVariant?.price || product?.basePrice || 0;
  const waMessage = useMemo(() => {
    if (!product || !selectedVariant)
      return "Hola, estoy interesado en un producto de BYNINIA. ¿Me das más info?";
    return `Hola! Me gustaría consultar por el producto "${
      product.title
    }" en la variante "${selectedVariant.title}". Precio: ${formatPrice(
      currentPrice
    )}. ¿Cuál es el siguiente paso para el pedido?`;
  }, [product, selectedVariant, currentPrice]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-gray-900 animate-pulse text-lg font-medium">
          Cargando producto...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-gray-500 text-xl font-medium">
          Producto no encontrado (404).
        </div>
      </div>
    );
  }

  // --- Renderizado del Producto (Minimalista) ---
  return (
    <div className="min-h-screen bg-white text-gray-900 p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb / Navegación Sutil */}
        <p className="text-gray-500 text-xs mb-8 uppercase tracking-wider">
          <a href="/" className="hover:text-gray-900 transition duration-150">
            Inicio
          </a>{" "}
          /
          <a
            href="/catalog"
            className="hover:text-gray-900 transition duration-150 ml-1"
          >
            Catálogo
          </a>{" "}
          /
          <span className="text-gray-900 font-medium ml-1">
            {product.title.split("|")[0].trim()}
          </span>
        </p>

        {/* Layout Principal: 50/50 - Galería y Detalles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Columna 1: Galería de Imágenes */}
          <div className="space-y-4">
            {/* Imagen Principal Grande */}
            <div className="aspect-[4/5] overflow-hidden bg-gray-100 border border-gray-200">
              <img
                src={product.images[currentImageIndex]?.url}
                alt={`${product.title} - Vista principal`}
                className="w-full h-full object-cover transition duration-300 hover:scale-105"
                onError={(e) =>
                  (e.currentTarget.src = `https://placehold.co/800x1000/F3F4F6/6B7280?text=SIN+IMAGEN`)
                }
              />
            </div>

            {/* Selector de Miniaturas (Sutil) */}
            <div className="flex gap-2 justify-start">
              {product.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-16 h-16 md:w-20 md:h-20 overflow-hidden border transition-all ${
                    index === currentImageIndex
                      ? "border-gray-900 shadow-md"
                      : "border-gray-300 hover:border-gray-500"
                  } bg-gray-100`}
                  aria-label={`Ver imagen ${index + 1}`}
                >
                  <img
                    src={img.url}
                    alt={`Miniatura ${index + 1}`}
                    className="w-full h-full object-cover opacity-80"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Columna 2: Detalles y Checkout */}
          <div className="lg:sticky lg:top-8 h-fit pt-4 lg:pt-0">
            {/* Título y Precio */}
            <h1 className="text-4xl font-light text-gray-900 leading-snug mb-2">
              {product.title.split("|")[0].trim()}
            </h1>
            <p className="text-xl font-semibold text-gray-600 mb-6 border-b border-gray-200 pb-4">
              {formatPrice(currentPrice)}
            </p>

            {/* Selector de Variantes (Minimalista) */}
            <div className="mb-6">
              <label
                htmlFor="variant-select"
                className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider"
              >
                Seleccionar Variante
              </label>
              <div className="relative">
                <select
                  id="variant-select"
                  value={selectedVariant?.id || ""}
                  onChange={(e) => {
                    const variant = product.variants.find(
                      (v) => v.id === e.target.value
                    );
                    setSelectedVariant(variant || null);
                  }}
                  className="appearance-none w-full bg-white border border-gray-300 text-gray-900 text-base py-3 px-4 rounded-md focus:ring-gray-900 focus:border-gray-900 transition-colors cursor-pointer pr-10"
                >
                  {product.variants.map((v) => (
                    <option key={v.id} value={v.id}>
                      {v.title} ({formatPrice(v.price)})
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none text-gray-400" />
              </div>
            </div>

            {/* Botón de Checkout/WhatsApp (Acción principal) */}
            <a
              href={buildWhatsAppUrl(waMessage)}
              target="_blank"
              rel="noreferrer"
              className="w-full inline-flex items-center justify-center text-base font-medium py-3 px-6 rounded-md transition-all duration-200 
                         bg-gray-900 text-white shadow-md hover:bg-gray-700 uppercase tracking-wider disabled:opacity-50"
            >
              <Send className="w-4 h-4 mr-2" />
              Consultar por WhatsApp
            </a>

            <p className="text-xs text-gray-500 mt-2 text-center">
              Te responderemos a la brevedad.
            </p>

            {/* Descripción del Producto */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-3 uppercase tracking-wider">
                Detalles del Producto
              </h3>
              <p className="text-gray-600 whitespace-pre-line text-sm leading-relaxed">
                {product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
