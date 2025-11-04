import Image from "next/image";
import Link from "next/link";
import VariantSelect, { type VariantUI } from "@/components/pdp/VariantSelect";
import { getProductByHandle } from "@/lib/medusa-data";

// ---------- utils (solo server) ----------
function formatARS(cents: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(Math.round((cents || 0) / 100));
}

// ---------- server page ----------
export default async function ProductPage({
  params,
}: {
  params: { handle: string };
}) {
  const handle = params.handle;

  const data = await getProductByHandle(handle).catch(() => null);
  if (!data?.raw) {
    return (
      <div className="flex items-center justify-center min-h-[60vh] bg-white">
        <div className="text-gray-500 text-xl font-medium">
          Producto no encontrado.
        </div>
      </div>
    );
  }

  const p = data.raw;
  const title: string = p.title || "Producto";
  const images: string[] =
    (p.images || []).map((img: any) => img?.url).filter(Boolean) ??
    (p.thumbnail ? [p.thumbnail] : []);
  const hero = images[0] || "/placeholder.png";

  const basePriceCents = data.card.price || 0;

  const variants: VariantUI[] = (p.variants || []).map((v: any) => {
    const candidates = [
      v?.prices?.[0]?.calculated_price,
      v?.calculated_price,
      v?.prices?.[0]?.amount,
      basePriceCents,
    ];
    const val = candidates.find((n) => Number.isFinite(Number(n)));
    return {
      id: v.id,
      title: v.title || "Variante",
      priceCents: Math.round(Number(val) || 0),
    };
  });

  return (
    <div className="min-h-screen bg-white text-gray-900 p-6 md:p-12 font-sans">
      <div className="max-w-6xl mx-auto">
        <p className="text-gray-500 text-xs mb-8 uppercase tracking-wider">
          <Link href="/" className="hover:text-gray-900">
            Inicio
          </Link>{" "}
          /{" "}
          <Link href="/products" className="hover:text-gray-900">
            Catálogo
          </Link>{" "}
          / <span className="text-gray-900 font-medium ml-1">{title}</span>
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          <div className="space-y-4">
            <div className="aspect-[4/5] overflow-hidden bg-gray-100 border border-gray-200 relative">
              <Image
                src={hero}
                alt={`${title} - vista`}
                fill
                className="object-cover"
                sizes="(min-width:1024px) 50vw, 100vw"
                unoptimized
              />
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.slice(0, 8).map((url, i) => (
                  <div
                    key={i}
                    className="relative w-full aspect-[1/1] overflow-hidden bg-gray-100 border border-gray-200"
                  >
                    <Image
                      src={url}
                      alt={`Miniatura ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="(min-width:1024px) 12vw, 25vw"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="lg:sticky lg:top-8 h-fit pt-4 lg:pt-0">
            <h1 className="text-4xl font-light text-gray-900 leading-snug mb-2">
              {title}
            </h1>

            <VariantSelect
              productTitle={title}
              variants={variants}
              defaultPriceCents={basePriceCents}
            />

            {p.description && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-sm font-medium text-gray-700 mb-3 uppercase tracking-wider">
                  Detalles del Producto
                </h3>
                <p className="text-gray-600 whitespace-pre-line text-sm leading-relaxed">
                  {p.description}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
