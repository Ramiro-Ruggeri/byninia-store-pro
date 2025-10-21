import Link from "next/link";
import Hero from "@/components/organisms/Hero"; // Asumimos que Hero no necesita cambios por ahora
import ProductGrid from "@/components/organisms/ProductGrid";
import Marquee from "@/components/ux/Marquee";
import SectionTitle from "@/components/ux/SectionTitle";
import { listProducts } from "@/lib/medusa-data";
import { Zap, Shield, Rocket, MapPin } from "lucide-react"; // Íconos para features

// --- Componentes Reutilizados con Estilo Mejorado ---

// 1. Tira de Características (FeaturesStrip)
function FeaturesStrip() {
  const items = [
    {
      title: "Anti-robo",
      desc: "Cadena + portaencendedor seguro.",
      icon: <Shield size={20} className="text-by-accent" />,
    },
    {
      title: "Hecho en CBA",
      desc: "Diseño independiente local.",
      icon: <MapPin size={20} className="text-by-accent" />,
    },
    {
      title: "Acero premium",
      desc: "Durabilidad & look rockstar.",
      icon: <Zap size={20} className="text-by-accent" />,
    },
    {
      title: "Envío Express",
      desc: "A todo el país.",
      icon: <Rocket size={20} className="text-by-accent" />,
    },
  ];
  return (
    <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((i) => (
        <div
          key={i.title}
          // Usamos 'card-glass' que aplica el nuevo estilo de sombra y borde
          className="card-glass p-5 transition-all hover:scale-[1.01] hover:shadow-deep"
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

// 2. Cómo Funciona (HowItWorks)
function HowItWorks() {
  const steps = [
    { n: 1, t: "Encastra", d: "Colocá tu encendedor en el porta." },
    { n: 2, t: "Ajustá", d: "Enganchá la cadena al pantalón/banda." },
    { n: 3, t: "Olvidate", d: "No se pierde nunca más el fuego." },
  ];
  return (
    <section className="mt-24">
      {/* Usamos las clases de tipografía mejoradas (h-eyebrow, h-title) */}
      <SectionTitle title="Cómo se usa" eyebrow="Rápido & seguro" />
      <div className="grid gap-6 md:grid-cols-3 mt-8">
        {steps.map((s) => (
          <div
            key={s.n}
            // Usamos 'card-glass' nuevamente para consistencia
            className="card-glass p-6 transition-all"
          >
            {/* El número de paso ahora es más visible y con acento */}
            <div className="text-xl font-bold text-by-accent/80">0{s.n}</div>
            <div className="font-extrabold text-2xl mt-1">{s.t}</div>
            <div className="text-base text-white/70 mt-2">{s.d}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// 3. Reseñas (SocialProof)
function SocialProof() {
  return (
    <section className="mt-24">
      <div className="rounded-[40px] bg-by-card p-8 md:p-12 border border-by-line shadow-deep">
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
              className="card-glass p-5 text-lg italic text-white/80 border-l-4 border-by-accent/60"
            >
              {q}
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}

// 4. Llamado a la Acción Final (FinalCTA)
function FinalCTA() {
  // Clase para el botón principal con acento y brillo
  const PrimaryButtonClass =
    "rounded-lg px-8 py-3 text-lg bg-by-accent text-black font-extrabold transition-all shadow-glow-lg hover:shadow-glow-sm hover:scale-[1.02]";
  // Clase para el botón secundario con borde sutil
  const SecondaryButtonClass =
    "rounded-lg px-8 py-3 text-lg border-2 border-white/20 text-white/80 hover:border-white/40 transition-colors hover:text-white";

  return (
    <section className="mt-24 mb-16">
      <div
        // Fondo más impactante y centrado
        className="rounded-3xl border border-white/10 bg-by-card 
                   bg-[radial-gradient(50%_50%_at_50%_0%,rgba(var(--color-accent),0.1)_0%,transparent_70%)] 
                   p-12 text-center shadow-deep"
      >
        <h3 className="h-title text-4xl md:text-5xl font-black max-w-4xl mx-auto">
          Listo para subir el <span className="text-by-accent">level</span> de
          tu outfit nocturno?
        </h3>
        <p className="p-body max-w-2xl mx-auto mt-4">
          Inchoriables BYNINIA – Accesorios diseñados para la noche. Ediciones
          limitadas, producción local en Córdoba.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/products" className={PrimaryButtonClass}>
            Ver Catálogo
          </Link>
          <a
            href="https://wa.me/5493510000000"
            target="_blank"
            rel="noreferrer"
            className={SecondaryButtonClass}
          >
            Consultar por WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}

// --- Componente Principal ---

export default async function Home() {
  // Nota: Asumo que listProducts() está funcionando correctamente
  const products = await listProducts();

  return (
    <>
      {/* 1. HERO - Asumimos que Hero.tsx ya tiene el estilo h-title/p-body */}
      <Hero />

      {/* 2. Features */}
      <FeaturesStrip />

      {/* 3. Productos Destacados */}
      <section className="mt-24">
        {/* Usamos el h-eyebrow mejorado */}
        <SectionTitle
          title="Inchoriables destacados"
          eyebrow="Llevá el fuego con vos"
        />
        <div className="mt-8">
          <ProductGrid products={products} />
        </div>
      </section>

      {/* 4. Marquee - Ahora con más margen superior */}
      <section className="mt-24">
        <Marquee
          items={[
            "NO SE TE PIERDE EL FUEGO",
            "UNDERGROUND HECHO EN CÓRDOBA",
            "ANTI-ROBO CON ESTILO",
            "EDICIONES LIMITADAS",
          ]}
        />
      </section>

      {/* 5. Cómo Funciona */}
      <HowItWorks />

      {/* 6. Reseñas */}
      <SocialProof />

      {/* 7. CTA Final */}
      <FinalCTA />
    </>
  );
}
