'use server';

/**
 * @fileOverview This file defines a Genkit flow for estimating project costs using Gemini AI.
 *
 * The flow takes user requirements as input and returns an estimated cost breakdown in Rupiah, explained by Gemini AI.
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
  prompt: `You are an AI assistant specializing in providing cost estimates for website and application development projects.

  Based on the user's requirements, provide a detailed cost estimate in Rupiah (IDR). Explain the costs associated with each feature and technology involved.

  Requirements: {{{requirements}}}

  Provide a clear and concise breakdown of the estimated costs, including:
  * Front-end development (React, Next.js, TypeScript, Tailwind CSS, Shadcn/UI)
  * Back-end development (Node.js, Express)
  * Database (Firestore)
  * Authentication (Firebase Authentication)
  * PWA implementation
  * Project management
  * Testing

  Ensure the estimate is comprehensive and easy to understand for someone with limited technical knowledge.
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
