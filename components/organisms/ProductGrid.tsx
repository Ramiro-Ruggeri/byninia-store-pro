// components/organisms/ProductGrid.tsx
import React from "react";
import ProductCard, {
  type ProductCardProps,
} from "@/components/molecules/ProductCard";

type Props = {
  products: ReadonlyArray<ProductCardProps>;
};

export default function ProductGrid({ products }: Props) {
  const hasItems = Array.isArray(products) && products.length > 0;

  if (!hasItems) {
    return (
      <section
        aria-label="Listado de productos vacío"
        className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-white/70"
      >
        No hay diseños disponibles por ahora.
      </section>
    );
  }

  return (
    <section
      aria-label="Listado de productos"
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {products.map((p, idx) => (
        <ProductCard
          key={
            (p.id && `${p.id}`) || (p.slug && `slug-${p.slug}`) || `idx-${idx}`
          }
          {...p}
        />
      ))}
    </section>
  );
}
