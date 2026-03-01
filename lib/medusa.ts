// lib/medusa.ts
// Adapter FRONT-ONLY: provee las funciones esperadas por el front,
// pero usando el catálogo local (sin Medusa backend).

import { LOCAL_PRODUCTS, type ProductCardProps } from "./medusa-data";

/** Devuelve catálogo completo (front-only). */
export async function getProducts(): Promise<ProductCardProps[]> {
  return LOCAL_PRODUCTS;
}

/** Devuelve producto por handle/slug (front-only). */
export async function getProductByHandle(
  handle: string
): Promise<ProductCardProps | null> {
  const p = LOCAL_PRODUCTS.find((x) => x.slug === handle);
  return p ?? null;
}

/** Alias por compatibilidad si en algún lugar se usa getProduct(). */
export async function getProduct(
  handle: string
): Promise<ProductCardProps | null> {
  return getProductByHandle(handle);
}