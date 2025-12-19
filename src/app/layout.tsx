import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import "./globals.css";
import { AuthProvider } from "@/components/auth/auth-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";
import { WhatsAppFAB } from "@/components/layout/whatsapp-fab";

export const metadata: Metadata = {
  title: "JasaWebsiteKu | Solusi Digital untuk Bisnis Anda",
  description: "Layanan jasa pembuatan Website dan Aplikasi Custom sesuai dengan kebutuhan Bisnis. Modern, cepat, dan SEO-friendly.",
  keywords: ["pembuatan website", "jasa website", "aplikasi custom", "next.js", "react", "seo"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#199EBD" />
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-body antialiased flex flex-col"
        )}
      >
        <AuthProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppFAB />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
