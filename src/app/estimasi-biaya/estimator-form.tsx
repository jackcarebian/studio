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
import { Loader2, Wand2, Calculator, CheckCircle2, ChevronRight, Download, Timer, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

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
    calculateTimeLeft();

    return () => clearInterval(timer);
  }, []);

  const TimerUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center justify-center bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-2 min-w-[60px] shadow-sm">
      <span className="text-xl md:text-3xl font-mono font-bold leading-none">{String(value).padStart(2, '0')}</span>
      <span className="text-[10px] uppercase font-sans font-medium mt-1 opacity-80">{label}</span>
    </div>
  );

  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-destructive via-red-500 to-destructive text-white rounded-2xl p-6 mb-10 shadow-xl border border-white/10">
      <div className="absolute top-0 right-0 p-2 opacity-10">
        <Sparkles className="h-24 w-24 rotate-12" />
      </div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left space-y-1">
          <div className="flex items-center justify-center md:justify-start gap-2 text-yellow-300 font-bold mb-1">
            <Timer className="h-5 w-5 animate-pulse" />
            <span className="text-sm uppercase tracking-widest">Penawaran Terbatas</span>
          </div>
          <h3 className="text-xl md:text-2xl font-headline font-bold">Promo Spesial Awal Tahun</h3>
          <p className="text-sm opacity-90 max-w-[300px]">Dapatkan diskon 50% untuk semua paket pembuatan website & aplikasi.</p>
        </div>

        <div className="flex gap-3 md:gap-4 items-center">
          <TimerUnit value={timeLeft.days} label="Hari" />
          <span className="text-2xl font-bold animate-pulse">:</span>
          <TimerUnit value={timeLeft.hours} label="Jam" />
          <span className="text-2xl font-bold animate-pulse">:</span>
          <TimerUnit value={timeLeft.minutes} label="Menit" />
          <span className="text-2xl font-bold animate-pulse">:</span>
          <TimerUnit value={timeLeft.seconds} label="Detik" />
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
    <div className="space-y-10">
      <CountdownTimer />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {tierDetails.map((tier, idx) => (
          <Card key={idx} className="relative group flex flex-col h-full bg-card border-border/50 hover:border-primary/40 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 overflow-hidden">
            {/* Ribbon folded design */}
            <div className="absolute top-0 right-0 z-20">
              <div className="relative">
                <div className="bg-destructive text-white text-[10px] font-bold px-8 py-1.5 absolute top-4 -right-8 rotate-45 shadow-md uppercase tracking-widest text-center min-w-[150px]">
                  Diskon 50%
                </div>
              </div>
            </div>

            <CardHeader className="pb-4 relative z-10">
              <CardTitle className="text-2xl font-headline text-primary mb-2">{tier.title}</CardTitle>
              <div className="flex flex-col space-y-1">
                <span className="text-sm text-muted-foreground line-through decoration-destructive/60 decoration-2 italic opacity-70">
                  {tier.originalPrice}
                </span>
                <p className="text-3xl font-bold text-foreground tracking-tight">
                  {tier.price}
                </p>
              </div>
              <CardDescription className="mt-4 text-base font-medium text-muted-foreground/80 leading-relaxed">
                {tier.description}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow relative z-10 pt-0">
              <div className="h-px w-full bg-gradient-to-r from-transparent via-border to-transparent mb-6 opacity-50" />
              <ul className="space-y-4 text-sm">
                {tier.features.map((feature, fIdx) => (
                  <li key={fIdx} className="flex items-start gap-3 group/item">
                    <div className="mt-0.5 rounded-full bg-primary/10 p-1 group-hover/item:bg-primary/20 transition-colors">
                      <ChevronRight className="h-3 w-3 text-primary shrink-0" />
                    </div>
                    <span className="text-muted-foreground group-hover/item:text-foreground transition-colors">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <div className="p-6 pt-0 mt-auto relative z-10">
              <Button variant="outline" className="w-full border-primary/20 hover:bg-primary/5 hover:border-primary/50 font-bold" asChild>
                <a href="#form-estimator">Pilih Paket {tier.title}</a>
              </Button>
            </div>
          </Card>
        ))}
      </div>

      <Card id="form-estimator" className="scroll-mt-24 shadow-lg border-primary/10">
        <CardHeader className="bg-primary/5 border-b">
            <CardTitle className="flex items-center gap-3 font-headline text-2xl">
                <div className="bg-primary p-2 rounded-lg">
                  <Calculator className="h-6 w-6 text-primary-foreground" />
                </div>
                <span>Formulir Kebutuhan Proyek</span>
            </CardTitle>
            <CardDescription className="text-base pt-2">
              Dapatkan penawaran khusus hari ini mulai dari <strong className="text-primary font-bold">Rp 2.000.000 hingga Rp 16.000.000+</strong>. Harga promo akan tereset otomatis setiap awal bulan.
            </CardDescription>
        </CardHeader>
        <CardContent className="pt-8 px-6 md:px-10">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="requirements"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                      <FormLabel className="text-xl font-bold">Jelaskan Kebutuhan Anda</FormLabel>
                      <Badge variant="secondary" className="bg-primary/10 text-primary border-none py-1 px-3 flex items-center gap-1.5">
                        <Sparkles className="h-3 w-3" />
                        AI Analysis Ready
                      </Badge>
                    </div>
                    <FormControl>
                      <Textarea
                        placeholder="Contoh: Saya membutuhkan sistem manajemen sales untuk 10 orang tim lapangan. Fitur utama: absensi GPS, input order real-time, dan dashboard owner..."
                        className="min-h-[220px] text-lg p-6 focus-visible:ring-primary/50 shadow-inner bg-slate-50/50"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="text-sm italic">
                      Tips: Semakin rinci alur kerja yang Anda jelaskan, semakin akurat AI kami menghitung estimasi biaya dan fitur yang dibutuhkan.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isPending} size="lg" className="w-full md:w-auto px-10 h-14 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-extrabold shadow-xl hover:shadow-primary/20 transition-all">
                {isPending ? (
                  <>
                    <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                    Menganalisis Kebutuhan Anda...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-3 h-5 w-5" />
                    Buat Estimasi Biaya (Gratis)
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      {isPending && (
         <Card className="animate-pulse border-primary/20 shadow-sm">
            <CardHeader className="bg-muted/30">
                <div className="h-6 w-1/4 bg-muted rounded-md"></div>
            </CardHeader>
            <CardContent className="space-y-6 pt-8">
                <div className="h-5 w-full bg-muted/40 rounded-md"></div>
                <div className="h-5 w-full bg-muted/40 rounded-md"></div>
                <div className="h-5 w-3/4 bg-muted/40 rounded-md"></div>
                <div className="pt-4 flex gap-4">
                  <div className="h-24 w-1/3 bg-muted/20 rounded-xl"></div>
                  <div className="h-24 w-1/3 bg-muted/20 rounded-xl"></div>
                  <div className="h-24 w-1/3 bg-muted/20 rounded-xl"></div>
                </div>
            </CardContent>
        </Card>
      )}

      {result && (
        <Card className="fade-in-up border-primary/30 shadow-2xl overflow-hidden ring-1 ring-primary/5">
          <CardHeader className="bg-primary/5 border-b p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <CardTitle className="font-headline text-2xl flex items-center gap-3">
                <CheckCircle2 className="h-7 w-7 text-primary" />
                <span>Hasil Analisis Strategis AI</span>
              </CardTitle>
              <CardDescription className="text-sm">Estimasi ini didasarkan pada kompleksitas alur kerja yang Anda berikan.</CardDescription>
            </div>
            <Button onClick={handleDownloadPDF} variant="outline" className="h-12 gap-2 border-primary/40 text-primary hover:bg-primary/10 font-bold px-6">
              <Download className="h-5 w-5" />
              Unduh Laporan (PDF)
            </Button>
          </CardHeader>
          <CardContent className="p-8 md:p-12">
            <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-headline prose-headings:text-primary prose-p:leading-relaxed prose-strong:text-primary prose-li:text-muted-foreground">
              <ReactMarkdown>{result}</ReactMarkdown>
            </div>
          </CardContent>
          <div className="bg-primary/5 border-t p-6 text-center text-sm text-muted-foreground italic">
            *Hasil ini adalah estimasi awal. Untuk penawaran resmi dan negosiasi detail, silakan hubungi tim sales kami melalui WhatsApp.
          </div>
        </Card>
      )}
    </div>
  );
}
