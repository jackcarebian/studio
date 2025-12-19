"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useTransition } from "react";
import ReactMarkdown from 'react-markdown';

import { estimateProjectCost } from "@/ai/flows/estimate-project-cost";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Wand2, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  requirements: z
    .string()
    .min(50, {
      message: "Jelaskan kebutuhan Anda setidaknya 50 karakter.",
    })
    .max(5000, {
      message: "Penjelasan tidak boleh lebih dari 5000 karakter.",
    }),
});

export function EstimatorForm() {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      requirements: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setResult(null);
    startTransition(async () => {
      try {
        const response = await estimateProjectCost({
          requirements: values.requirements,
        });
        setResult(response.costEstimate);
      } catch (error) {
        console.error("Failed to get estimation:", error);
        toast({
          variant: "destructive",
          title: "Gagal Membuat Estimasi",
          description: "Terjadi kesalahan saat berkomunikasi dengan AI. Silakan coba lagi nanti.",
        });
      }
    });
  }

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
                <Wand2 className="h-6 w-6" />
                <span>Formulir Kebutuhan Proyek</span>
            </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="requirements"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg">Deskripsi Proyek</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Contoh: Saya membutuhkan website company profile untuk firma hukum saya. Halaman yang dibutuhkan: Beranda, Tentang Kami, Layanan, Tim, dan Kontak. Desainnya harus profesional dan modern..."
                        className="min-h-[150px] text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Semakin detail penjelasan Anda, semakin akurat estimasi yang diberikan.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending} size="lg">
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Memproses...
                  </>
                ) : (
                  "Buat Estimasi"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isPending && (
         <Card className="animate-pulse">
            <CardHeader>
                <div className="h-6 w-1/3 bg-muted rounded-md"></div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="h-4 w-full bg-muted rounded-md"></div>
                <div className="h-4 w-full bg-muted rounded-md"></div>
                <div className="h-4 w-2/3 bg-muted rounded-md"></div>
            </CardContent>
        </Card>
      )}

      {result && (
        <Card className="fade-in-up">
          <CardHeader>
            <CardTitle className="font-headline">Hasil Estimasi Biaya</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:font-headline">
              <ReactMarkdown>{result}</ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
