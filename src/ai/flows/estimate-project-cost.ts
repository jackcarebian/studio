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

  Price Ranges:
  - Standar: Rp 2.000.000 - Rp 4.000.000 (Target: Rp 3.000.000 - Rp 4.000.000)
  - Moderate: Rp 6.000.000 - Rp 10.000.000 (Target: Rp 8.000.000 - Rp 10.000.000)
  - Advance: Rp 12.000.000 - Rp 16.000.000 (Target: Rp 14.500.000 - Rp 16.000.000)

  ATURAN BIAYA KHUSUS:
  - Khusus untuk item "Keamanan SSL & Hosting Cepat & Gratis Domain .com / .id (1 Thn)", biayanya adalah TETAP Rp 300.000.
  - Khusus untuk paket Advance, jika pengguna membutuhkan fitur "Pembukuan", tambahkan biaya Add-on Rp 2.000.000 - Rp 5.000.000.

  User Requirements Context: {{{requirements}}}
  
  Specific Features Selected:
  {{#each selectedFeatures}}
  - {{{this}}}
  {{/each}}

  Your response should include:
  1. Header Kategori (Gunakan ### **Kategori Proyek: [Nama Kategori]**)
  2. Ringkasan singkat solusi yang ditawarkan dalam 1 paragraf.
  3. Rincian Fitur & Biaya (Gunakan daftar poin yang jelas: **1. Nama Fitur**: Deskripsi singkat. **Biaya: Rp [Jumlah]**).
  4. Penulisan total biaya di akhir menggunakan format: ### **TOTAL ESTIMASI BIAYA: Rp [Jumlah]**.

  CRITICAL FORMATTING INSTRUCTIONS:
  - Gunakan Bahasa Indonesia profesional dan sopan.
  - JANGAN memberikan jarak baris baru di setiap titik. Gunakan paragraf normal.
  - Gunakan jarak satu baris kosong (double newline) hanya antar bagian utama atau antar item daftar fitur agar terlihat lega tapi tetap mengalir.
  - Pastikan rincian biaya setiap fitur ditulis di baris baru setelah deskripsi fitur tersebut agar mudah dipindai mata.
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
  
  RULES:
  1. ONLY return the exact strings from the list above.
  2. Always include "Desain Responsif" and "Keamanan SSL" as defaults.
  
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
