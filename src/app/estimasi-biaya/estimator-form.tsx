"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useTransition } from "react";
import ReactMarkdown from 'react-markdown';
import { jsPDF } from "jspdf";

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
import { Loader2, Wand2, Calculator, CheckCircle2, ChevronRight, Download } from "lucide-react";
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
      "Integrasi API Pihak Ketiga",
      "Pembukuan (Add-on: Rp 16jt - 24jt)"
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

  const handleDownloadPDF = () => {
    if (!result) return;

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pageWidth = doc.internal.pageSize.getWidth();
    const margin = 20;
    const contentWidth = pageWidth - margin * 2;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(25, 158, 189);
    doc.text("DOKUMEN ESTIMASI PROYEK", pageWidth / 2, 25, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Dicetak pada: ${new Date().toLocaleDateString("id-ID")}`, pageWidth / 2, 32, { align: "center" });

    doc.setDrawColor(200);
    doc.line(margin, 38, pageWidth - margin, 38);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(11);
    doc.setTextColor(0);

    const cleanText = result
      .replace(/[#*]/g, "")
      .replace(/(\r\n|\n|\r)/gm, "\n");

    const lines = doc.splitTextToSize(cleanText, contentWidth);

    let cursorY = 48;
    const lineHeight = 7;

    lines.forEach((line: string) => {
      if (cursorY > 275) {
        doc.addPage();
        cursorY = 20;
      }
      doc.text(line, margin, cursorY);
      cursorY += lineHeight;
    });

    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150);
      doc.text(`Halaman ${i} dari ${totalPages} - Dokumen Estimasi JasaWebsiteKu`, pageWidth / 2, 285, { align: "center" });
    }

    doc.save(`Estimasi_Biaya_JasaWebsiteKu_${new Date().getTime()}.pdf`);
    
    toast({
      title: "PDF Berhasil Dibuat",
      description: "Dokumen estimasi telah diunduh ke perangkat Anda.",
    });
  };

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
          <CardHeader className="bg-primary/5 border-b flex flex-col md:flex-row md:items-center justify-between gap-4">
            <CardTitle className="font-headline flex items-center gap-2">
              <CheckCircle2 className="h-6 w-6 text-primary" />
              Hasil Analisis & Estimasi Biaya
            </CardTitle>
            <Button onClick={handleDownloadPDF} variant="outline" className="gap-2 border-primary text-primary hover:bg-primary/10">
              <Download className="h-4 w-4" />
              Unduh PDF
            </Button>
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
