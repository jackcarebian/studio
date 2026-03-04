'use server';

/**
 * @fileOverview This file defines Genkit flows for project cost estimation and feature identification using Gemini AI.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// --- Cost Estimation Flow ---

const EstimateProjectCostInputSchema = z.object({
  requirements: z
    .string()
    .describe('A detailed description of the website or application requirements.'),
  selectedFeatures: z
    .array(z.string())
    .optional()
    .describe('A list of specific features selected by the user from the checklist.'),
});
export type EstimateProjectCostInput = z.infer<typeof EstimateProjectCostInputSchema>;

const EstimateProjectCostOutputSchema = z.object({
  costEstimate: z
    .string()
    .describe(
      'A detailed cost estimate in Rupiah, including a breakdown of features and associated costs, explained by Gemini AI.'
    ),
});
export type EstimateProjectCostOutput = z.infer<typeof EstimateProjectCostOutputSchema>;

export async function estimateProjectCost(input: EstimateProjectCostInput): Promise<EstimateProjectCostOutput> {
  return estimateProjectCostFlow(input);
}

const estimateProjectCostPrompt = ai.definePrompt({
  name: 'estimateProjectCostPrompt',
  input: {schema: EstimateProjectCostInputSchema},
  output: {schema: EstimateProjectCostOutputSchema},
  prompt: `You are an AI assistant specializing in providing cost estimates for website and application development projects in Indonesia.

  PENTING: Gunakan skema HARGA DISKON berikut untuk estimasi Anda. Berikan penawaran harga yang cenderung berada pada rentang TENGAH hingga BATAS ATAS dari rentang harga yang ditentukan.

  Price Ranges:
  - Standar: Rp 2.000.000 - Rp 4.000.000
  - Moderate: Rp 6.000.000 - Rp 10.000.000
  - Advance: Rp 12.000.000 - Rp 16.000.000

  ATURAN BIAYA KHUSUS:
  - Item "Keamanan SSL & Hosting Cepat & Gratis Domain .com / .id (1 Thn)" biayanya TETAP Rp 300.000.
  - Tambahkan item khusus jika ada "Pembukuan" (Add-on Rp 2jt - 5jt).

  STRUKTUR OUTPUT (WAJIB PERSIS):
  1. Paragraf intro: "Dengan mempertimbangkan kebutuhan Anda akan [Deskripsi Singkat], proyek ini dikategorikan sebagai [Tier]."
  2. Paragraf kategori: "Kategori [Tier] mencerminkan tingkat kompleksitas yang tinggi..." (1-2 kalimat).
  3. Kalimat transisi: "Berikut adalah estimasi biaya terperinci yang kami tawarkan:"
  4. Judul Sesi: "ESTIMASI BIAYA PROYEK TIER [KATEGORI]" (Semua huruf kapital)
  5. List fitur bernomor dengan format:
     [Nomor]. [Nama Fitur] (Gunakan Bold markdown **)
     [Deskripsi singkat fitur dalam 1-2 kalimat]
     Rp [Harga Item dengan titik pemisah ribuan]
  6. Diakhiri dengan: "TOTAL ESTIMASI BIAYA: Rp [Total]"

  CONTOH FORMAT LIST:
  1. **Website Company Profile / Landing Page & Desain Responsif**
  Ini adalah fondasi visual website Anda yang akan dioptimalkan agar tampil sempurna di berbagai perangkat.
  Rp 2.000.000

  User Requirements Context: {{{requirements}}}
  Selected Features:
  {{#each selectedFeatures}}
  - {{{this}}}
  {{/each}}
`,
});

const estimateProjectCostFlow = ai.defineFlow(
  {
    name: 'estimateProjectCostFlow',
    inputSchema: EstimateProjectCostInputSchema,
    outputSchema: EstimateProjectCostOutputSchema,
  },
  async input => {
    const {output} = await estimateProjectCostPrompt(input);
    return output!;
  }
);

// --- Feature Identification Flow ---

const IdentifyFeaturesInputSchema = z.object({
  requirements: z.string().describe('User requirements description.'),
});
export type IdentifyFeaturesInput = z.infer<typeof IdentifyFeaturesInputSchema>;

const IdentifyFeaturesOutputSchema = z.object({
  suggestedFeatures: z.array(z.string()).describe('List of feature names matching the predefined checklist.'),
});
export type IdentifyFeaturesOutput = z.infer<typeof IdentifyFeaturesOutputSchema>;

export async function identifyFeatures(input: IdentifyFeaturesInput): Promise<IdentifyFeaturesOutput> {
  return identifyFeaturesFlow(input);
}

const identifyFeaturesPrompt = ai.definePrompt({
  name: 'identifyFeaturesPrompt',
  input: {schema: IdentifyFeaturesInputSchema},
  output: {schema: IdentifyFeaturesOutputSchema},
  prompt: `Analyze requirements and identify features.
  
  User Requirements: {{{requirements}}}
  
  AVAILABLE FEATURES LIST:
  - Website Company Profile / Landing Page
  - Desain Responsif (Mobile Friendly)
  - Integrasi WhatsApp Chat & Maps
  - Optimasi SEO Dasar
  - Keamanan SSL & Hosting Cepat
  - Gratis Domain .com / .id (1 Thn)
  - Aplikasi Web Kustom (Admin Dashboard)
  - Sistem Manajemen Konten (CMS)
  - Progressive Web App (PWA)
  - Database Firestore (Real-time)
  - Sistem Login & Autentikasi User
  - ERP / CRM Custom Sesuai Alur Bisnis
  - Multi-role Access (Owner, Admin, Sales)
  - Sistem Notifikasi Push (Real-time)
  - Dashboard Analitik & Laporan PDF
  - Integrasi API Pihak Ketiga
  - Pembukuan (Add-on: Rp 2jt - 5jt)
  
  Return only the JSON array of suggested feature names.`,
});

const identifyFeaturesFlow = ai.defineFlow(
  {
    name: 'identifyFeaturesFlow',
    inputSchema: IdentifyFeaturesInputSchema,
    outputSchema: IdentifyFeaturesOutputSchema,
  },
  async input => {
    const {output} = await identifyFeaturesPrompt(input);
    return output!;
  }
);
