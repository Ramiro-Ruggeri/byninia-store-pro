// app/policies/page.tsx
export default function PoliciesPage() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="text-4xl font-black tracking-tight text-white">
        Envíos & Devoluciones
      </h1>

      <section className="mt-8">
        <h2 className="text-white font-bold text-lg">Envíos</h2>
        <ul className="list-disc pl-6 text-white/70 mt-2 space-y-1">
          <li>Envíos a todo el país.</li>
          <li>Despachamos en 24–48 hs hábiles.</li>
          <li>Costos y tiempos se calculan en el checkout.</li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-white font-bold text-lg">Cambios/Devoluciones</h2>
        <ul className="list-disc pl-6 text-white/70 mt-2 space-y-1">
          <li>Tenés 10 días desde la recepción para cambios.</li>
          <li>El producto debe estar sin uso y con empaque original.</li>
          <li>
            Para iniciar un cambio, escribinos por WhatsApp con tu número de
            pedido.
          </li>
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-white font-bold text-lg">Garantía</h2>
        <p className="text-white/70 mt-2">
          Todas las piezas están revisadas. Si tu producto presenta una falla de
          fabricación, lo reemplazamos o reparamos.
        </p>
      </section>
    </div>
  );
}
