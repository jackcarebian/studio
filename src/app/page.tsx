import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import Image from "next/image";
import {
  Code2,
  Rocket,
  ShieldCheck,
  Smartphone,
  Paintbrush,
  Users,
  HelpCircle,
} from "lucide-react";
import { placeholderImages } from "@/lib/placeholder-images";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const features = [
  {
    icon: <Paintbrush className="h-10 w-10 text-primary" />,
    title: "Desain Modern & Responsif",
    description:
      "Tampilan website yang menarik dan sempurna di semua perangkat, dari desktop hingga mobile.",
  },
  {
    icon: <Rocket className="h-10 w-10 text-primary" />,
    title: "Performa Super Cepat",
    description:
      "Website dimuat dengan cepat untuk pengalaman pengguna terbaik dan peringkat SEO yang lebih baik.",
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: "Keamanan Terjamin",
    description:
      "Kami menerapkan praktik keamanan terbaik untuk melindungi website dan data Anda.",
  },
  {
    icon: <Code2 className="h-10 w-10 text-primary" />,
    title: "Teknologi Terbaru",
    description:
      "Dibangun dengan Next.js, React, dan TypeScript untuk aplikasi yang andal dan skalabel.",
  },
];

const testimonials = [
  {
    name: "Andi Wijaya",
    title: "CEO, Startup Maju",
    quote:
      "Tim JasaWebsiteKu benar-benar mengubah ide kami menjadi kenyataan. Prosesnya cepat, profesional, dan hasilnya melebihi ekspektasi!",
    avatar: placeholderImages.find(p => p.id === "testimonial-person-1")?.imageUrl || "https://picsum.photos/seed/1/100/100",
  },
  {
    name: "Siti Amelia",
    title: "Pemilik, Butik Online",
    quote:
      "Website e-commerce baru saya sangat mudah digunakan. Penjualan meningkat 50% di bulan pertama! Terima kasih banyak.",
    avatar: placeholderImages.find(p => p.id === "testimonial-person-2")?.imageUrl || "https://picsum.photos/seed/2/100/100",
  },
  {
    name: "Budi Santoso",
    title: "Manajer Marketing",
    quote:
      "Profesionalisme dan keahlian teknis mereka luar biasa. Mereka memberikan solusi yang tepat untuk kebutuhan marketing kami.",
    avatar: placeholderImages.find(p => p.id === "testimonial-person-3")?.imageUrl || "https://picsum.photos/seed/3/100/100",
  },
];

const services = [
  {
    icon: <Smartphone className="w-12 h-12 text-primary mb-4" />,
    title: "Pengembangan Aplikasi Web",
    description: "Aplikasi web kustom yang dirancang untuk mengoptimalkan proses bisnis Anda.",
    link: "/layanan"
  },
  {
    icon: <Paintbrush className="w-12 h-12 text-primary mb-4" />,
    title: "Website Company Profile",
    description: "Tampilkan citra profesional perusahaan Anda dengan website yang elegan dan informatif.",
    link: "/layanan"
  },
  {
    icon: <Users className="w-12 h-12 text-primary mb-4" />,
    title: "Aplikasi Multi-Peran",
    description: "Sistem kompleks dengan hak akses berbeda untuk admin, user, dan peran lainnya.",
    link: "/layanan"
  },
];

