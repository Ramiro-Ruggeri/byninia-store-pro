export default function ContactPage() {
  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-2">Contacto</h1>
      <p className="text-zinc-400 mb-6">
        Pedidos personalizados, mayoristas y colaboraciones.
      </p>
      <div className="grid gap-4">
        <a
          href="mailto:ventas@byninia.com"
          className="rounded-2xl border border-white/10 bg-by-card p-4 hover:border-white/20 transition"
        >
          ventas@byninia.com
        </a>
        <a
          href="https://wa.me/5493874126730"
          target="_blank"
          rel="noreferrer"
          className="rounded-2xl border border-white/10 bg-by-card p-4 hover:border-white/20 transition"
        >
          WhatsApp
        </a>
        <a
          href="https://www.instagram.com/byninia"
          target="_blank"
          rel="noreferrer"
          className="rounded-2xl border border-white/10 bg-by-card p-4 hover:border-white/20 transition"
        >
          Instagram
        </a>
      </div>
    </div>
  );
}
