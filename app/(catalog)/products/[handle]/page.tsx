// app/(catalog)/products/[handle]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { listProducts } from "@/lib/medusa-data";
import ProductGallery from "@/components/organisms/ProductGallery";
import { ChevronLeft } from "lucide-react";

type Params = {
  handle: string;
};

export default async function ProductPage({ params }: { params: Params }) {
  const all = await listProducts();
  const product = all.find((p: any) => p.slug === params.handle);

  if (!product) {
    notFound();
  }

  const title: string = product.title ?? "Producto BYNINIA";
  const price: number = product.price ?? 0;

  // Construimos array de imágenes:
  // - primero thumbnail
  // - luego (si existen) las imágenes extra (limitamos a 2 en total)
  const images: { url: string; alt: string }[] = [];

  if (product.thumbnail) {
    images.push({ url: product.thumbnail, alt: title });
  }

  const extraImages =
    (product as any).images && Array.isArray((product as any).images)
      ? (product as any).images
      : [];

  for (const img of extraImages) {
    if (img?.url && images.length < 2) {
      images.push({ url: img.url, alt: title });
    }
  }

  if (images.length === 0) {
    images.push({
      url: "/placeholder-product.jpg",
      alt: "BYNINIA",
    });
  }

  // Formateo de precio
  const formattedPrice = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(Math.round(price / 100 || 0));

  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      {/* Botón volver */}
      <div className="mb-6">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/80 hover:bg-white/10 hover:text-white transition"
        >
          <ChevronLeft size={16} />
          <span>Volver al catálogo</span>
        </Link>
      </div>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] items-start">
        {/* GALERÍA: imágenes + zoom + compartir */}
        <ProductGallery images={images} title={title} />

        {/* INFO DEL PRODUCTO */}
        <section className="space-y-6">
          <header className="space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">
              Accesorio BYNINIA · Edición limitada
            </p>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight">
              {title}
            </h1>
          </header>

          <div className="space-y-1">
            <p className="text-3xl md:text-4xl font-black text-white">
              {formattedPrice}
            </p>
            <p className="text-xs uppercase tracking-[0.25em] text-white/50">
              ARS · IMPUESTOS INCLUIDOS
            </p>
          </div>

          <p className="text-sm md:text-base text-white/75 leading-relaxed">
            Accesorio BYNINIA diseñado para la noche. Producción local en
            Córdoba, vibe underground y detalle en metal pensado para que no se
            pierda nunca más el encendedor.
          </p>

          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>• Acero premium &amp; construcción robusta.</li>
            <li>• Edición limitada, producción underground.</li>
            <li>• Anti-robo con estilo único.</li>
          </ul>

          {/* CTA */}
          <div className="mt-6 space-y-3">
            <form action={`/store/cart`} method="post" className="space-y-3">
              {/* Esto depende de cómo tengas armado el carrito;
                  deja el botón listo para conectar con tu acción */}
              <button
                type="submit"
                className="w-full rounded-full bg-[rgb(var(--color-accent))] px-6 py-3 text-center text-base md:text-lg font-extrabold text-black shadow-lg shadow-[rgb(var(--color-accent))]/40 hover:brightness-110 transition"
              >
                Agregar al carrito
              </button>
            </form>

            <Link
              href="/products"
              className="block w-full rounded-full border border-white/20 bg-transparent px-6 py-3 text-center text-sm font-semibold text-white/80 hover:bg-white/5 hover:text-white transition"
            >
              Seguir viendo productos
            </Link>
          </div>

          <p className="mt-6 text-xs text-white/50 flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-[rgb(var(--color-accent))]" />
            Underground hecho en Córdoba · Inchoriables BYNINIA
          </p>
        </section>
      </div>
    </main>
  );
}
