// lib/medusa-data.ts
// Versión FRONT-ONLY (sin Medusa).
// Expone la misma API que antes, pero usando un listado fijo de productos
// en memoria para que el proyecto funcione sin backend.

// ----------------- Tipos -----------------

export type ProductCardProps = {
  id: string;
  slug: string;
  title: string;
  price: number; // en centavos
  thumbnail?: string;
  isNew?: boolean;
  lowStock?: boolean;
};

// Opciones para listar productos (mantenemos el tipo para compatibilidad)
type ListOpts =
  | number
  | {
      limit?: number;
      page?: number; // 1-based
      offset?: number; // 0-based
      q?: string;
      category_id?: string; // ignorado en mock, pero lo dejamos
    };

// ----------------- DATA MOCK -----------------

// Acá armamos los Inchoriables a gusto.
// Podés cambiar títulos, precios e imágenes sin problema.
const MOCK_PRODUCTS: ProductCardProps[] = [
  {
    id: "inch-01",
    slug: "inchoriable-black-chain",
    title: "Inchoriable Black Chain",
    price: 249900, // $2499,00
    thumbnail: "/images/products/inchoriable-black-chain.jpg", // asegurate de tener algo en public/...
    isNew: true,
    lowStock: false,
  },
  {
    id: "inch-02",
    slug: "inchoriable-silver-drip",
    title: "Inchoriable Silver Drip",
    price: 269900,
    thumbnail: "/images/products/inchoriable-silver-drip.jpg",
    isNew: true,
    lowStock: true,
  },
  {
    id: "inch-03",
    slug: "inchoriable-gold-night",
    title: "Inchoriable Gold Night",
    price: 299900,
    thumbnail: "/images/products/inchoriable-gold-night.jpg",
    isNew: false,
    lowStock: false,
  },
  {
    id: "inch-04",
    slug: "inchoriable-gunmetal",
    title: "Inchoriable Gunmetal",
    price: 259900,
    thumbnail: "/images/products/inchoriable-gunmetal.jpg",
    isNew: false,
    lowStock: true,
  },
  {
    id: "inch-05",
    slug: "inchoriable-spiked",
    title: "Inchoriable Spiked Edition",
    price: 279900,
    thumbnail: "/images/products/inchoriable-spiked.jpg",
    isNew: true,
    lowStock: false,
  },
  {
    id: "inch-06",
    slug: "inchoriable-minimal",
    title: "Inchoriable Minimal",
    price: 219900,
    thumbnail: "/images/products/inchoriable-minimal.jpg",
    isNew: false,
    lowStock: false,
  },
];

// Si quisieras, acá podrías hacer una pequeña normalización extra,
// pero el mock ya respeta ProductCardProps.

// ----------------- Helpers internos -----------------

function normalizeOpts(opts: ListOpts = 24): {
  limit: number;
  page: number;
  offset: number;
  q?: string;
} {
  const limit = typeof opts === "number" ? opts : Math.max(1, opts.limit ?? 24);

  const page =
    typeof opts === "number"
      ? 1
      : typeof opts.offset === "number"
      ? Math.floor(opts.offset / limit) + 1
      : Math.max(1, opts.page ?? 1);

  const offset =
    typeof opts === "number"
      ? 0
      : typeof opts.offset === "number"
      ? Math.max(0, opts.offset)
      : (page - 1) * limit;

  const q = typeof opts === "number" ? undefined : opts.q;

  return { limit, page, offset, q };
}

function applySearch(products: ProductCardProps[], q?: string) {
  if (!q || !q.trim()) return products;
  const needle = q.trim().toLowerCase();
  return products.filter((p) =>
    `${p.title} ${p.slug}`.toLowerCase().includes(needle)
  );
}

// ----------------- API pública (mock) -----------------

/**
 * Lista simple de productos para el grid.
 * Mantiene la misma firma que antes, pero sin fetch.
 */
export async function listProducts(
  opts: ListOpts = 24
): Promise<ProductCardProps[]> {
  const { limit, offset, q } = normalizeOpts(opts);

  const filtered = applySearch(MOCK_PRODUCTS, q);
  const slice = filtered.slice(offset, offset + limit);

  return slice;
}

// Resultado paginado (igual que antes)
export type PagedResult<T> = {
  items: T[];
  total: number;
  page: number; // 1-based
  perPage: number;
  pages: number;
  // compat:
  count: number;
  limit: number;
  offset: number;
};

/**
 * Igual que listProducts, pero con metadata de paginación.
 */
export async function listProductsPaged(
  opts: ListOpts = 24
): Promise<PagedResult<ProductCardProps>> {
  const { limit, page, offset, q } = normalizeOpts(opts);

  const filtered = applySearch(MOCK_PRODUCTS, q);
  const total = filtered.length;
  const items = filtered.slice(offset, offset + limit);
  const pages = Math.max(1, Math.ceil(total / limit));

  return {
    items,
    total,
    page,
    perPage: limit,
    pages,
    // compat:
    count: total,
    limit,
    offset,
  };
}

/**
 * Detalle por handle/slug (para PDP).
 * Busca en el mock por slug o id.
 */
export async function getProductByHandle(handle: string) {
  const prod =
    MOCK_PRODUCTS.find(
      (p) =>
        p.slug.toLowerCase() === handle.toLowerCase() ||
        p.id.toLowerCase() === handle.toLowerCase()
    ) || null;

  if (!prod) {
    return {
      raw: null,
      card: null as unknown as ProductCardProps,
    };
  }

  return {
    raw: prod,
    card: prod,
  };
}

/**
 * Helper que usa Home:
 *   const { products } = await getProducts(24, 0)
 */
export async function getProducts(
  limit: number = 24,
  offset: number = 0
): Promise<{
  products: ProductCardProps[];
  count: number;
  limit: number;
  offset: number;
}> {
  const { items, count } = await listProductsPaged({ limit, offset });

  return {
    products: items,
    count,
    limit,
    offset,
  };
}
