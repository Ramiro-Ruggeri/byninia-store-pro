// lib/wa.ts
const DEFAULT_PHONE = "5493874126730"; // <-- tu número

export function waLink(customText?: string) {
  // Teléfono en formato internacional, solo dígitos (sin +, ni espacios)
  const raw = process.env.NEXT_PUBLIC_WA_PHONE || DEFAULT_PHONE;
  const phone = (raw || DEFAULT_PHONE).replace(/[^\d]/g, "") || DEFAULT_PHONE;

  // Mensaje por defecto (puedes editarlo en .env.local)
  const baseMsg =
    process.env.NEXT_PUBLIC_WA_MESSAGE ||
    "Hola! Vengo de la web BYNINIA. Quiero consultar por los inchoriables.";

  const msg = encodeURIComponent(customText ?? baseMsg);

  // En render del servidor no existe navigator -> devolvemos enlace genérico
  if (typeof navigator === "undefined") {
    return `https://wa.me/${phone}?text=${msg}`;
  }

  // En móvil abrimos wa.me, en desktop vamos a WhatsApp Web directamente
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  return isMobile
    ? `https://wa.me/${phone}?text=${msg}`
    : `https://web.whatsapp.com/send?phone=${phone}&text=${msg}`;
}
