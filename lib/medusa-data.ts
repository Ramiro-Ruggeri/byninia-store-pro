// lib/medusa-data.ts
// Capa mínima para traer productos desde Medusa Store API con la publishable key.
// Mapea el resultado al shape que usa ProductCard.tsx

export type ProductCardProps = {
  id: string;
  slug: string;
  title: string;
  price: number; // en centavos (nunca NaN)
  thumbnail?: string;
  isNew?: boolean;
  lowStock?: boolean;
};

const BASE_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL?.replace(/\/+$/, "") ||
  "http://localhost:9000";

const PUB_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "";

// Decide estrategia de cache según entorno
const isProd = process.env.NODE_ENV === "production";

/** Fetch helper con headers correctos */
async function medusaGet<T>(path: string, init?: RequestInit): Promise<T> {
  const url = `${BASE_URL}${path}`;
  const res = await fetch(url, {
    method: "GET",
    ...init,
    headers: {
      "x-publishable-api-key": PUB_KEY,
      "content-type": "application/json",
      ...(init?.headers || {}),
    },
    // En dev: datos frescos; en prod: revalidación rápida
    cache: isProd ? "force-cache" : "no-store",
    next: isProd ? { revalidate: 30 } : { revalidate: 0 },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`[Medusa ${res.status}] ${url} -> ${text}`);
  }
  return res.json();
}

/* =========================
   Helpers robustos de precio
   ========================= */

/** Devuelve el primer número finito >= 0 encontrado, o 0. */
function firstNumber(...vals: any[]): number {
  for (const v of vals) {
    const n = Number(v);
    if (Number.isFinite(n) && n >= 0) return n;
  }
  return 0;
}

/** Intenta resolver un precio en centavos desde distintas formas de Medusa (v1/v2). */
function pickPriceCents(p: any): number {
  // Medusa (Store API) suele exponer:
  // - p.price.calculated_price / calculated_price_incl_tax
  // - p.variants[*].calculated_price / prices[*].amount
  // En todos los casos trabajamos en centavos (amount).
  const v0 = p?.variants?.[0];

  const cents = firstNumber(
    // preferidos (calculados por región/listas)
    p?.price?.calculated_price,
    p?.price?.calculated_price_incl_tax,
    // variantes (v2 a veces coloca calculated_price a nivel variante)
    v0?.calculated_price,
    v0?.calculated_price_incl_tax,
    // primer price explícito
    v0?.prices?.[0]?.calculated_price,
    v0?.prices?.[0]?.amount,
    // por si algún backend deja un array suelto en p.prices
    p?.prices?.[0]?.amount
  );

  // Siempre devolver entero en centavos, nunca NaN
  return Math.round(cents || 0);
}

/** Devuelve si hay poco stock mirando la primer variante (o inventory item si viene) */
function computeLowStock(p: any): boolean {
  const qty = firstNumber(
    p?.variants?.[0]?.inventory_quantity,
    p?.variants?.[0]?.inventory?.available_quantity,
    p?.variants?.[0]?.inventory_items?.[0]?.available_quantity
  );
  return qty > 0 && qty <= 5;
}

/** Resuelve un thumbnail seguro. */
function safeThumbnail(p: any): string | undefined {
  const t =
    p?.thumbnail ||
    p?.images?.[0]?.url ||
    p?.variants?.[0]?.thumbnail ||
    p?.variants?.[0]?.images?.[0]?.url;
  return typeof t === "string" && t.length ? t : undefined;
}

/** Mapea Medusa product -> ProductCardProps (a prueba de fallos) */
function toCard(p: any): ProductCardProps {
  return {
    id: p?.id ?? "",
    slug: p?.handle || p?.id || "",
    title: p?.title || "Producto",
    thumbnail: safeThumbnail(p),
    price: pickPriceCents(p), // ← nunca NaN
    isNew:
      !!p?.created_at &&
      Date.now() - new Date(p.created_at).getTime() < 1000 * 60 * 60 * 24 * 30, // 30 días
    lowStock: computeLowStock(p),
  };
}

/** Opciones para listar productos (compatible con tu firma actual) */
type ListOpts =
  | number
  | {
      limit?: number;
      page?: number; // 1-based
      q?: string;
      category_id?: string;
    };

/** Lista de productos para el grid
 * - Compatibilidad: listProducts(12)
 * - Extendido: listProducts({ limit: 12, page: 2, q: "jean" })
 */
export async function listProducts(
  opts: ListOpts = 24
): Promise<ProductCardProps[]> {
  const limit = typeof opts === "number" ? opts : Math.max(1, opts.limit ?? 24);
  const page = typeof opts === "number" ? 1 : Math.max(1, opts.page ?? 1);
  const offset = (page - 1) * limit;

  const url = new URL(`${BASE_URL}/store/products`);
  url.searchParams.set("limit", String(limit));
  url.searchParams.set("offset", String(offset));
  if (typeof opts !== "number" && opts.q) {
    url.searchParams.set("q", opts.q);
  }
  if (typeof opts !== "number" && opts.category_id) {
    url.searchParams.set("category_id", opts.category_id);
  }

  const data = await medusaGet<{ products: any[] }>(
    url.toString().replace(BASE_URL, "")
  );

  return (data.products || []).map(toCard);
}

/** Detalle por handle/slug (para la PDP)
 * NOTA: /store/products/:id trae por id. Para handle es más seguro usar query ?handle=...&limit=1
 */
export async function getProductByHandle(handle: string) {
  const url = new URL(`/store/products`, BASE_URL);
  url.searchParams.set("handle", handle);
  url.searchParams.set("limit", "1");

  const data = await medusaGet<{ products: any[] }>(
    url.toString().replace(BASE_URL, "")
  );

  const prod = Array.isArray(data.products) ? data.products[0] : undefined;
  if (!prod)
    return {
      raw: null,
      card: null as unknown as ProductCardProps,
    };

  return {
    raw: prod,
    card: toCard(prod) as ProductCardProps,
  };
}
