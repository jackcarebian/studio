import { EstimatorForm } from "./estimator-form";
import { Bot } from "lucide-react";

export const metadata = {
  title: "Estimasi Biaya | JasaWebsiteKu",
  description: "Dapatkan estimasi biaya pembuatan website atau aplikasi Anda secara otomatis menggunakan AI.",
};

export default function EstimasiBiayaPage() {
  return (
    <div className="bg-background">
      <section className="py-16 md:py-24 bg-primary/10">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center justify-center bg-primary text-primary-foreground p-3 rounded-full mb-4">
              <Bot className="h-8 w-8" />
          </div>
          <h1 className="text-4xl md:text-5xl font-headline font-bold text-gray-800">Estimasi Biaya Proyek Anda</h1>
          <p className="mt-4 text-lg max-w-3xl mx-auto text-muted-foreground">
            Jelaskan kebutuhan website atau aplikasi Anda, dan biarkan asisten AI kami memberikan perkiraan biaya dan rincian fitur yang diperlukan dalam Rupiah.
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <EstimatorForm />
          </div>
        </div>
      </section>
    </div>
  );
}
