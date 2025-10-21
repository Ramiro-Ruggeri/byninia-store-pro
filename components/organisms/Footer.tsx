export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 py-10 text-sm text-zinc-400">
      <div className="mx-auto max-w-7xl px-4 grid gap-6 md:grid-cols-3">
        <div>
          <div className="font-bold text-white">BYNINIA</div>
          <p className="mt-2">
            Córdoba, Argentina. Underground funcional hecho a mano.
          </p>
        </div>
        <div className="grid gap-2">
          <a href="/about" className="hover:text-white">
            Sobre
          </a>
          <a href="/policies" className="hover:text-white">
            Envíos & Devoluciones
          </a>
          <a href="/contact" className="hover:text-white">
            Contacto
          </a>
        </div>
        <div className="grid gap-2">
          <a
            href="https://www.instagram.com/byninia"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white"
          >
            Instagram
          </a>
          <a
            href="https://wa.me/5493510000000"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white"
          >
            WhatsApp
          </a>
          <span>© {new Date().getFullYear()} BYNINIA</span>
        </div>
      </div>
    </footer>
  );
}
