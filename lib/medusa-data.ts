// lib/medusa-data.ts
// Catálogo 100% local (sin Medusa). Usado por ProductGrid, PDP, etc.

export type ProductCardProps = {
  id: string;
  slug: string;
  title: string;
  price: number; // en centavos
  thumbnail?: string;
  /** Imágenes extra para la PDP (ProductGallery). */
  images?: { url: string }[];
  isNew?: boolean;
  lowStock?: boolean;
};

/* =========================
   PRODUCTOS LOCALES
   ========================= */

/**
 * Las imágenes deben existir en:
 *   /public/images/products/...
 *
 * Core (Inchoriables):
 *   rockstar.jpg
 *   rockstar2.jpg
 *   gatacool.jpg
 *   gatacool2.jpg
 *   ferne.jpg
 *   ferne2.jpg
 *   conejorock.jpg
 *   conejorock2.jpg
 *   ung.jpg
 *   ung2.jpg
 *   noesperes.jpg
 *   noesperes2.jpg
 *   hotchilli.jpg
 *   bandida1.jpg
 *   bandida2.jpg
 *
 * Edición limitada:
 *   helloKittyFlower.jpg
 *   helloKittyClassic.jpg
 *   helloKittyHeart.jpg
 *   helloKittyHeart2.jpg
 *   helloKittyLove.jpg
 *   kuromiLove.jpg
 *   kuromiLove(1).jpg
 *   kuromiLove(2).jpg
 */

export const LOCAL_PRODUCTS: ProductCardProps[] = [
  // =========================
  // INCHORIABLES CORE
  // =========================
  {
    id: "rockstar",
    slug: "rockstar",
    title: "Inchoriable Rockstar",
    price: 249900,
    thumbnail: "/images/products/rockstar.jpg",
    images: [{ url: "/images/products/rockstar2.jpg" }],
    isNew: true,
    lowStock: false,
  },
  {
    id: "gata-cool",
    slug: "gata-cool",
    title: "Inchoriable Gata Cool",
    price: 249900,
    thumbnail: "/images/products/gatacool.jpg",
    images: [{ url: "/images/products/gatacool2.jpg" }],
    isNew: true,
    lowStock: false,
  },
  {
    id: "ferne",
    slug: "ferne",
    title: "Inchoriable Ferne’",
    price: 249900,
    thumbnail: "/images/products/ferne.jpg",
    images: [{ url: "/images/products/ferne2.jpg" }],
    isNew: true,
    lowStock: false,
  },
  {
    id: "conejo-rock",
    slug: "conejo-rock",
    title: "Inchoriable Conejo Rock",
    price: 259900,
    thumbnail: "/images/products/conejorock.jpg",
    images: [{ url: "/images/products/conejorock2.jpg" }],
    isNew: true,
    lowStock: true,
  },
  {
    id: "un-g",
    slug: "un-g",
    title: "Inchoriable Un G",
    price: 259900,
    thumbnail: "/images/products/ung.jpg",
    images: [{ url: "/images/products/ung2.jpg" }],
    isNew: true,
    lowStock: false,
  },
  {
    id: "no-esperes-nada-de-mi",
    slug: "no-esperes-nada-de-mi",
    title: "No esperes nada de mí",
    price: 259900,
    thumbnail: "/images/products/noesperes.jpg",
    images: [{ url: "/images/products/noesperes2.jpg" }],
    isNew: false,
    lowStock: true,
  },
  {
    id: "hot-chilli",
    slug: "hot-chilli",
    title: "Inchoriable Hot Chilli",
    price: 269900,
    thumbnail: "/images/products/hotchilli.jpg",
    // Si más adelante tenés hotchilli2.jpg, lo agregás acá:
    // images: [{ url: "/images/products/hotchilli2.jpg" }],
    isNew: true,
    lowStock: false,
  },
  {
    id: "bandida",
    slug: "bandida",
    title: "Inchoriable Bandida",
    price: 259900,
    thumbnail: "/images/products/bandida1.jpg",
    images: [{ url: "/images/products/bandida2.jpg" }],
    isNew: true,
    lowStock: true,
  },

  // =========================
  // EDICIÓN LIMITADA HELLO KITTY
  // =========================
  {
    id: "hello-kitty-flower",
    slug: "hello-kitty-flower",
    title: "Hello Kitty Flower",
    price: 299900,
    thumbnail: "/images/products/helloKittyFlower.jpg",
    isNew: true,
    lowStock: true,
  },
  {
    id: "hello-kitty-classic",
    slug: "hello-kitty-classic",
    title: "Hello Kitty Classic",
    price: 299900,
    thumbnail: "/images/products/helloKittyClassic.jpg",
    isNew: true,
    lowStock: true,
  },
  {
    id: "hello-kitty-heart",
    slug: "hello-kitty-heart",
    title: "Hello Kitty Heart",
    price: 299900,
    thumbnail: "/images/products/helloKittyHeart.jpg",
    images: [{ url: "/images/products/helloKittyHeart2.jpg" }],
    isNew: true,
    lowStock: true,
  },
  {
    id: "hello-kitty-love",
    slug: "hello-kitty-love",
    title: "Hello Kitty <3",
    price: 299900,
    thumbnail: "/images/products/helloKittyLove.jpg",
    isNew: true,
    lowStock: true,
  },
  {
    id: "kuromi-love",
    slug: "kuromi-love",
    title: "Kuromi Love",
    price: 309900,
    thumbnail: "/images/products/kuromiLove.jpg",
    images: [
      { url: "/images/products/kuromiLove(1).jpg" },
      { url: "/images/products/kuromiLove(2).jpg" },
    ],
    isNew: true,
    lowStock: true,
  },
];

