import { MetadataRoute } from 'next'

/**
 * Generator Peta Situs XML Dinamis
 * File ini akan menghasilkan sitemap.xml secara otomatis yang valid untuk Google Search Console.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://jasa-pembuatan-website-aplikasi.vercel.app'
  
  // Daftar rute utama aplikasi
  const routes = [
    '',
    '/layanan',
    '/estimasi-biaya',
    '/kontak',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'daily' : 'weekly' as any,
    priority: route === '' ? 1 : 0.8,
  }))
}
