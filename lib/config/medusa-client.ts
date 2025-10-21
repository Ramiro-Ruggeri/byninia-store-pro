// lib/config/medusa-client.ts
// Este archivo usa el SDK de Medusa para crear un cliente reusable.

import Medusa from "@medusajs/medusa-js";

// La URL se obtiene del archivo .env.local (debe ser NEXT_PUBLIC_MEDUSA_BACKEND_URL)
const MEDUSA_BACKEND_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000";

const clientOptions = {
  maxRetries: 3,
  baseUrl: MEDUSA_BACKEND_URL,
};

// Inicialización del cliente de Medusa.
const medusaClient = new Medusa(clientOptions);

// Exportamos la herramienta para que app/page.tsx la pueda usar.
export default medusaClient;
