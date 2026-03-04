"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState, useTransition, useEffect } from "react";
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
import { Loader2, Wand2, Calculator, ChevronRight, Download, Timer, Sparkles, CheckSquare, ArrowRight, ArrowLeft, FileText, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

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
  const [promoTitle, setPromoTitle] = useState("Promo Spesial");

  useEffect(() => {
    const promoTitles = [
      "Promo Spesial Awal Tahun",
      "Promo Februari Penuh Cinta",
      "Promo Maret Makin Mantap",
      "Promo Berkah Ramadhan",
      "Promo Mei Makin Maju",
      "Promo Juni Juara Digital",
      "Promo Juli Jitu Solusinya",
      "Promo Merdeka Digital",
      "Promo September Spektakuler",
      "Promo Oktober Optimis",
      "Promo November Nyaman",
      "Promo Akhir Tahun Dahsyat"
    ];
    
    const calculateTimeLeft = () => {
      const now = new Date();
      setPromoTitle(promoTitles[now.getMonth()]);

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
          <h3 className="text-xl md:text-2xl font-headline font-bold">{promoTitle}</h3>
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
    const primaryColor = [25, 158, 189]; // JWK Blue

    // --- Header ---
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.text("DOKUMEN ESTIMASI PROYEK", pageWidth / 2, 25, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(100);
    doc.text(`Dicetak pada: ${new Date().toLocaleDateString("id-ID", { day: 'numeric', month: 'numeric', year: 'numeric' })}`, pageWidth / 2, 32, { align: "center" });

    doc.setDrawColor(200);
    doc.line(margin, 38, pageWidth - margin, 38);

    // --- Content Parsing ---
    let cursorY = 50;
    const lineHeight = 6;
    const lines = result.split('\n').filter(l => l.trim() !== "");

    doc.setTextColor(40);
    doc.setFontSize(10.5);

    lines.forEach((line) => {
      if (cursorY > 265) {
        // Add Footer before new page
        doc.setFontSize(8);
        doc.setTextColor(150);
        doc.text(`Halaman ${doc.getNumberOfPages()} - Dokumen Estimasi JasaWebsiteKu`, pageWidth / 2, 287, { align: "center" });
        
        doc.addPage();
        cursorY = 25;
      }

      const cleanLine = line.replace(/[#*]/g, "").trim();

      if (cleanLine.match(/^\d\./)) {
        // Numbered Feature Title
        cursorY += 4;
        doc.setFont("helvetica", "bold");
        doc.setTextColor(0);
        doc.text(cleanLine, margin, cursorY);
        cursorY += lineHeight;
      } else if (cleanLine.startsWith("Rp") && !cleanLine.includes("TOTAL")) {
        // Feature Price
        doc.setFont("helvetica", "bold");
        doc.setTextColor(60);
        doc.text(cleanLine, margin, cursorY);
        cursorY += lineHeight + 4;
      } else if (cleanLine.includes("TOTAL ESTIMASI BIAYA")) {
        // Total Footer
        cursorY += 10;
        doc.setFont("helvetica", "bold");
        doc.setFontSize(12);
        doc.setTextColor(0);
        doc.text(cleanLine, margin, cursorY);
        cursorY += lineHeight;
      } else if (cleanLine.includes("ESTIMASI BIAYA PROYEK TIER")) {
        // Tier Header
        doc.setFont("helvetica", "bold");
        doc.setFontSize(11);
        doc.setTextColor(0);
        doc.text(cleanLine, margin, cursorY);
        cursorY += lineHeight + 2;
      } else {
        // Normal text / Description
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10.5);
        doc.setTextColor(80);
        const wrappedText = doc.splitTextToSize(cleanLine, contentWidth);
        doc.text(wrappedText, margin, cursorY);
        cursorY += (wrappedText.length * lineHeight);
      }
    });

    // Final Page Footer
    doc.setFontSize(8);
    doc.setTextColor(150);
    doc.text(`Halaman ${doc.getNumberOfPages()} - Dokumen Estimasi JasaWebsiteKu`, pageWidth / 2, 287, { align: "center" });

    doc.save(`Estimasi_JWK_${Date.now()}.pdf`);
  };

  return (
    <div className="space-y-10">
      <CountdownTimer />

      {step === 'input' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tierDetails.map((tier, idx) => (
            <Card key={idx} className="relative group flex flex-col h-full bg-card border-border/50 hover:border-primary/40 transition-all duration-300 hover:shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 z-20">
                <div className="bg-destructive text-white text-[10px] font-bold px-8 py-1.5 absolute top-4 -right-8 rotate-45 shadow-md uppercase tracking-widest text-center min-w-[150px]">
                  Diskon 50%
                </div>
              </div>

              <CardHeader className="pb-4">
                <CardTitle className="text-2xl font-headline text-primary mb-2">{tier.title}</CardTitle>
                <div className="flex flex-col space-y-1">
                  <span className="text-sm text-muted-foreground line-through decoration-destructive/60 italic opacity-70">{tier.originalPrice}</span>
                  <p className="text-3xl font-bold text-foreground tracking-tight">{tier.price}</p>
                </div>
                <CardDescription className="mt-4 text-base font-medium">{tier.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow pt-0">
                <ul className="space-y-4 text-sm">
                  {tier.features.map((feature, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-3">
                      <ChevronRight className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <div className="p-6 pt-0 mt-auto">
                <Button variant="outline" className="w-full font-bold" asChild>
                  <a href="#form-estimator">Pilih Paket {tier.title}</a>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {step === 'input' && (
        <Card id="form-estimator" className="scroll-mt-24 shadow-lg">
          <CardHeader className="bg-primary/5 border-b">
              <CardTitle className="flex items-center gap-3 font-headline text-2xl">
                <Calculator className="h-6 w-6 text-primary" />
                <span>Formulir Kebutuhan Proyek</span>
              </CardTitle>
              <CardDescription>Jelaskan kebutuhan Anda, kami akan merincikan fitur dan estimasi biayanya.</CardDescription>
          </CardHeader>
          <CardContent className="pt-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onInitialSubmit)} className="space-y-8">
                <FormField
                  control={form.control}
                  name="requirements"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-lg font-bold">Apa yang ingin Anda bangun?</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Contoh: Saya membutuhkan sistem manajemen sales untuk 10 orang tim lapangan. Fitur utama: absensi GPS, input order real-time, dan dashboard owner..."
                          className="min-h-[200px] text-lg bg-slate-50/50"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isAnalyzing} size="lg" className="w-full md:w-auto px-10">
                  {isAnalyzing ? <><Loader2 className="mr-3 h-5 w-5 animate-spin" /> Menganalisis...</> : <><Wand2 className="mr-3 h-5 w-5" /> Buat Estimasi Biaya</>}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      {step === 'features' && (
        <Card id="feature-checklist" className="border-primary/30 shadow-2xl">
          <CardHeader className="bg-primary/5 border-b">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <CardTitle className="font-headline text-2xl flex items-center gap-3">
                <CheckSquare className="h-7 w-7 text-primary" />
                <span>Sesuaikan Fitur</span>
              </CardTitle>
              <Button variant="ghost" onClick={() => setStep('input')} className="text-muted-foreground"><ArrowLeft className="h-4 w-4 mr-2" /> Kembali</Button>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {Object.entries(featureChecklist).map(([tier, features]) => (
                <div key={tier} className="space-y-6">
                  <Badge className="bg-primary px-3 py-1 font-bold">{tier}</Badge>
                  <div className="space-y-4">
                    {features.map((feature) => (
                      <div key={feature} className="flex items-start space-x-3 group cursor-pointer" onClick={() => !isPending && toggleFeature(feature)}>
                        <Checkbox checked={selectedFeatures.includes(feature)} className="mt-1" />
                        <label className="text-sm font-medium leading-none cursor-pointer">{feature}</label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="bg-muted/30 border-t p-6">
            <Button onClick={handleCalculate} disabled={isPending} size="lg" className="ml-auto px-10 h-14 text-lg font-bold">
              {isPending ? <><Loader2 className="mr-3 h-5 w-5 animate-spin" /> Menghitung...</> : <>Lanjutkan Perhitungan <ArrowRight className="ml-3 h-5 w-5" /></>}
            </Button>
          </CardFooter>
        </Card>
      )}

      {step === 'result' && isPending && (
         <Card className="animate-pulse py-20">
            <CardContent className="flex flex-col items-center gap-4">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="text-xl font-headline font-bold text-primary">Admin sedang menganalisa Biaya...</p>
            </CardContent>
        </Card>
      )}

      {step === 'result' && result && !isPending && (
        <Card className="border-primary/30 shadow-2xl bg-slate-50/30">
          <CardHeader className="bg-white border-b p-6 md:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              <CardTitle className="font-headline text-2xl md:text-3xl">Hasil Analisis Strategis AI</CardTitle>
              <CardDescription className="text-base font-semibold text-primary/80">Dokumen Estimasi Penawaran Resmi</CardDescription>
            </div>
            <div className="flex gap-3">
              <Button onClick={() => setStep('features')} variant="ghost">Ubah Fitur</Button>
              <Button onClick={handleDownloadPDF} size="lg" className="font-bold gap-2">
                <Download className="h-5 w-5" /> Unduh PDF
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-8 md:p-16 bg-white mx-4 my-8 md:mx-10 rounded-xl shadow-inner border">
            <div className="prose prose-blue max-w-none prose-headings:font-headline prose-p:text-gray-700 prose-li:text-gray-600 prose-h3:text-3xl prose-h3:font-extrabold">
              <ReactMarkdown>{result}</ReactMarkdown>
            </div>
            <div className="mt-20 pt-10 border-t flex flex-col md:flex-row items-center justify-between gap-8">
               <div className="text-center md:text-left">
                  <p className="text-sm font-bold text-gray-500 uppercase">Siap Melanjutkan?</p>
                  <p className="text-muted-foreground">Konsultasikan proyek Anda dengan tim kami.</p>
               </div>
               <Button asChild size="lg" className="bg-green-500 hover:bg-green-600 font-extrabold rounded-full">
                  <a href={`https://wa.me/6288988357060?text=${encodeURIComponent(`Halo JasaWebsiteKu, saya ingin mendiskusikan penawaran estimasi saya.`)}`} target="_blank" rel="noopener noreferrer">
                    <Send className="h-5 w-5 mr-3" /> Hubungi Sales WhatsApp
                  </a>
               </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
