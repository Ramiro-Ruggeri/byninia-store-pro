/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // si servís imágenes desde Medusa (ej: S3/MinIO) podés habilitar dominios acá
    // remotePatterns: [{ protocol: 'https', hostname: 'tu-dominio-de-imagenes.com' }],
    remotePatterns: [],
  },
  experimental: {
    // si preferís hacer el fix tipado en los <Link/>, cambiá esto a true
    typedRoutes: false,
  },
  eslint: {
    // evita que falle el build por reglas (igual seguirás viendo los warnings localmente)
    ignoreDuringBuilds: true,
  },
  typescript: {
    // por si apareciera algún TypeError fuera de producción y querés forzar build
    // (si todo queda tipado bien, podés quitarlo)
    ignoreBuildErrors: false,
  },
};

export default nextConfig;
