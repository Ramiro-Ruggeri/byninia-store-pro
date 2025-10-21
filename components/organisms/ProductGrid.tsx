// components/organisms/ProductGrid.tsx
import ProductCard, {
  type ProductCardProps,
} from "@/components/molecules/ProductCard";

export default function ProductGrid({
  products,
}: {
  products: ProductCardProps[];
}) {
  if (!products?.length) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-white/70">
        No hay diseños disponibles por ahora.
      </div>
    );
  }

  return (
    <section
      aria-label="Listado de productos"
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {products.map((p) => (
        <ProductCard key={`${p.id}-${p.slug}`} {...p} />
      ))}
    </section>
  );
}
