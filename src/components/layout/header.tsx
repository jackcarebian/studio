
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Menu, ArrowRight, Home, Briefcase, Calculator, Mail } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/", label: "Beranda", icon: Home },
  { href: "/layanan", label: "Layanan", icon: Briefcase },
  { href: "/estimasi-biaya", label: "Estimasi Biaya", icon: Calculator },
  { href: "/kontak", label: "Kontak", icon: Mail },
];

export function Header() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-500 ease-in-out",
      isScrolled 
        ? "bg-background/90 backdrop-blur-md py-2 border-b border-primary/10 shadow-sm" 
        : "bg-transparent py-4"
    )}>
      <div className="container mx-auto flex h-14 items-center justify-between px-4 md:px-6">
        <Link 
          href="/" 
          className="flex items-center gap-2 hover:opacity-90 transition-opacity"
        >
          <Logo />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative py-1 transition-all duration-300 group font-headline tracking-wide",
                  isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
                )}
              >
                {link.label}
                <span className={cn(
                  "absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300",
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                )} />
              </Link>
            );
          })}
        </nav>

        {/* Desktop Action */}
        <div className="hidden items-center gap-4 md:flex">
          <Button asChild className="rounded-full px-6 font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-0.5 active:translate-y-0">
            <Link href="/kontak" className="flex items-center gap-2">
              Konsultasi Gratis
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex md:hidden items-center gap-2">
           <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="relative h-10 w-10 text-primary">
                <Menu className="h-7 w-7" />
                <span className="sr-only">Buka menu navigasi</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[350px] border-l-primary/10 bg-background/95 backdrop-blur-xl">
              <SheetHeader className="text-left mb-8 border-b pb-4">
                <SheetTitle className="flex items-center gap-2">
                  <Logo />
                </SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4">
                {navLinks.map((link) => {
                  const Icon = link.icon;
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMenu}
                      className={cn(
                        "flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group",
                        isActive 
                          ? "bg-primary text-primary-foreground shadow-md" 
                          : "text-muted-foreground hover:bg-primary/10 hover:text-primary"
                      )}
                    >
                      <div className={cn(
                        "p-2 rounded-lg transition-colors",
                        isActive ? "bg-white/20" : "bg-primary/5 group-hover:bg-primary/10"
                      )}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-headline font-bold text-lg">{link.label}</span>
                    </Link>
                  );
                })}
              </nav>
              <div className="absolute bottom-8 left-6 right-6 pt-6 border-t border-primary/5">
                <Button asChild className="w-full h-14 rounded-xl text-lg font-extrabold shadow-xl" onClick={closeMenu}>
                  <Link href="/kontak" className="flex items-center justify-center gap-2">
                    Konsultasi Gratis
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
