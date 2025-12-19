import { LoginForm } from "@/components/auth/login-form";
import { Logo } from "@/components/layout/logo";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export const metadata = {
  title: "Masuk | JasaWebsiteKu",
};

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-secondary/50 p-4">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
            <div className="mx-auto mb-4">
                <Logo />
            </div>
          <CardTitle className="font-headline text-2xl">Masuk ke Akun Anda</CardTitle>
          <CardDescription>
            Belum punya akun?{" "}
            <Link href="/register" className="font-medium text-primary hover:underline">
              Daftar di sini
            </Link>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
