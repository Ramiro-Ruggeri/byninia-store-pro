// app/about/page.tsx
export default function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-black tracking-tight text-white">
        Sobre BYNINIA
      </h1>
      <p className="text-white/70 mt-6 leading-relaxed">
        BYNINIA es diseño hecho en Córdoba. Construimos piezas funcionales y
        atemporales: portaencendedores anti-robo, cadenas, anillos y accesorios
        con foco en durabilidad, estética nocturna y manufactura local.
        Trabajamos en series limitadas, con inspección manual y materiales
        seleccionados.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h3 className="text-white font-bold">Creemos en lo funcional</h3>
          <p className="text-white/60 mt-2">
            Nuestros diseños resuelven problemas reales (que no se te pierda el
            fuego) sin sacrificar estilo.
          </p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
          <h3 className="text-white font-bold">Series limitadas</h3>
          <p className="text-white/60 mt-2">
            Piezas con identidad, producidas en tiradas chicas para mantener
            calidad y exclusividad.
          </p>
        </div>
      </div>

      <p className="text-white/70 mt-8">
        Si querés colaborar, comprar por mayor o proponer algo nuevo,
        escribinos.
      </p>
    </div>
  );
}