const faqItems = [
  {
    question: "Berapa lama waktu pengerjaan untuk integrasi Payment Gateway DOKU?",
    answer: (
      <div className="space-y-4">
        <p>
          Perkiraan waktu yang dibutuhkan untuk integrasi payment gateway DOKU dari awal hingga siap digunakan biasanya berkisar antara <strong>3 minggu hingga 2 bulan</strong>.
        </p>
        <p>
          Waktu pengerjaan bisa bervariasi tergantung pada kelengkapan dokumen dari sisi Anda dan kecepatan proses dari pihak DOKU. Prosesnya dapat dibagi menjadi dua bagian utama: Proses Bisnis (Pendaftaran) dan Proses Teknis (Integrasi).
        </p>
        <div>
          <h4 className="font-semibold">1. Tahap Pendaftaran & Persetujuan (Proses Bisnis)</h4>
          <p className="text-muted-foreground"><strong>Perkiraan Waktu: 1 minggu - 1 bulan (atau lebih)</strong></p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Pendaftaran Merchant:</strong> Anda perlu mendaftar dan melengkapi dokumen legalitas usaha (KTP, NPWP, SIUP/NIB).</li>
            <li><strong>Verifikasi oleh DOKU:</strong> Tim DOKU akan meninjau dokumen Anda.</li>
            <li><strong>Aktivasi Akun:</strong> Setelah disetujui, DOKU akan memberikan akses ke sandbox (testing) dan production (live).</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold">2. Tahap Integrasi & Pengujian (Proses Teknis)</h4>
          <p className="text-muted-foreground"><strong>Perkiraan Waktu: 2 - 4 minggu</strong></p>
          <ul className="list-disc pl-5 mt-2 space-y-1">
            <li><strong>Minggu 1 (Persiapan):</strong> Mempelajari dokumentasi, membuat endpoint untuk permintaan pembayaran, dan implementasi signature keamanan.</li>
            <li><strong>Minggu 2 (Webhook & Pengujian):</strong> Membuat endpoint untuk menerima notifikasi (webhook), dan melakukan pengujian menyeluruh di lingkungan Sandbox.</li>
            <li><strong>Minggu 3-4 (Finalisasi & Go-Live):</strong> Mengganti kunci API ke production, melakukan tes transaksi live, dan deployment final.</li>
          </ul>
        </div>
        <p><strong>Ringkasan:</strong> Proses teknis oleh kami sekitar 2-4 minggu, sedangkan proses bisnis oleh Anda & DOKU sekitar 1-4 minggu.</p>
      </div>
    )
  }
];

export default function Home() {
  const heroImage = placeholderImages.find(p => p.id === "hero-background");
  
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-20 text-center text-white bg-primary/10">
        <div className="absolute inset-0 overflow-hidden">
           {heroImage && <Image
              src={heroImage.imageUrl}
              alt={heroImage.description}
              fill
              className="object-cover"
              priority
              data-ai-hint={heroImage.imageHint}
            />}
            <div className="absolute inset-0 bg-primary/80"></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-headline font-bold mb-4 fade-in-up">
              Bangun Masa Depan Digital Bisnis Anda
            </h1>
            <p className="text-lg md:text-xl mb-8 text-primary-foreground/90 fade-in-up" style={{ animationDelay: '0.2s' }}>
              Layanan pembuatan Website dan Aplikasi Custom yang modern, cepat, dan SEO-friendly.
            </p>
            <div className="flex justify-center gap-4 fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
                <Link href="/estimasi-biaya">Dapatkan Estimasi Gratis</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary font-bold">
                <Link href="/kontak">Hubungi Kami</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-gray-800">Layanan Unggulan Kami</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Solusi digital yang kami tawarkan untuk membawa bisnis Anda ke level berikutnya.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="fade-in-up text-center p-8 bg-card rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
                {service.icon}
                <h3 className="text-xl font-headline font-bold mb-2">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <Button asChild variant="link" className="text-primary font-bold">
                  <Link href={service.link}>Pelajari Lebih Lanjut</Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Mengapa Memilih Kami?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Kami memberikan lebih dari sekadar kode, kami memberikan nilai dan kualitas.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="fade-in-up p-6 bg-card rounded-lg shadow-sm text-center" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-lg font-headline font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Apa Kata Klien Kami</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Kepuasan klien adalah prioritas utama kami.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base font-bold">{testimonial.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="italic text-muted-foreground">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Tanya Jawab</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Pertanyaan yang sering diajukan oleh klien kami.
            </p>
          </div>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger className="text-lg font-semibold text-left">{item.question}</AccordionTrigger>
                  <AccordionContent className="text-base text-muted-foreground pt-2">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">Siap untuk Memulai Project Anda?</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Jangan ragu untuk berdiskusi dengan kami. Konsultasi gratis untuk menemukan solusi digital terbaik bagi bisnis Anda.
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
            <Link href="/estimasi-biaya">Mulai Sekarang</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
