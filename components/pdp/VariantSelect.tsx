"use client";

import { useMemo, useState } from "react";
import { ChevronDown, Send } from "lucide-react";

function formatARS(cents: number) {
  const safe = Number.isFinite(cents) ? cents : 0;
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(Math.round(safe / 100));
}

const WA_PHONE = process.env.NEXT_PUBLIC_WA_PHONE || "5493510000000";
function waUrl(text: string) {
  return `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(text)}`;
}

export type VariantUI = { id: string; title: string; priceCents: number };

export default function VariantSelect({
  productTitle,
  variants,
  defaultPriceCents,
}: {
  productTitle: string;
  variants: VariantUI[];
  defaultPriceCents: number;
}) {
  const safeDefault: VariantUI = {
    id: "default",
    title: "Única",
    priceCents: defaultPriceCents,
  };

  const [current, setCurrent] = useState<VariantUI>(variants[0] ?? safeDefault);
  const price = Number.isFinite(current?.priceCents)
    ? current.priceCents
    : defaultPriceCents;

  const waMessage = useMemo(() => {
    const vtxt = current?.title ? ` en la variante "${current.title}"` : "";
    return `Hola! Me gustaría consultar por el producto "${productTitle}"${vtxt}. Precio: ${formatARS(
      price
    )}. ¿Cuál es el siguiente paso para el pedido?`;
  }, [current, price, productTitle]);

  return (
    <>
      {variants.length > 0 && (
        <div className="mb-6">
          <label
            htmlFor="variant"
            className="block text-sm font-medium text-gray-700 mb-2 uppercase tracking-wider"
          >
            Seleccionar Variante
          </label>
          <div className="relative">
            <select
              id="variant"
              value={current.id}
              onChange={(e) => {
                const v = variants.find((x) => x.id === e.target.value);
                setCurrent(v ?? safeDefault);
              }}
              className="appearance-none w-full bg-white border border-gray-300 text-gray-900 text-base py-3 px-4 rounded-md focus:ring-gray-900 focus:border-gray-900 transition-colors cursor-pointer pr-10"
            >
              {variants.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.title} ({formatARS(v.priceCents)})
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none text-gray-400" />
          </div>
        </div>
      )}

      <p className="text-xl font-semibold text-gray-600 mb-6 border-b border-gray-200 pb-4">
        {formatARS(price)}
      </p>

      <a
        href={waUrl(waMessage)}
        target="_blank"
        rel="noreferrer"
        className="w-full inline-flex items-center justify-center text-base font-medium py-3 px-6 rounded-md transition-all duration-200 
                   bg-gray-900 text-white shadow-md hover:bg-gray-700 uppercase tracking-wider"
      >
        <Send className="w-4 h-4 mr-2" />
        Consultar por WhatsApp
      </a>
      <p className="text-xs text-gray-500 mt-2 text-center">
        Te responderemos a la brevedad.
      </p>
    </>
  );
}
