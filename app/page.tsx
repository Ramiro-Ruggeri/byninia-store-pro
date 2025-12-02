// app/page.tsx
import Link from "next/link";
import Hero from "@/components/organisms/Hero";
import ProductGrid from "@/components/organisms/ProductGrid";
import Marquee from "@/components/ux/Marquee";
import SectionTitle from "@/components/ux/SectionTitle";
import { listProducts } from "@/lib/medusa-data";
import { Zap, Shield, Rocket, MapPin } from "lucide-react";

/* ---------------- Reutilizables ---------------- */

function FeaturesStrip() {
  const items = [
    {
      title: "Anti-robo",
      desc: "Cadena + portaencendedor seguro.",
      icon: (
        <Shield
          size={20}
          className="text-by-accent"
          style={{ color: "rgb(var(--color-accent))" }}
        />
      ),
    },
    {
      title: "Hecho en CBA",
      desc: "Diseño independiente local.",
      icon: (
        <MapPin
          size={20}
          className="text-by-accent"
          style={{ color: "rgb(var(--color-accent))" }}
        />
      ),
    },
    {
      title: "Acero premium",
      desc: "Durabilidad & look rockstar.",
      icon: (
        <Zap
          size={20}
          className="text-by-accent"
          style={{ color: "rgb(var(--color-accent))" }}
        />
      ),
    },
    {
      title: "Envío Express",
      desc: "A todo el país.",
      icon: (
        <Rocket
          size={20}
          className="text-by-accent"
          style={{ color: "rgb(var(--color-accent))" }}
        />
      ),
    },
  ];

  return (
    <div className="mx-auto max-w-7xl px-4 mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((i) => (
        <div
          key={i.title}
          className="card-glass p-5 transition-transform hover:scale-[1.01] shadow-xl hover:shadow-2xl"
        >
          <div className="flex items-center gap-3">
            {i.icon}
            <div className="font-bold text-white tracking-tight">{i.title}</div>
          </div>
          <div className="text-sm text-white/50 mt-1">{i.desc}</div>
        </div>
      ))}
    </div>
  );
}

