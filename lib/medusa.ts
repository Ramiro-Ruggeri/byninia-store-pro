// lib/medusa.ts
export const MEDUSA_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL!;
export const PUB_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY!;

type FetchInit = RequestInit & { next?: { revalidate?: number } };

async function medusa(path: string, init: FetchInit = {}) {
  if (!MEDUSA_URL || !PUB_KEY) {
    throw new Error(
      "Faltan vars NEXT_PUBLIC_MEDUSA_BACKEND_URL o NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY"
    );
  }

  const res = await fetch(`${MEDUSA_URL}${path}`, {
    ...init,
    // Para stock en tiempo real, preferí no cachear:
    cache: "no-store",
    headers: {
      "x-publishable-api-key": PUB_KEY,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`Medusa ${res.status} ${res.statusText} -> ${txt}`);
  }
  return res.json();
}

export async function getProducts(limit = 24, offset = 0) {
  return medusa(`/store/products?limit=${limit}&offset=${offset}`);
}

export async function getProductByHandle(handle: string) {
  const data = await medusa(
    `/store/products?handle=${encodeURIComponent(handle)}`
  );
  // la API devuelve { products: [...] }
  return data.products?.[0] ?? null;
}
