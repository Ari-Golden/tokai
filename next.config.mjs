import withPWA from 'next-pwa'

/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    // disable Turbopack
    turbo: false,
  },
}

// Konfigurasi PWA
const pwaConfig = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: true, // Paksa nonaktifkan PWA selama development agar tidak ada cache yang mengganggu
})

export default pwaConfig(nextConfig)
