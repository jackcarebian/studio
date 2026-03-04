"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useTransition, useEffect, useMemo } from "react";
import ReactMarkdown from 'react-markdown';
import { jsPDF } from "jspdf";

import { estimateProjectCost, identifyFeatures } from "@/ai/flows/estimate-project-cost";
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
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Loader2, Wand2, Calculator, CheckCircle2, ChevronRight, Download, Timer, Sparkles, CheckSquare, ArrowRight, ArrowLeft, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
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

const featureChecklist = {
  Standar: [
    "Website Company Profile / Landing Page",
    "Desain Responsif (Mobile Friendly)",
    "Integrasi WhatsApp Chat & Maps",
    "Optimasi SEO Dasar",
    "Keamanan SSL & Hosting Cepat",
    "Gratis Domain .com / .id (1 Thn)"
  ],
  Moderate: [
    "Aplikasi Web Kustom (Admin Dashboard)",
    "Sistem Manajemen Konten (CMS)",
    "Progressive Web App (PWA)",
    "Database Firestore (Real-time)",
    "Sistem Login & Autentikasi User"
  ],
  Advance: [
    "ERP / CRM Custom Sesuai Alur Bisnis",
    "Multi-role Access (Owner, Admin, Sales)",
    "Sistem Notifikasi Push (Real-time)",
    "Dashboard Analitik & Laporan PDF",
    "Integrasi API Pihak Ketiga",
    "Pembukuan (Add-on: Rp 2jt - 5jt)"
  ]
};

