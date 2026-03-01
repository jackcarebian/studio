/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://jasa-pembuatan-website-aplikasi.vercel.app',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
}