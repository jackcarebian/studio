import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
  ExternalLink,
  AlertCircle,
  CheckCircle2,
  Target,
  Zap,
  LayoutDashboard,
  Bell,
  BarChart3,
  ShieldAlert,
  Gem,
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

const portfolioProjects = [
  {
    title: "NotifLayer",
    description: "Layanan infrastruktur notifikasi real-time yang andal dan mudah diintegrasikan.",
    url: "https://notiflayer.com/home",
    image: placeholderImages.find(p => p.id === "project-notiflayer"),
  },
  {
    title: "ProList",
    description: "Aplikasi manajemen tugas kolaboratif untuk meningkatkan produktivitas tim modern.",
    url: "https://prolist-two.vercel.app",
    image: placeholderImages.find(p => p.id === "project-prolist"),
  },
  {
    title: "Gada Medika",
    description: "Sistem informasi manajemen kesehatan terintegrasi untuk klinik dan praktisi medis.",
    url: "https://gadamedika.vercel.app",
    image: placeholderImages.find(p => p.id === "project-gadamedika"),
  },
  {
    title: "TemanIn",
    description: "Platform kolaborasi dan networking untuk menghubungkan profesional dan komunitas.",
    url: "https://temanin.vercel.app/",
    image: placeholderImages.find(p => p.id === "project-temanin"),
  },
];