const tierDetails = [
  {
    title: "Standar",
    originalPrice: "Rp 4jt - 8jt",
    price: "Rp 2jt - 4jt",
    description: "Cocok untuk profil bisnis esensial.",
    features: featureChecklist.Standar
  },
  {
    title: "Moderate",
    originalPrice: "Rp 11jt - 18jt",
    price: "Rp 6jt - 10jt",
    description: "Untuk sistem bisnis menengah.",
    features: featureChecklist.Moderate
  },
  {
    title: "Advance",
    originalPrice: "Rp 24jt - 45jt",
    price: "Rp 12jt - 16jt",
    description: "Solusi operasional kompleks.",
    features: featureChecklist.Advance
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

        <div className="flex gap-3 md:gap-4 items-center text-center">
          <div className="grid grid-cols-4 gap-2 md:gap-4">
            <TimerUnit value={timeLeft.days} label="Hari" />
            <TimerUnit value={timeLeft.hours} label="Jam" />
            <TimerUnit value={timeLeft.minutes} label="Menit" />
            <TimerUnit value={timeLeft.seconds} label="Detik" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function EstimatorForm() {
  const [step, setStep] = useState<'input' | 'features' | 'result'>('input');
  const [isPending, startTransition] = useTransition();
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      requirements: "",
    },
  });

  // Pemrosesan teks untuk keterbacaan tinggi:
  // 1 enter (break) setelah setiap tanda titik (.)
  // 2 enter (paragraf) antar fitur (mendeteksi pola penomoran)
  const formattedResult = useMemo(() => {
    if (!result) return null;
    return result
      .replace(/\. /g, ".\n\n") // 1 enter (newline) setelah titik
      .replace(/(\d+\.)/g, "\n\n$1"); // 2 enter (paragraf) sebelum penomoran fitur
  }, [result]);

  async function onInitialSubmit(values: z.infer<typeof formSchema>) {
    setIsAnalyzing(true);
    try {
      const response = await identifyFeatures({ requirements: values.requirements });
      setSelectedFeatures(response.suggestedFeatures);
      
      setStep('features');
      setTimeout(() => {
        document.getElementById('feature-checklist')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } catch (error) {
      console.error("AI analysis failed:", error);
      setStep('features');
    } finally {
      setIsAnalyzing(false);
    }
  }

  function toggleFeature(feature: string) {
    setSelectedFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature) 
        : [...prev, feature]
    );
  }

  function handleCalculate() {
    const requirements = form.getValues("requirements");
    setResult(null);
    setStep('result');
    startTransition(async () => {
      try {
        const response = await estimateProjectCost({
          requirements,
          selectedFeatures
        });
        setResult(response.costEstimate);
      } catch (error) {
        console.error("Failed to get estimation:", error);
        toast({
          variant: "destructive",
          title: "Gagal Membuat Estimasi",
          description: "Terjadi kesalahan saat berkomunikasi dengan AI. Silakan coba lagi nanti.",
        });
        setStep('features');
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

    // --- Header Section ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(25, 158, 189);
    doc.text("DOKUMEN ESTIMASI PROYEK", pageWidth / 2, 25, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Dicetak pada: ${new Date().toLocaleDateString("id-ID")}`, pageWidth / 2, 32, { align: "center" });

    doc.setDrawColor(25, 158, 189);
    doc.setLineWidth(0.3);
    doc.line(margin, 38, pageWidth - margin, 38);

    // --- Content Parsing & Rendering ---
    let cursorY = 50;
    const lineHeight = 7;
    const paragraphGap = 10;
    const featureGap = 15;

    // Split text into paragraphs
    const sections = result.split("\n\n");

    sections.forEach((section) => {
      const trimmedSection = section.trim();
      if (!trimmedSection) return;

      const isFeatureHeader = /^\d+\./.test(trimmedSection);
      const isSessionTitle = trimmedSection.startsWith("ESTIMASI BIAYA PROYEK TIER");
      const isTotal = trimmedSection.startsWith("TOTAL ESTIMASI BIAYA");

      if (isSessionTitle) {
        cursorY += 5;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(13);
        doc.setTextColor(40);
        doc.text(trimmedSection, margin, cursorY);
        cursorY += paragraphGap + 2;
        return;
      }

      if (isFeatureHeader) {
        const linesInFeature = trimmedSection.split("\n");
        
        linesInFeature.forEach((line, idx) => {
          if (cursorY > 270) { doc.addPage(); cursorY = 20; }
          
          const text = line.trim().replace(/\*\*/g, ""); 
          
          if (idx === 0) { // Judul Fitur (Baris 1)
            doc.setFont("helvetica", "bold");
            doc.setFontSize(11);
            doc.setTextColor(40);
          } else if (text.startsWith("Rp")) { // Harga (Baris Baru)
            doc.setFont("helvetica", "bold");
            doc.setFontSize(11);
            doc.setTextColor(25, 158, 189);
            cursorY += 1; // Spasi kecil sebelum harga
          } else { // Deskripsi Fitur
            doc.setFont("helvetica", "normal");
            doc.setFontSize(10);
            doc.setTextColor(80);
          }

          const wrappedText = doc.splitTextToSize(text, contentWidth);
          doc.text(wrappedText, margin, cursorY);
          cursorY += (wrappedText.length * lineHeight);
        });

        cursorY += featureGap;
      } else if (isTotal) {
        cursorY += 5;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.setTextColor(25, 158, 189);
        doc.text(trimmedSection, margin, cursorY);
      } else {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.setTextColor(60);
        const wrappedText = doc.splitTextToSize(trimmedSection.replace(/\*\*/g, ""), contentWidth);
        
        if (cursorY + (wrappedText.length * lineHeight) > 275) { doc.addPage(); cursorY = 20; }
        
        doc.text(wrappedText, margin, cursorY);
        cursorY += (wrappedText.length * lineHeight) + paragraphGap;
      }
    });

    const totalPages = doc.getNumberOfPages();
    for (let i = 1; i <= totalPages; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(180);
      doc.text(`Halaman ${i} dari ${totalPages} - Dokumen Estimasi JasaWebsiteKu`, pageWidth / 2, 285, { align: "center" });
    }

    doc.save(`Penawaran_JasaWebsiteKu_${new Date().getTime()}.pdf`);
    
    toast({
      title: "PDF Berhasil Dibuat",
      description: "Dokumen penawaran resmi telah diunduh dengan format yang rapi.",
    });
  };

  return (
    <div className="space-y-10">
      <CountdownTimer />

      {step === 'input' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tierDetails.map((tier, idx) => (
            <Card key={idx} className="relative group flex flex-col h-full bg-card border-border/50 hover:border-primary/40 transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 overflow-hidden">
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
                <Button variant="outline" className="w-full border-primary/20 hover:bg-primary/5 hover:border-primary/50 hover:text-primary font-bold" asChild>
                  <a href="#form-estimator">Pilih Paket {tier.title}</a>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {step === 'input' && (
        <Card id="form-estimator" className="scroll-mt-24 shadow-lg border-primary/10">
          <CardHeader className="bg-primary/5 border-b">
              <CardTitle className="flex items-center gap-3 font-headline text-2xl">
                  <div className="bg-primary p-2 rounded-lg">
                    <Calculator className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <span>Formulir Kebutuhan Proyek</span>
              </CardTitle>
              <CardDescription className="text-base pt-2">
                Jelaskan kebutuhan Anda, kami akan membantu merincikan fitur dan estimasi biayanya.
              </CardDescription>
          </CardHeader>
          <CardContent className="pt-8 px-6 md:px-10">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onInitialSubmit)} className="space-y-8">
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
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isAnalyzing} size="lg" className="w-full md:w-auto px-10 h-14 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-extrabold shadow-xl hover:shadow-primary/20 transition-all">
                  {isAnalyzing ? (
                    <>
                      <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                      Menganalisis Kebutuhan...
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
      )}

      {step === 'features' && (
        <Card id="feature-checklist" className="fade-in-up border-primary/30 shadow-2xl overflow-hidden ring-1 ring-primary/5">
          <CardHeader className="bg-primary/5 border-b p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1">
                <CardTitle className="font-headline text-2xl flex items-center gap-3">
                  <CheckSquare className="h-7 w-7 text-primary" />
                  <span>Rincian Kebutuhan Fitur</span>
                </CardTitle>
                <CardDescription className="text-base italic">
                  AI telah merekomendasikan fitur berdasarkan deskripsi Anda. Silakan sesuaikan checklist jika diperlukan:
                </CardDescription>
              </div>
              {!isPending && (
                <Button variant="ghost" onClick={() => setStep('input')} className="text-muted-foreground flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Kembali ke Input
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="p-8 md:p-10">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {Object.entries(featureChecklist).map(([tier, features]) => (
                <div key={tier} className="space-y-6">
                  <div className="flex items-center gap-2">
                    <Badge className="bg-primary px-3 py-1 font-bold text-sm">{tier}</Badge>
                    <div className="h-px flex-grow bg-border" />
                  </div>
                  <div className="space-y-4">
                    {features.map((feature) => (
                      <div key={feature} className="flex items-start space-x-3 group cursor-pointer" onClick={() => !isPending && toggleFeature(feature)}>
                        <Checkbox 
                          id={feature} 
                          checked={selectedFeatures.includes(feature)}
                          disabled={isPending}
                          className="mt-1 border-primary data-[state=checked]:bg-primary"
                        />
                        <label
                          htmlFor={feature}
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 group-hover:text-primary transition-colors cursor-pointer"
                        >
                          {feature}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="bg-muted/30 border-t p-6 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-sm text-muted-foreground max-w-md">
              <p>Anda telah memilih <strong>{selectedFeatures.length} fitur</strong>. Klik tombol di samping untuk melanjutkan perhitungan biaya oleh AI.</p>
            </div>
            <Button 
              onClick={handleCalculate} 
              disabled={isPending}
              size="lg" 
              className="w-full md:w-auto px-10 h-14 text-lg bg-primary hover:bg-primary/90 text-primary-foreground font-extrabold shadow-xl"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-3 h-5 w-5 animate-spin" />
                  Harap Tunggu, Admin sedang menganalisa Biaya...
                </>
              ) : (
                <>
                  Lanjutkan Perhitungan Biaya
                  <ArrowRight className="ml-3 h-5 w-5" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 'result' && isPending && (
         <Card className="animate-pulse border-primary/20 shadow-sm">
            <CardHeader className="bg-muted/30 border-b">
                <div className="flex items-center gap-3">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  <div className="h-6 w-1/2 bg-muted rounded-md"></div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6 pt-10 text-center py-20">
                <div className="flex flex-col items-center gap-4">
                  <Loader2 className="h-12 w-12 animate-spin text-primary" />
                  <p className="text-xl font-headline font-bold text-primary animate-bounce">Harap Tunggu, Admin sedang menganalisa Biaya</p>
                  <p className="text-muted-foreground">Menghitung rincian fitur dan merumuskan penawaran terbaik untuk Anda...</p>
                </div>
                <div className="pt-10 flex gap-4 opacity-30">
                  <div className="h-32 w-1/3 bg-muted rounded-xl"></div>
                  <div className="h-32 w-1/3 bg-muted rounded-xl"></div>
                  <div className="h-32 w-1/3 bg-muted rounded-xl"></div>
                </div>
            </CardContent>
        </Card>
      )}

      {step === 'result' && formattedResult && !isPending && (
        <div className="fade-in-up space-y-8">
            <Card className="border-primary/30 shadow-[0_20px_50px_rgba(25,158,189,0.15)] overflow-hidden ring-1 ring-primary/5 bg-white relative">
            <div className="absolute top-0 left-0 w-2 h-full bg-primary" />
            
            <CardHeader className="bg-slate-50/50 border-b p-8 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div className="space-y-2">
                <CardTitle className="font-headline text-3xl font-bold flex items-center gap-4 text-primary">
                    <div className="p-2 bg-primary/10 rounded-xl">
                    <CheckCircle2 className="h-8 w-8 text-primary" />
                    </div>
                    <span>Hasil Analisis Strategis AI</span>
                </CardTitle>
                <CardDescription className="text-base text-muted-foreground font-medium pl-14">
                    Dokumen Estimasi Penawaran Resmi
                </CardDescription>
                </div>
                <div className="flex flex-wrap gap-4">
                <Button onClick={() => setStep('features')} variant="outline" className="h-12 border-slate-200 text-muted-foreground hover:bg-slate-100 hover:text-slate-900 transition-all font-semibold">
                    Ubah Rincian Fitur
                </Button>
                <Button onClick={handleDownloadPDF} variant="default" className="h-12 gap-3 bg-primary hover:bg-primary/90 text-white font-bold px-8 shadow-lg shadow-primary/20 transition-all active:scale-95">
                    <Download className="h-5 w-5" />
                    Unduh Dokumen (PDF)
                </Button>
                </div>
            </CardHeader>
            
            <CardContent className="p-8 md:p-16">
                <div className="prose prose-lg max-w-none dark:prose-invert 
                prose-headings:font-headline prose-headings:text-primary prose-headings:mt-12 prose-headings:mb-6
                prose-p:text-slate-700 prose-p:leading-[1.8] prose-p:mb-6
                prose-strong:text-primary prose-strong:font-bold
                prose-li:text-slate-600 prose-li:mb-2
                bg-white rounded-lg">
                <ReactMarkdown>{formattedResult}</ReactMarkdown>
                </div>
            </CardContent>
            
            <CardFooter className="bg-slate-50 border-t p-8 flex flex-col items-center gap-6">
                <div className="flex items-center gap-3 text-sm text-slate-500 italic bg-white px-6 py-2 rounded-full border border-slate-100 shadow-sm">
                <Sparkles className="h-4 w-4 text-primary" />
                Estimasi ini dihitung secara cerdas berdasarkan alur kerja bisnis Anda
                </div>
                
                <Button size="lg" className="w-full md:w-auto px-12 h-16 text-xl bg-green-600 hover:bg-green-700 text-white font-black shadow-xl hover:shadow-green-200 gap-4 transition-all" asChild>
                    <a 
                        href={`https://wa.me/6288988357060?text=${encodeURIComponent(`Halo JasaWebsiteKu, saya telah menerima estimasi biaya AI sebesar ${result.match(/Rp [\d.]+/)?.[0] || ""} untuk proyek saya. Saya ingin mendiskusikan langkah selanjutnya.`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Send className="h-6 w-6" />
                        HUBUNGI SALES (WHATSAPP)
                    </a>
                </Button>
                <p className="text-xs text-slate-400 mt-2">Dapatkan diskon tambahan melalui negosiasi langsung dengan tim sales kami.</p>
            </CardFooter>
            </Card>
        </div>
      )}
    </div>
  );
}
