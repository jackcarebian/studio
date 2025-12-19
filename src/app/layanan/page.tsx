import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, Code2, Database, Smartphone, Store, Wind } from "lucide-react";
import { placeholderImages } from "@/lib/placeholder-images";

const serviceList = [
    {
        title: "Website Profesional & Company Profile",
        description: "Kami membangun website company profile yang modern, elegan, dan SEO-friendly untuk meningkatkan citra dan kepercayaan bisnis Anda. Tampilkan informasi penting perusahaan Anda dengan desain yang memukau.",
        tags: ["Next.js", "React", "Tailwind CSS", "SEO"],
        image: placeholderImages.find(p => p.id === "service-website"),
    },
    {
        title: "Aplikasi Web Kustom",
        description: "Butuh solusi digital yang spesifik? Kami mengembangkan aplikasi web kustom dari awal sesuai alur bisnis Anda, seperti sistem manajemen, dashboard analitik, atau platform internal lainnya.",
        tags: ["TypeScript", "Firestore", "Firebase Auth", "Node.js"],
        image: placeholderImages.find(p => p.id === "service-app"),
    },
    {
        title: "Toko Online (E-commerce)",
        description: "Mulai berjualan online dengan platform e-commerce yang andal. Kami menyediakan solusi toko online lengkap dengan manajemen produk, pembayaran, dan integrasi pengiriman.",
        tags: ["E-commerce", "Manajemen Stok", "Payment Gateway"],
        image: {
            imageUrl: "https://picsum.photos/seed/service3/600/400",
            description: "Shopping cart interface",
            imageHint: "shopping cart"
        }
    },
    {
        title: "Progressive Web App (PWA)",
        description: "Berikan pengalaman seperti aplikasi native kepada pengguna Anda. PWA yang kami bangun dapat di-install di perangkat, bekerja offline, dan mengirim notifikasi untuk meningkatkan engagement.",
        tags: ["PWA", "Offline-first", "Notifikasi Push"],
        image: {
            imageUrl: "https://picsum.photos/seed/service4/600/400",
            description: "Mobile phone showing an installed PWA",
            imageHint: "mobile app"
        }
    }
]

const technologies = [
    { icon: <Code2 className="h-8 w-8 text-primary" />, name: "React & Next.js" },
    { icon: <Database className="h-8 w-8 text-primary" />, name: "Firestore & NoSQL" },
    { icon: <Smartphone className="h-8 w-8 text-primary" />, name: "Responsive Design" },
    { icon: <Wind className="h-8 w-8 text-primary" />, name: "Tailwind CSS" },
    { icon: <Store className="h-8 w-8 text-primary" />, name: "PWA" },
    { icon: <Code2 className="h-8 w-8 text-primary" />, name: "TypeScript" },
]


export default function LayananPage() {
  return (
    <>
      <section className="py-16 md:py-24 bg-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-gray-800">Layanan Kami</h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">
            Dari website sederhana hingga aplikasi web kompleks, kami siap mewujudkan ide digital Anda menjadi kenyataan.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 space-y-20">
          {serviceList.map((service, index) => (
            <div key={index} className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-12`}>
              <div className="md:w-1/2 w-full fade-in-up">
                <h2 className="text-2xl md:text-3xl font-headline font-bold mb-4">{service.title}</h2>
                <p className="text-muted-foreground mb-6">{service.description}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {service.tags.map(tag => (
                    <span key={tag} className="text-xs font-semibold inline-block py-1 px-2.5 uppercase rounded-full text-primary bg-primary/10">
                      {tag}
                    </span>
                  ))}
                </div>
                <Button asChild>
                  <Link href="/kontak">Diskusikan Proyek</Link>
                </Button>
              </div>
              <div className="md:w-1/2 w-full fade-in-up" style={{ animationDelay: '0.2s' }}>
                {service.image && (
                    <Image
                    src={service.image.imageUrl}
                    alt={service.image.description}
                    width={600}
                    height={400}
                    className="rounded-lg shadow-xl object-cover"
                    data-ai-hint={service.image.imageHint}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4">
            <div className="text-center max-w-2xl mx-auto mb-12">
                <h2 className="text-3xl md:text-4xl font-headline font-bold">Teknologi yang Kami Gunakan</h2>
                <p className="mt-4 text-lg text-muted-foreground">
                    Kami selalu menggunakan teknologi modern dan teruji untuk memastikan kualitas terbaik pada setiap proyek.
                </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 text-center">
                {technologies.map((tech, index) => (
                    <div key={index} className="flex flex-col items-center gap-2 p-4 rounded-lg bg-card shadow-sm fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                        {tech.icon}
                        <span className="font-semibold text-sm">{tech.name}</span>
                    </div>
                ))}
            </div>
        </div>
      </section>
    </>
  );
}
