// lib/medusa-data.ts
// Catálogo mock controlado por archivo (sin depender de ningún backend por ahora)

export type MedusaProduct = {
  id: string;
  handle?: string; // usamos como slug si existe
  title: string;
  price: number; // en centavos ARS
  thumbnail?: string; // ruta pública: "/images/products/xxx.jpg"
  tags?: string[];
  inventory_quantity?: number;
};

export const PRODUCT_CATALOG: MedusaProduct[] = [
  {
    id: "inchoriable-negro",
    handle: "inchoriable-negro",
    title: "NO ESPERES NADA DE MI",
    price: 1200000, // $1.200.000 (centavos)
    thumbnail: "/images/products/noesperes.jpg",
    tags: ["new"],
    inventory_quantity: 8,
  },
  {
    id: "inchoriable-kaki",
    handle: "inchoriable-kaki",
    title: "BANDIDA",
    price: 1150000,
    thumbnail: "/images/products/bandida.jpg",
    inventory_quantity: 6,
  },
  {
    id: "inchoriable-chain",
    handle: "inchoriable-chain",
    title: "ROCKSTAR",
    price: 1350000,
    thumbnail: "/images/products/rockstar.jpg",
    tags: ["limited"],
    inventory_quantity: 3,
  },
  {
    id: "inchoriable-silver",
    handle: "inchoriable-silver",
    title: "CONEJO ROCK",
    price: 1450000,
    thumbnail: "/images/products/conejorock.jpg",
    tags: ["premium"],
    inventory_quantity: 10,
  },
  {
    id: "inchoriable-matte",
    handle: "inchoriable-matte",
    title: "GATA COOL",
    price: 1250000,
    thumbnail: "/images/products/gatacool.jpg",
    inventory_quantity: 5,
  },
  {
    id: "inchoriable-mini",
    handle: "inchoriable-mini",
    title: "FERNE'",
    price: 990000,
    thumbnail: "/images/products/ferne.jpg",
    inventory_quantity: 12,
  },
];

// Lista “oficial” que ya usa tu grid y PDP
export async function listProducts(): Promise<MedusaProduct[]> {
  // En el futuro podés reemplazar esto por fetch a tu backend/Medusa.
  return PRODUCT_CATALOG;
}
