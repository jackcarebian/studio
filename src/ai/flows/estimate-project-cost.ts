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

  Based on the user's requirements and the specific features they selected, categorize the project into one of three tiers: Standar, Moderate, or Advance. 
  
  PENTING: Gunakan skema HARGA DISKON berikut untuk estimasi Anda. Berikan penawaran harga yang cenderung berada pada rentang TENGAH hingga BATAS ATAS (maksimal) dari rentang harga yang ditentukan.

  Price Ranges (Targetkan penawaran di rentang tengah ke atas):
  - Standar: Rp 2.000.000 - Rp 4.000.000 (Target Penawaran: Rp 3.000.000 - Rp 4.000.000)
  - Moderate: Rp 6.000.000 - Rp 10.000.000 (Target Penawaran: Rp 8.000.000 - Rp 10.000.000)
  - Advance: Rp 12.000.000 - Rp 16.000.000 (Target Penawaran: Rp 14.500.000 - Rp 16.000.000)

  ATURAN BIAYA KHUSUS:
  - Khusus untuk item "Keamanan SSL & Hosting Cepat & Gratis Domain .com / .id (1 Thn)", biayanya adalah TETAP Rp 300.000. Jangan gunakan angka lain untuk item ini.
  - Khusus untuk paket Advance, jika pengguna memilih atau membutuhkan fitur "Pembukuan", tambahkan biaya Add-on sebesar Rp 2.000.000 hingga Rp 5.000.000 di atas harga dasar Advance tersebut.

  User Requirements Context: {{{requirements}}}
  
  Specific Features Selected:
  {{#each selectedFeatures}}
  - {{{this}}}
  {{/each}}

  Your response should include:
  1. The determined category (Standar, Moderate, or Advance).
  2. A detailed cost breakdown for each feature and technology.
  3. A clear "TOTAL ESTIMASI BIAYA" at the end of the response.

  Explain the costs associated with each part of the project, focusing on the selected features.
  
  CRITICAL FORMATTING INSTRUCTIONS (INSTRUKSI FORMAT WAJIB):
  - Gunakan Bahasa Indonesia yang profesional.
  - WAJIB: Berikan jarak DUA baris baru (2 enters/newline) SETELAH SETIAP tanda titik (.). Contoh: "Selesai. Lanjut." menjadi "Selesai.\n\nLanjut."
  - WAJIB: Berikan jarak DUA baris baru (2 enters/newline) SEBELUM SETIAP judul poin fitur atau kategori utama untuk memberikan ruang visual yang lega.
  - Gunakan teks tebal (**teks**) untuk Kategori, Nama Fitur, dan Harga.
  - Penulisan total biaya di akhir harus menggunakan format heading markdown level 3: ### **TOTAL ESTIMASI BIAYA: Rp [Jumlah]**.
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
  prompt: `You are an expert system analyst. Analyze the following user requirements and identify which features from the list below are likely needed.
  
  User Requirements: {{{requirements}}}
  
  AVAILABLE FEATURES LIST (ONLY return items from this list):
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
  
  RULES:
  1. ONLY return the exact strings from the list above.
  2. If the user mentions "online shop" or selling, include relevant features.
  3. If they mention "complex logic" or "business flow", definitely include "ERP / CRM Custom".
  4. Always include "Desain Responsif" and "Keamanan SSL" as they are standard defaults.
  
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
