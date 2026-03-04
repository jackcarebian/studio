import { MetadataRoute } from 'next'

/**
 * Generator Robots.txt Dinamis
 * Mengatur akses robot mesin pencari dan mengarahkan ke lokasi sitemap yang benar.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://jasa-pembuatan-website-aplikasi.vercel.app'

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/dashboard', '/login', '/register'], // Melindungi halaman internal
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
