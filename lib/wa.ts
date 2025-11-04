// lib/wa.ts
export function waLink(customText?: string) {
  // Teléfono en formato internacional, solo dígitos (sin +, ni espacios)
  const raw = process.env.NEXT_PUBLIC_WA_PHONE || "";
  const phone = raw.replace(/[^\d]/g, "");

  // Mensaje por defecto (puedes editarlo en .env.local)
  const baseMsg =
    process.env.NEXT_PUBLIC_WA_MESSAGE ||
    "Hola! Vengo de la web BYNINIA. Quiero consultar por los inchoriables.";

  const msg = encodeURIComponent(customText ?? baseMsg);

  // Si se llama desde un Client Component (lo nuestro), navigator está disponible.
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  // En móvil abrimos wa.me, en desktop vamos a WhatsApp Web directamente
  return isMobile
    ? `https://wa.me/${phone}?text=${msg}`
    : `https://web.whatsapp.com/send?phone=${phone}&text=${msg}`;
}
