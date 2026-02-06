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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, Wand2, Calculator, CheckCircle2, ChevronRight } from "lucide-react";
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

const tierDetails = [
  {
    title: "Standar",
    price: "Rp 8jt - 12jt",
    description: "Cocok untuk profil bisnis esensial.",
    features: [
      "Website Company Profile / Landing Page",
      "Desain Responsif (Mobile Friendly)",
      "Integrasi WhatsApp Chat & Maps",
      "Optimasi SEO Dasar",
      "Keamanan SSL & Hosting Cepat",
      "Gratis Domain .com / .id (1 Thn)"
    ]
  },
  {
    title: "Moderate",
    price: "Rp 13jt - 22jt",
    description: "Untuk sistem bisnis menengah.",
    features: [
      "Semua Fitur Standar",
      "Aplikasi Web Kustom (Admin Dashboard)",
      "Sistem Manajemen Konten (CMS)",
      "Progressive Web App (PWA)",
      "Database Firestore (Real-time)",
      "Sistem Login & Autentikasi User"
    ]
  },
  {
    title: "Advance",
    price: "Rp 23jt - 50jt",
    description: "Solusi operasional kompleks.",
    features: [
      "Semua Fitur Moderate",
      "ERP / CRM Custom Sesuai Alur Bisnis",
      "Multi-role Access (Owner, Admin, Sales)",
      "Sistem Notifikasi Push (Real-time)",
      "Dashboard Analitik & Laporan PDF",
      "Integrasi API Pihak Ketiga"
    ]
  }
];

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {tierDetails.map((tier, idx) => (
          <Card key={idx} className="bg-primary/5 border-primary/20 hover:border-primary/40 transition-colors">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-headline text-primary">{tier.title}</CardTitle>
              <p className="text-2xl font-bold">{tier.price}</p>
              <CardDescription className="mt-2">{tier.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                {tier.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-2xl">
                <Calculator className="h-6 w-6 text-primary" />
                <span>Formulir Kebutuhan Proyek</span>
            </CardTitle>
            <CardDescription>
              Rentang estimasi pembuatan sistem berbasis website kami mulai dari <strong>Rp 8.000.000 hingga Rp 50.000.000+</strong> tergantung pada kompleksitas fitur dan alur kerja.
            </CardDescription>
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
                        placeholder="Contoh: Saya membutuhkan sistem manajemen sales untuk 10 orang tim lapangan. Fitur utama: absensi GPS, input order real-time, dan dashboard owner..."
                        className="min-h-[180px] text-base"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Berikan rincian alur kerja bisnis Anda agar AI dapat menghitung biaya dengan lebih akurat.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending} size="lg" className="w-full md:w-auto">
                {isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Menganalisis Kebutuhan...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 h-4 w-4" />
                    Buat Estimasi Sekarang
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isPending && (
         <Card className="animate-pulse border-primary/30">
            <CardHeader>
                <div className="h-6 w-1/3 bg-muted rounded-md"></div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="h-4 w-full bg-muted rounded-md"></div>
                <div className="h-4 w-full bg-muted rounded-md"></div>
                <div className="h-4 w-2/3 bg-muted rounded-md"></div>
            </CardContent>
        </Card>
      )}

      {result && (
        <Card className="fade-in-up border-primary/50 shadow-md">
          <CardHeader className="bg-primary/5 border-b">
            <CardTitle className="font-headline flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-primary" />
              Hasil Analisis & Estimasi Biaya
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="prose prose-sm max-w-none dark:prose-invert prose-headings:font-headline prose-p:mb-6">
              <ReactMarkdown>{result}</ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}