function HowItWorks() {
  const steps = [
    { n: 1, t: "Encastra", d: "Colocá tu encendedor en el porta." },
    { n: 2, t: "Ajustá", d: "Enganchá la cadena al pantalón/banda." },
    { n: 3, t: "Olvidate", d: "No se pierde nunca más el fuego." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-4 mt-24">
      <SectionTitle title="Cómo se usa" eyebrow="Rápido & seguro" />
      <div className="grid gap-6 md:grid-cols-3 mt-8">
        {steps.map((s) => (
          <div key={s.n} className="card-glass p-6 shadow-lg">
            <div
              className="text-xl font-bold"
              style={{ color: "rgb(var(--color-accent))" }}
            >
              0{s.n}
            </div>
            <div className="font-extrabold text-2xl mt-1">{s.t}</div>
            <div className="text-base text-white/70 mt-2">{s.d}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function SocialProof() {
  return (
    <section className="mx-auto max-w-7xl px-4 mt-24">
      <div className="rounded-[40px] bg-[var(--by-card)] p-8 md:p-12 border border-white/10 shadow-2xl">
        <SectionTitle
          title="Lo que dice la crew"
          eyebrow="Testimonios de BYNINIA"
        />
        <div className="grid gap-6 md:grid-cols-3 mt-8">
          {[
            "“No lo pierdo más en los boliches. 10/10, la mejor inversión.”",
            "“La cadena brilla con la luz. Queda criminal en fotos y videos.”",
            "“Me pidieron el link 3 veces en una noche. Es un imán de atención.”",
          ].map((q, i) => (
            <blockquote
              key={i}
              className="card-glass p-5 text-lg italic text-white/80 border-l-4"
              style={{ borderColor: "rgb(var(--color-accent))" }}
            >
              {q}
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  const PrimaryBtn =
    "rounded-lg px-8 py-3 text-lg font-extrabold text-black transition-transform hover:scale-[1.02]";
  const SecondaryBtn =
    "rounded-lg px-8 py-3 text-lg border-2 border-white/20 text-white/80 hover:border-white/40 transition-colors hover:text-white";

  // Mensaje cool, predefinido para BYNINIA
  const msg = encodeURIComponent(
    "Hola! 👋 Caigo desde la web de BYNINIA. Quiero consultar por los Inchoriables (portaencendedor con cadena) para subirle el level a mi outfit nocturno. ¿Hay stock? Soy [tu nombre] de [tu ciudad]."
  );

  return (
    <section className="mx-auto max-w-7xl px-4 mt-24 mb-16">
      <div
        className="rounded-3xl border border-white/10 bg-[var(--by-card)]
                   p-12 text-center shadow-2xl
                   bg-[radial-gradient(50%_50%_at_50%_0%,rgba(255,0,102,0.10)_0%,transparent_70%)]"
      >
        <h3 className="h-title text-4xl md:text-5xl font-black max-w-4xl mx-auto">
          Listo para subir el{" "}
          <span
            className="text-by-accent"
            style={{ color: "rgb(var(--color-accent))" }}
          >
            level
          </span>{" "}
          de tu outfit nocturno?
        </h3>

        <p className="p-body max-w-2xl mx-auto mt-4">
          Inchoriables BYNINIA – Accesorios diseñados para la noche. Ediciones
          limitadas, producción local en Córdoba.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/catalog"
            className={PrimaryBtn}
            style={{ background: "rgb(var(--color-accent))" }}
          >
            Ver Catálogo
          </Link>

          {/* Botón de WhatsApp con número correcto + mensaje predefinido */}
          <a
            href={`https://wa.me/5493874126730?text=${msg}`}
            target="_blank"
            rel="noreferrer"
            className={SecondaryBtn}
          >
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Página ---------------- */

export default async function Home() {
  // Traemos todos los productos locales
  const allProducts = await listProducts();

  // Core / estándar (Rockstar, Gata Cool, etc.)
  const standardProducts = allProducts.filter(
    (p) => !p.slug.startsWith("hello-kitty") && !p.slug.startsWith("kuromi")
  );

  // Edición limitada Hello Kitty + Kuromi
  const helloKittyProducts = allProducts.filter(
    (p) => p.slug.startsWith("hello-kitty") || p.slug.startsWith("kuromi")
  );

  return (
    <>
      {/* 1) Hero */}
      <Hero />

      {/* 2) Features */}
      <FeaturesStrip />

      {/* 3) Productos core (para el scroll desde el Hero) */}
      <section id="catalogo" className="mx-auto max-w-7xl px-4 mt-24">
        <SectionTitle
          title="Inchoriables destacados"
          eyebrow="Llevá el fuego con vos"
        />
        <div className="mt-8">
          <ProductGrid products={standardProducts} />
        </div>
      </section>

      {/* 3.b) Edición limitada Hello Kitty & Kuromi */}
      {helloKittyProducts.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 mt-16">
          <SectionTitle
            title="Edición limitada Hello Kitty & Kuromi"
            eyebrow="Stock reducido · piezas coleccionables"
          />
          <div className="mt-8">
            <ProductGrid products={helloKittyProducts} />
          </div>
        </section>
      )}

      {/* 4) Marquee – full width */}
      <section className="w-full mt-24">
        <Marquee
          items={[
            "NO SE TE PIERDE EL FUEGO",
            "UNDERGROUND HECHO EN CÓRDOBA",
            "ANTI-ROBO CON ESTILO",
            "EDICIONES LIMITADAS",
          ]}
        />
      </section>

      {/* 5) Cómo funciona */}
      <HowItWorks />

      {/* 6) Reseñas */}
      <SocialProof />

      {/* 7) CTA final */}
      <FinalCTA />
    </>
  );
}
