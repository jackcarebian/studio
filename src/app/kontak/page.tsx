import { ContactForm } from "@/components/contact-form";
import { Mail, MapPin, Phone } from "lucide-react";

export const metadata = {
  title: "Kontak | JasaWebsiteKu",
  description: "Hubungi kami untuk konsultasi gratis mengenai proyek website atau aplikasi Anda.",
};

export default function KontakPage() {
  return (
    <>
      <section className="py-16 md:py-24 bg-primary/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-gray-800">Hubungi Kami</h1>
          <p className="mt-4 text-lg max-w-2xl mx-auto text-muted-foreground">
            Punya ide brilian? Mari kita diskusikan. Kami siap membantu Anda.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-start">
            <div className="space-y-8 fade-in-up">
              <h2 className="text-2xl md:text-3xl font-headline font-bold">Informasi Kontak</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Email</h3>
                    <p className="text-muted-foreground">Kirimkan pertanyaan Anda kapan saja.</p>
                    <a href="mailto:promone.info@gmail.com" className="text-primary font-medium hover:underline">
                      promone.info@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">WhatsApp</h3>
                    <p className="text-muted-foreground">Untuk respon yang lebih cepat.</p>
                    <a href="https://wa.me/6288988357060" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">
                      +62 889-8835-7060
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-full">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">Alamat</h3>
                    <p className="text-muted-foreground">Perum Berkoh Indah, Purwokerto</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="fade-in-up" style={{ animationDelay: '0.2s' }}>
                <h2 className="text-2xl md:text-3xl font-headline font-bold mb-8">Kirim Pesan</h2>
                <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