/* Helpers para grupos */

export const STANDARD_PRODUCTS = LOCAL_PRODUCTS.filter(
  (p) => !p.slug.startsWith("hello-kitty") && !p.slug.startsWith("kuromi")
);

export const HELLO_KITTY_PRODUCTS = LOCAL_PRODUCTS.filter(
  (p) => p.slug.startsWith("hello-kitty") || p.slug.startsWith("kuromi")
);

/* =========================
   API COMPATIBLE
   ========================= */

type ListOpts =
  | number
  | {
      limit?: number;
      page?: number; // 1-based
      offset?: number; // 0-based
      q?: string;
      category_id?: string;
    };

export type PagedResult<T> = {
  items: T[];
  total: number;
  page: number;
  perPage: number;
  pages: number;
  count: number;
  limit: number;
  offset: number;
};

function resolvePagination(opts: ListOpts) {
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

  return { limit, page, offset };
}

/** Lista simple de productos (front-only) */
export async function listProducts(
  opts: ListOpts = 24
): Promise<ProductCardProps[]> {
  const { items } = await listProductsPaged(opts);
  return items;
}

/** Lista paginada (front-only) */
export async function listProductsPaged(
  opts: ListOpts = 24
): Promise<PagedResult<ProductCardProps>> {
  const { limit, page, offset } = resolvePagination(opts);
  const total = LOCAL_PRODUCTS.length;
  const items = LOCAL_PRODUCTS.slice(offset, offset + limit);
  const pages = Math.max(1, Math.ceil(total / limit));

  return {
    items,
    total,
    page,
    perPage: limit,
    pages,
    count: total,
    limit,
    offset,
  };
}

/** Detalle por handle/slug para la PDP */
export async function getProductByHandle(handle: string) {
  const prod = LOCAL_PRODUCTS.find((p) => p.slug === handle || p.id === handle);

  if (!prod)
    return {
      raw: null,
      card: null as unknown as ProductCardProps,
    };

  return {
    raw: prod,
    card: prod as ProductCardProps,
  };
}

/** Helper que usa el Home: como antes, pero 100% local */
export async function getProducts(
  limit: number = 24,
  offset: number = 0
): Promise<{
  products: ProductCardProps[];
  count: number;
  limit: number;
  offset: number;
}> {
  const total = LOCAL_PRODUCTS.length;
  const items = LOCAL_PRODUCTS.slice(offset, offset + limit);

  return {
    products: items,
    count: total,
    limit,
    offset,
  };
}
