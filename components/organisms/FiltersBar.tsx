"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

type Props = {
  total: number; // cantidad mostrada (después de filtrar)
  initialQ?: string; // búsqueda inicial
  initialSort?: string; // "relevance" | "price_asc" | "price_desc" | "new"
  initialStock?: string; // "all" | "in"
};

export default function FiltersBar({
  total,
  initialQ,
  initialSort = "relevance",
  initialStock = "all",
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // estado controlado del buscador
  const [q, setQ] = useState(initialQ ?? "");

  const sort = searchParams.get("sort") ?? initialSort;
  const stock = searchParams.get("stock") ?? initialStock;

  const setParam = useCallback(
    (key: string, value?: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (!value || value === "" || value === "relevance" || value === "all") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [router, pathname, searchParams]
  );

  const clearAll = useCallback(() => {
    router.push(pathname, { scroll: false });
  }, [router, pathname]);

  const hasActive = useMemo(() => {
    return Boolean(
      searchParams.get("q") ||
        searchParams.get("sort") ||
        searchParams.get("stock")
    );
  }, [searchParams]);

  return (
    <div className="mb-6 flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 md:flex-row md:items-center md:justify-between">
      {/* izquierda: buscador + resultados */}
      <div className="flex flex-1 items-center gap-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") setParam("q", q.trim());
          }}
          placeholder="Buscar diseño…"
          className="w-full max-w-md rounded-lg border border-white/15 bg-black/50 px-3 py-2 text-sm text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/30"
        />
        <button
          onClick={() => setParam("q", q.trim())}
          className="rounded-lg border border-white/20 px-3 py-2 text-sm text-white/85 hover:border-white/35"
        >
          Buscar
        </button>
        <span className="hidden text-sm text-white/60 md:inline-block">
          {total} resultado{total === 1 ? "" : "s"}
        </span>
      </div>

      {/* derecha: orden + stock + limpiar */}
      <div className="flex items-center gap-3">
        <label className="text-sm text-white/60">Ordenar</label>
        <select
          value={sort}
          onChange={(e) => setParam("sort", e.target.value)}
          className="rounded-lg border border-white/15 bg-black/50 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/30"
        >
          <option value="relevance">Relevancia</option>
          <option value="price_asc">Precio: menor a mayor</option>
          <option value="price_desc">Precio: mayor a menor</option>
          <option value="new">Novedades</option>
        </select>

        <label className="ml-3 text-sm text-white/60">Stock</label>
        <select
          value={stock}
          onChange={(e) => setParam("stock", e.target.value)}
          className="rounded-lg border border-white/15 bg-black/50 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white/30"
        >
          <option value="all">Todos</option>
          <option value="in">Solo disponibles</option>
        </select>

        {hasActive && (
          <button
            onClick={clearAll}
            className="ml-2 rounded-lg border border-white/20 px-3 py-2 text-sm text-white/85 hover:border-white/35"
            aria-label="Limpiar filtros"
          >
            Limpiar
          </button>
        )}
      </div>
    </div>
  );
}
