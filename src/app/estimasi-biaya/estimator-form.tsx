"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useTransition, useEffect } from "react";
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
import { Loader2, Wand2, Calculator, CheckCircle2, ChevronRight, Download, Timer } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

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
    originalPrice: "Rp 4jt - 8jt",
    price: "Rp 2jt - 4jt",
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
    originalPrice: "Rp 11jt - 18jt",
    price: "Rp 6jt - 10jt",
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
    originalPrice: "Rp 24jt - 33jt",
    price: "Rp 12jt - 16jt",
    description: "Solusi operasional kompleks.",
    features: [
      "Semua Fitur Moderate",
      "ERP / CRM Custom Sesuai Alur Bisnis",
      "Multi-role Access (Owner, Admin, Sales)",
      "Sistem Notifikasi Push (Real-time)",
      "Dashboard Analitik & Laporan PDF",
      "Integrasi API Pihak Ketiga",
      "Pembukuan (Add-on: Rp 2jt - 5jt)"
    ]
  }
];

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      // Calculate first day of next month at 00:00:00
      const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1, 0, 0, 0);
      const difference = nextMonth.getTime() - now.getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft(); // Initial call

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center gap-4 py-4 px-6 bg-destructive/10 border border-destructive/20 rounded-xl mb-8">
      <div className="flex items-center gap-2 text-destructive font-bold">
        <Timer className="h-5 w-5 animate-pulse" />
        <span className="text-sm md:text-base uppercase tracking-wider">Promo Berakhir Dalam:</span>
      </div>
      <div className="flex gap-2 text-xl md:text-2xl font-mono font-bold text-destructive">
        <div className="flex flex-col items-center">
          <span>{String(timeLeft.days).padStart(2, '0')}</span>
          <span className="text-[10px] uppercase font-sans">Hari</span>
        </div>
        <span>:</span>
        <div className="flex flex-col items-center">
          <span>{String(timeLeft.hours).padStart(2, '0')}</span>
          <span className="text-[10px] uppercase font-sans">Jam</span>
        </div>
        <span>:</span>
        <div className="flex flex-col items-center">
          <span>{String(timeLeft.minutes).padStart(2, '0')}</span>
          <span className="text-[10px] uppercase font-sans">Menit</span>
        </div>
        <span>:</span>
        <div className="flex flex-col items-center">
          <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
          <span className="text-[10px] uppercase font-sans">Detik</span>
        </div>
      </div>
    </div>
  );
}

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
      <CountdownTimer />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {tierDetails.map((tier, idx) => (
          <Card key={idx} className="bg-primary/5 border-primary/20 hover:border-primary/40 transition-colors relative overflow-hidden group">
            <div className="absolute top-0 right-0 bg-destructive text-destructive-foreground text-[10px] font-bold px-3 py-1 rotate-45 translate-x-3 translate-y-2 uppercase shadow-sm">
              Diskon 50%
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-xl font-headline text-primary">{tier.title}</CardTitle>
              <div className="flex flex-col">
                <span className="text-sm text-muted-foreground line-through decoration-destructive/60 decoration-2">
                  {tier.originalPrice}
                </span>
                <p className="text-2xl font-bold text-foreground">
                  {tier.price}
                </p>
              </div>
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
              Dapatkan penawaran khusus hari ini mulai dari <strong>Rp 2.000.000 hingga Rp 16.000.000+</strong>. Harga promo akan tereset otomatis setiap awal bulan.
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
                    <div className="flex justify-between items-center">
                      <FormLabel className="text-lg">Deskripsi Proyek</FormLabel>
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-none">AI Powered Analysis</Badge>
                    </div>
                    <FormControl>
                      <Textarea
                        placeholder="Contoh: Saya membutuhkan sistem manajemen sales untuk 10 orang tim lapangan. Fitur utama: absensi GPS, input order real-time, dan dashboard owner..."
                        className="min-h-[180px] text-base focus-visible:ring-primary/50"
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
              <Button type="submit" disabled={isPending} size="lg" className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-bold shadow-lg">
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
            <Button onClick={handleDownloadPDF} variant="outline" className="gap-2 border-primary text-primary hover:bg-primary/10 font-bold">
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
