
import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";
import { Logo } from "./logo";

export function Footer() {
  const linkedInLink = "https://www.linkedin.com/in/jimmy-tjahyono-a89254a1/";
  const githubLink = "https://github.com/jackcarebian/studio";

  return (
    <footer className="bg-secondary/60 text-secondary-foreground">
      <div className="container mx-auto grid grid-cols-1 gap-8 px-4 py-12 md:grid-cols-4 md:px-6">
        <div className="flex flex-col gap-4">
          <Link href="/" className="flex items-center gap-2">
            <Logo />
          </Link>
          <p className="text-sm text-muted-foreground">
            Solusi digital modern untuk mendorong pertumbuhan bisnis Anda.
          </p>
        </div>
        <div className="grid gap-2">
          <h4 className="font-headline font-semibold">Navigasi</h4>
          <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
            Beranda
          </Link>
          <Link href="/layanan" className="text-sm text-muted-foreground hover:text-primary">
            Layanan
          </Link>
          <Link href="/estimasi-biaya" className="text-sm text-muted-foreground hover:text-primary">
            Estimasi Biaya
          </Link>
          <Link href="/kontak" className="text-sm text-muted-foreground hover:text-primary">
            Kontak
          </Link>
        </div>
        <div className="grid gap-2">
          <h4 className="font-headline font-semibold">Hubungi Kami</h4>
          <a href="mailto:promone.info@gmail.com" className="text-sm text-muted-foreground hover:text-primary">
            promone.info@gmail.com
          </a>
          <a href="https://wa.me/62895803501000" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary">
            +62 895-8035-01000
          </a>
          <p className="text-sm text-muted-foreground">Perum Berkoh Indah, Purwokerto</p>
        </div>
        <div className="grid gap-2">
          <h4 className="font-headline font-semibold">Ikuti Kami</h4>
          <div className="flex gap-4">
            <Link href={linkedInLink} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href={githubLink} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
              <Github className="h-5 w-5" />
            </Link>
            <Link href={linkedInLink} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary">
              <Linkedin className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
      <div className="border-t bg-secondary/80 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground md:px-6">
          © {new Date().getFullYear()} JasaWebsiteKu. Semua hak dilindungi.
        </div>
      </div>
    </footer>
  );
}
