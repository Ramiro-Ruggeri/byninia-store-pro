// lib/medusa-data.ts
import { getProducts, getProductByHandle } from "./medusa";

export type StoreProduct = {
  id: string;
  slug: string; // usamos el handle de Medusa
  title: string;
  price: number; // en centavos
  thumbnail?: string;
  images: { url: string; alt: string }[];
  isNew?: boolean;
  lowStock?: boolean;
};

/**
 * Normaliza un producto de Medusa al formato que usa el front de BYNINIA.
 */
function normalizeMedusaProduct(p: any): StoreProduct {
  const slug: string = p.handle || p.slug || p.id;
  const title: string = p.title ?? "Producto BYNINIA";

  // Precio: tomamos el de la primera variante
  let price = 0;
  if (Array.isArray(p.variants) && p.variants.length > 0) {
    const v0 = p.variants[0];
    if (Array.isArray(v0.prices) && v0.prices.length > 0) {
      price = Number(v0.prices[0].amount ?? 0);
    }
  }

  // Construimos array de imágenes: thumbnail + p.images (sin duplicados)
  const imgs: { url: string; alt: string }[] = [];

  if (p.thumbnail) {
    imgs.push({ url: p.thumbnail, alt: title });
  }

  if (Array.isArray(p.images)) {
    for (const img of p.images) {
      const url = typeof img === "string" ? img : img?.url;
      if (!url) continue;
      if (!imgs.find((i) => i.url === url)) {
        imgs.push({ url, alt: title });
      }
    }
  }

  // Si por algún motivo no hay nada, dejamos al menos un placeholder lógico
  if (imgs.length === 0) {
    imgs.push({
      url: "/images/products/placeholder-product.jpg",
      alt: "BYNINIA",
    });
  }

  const thumbnail = imgs[0]?.url;

  // Flags (opcionales) a partir de tags o metadata
  const tags: string[] = Array.isArray(p.tags)
    ? p.tags
        .map((t: any) => (t?.value ?? t?.id ?? "").toString().toLowerCase())
        .filter(Boolean)
    : [];

  const isNew =
    tags.includes("nuevo") || tags.includes("new") || tags.includes("new-drop");

  const lowStock =
    tags.includes("pocas-unidades") ||
    tags.includes("low-stock") ||
    tags.includes("ultimo-stock");

  return {
    id: p.id,
    slug,
    title,
    price,
    thumbnail,
    images: imgs,
    isNew,
    lowStock,
  };
}

/**
 * Trae TODOS los productos (hasta 200) y los normaliza.
 * Como la cantidad de productos es chica, podemos trabajar todo en memoria.
 */
export async function listProducts(): Promise<StoreProduct[]> {
  const data = await getProducts(200, 0);
  const products = Array.isArray((data as any).products)
    ? (data as any).products
    : Array.isArray(data)
    ? data
    : [];

  return products.map(normalizeMedusaProduct);
}

type ListPagedOptions = {
  q?: string;
  limit?: number;
  offset?: number;
};

/**
 * Lista paginada + buscador simple (filtra por título o slug en memoria).
 * Devuelve:
 * - items: productos para la página actual
 * - count: total de resultados filtrados
 */
export async function listProductsPaged(options: ListPagedOptions = {}) {
  const { q = "", limit = 24, offset = 0 } = options;

  const all = await listProducts();

  const query = q.trim().toLowerCase();
  const filtered = query
    ? all.filter((p) => `${p.title} ${p.slug}`.toLowerCase().includes(query))
    : all;

  const items = filtered.slice(offset, offset + limit);
  const count = filtered.length;

  return { items, count };
}

/**
 * Obtiene un solo producto por handle/slug directamente desde Medusa.
 * Útil si en algún momento querés dejar de hacer listProducts()+find().
 */
export async function getProduct(handle: string): Promise<StoreProduct | null> {
  const raw = await getProductByHandle(handle);
  if (!raw) return null;
  return normalizeMedusaProduct(raw);
}
