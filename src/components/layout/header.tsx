"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Mountain } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { UserNav } from "@/components/auth/user-nav";
import { Logo } from "./logo";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/layanan", label: "Layanan" },
  { href: "/estimasi-biaya", label: "Estimasi Biaya" },
  { href: "/kontak", label: "Kontak" },
];

export function Header() {
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      isScrolled ? "bg-background/80 backdrop-blur-sm shadow-md" : "bg-transparent"
    )}>
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        <Link href="/" className="flex items-center gap-2">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "transition-colors hover:text-primary",
                pathname === link.href ? "text-primary font-semibold" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-4 md:flex">
          {loading ? (
            <div className="h-10 w-24 animate-pulse rounded-md bg-muted"></div>
          ) : user ? (
            <UserNav />
          ) : (
            <>
              <Button asChild variant="ghost">
                <Link href="/login">Masuk</Link>
              </Button>
              <Button asChild>
                <Link href="/register">Daftar</Link>
              </Button>
            </>
          )}
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="grid gap-6 text-lg font-medium mt-8">
              <Link href="/" className="flex items-center gap-2 text-lg font-semibold">
                <Logo />
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "hover:text-foreground",
                    pathname === link.href ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {link.label}
                </Link>
              ))}
               <div className="flex flex-col gap-4 pt-4 border-t">
                {loading ? (
                    <div className="h-10 w-full animate-pulse rounded-md bg-muted"></div>
                ) : user ? (
                    <UserNav />
                ) : (
                    <>
                    <Button asChild variant="ghost" className="justify-start">
                        <Link href="/login">Masuk</Link>
                    </Button>
                    <Button asChild className="justify-start">
                        <Link href="/register">Daftar</Link>
                    </Button>
                    </>
                )}
                </div>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
