'use server';

/**
 * @fileOverview This file defines a Genkit flow for estimating project costs using Gemini AI.
 *
 * The flow takes user requirements and selected features as input and returns an estimated cost breakdown in Rupiah.
 *
 * @fileOverview
 * estimateProjectCost - A function that handles the project cost estimation process.
 * EstimateProjectCostInput - The input type for the estimateProjectCost function.
 * EstimateProjectCostOutput - The return type for the estimateProjectCost function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

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
  
  PENTING: Berikan estimasi harga yang cenderung berada pada rentang TENGAH hingga BATAS ATAS (maksimal) dari rentang harga yang ditentukan.

  Price Ranges (Targetkan penawaran di rentang tengah ke atas):
  - Standar: Rp 2.000.000 - Rp 4.000.000 (Target: Rp 3.000.000 - Rp 4.000.000)
  - Moderate: Rp 6.000.000 - Rp 10.000.000 (Target: Rp 8.000.000 - Rp 10.000.000)
  - Advance: Rp 12.000.000 - Rp 16.000.000 (Target: Rp 14.000.000 - Rp 16.000.000)

  PENTING: Khusus untuk paket Advance, jika pengguna memilih atau membutuhkan fitur "Pembukuan", tambahkan biaya Add-on sebesar Rp 2.000.000 hingga Rp 5.000.000 di atas harga dasar Advance tersebut.

  User Requirements Context: {{{requirements}}}
  
  Specific Features Selected:
  {{#each selectedFeatures}}
  - {{{this}}}
  {{/each}}

  Your response should include:
  1. The determined category (Standar, Moderate, or Advance).
  2. A detailed cost breakdown for features and technologies.
  3. The final estimated cost (Sebutkan jika ada biaya add-on pembukuan jika relevan).

  Explain the costs associated with each part of the project, focusing on the selected features.
  
  CRITICAL FORMATTING INSTRUCTION:
  Ensure the response is clean and very easy to read.
  AFTER EVERY PERIOD (tanda titik "."), you MUST provide TWO newlines (2 enters) to separate the ideas clearly.
  Use bold text for key categories and prices.
  The output MUST be in Indonesian.
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
