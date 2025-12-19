import { RegisterForm } from "@/components/auth/register-form";
import { Logo } from "@/components/layout/logo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export const metadata = {
  title: "Daftar Akun | JasaWebsiteKu",
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-secondary/50 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4">
            <Logo />
          </div>
          <CardTitle className="font-headline text-2xl">Buat Akun Baru</CardTitle>
          <CardDescription>
            Sudah punya akun?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">
              Masuk di sini
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <RegisterForm />
        </CardContent>
      </Card>
    </div>
  );
}
