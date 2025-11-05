// app/(catalog)/products/page.tsx
import Link from "next/link";
import type { UrlObject } from "url";
import ProductGrid from "@/components/organisms/ProductGrid";
import { listProductsPaged } from "@/lib/medusa-data";

type Search = Record<string, string | string[] | undefined>;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: Search;
}) {
  const limit = 24;

  // --- sanitize de query ---
  const rawQ = searchParams?.q;
  const q =
    typeof rawQ === "string" && rawQ.trim().length > 0
      ? rawQ.trim()
      : undefined;

  const rawOffset = searchParams?.offset;
  const offset =
    typeof rawOffset === "string" && !Number.isNaN(Number(rawOffset))
      ? Math.max(0, Number(rawOffset))
      : 0;

  // --- datos paginados ---
  const { items, total } = await listProductsPaged({ q, limit, offset });

  const hasPrev = offset > 0;
  const hasNext = offset + limit < total;

  // --- helper para Links compatible con typedRoutes ---
  const makeHref = (nextOffset: number): UrlObject => ({
    pathname: "/products",
    query: {
      ...(q ? { q } : {}),
      offset: Math.max(0, nextOffset),
    },
  });

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-semibold">
          {q ? `Resultados para “${q}”` : "Productos"}
        </h1>
        {typeof q === "string" && q.length > 0 && (
          <span className="text-sm text-white/60">
            {items.length} / {total}
          </span>
        )}
      </div>

      <ProductGrid products={items} />

      {/* Paginación */}
      <div className="flex items-center justify-between mt-10">
        <Link
          href={makeHref(offset - limit)}
          aria-disabled={!hasPrev}
          className={`rounded-lg border border-white/10 px-4 py-2 text-white/80 hover:text-white ${
            hasPrev ? "" : "pointer-events-none opacity-40"
          }`}
        >
          ← Anterior
        </Link>

        <span className="text-white/60">
          {Math.floor(offset / limit) + 1} /{" "}
          {Math.max(1, Math.ceil(total / limit))}
        </span>

        <Link
          href={makeHref(offset + limit)}
          aria-disabled={!hasNext}
          className={`rounded-lg border border-white/10 px-4 py-2 text-white/80 hover:text-white ${
            hasNext ? "" : "pointer-events-none opacity-40"
          }`}
        >
          Siguiente →
        </Link>
      </div>
    </main>
  );
}