const faqItems = [
  {
    question: "Apa yang dimaksud dengan Aplikasi Web Kustom?",
    answer: (
      <div className="space-y-4">
        <p>
          Aplikasi Web Kustom adalah solusi perangkat lunak yang kami bangun secara khusus dari awal untuk menjawab kebutuhan unik dan alur kerja spesifik bisnis Anda. Berbeda dengan website biasa atau perangkat lunak siap pakai, aplikasi kustom dirancang untuk menyelesaikan masalah yang tidak bisa ditangani oleh solusi umum.
        </p>
        <div>
          <h4 className="font-semibold">Kapan Anda Membutuhkan Aplikasi Kustom?</h4>
          <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
            <li>Saat proses bisnis Anda sangat spesifik dan tidak ada software jadi yang cocok.</li>
            <li>Ketika Anda perlu mengotomatiskan tugas-tugas manual yang rumit dan memakan waktu.</li>
            <li>Jika Anda ingin mengintegrasikan beberapa sistem berbeda menjadi satu platform terpusat.</li>
            <li>Anda membutuhkan dashboard analitik untuk memantau data bisnis secara real-time.</li>
          </ul>
        </div>
        <p>
          Dengan teknologi seperti <strong>Next.js, TypeScript, dan Firebase (Firestore & Auth)</strong>, kami dapat membangun aplikasi yang cepat, aman, dan skalabel sesuai pertumbuhan bisnis Anda.
        </p>
      </div>
    ),
  },
  {
    question: "Berapa lama proses pengerjaan dan apa saja tahapannya?",
    answer: (
      <div className="space-y-4">
        <p>
          Waktu pengerjaan sebuah proyek sangat bervariasi tergantung pada kompleksitas fitur yang dibutuhkan. Namun, secara umum, kami membagi proses pengerjaan menjadi beberapa tahapan yang jelas untuk memastikan hasil terbaik:
        </p>
        <ol className="list-decimal pl-5 space-y-2 text-muted-foreground">
          <li><strong>Diskusi & Perencanaan (1-2 Minggu):</strong> Memahami tujuan dan spesifikasi.</li>
          <li><strong>Desain UI/UX (1-2 Minggu):</strong> Perancangan tampilan visual.</li>
          <li><strong>Pengembangan (3-6 Minggu):</strong> Proses coding inti.</li>
          <li><strong>Pengujian & Revisi (1 Minggu):</strong> Memastikan bug-free.</li>
          <li><strong>Peluncuran (1 Minggu):</strong> Go-live dan pelatihan.</li>
        </ol>
      </div>
    )
  },
  {
    question: "Apakah saya bisa mengelola data atau konten sendiri?",
    answer: (
      <div className="space-y-4">
        <p>
          Tentu saja. Kami membangun <strong>Dashboard Admin kustom</strong> yang intuitif. Anda dapat menambah, mengubah, atau menghapus konten (seperti berita, produk, galeri, atau data transaksi) tanpa perlu memahami bahasa pemrograman sama sekali.
        </p>
        <p>Kami juga memberikan sesi pelatihan singkat setelah proyek selesai untuk memastikan tim Anda dapat mengoperasikan sistem dengan lancar.</p>
      </div>
    )
  },
  {
    question: "Apakah website yang dibuat sudah SEO-Friendly?",
    answer: (
      <div className="space-y-4">
        <p>
          Ya. Kami menggunakan <strong>Next.js</strong> yang memiliki fitur Server-Side Rendering (SSR) dan optimasi meta-tag yang sangat baik untuk mesin pencari (SEO).
        </p>
        <p>Selain itu, kami memastikan struktur website rapi (Semantic HTML), kecepatan loading yang optimal, dan responsivitas di semua ukuran layar—semuanya adalah faktor kunci untuk mendapatkan peringkat tinggi di Google.</p>
      </div>
    )
  },
  {
    question: "Apa itu PWA (Progressive Web App)?",
    answer: (
      <div className="space-y-4">
        <p>
          PWA adalah teknologi yang memungkinkan website Anda berfungsi seperti aplikasi mobile native (seperti di Android/iOS) tanpa harus didownload melalui Play Store atau App Store.
        </p>
        <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
          <li><strong>Dapat diinstal:</strong> Muncul ikon di layar utama HP.</li>
          <li><strong>Cepat & Ringan:</strong> Loading instan karena sistem caching cerdas.</li>
          <li><strong>Offline Mode:</strong> Masih bisa diakses meskipun koneksi internet tidak stabil.</li>
          <li><strong>Hemat Biaya:</strong> Anda tidak perlu membuat aplikasi terpisah untuk Android dan iOS.</li>
        </ul>
      </div>
    )
  },
  {
    question: "Bagaimana dengan dukungan (support) setelah website online?",
    answer: (
      <div className="space-y-4">
        <p>
          Kami memberikan <strong>Garansi Bebas Bug</strong> selama 3 bulan pertama setelah peluncuran. Jika terjadi kesalahan teknis dari sisi kami, kami akan memperbaikinya tanpa biaya tambahan.
        </p>
        <p>Kami juga menawarkan paket maintenance bulanan bagi bisnis yang membutuhkan update rutin, pemantauan keamanan berkala, dan backup data otomatis untuk memastikan sistem selalu berjalan prima.</p>
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
              <Button asChild size="lg" variant="outline" className="border-white text-primary bg-white hover:bg-white/90 font-bold">
                <Link href="/kontak">Hubungi Kami</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Latar Belakang & Masalah Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 fade-in-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold">
                <Gem className="h-4 w-4" />
                <span>Sistem Sebagai Aset Bisnis</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-gray-800 leading-tight">
                Bisnis Tumbuh, Kendali Jangan Sampai Melemah
              </h2>
              <div className="space-y-4 text-lg text-muted-foreground">
                <p>
                  Banyak pemilik bisnis terjebak dalam dilema pertumbuhan: Semakin besar skala bisnisnya, semakin sulit memantau setiap detail operasional secara akurat.
                </p>
                <p>
                  Sistem yang Anda bangun bersama kami bukan sekadar software biasa, melainkan <strong>Investasi Aset Digital</strong> yang Anda miliki sepenuhnya untuk memberikan kemandirian operasional jangka panjang.
                </p>
                <p className="font-bold text-primary italic">
                  "Jangan biarkan bisnis Anda berjalan berdasarkan asumsi. Berjalanlah di atas sistem yang solid."
                </p>
              </div>
            </div>
            <div className="bg-secondary/30 p-8 rounded-2xl border border-border fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-xl font-headline font-bold mb-6 flex items-center gap-2 text-destructive">
                <ShieldAlert className="h-6 w-6" />
                Tantangan Utama Pemilik Bisnis
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "Ketergantungan tinggi pada orang tertentu",
                  "Data operasional yang sulit divalidasi",
                  "Proses manual yang menghambat kecepatan",
                  "Laporan bisnis yang terlambat & tidak akurat",
                  "Owner tidak memiliki kontrol saat di luar kantor",
                  "Komunikasi berantakan di grup chat",
                  "Kebocoran biaya yang sulit dideteksi sejak dini"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="h-5 w-5 text-destructive shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 p-4 bg-primary/5 rounded-lg text-sm italic text-primary font-medium border-l-4 border-primary">
                Sistem kustom dirancang khusus untuk membereskan alur kerja unik Anda yang tidak bisa ditangani oleh software umum.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pendekatan Kami Section */}
      <section className="py-16 md:py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-5xl font-headline font-bold fade-in-up">Pendekatan Kami</h2>
            <p className="text-xl opacity-90 fade-in-up" style={{ animationDelay: '0.2s' }}>
              Kami tidak menawarkan software siap pakai. Kami membangun sistem operasional custom yang <strong>mengikuti alur kerja internal bisnis Anda</strong>.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20 fade-in-up" style={{ animationDelay: '0.3s' }}>
                <Target className="h-10 w-10 mx-auto mb-4" />
                <h4 className="font-bold mb-2">Fokus Disiplin</h4>
                <p className="text-sm opacity-80">Validasi aktivitas sales di lapangan secara nyata.</p>
              </div>
              <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20 fade-in-up" style={{ animationDelay: '0.4s' }}>
                <Zap className="h-10 w-10 mx-auto mb-4" />
                <h4 className="font-bold mb-2">Alur Flexible</h4>
                <p className="text-sm opacity-80">Sistem di rancang untuk mengikuti Alur opersional bisnis</p>
              </div>
              <div className="p-6 bg-white/10 rounded-xl backdrop-blur-sm border border-white/20 fade-in-up" style={{ animationDelay: '0.5s' }}>
                <Smartphone className="h-10 w-10 mx-auto mb-4" />
                <h4 className="font-bold mb-2">Aman & Mudah</h4>
                <p className="text-sm opacity-80">Siap digunakan di level cabang maupun tim lapangan.</p>
              </div>
            </div>
            <p className="mt-8 text-sm italic opacity-70 fade-in-up" style={{ animationDelay: '0.6s' }}>
              *Pendekatan ini telah kami terapkan pada sistem Prolist Property, yang digunakan oleh agent properti berskala nasional.
            </p>
          </div>
        </div>
      </section>

      {/* Portofolio Section (Klien Kami) */}
      <section id="portfolio" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-gray-800">Klien Kami</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Beberapa karya terbaik yang telah kami bantu wujudkan. Klik kartu untuk mengunjungi website.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
            {portfolioProjects.map((project, index) => (
              <a 
                key={index} 
                href={project.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group block"
              >
                <Card className="overflow-hidden border-none shadow-lg group-hover:shadow-2xl transition-all duration-300 h-full fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="relative aspect-video bg-muted/20">
                    {project.image && (
                      <Image
                        src={project.image.imageUrl}
                        alt={project.image.description}
                        fill
                        className="object-contain transition-transform duration-500 group-hover:scale-105 p-2"
                        data-ai-hint={project.image.imageHint}
                      />
                    )}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="bg-secondary text-secondary-foreground px-4 py-2 rounded-md flex items-center gap-2 font-semibold">
                        Kunjungi Situs <ExternalLink className="h-4 w-4" />
                      </span>
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="font-headline font-bold group-hover:text-primary transition-colors">{project.title}</CardTitle>
                    <CardDescription className="text-sm line-clamp-2">{project.description}</CardDescription>
                  </CardHeader>
                </Card>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Solusi Section */}
      <section className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-gray-800">Solusi yang Ditawarkan</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Sistem berbasis Website & PWA (tanpa install aplikasi) dengan fitur inti untuk kendali penuh bisnis Anda.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <Users className="h-8 w-8 text-primary" />,
                title: "Multi Akses Akun",
                desc: "Akses berbeda untuk Sales Lapangan, Admin, dan Owner/Supervisor."
              },
              {
                icon: <Zap className="h-8 w-8 text-primary" />,
                title: "Order & Aktivitas Real-Time",
                desc: "Order langsung dari lapangan, data valid dan dapat ditelusuri."
              },
              {
                icon: <CheckCircle2 className="h-8 w-8 text-primary" />,
                title: "Approval Bertingkat",
                desc: "Alur persetujuan jelas, mengurangi order fiktif & data tidak akurat."
              },
              {
                icon: <Bell className="h-8 w-8 text-primary" />,
                title: "Push Notification",
                desc: "Notifikasi instan untuk order masuk, ditolak, atau tugas follow-up."
              },
              {
                icon: <BarChart3 className="h-8 w-8 text-primary" />,
                title: "Monitoring Per Area",
                desc: "Pantau performa harian sales per wilayah tanpa laporan manual."
              },
              {
                icon: <LayoutDashboard className="h-8 w-8 text-primary" />,
                title: "Dashboard PWA",
                desc: "Akses cepat dari smartphone seperti aplikasi native tanpa instalasi."
              }
            ].map((solusi, idx) => (
              <div key={idx} className="p-6 bg-card rounded-xl shadow-sm border border-border/50 hover:shadow-md transition-shadow fade-in-up" style={{ animationDelay: `${idx * 0.1}s` }}>
                <div className="bg-primary/10 p-3 rounded-lg w-fit mb-4">
                  {solusi.icon}
                </div>
                <h4 className="text-lg font-headline font-bold mb-2">{solusi.title}</h4>
                <p className="text-sm text-muted-foreground">{solusi.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nilai Utama & Keunggulan Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            <div className="lg:w-1/2 space-y-6 fade-in-up">
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-gray-800">Nilai Utama Sistem</h2>
              <p className="text-lg text-muted-foreground">
                Fokus utama kami bukan sekadar digitalisasi, tetapi <strong>pengendalian operasional dan kualitas data</strong>. Sistem ini dirancang khusus untuk bisnis yang:
              </p>
              <div className="grid grid-cols-1 gap-4">
                {[
                  "Ribet secara operasional dengan banyak orang & peran",
                  "Mengalami tekanan target tinggi dan kebocoran data",
                  "Tidak bisa dipaksa menggunakan software umum yang kaku"
                ].map((point, i) => (
                  <div key={i} className="flex items-center gap-3 p-4 bg-secondary/50 rounded-lg">
                    <CheckCircle2 className="h-6 w-6 text-primary" />
                    <span className="font-medium">{point}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-1/2 bg-primary/5 p-8 rounded-2xl border border-primary/20 fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-2xl font-headline font-bold mb-6 text-primary">Keunggulan Kami</h3>
              <div className="space-y-4">
                {[
                  { title: "Custom Sesuai Alur Bisnis", desc: "Sistem mengikuti alur internal Anda, bukan sebaliknya." },
                  { title: "Tidak Mengganggu Sistem Pusat", desc: "Dapat berjalan berdampingan dengan sistem yang sudah ada." },
                  { title: "Cepat Diadaptasi", desc: "Antarmuka intuitif untuk tim lapangan yang sibuk." },
                  { title: "Kebutuhan Nyata", desc: "Solusi dibangun berdasarkan masalah nyata, bukan teori software." },
                  { title: "Scalable", desc: "Sistem siap dikembangkan secara bertahap sesuai pertumbuhan." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 items-start">
                    <div className="mt-1 h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white text-xs font-bold shrink-0">
                      {i + 1}
                    </div>
                    <div>
                      <h5 className="font-bold">{item.title}</h5>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section (Why Choose Us) */}
      <section id="features" className="py-16 md:py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Mengapa Memilih JasaWebsiteKu?</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Kami memberikan lebih dari sekadar kode, kami memberikan nilai dan kualitas tinggi untuk setiap solusi.
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

      {/* FAQ Section */}
      <section id="faq" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold">Tanya Jawab</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Pertanyaan yang sering diajukan oleh klien kami mengenai solusi kustom.
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
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">Siap untuk Memubah Proyek Anda Menjadi Aset?</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Jangan ragu untuk berdiskusi dengan kami. Konsultasi gratis untuk menemukan solusi digital terbaik yang akan menjadi aset berharga bagi masa depan bisnis Anda.
          </p>
          <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
            <Link href="/estimasi-biaya">Dapatkan Estimasi Gratis</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
