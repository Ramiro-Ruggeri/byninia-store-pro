// app/contact/page.tsx
const WA = process.env.NEXT_PUBLIC_WA_PHONE || "5493510000000";
const IG = process.env.NEXT_PUBLIC_IG_HANDLE || "byninia";

export default function ContactPage() {
  const waBase = `https://wa.me/${WA}`;

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="text-4xl font-black tracking-tight text-white">
        Contacto
      </h1>
      <p className="text-white/70 mt-4">
        Pedidos, mayoristas, prensa o ideas: respondemos rápido.
      </p>

      <div className="mt-8 grid gap-6">
        <a
          href={waBase}
          target="_blank"
          className="rounded-xl bg-white text-black px-5 py-3 font-bold w-fit"
        >
          WhatsApp
        </a>
        <a
          href={`https://instagram.com/${IG}`}
          target="_blank"
          className="rounded-xl border border-white/10 text-white px-5 py-3 w-fit"
        >
          Instagram @{IG}
        </a>
        <a
          href="mailto:hola@byninia.com?subject=Consulta%20BYNINIA"
          className="rounded-xl border border-white/10 text-white px-5 py-3 w-fit"
        >
          hola@byninia.com
        </a>
      </div>

      {/* Formulario mailto (sin backend) */}
      <form
        className="mt-10 grid gap-4"
        action="mailto:hola@byninia.com"
        method="post"
        encType="text/plain"
      >
        <input
          name="Nombre"
          placeholder="Tu nombre"
          className="rounded-xl bg-white/5 border border-white/10 text-white px-4 py-3"
          required
        />
        <input
          name="Email"
          type="email"
          placeholder="Tu email"
          className="rounded-xl bg-white/5 border border-white/10 text-white px-4 py-3"
          required
        />
        <textarea
          name="Mensaje"
          placeholder="Contanos qué buscás"
          rows={5}
          className="rounded-xl bg-white/5 border border-white/10 text-white px-4 py-3"
          required
        />
        <button className="rounded-xl bg-white text-black px-5 py-3 font-bold w-fit">
          Enviar
        </button>
      </form>
    </div>
  );
}
