"use client";

import { AuthGuard } from "@/components/auth/auth-guard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/use-auth";

function DashboardContent() {
    const { user } = useAuth();
    
    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold font-headline mb-8">Dashboard</h1>
            <Card>
                <CardHeader>
                    <CardTitle>Selamat Datang!</CardTitle>
                    <CardDescription>Ini adalah halaman dasbor Anda yang terproteksi.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p>Halo, <span className="font-semibold">{user?.displayName || user?.email}</span>!</p>
                    <p className="text-muted-foreground mt-2">Anda telah berhasil masuk ke akun Anda.</p>
                </CardContent>
            </Card>
        </div>
    )
}

export default function DashboardPage() {
  return (
    <AuthGuard>
      <DashboardContent />
    </AuthGuard>
  );
}
