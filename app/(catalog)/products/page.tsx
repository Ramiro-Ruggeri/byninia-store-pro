// app/catalog/page.tsx
import Link from "next/link";
import ProductGrid from "@/components/organisms/ProductGrid";
import { listProductsPaged } from "@/lib/medusa-data";

function Title({ children }: { children: React.ReactNode }) {
  return (
    <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
      {children}
    </h1>
  );
}

export default async function CatalogPage({
  searchParams,
}: {
  searchParams?: { q?: string; offset?: string };
}) {
  const rawQ = searchParams?.q?.trim() || "";
  const q = rawQ.length > 0 ? rawQ : "";
  const rawOffset = Number(searchParams?.offset || 0);
  const offset = Number.isFinite(rawOffset) && rawOffset > 0 ? rawOffset : 0;
  const limit = 24;

  const { items, count } = await listProductsPaged({ q, limit, offset });
  const hasPrev = offset > 0;
  const hasNext = offset + limit < count;

  const makeHref = (nextOffset: number) => {
    const safeOffset = Math.max(0, nextOffset);
    const sp = new URLSearchParams();
    if (q) sp.set("q", q);
    if (safeOffset) sp.set("offset", String(safeOffset));
    const query = sp.toString();
    return `/catalog${query ? `?${query}` : ""}`;
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <Title>Catálogo</Title>

        {/* buscador simple: usa GET y recarga server component */}
        <form action="/catalog" className="flex items-center gap-2">
          <input
            type="text"
            name="q"
            defaultValue={q}
            placeholder="Buscar productos…"
            className="rounded-xl bg-white/5 border border-white/10 text-white px-4 py-2 placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
          />
          <button
            type="submit"
            className="rounded-xl bg-white text-black px-4 py-2 font-semibold"
          >
            Buscar
          </button>
        </form>
      </div>

      {/* conteo */}
      <p className="text-white/60 mt-2">
        {count} resultado{count === 1 ? "" : "s"}
        {q ? ` para “${q}”` : ""}
      </p>

      <div className="mt-8">
        <ProductGrid products={items} />
      </div>

      {/* paginación */}
      <div className="flex items-center justify-between mt-10">
        <Link
          href={hasPrev ? makeHref(offset - limit) : "#"}
          aria-disabled={!hasPrev}
          className={`rounded-lg border border-white/10 px-4 py-2 text-white/80 hover:text-white transition ${
            hasPrev ? "" : "pointer-events-none opacity-40"
          }`}
        >
          ← Anterior
        </Link>

        <span className="text-white/60">
          {Math.floor(offset / limit) + 1} /{" "}
          {Math.max(1, Math.ceil(count / limit))}
        </span>

        <Link
          href={hasNext ? makeHref(offset + limit) : "#"}
          aria-disabled={!hasNext}
          className={`rounded-lg border border-white/10 px-4 py-2 text-white/80 hover:text-white transition ${
            hasNext ? "" : "pointer-events-none opacity-40"
          }`}
        >
          Siguiente →
        </Link>
      </div>
    </div>
  );
}
