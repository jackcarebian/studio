"use client";

import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Skeleton } from '../ui/skeleton';

export interface AuthContextType {
  user: User | null;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const value = { user, loading };

  if (loading) {
    return (
        <div className="w-full h-screen flex flex-col">
            <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
                <div className="container flex h-16 items-center justify-between">
                    <Skeleton className="h-8 w-32" />
                    <div className="flex items-center gap-4">
                        <Skeleton className="h-8 w-20 hidden md:block" />
                        <Skeleton className="h-8 w-20 hidden md:block" />
                        <Skeleton className="h-10 w-10 rounded-full md:hidden" />
                    </div>
                </div>
            </header>
            <main className="flex-1 container py-8">
                 <div className="space-y-4">
                    <Skeleton className="h-12 w-1/2" />
                    <Skeleton className="h-6 w-3/4" />
                     <div className="flex gap-4">
                        <Skeleton className="h-10 w-32" />
                        <Skeleton className="h-10 w-32" />
                    </div>
                </div>
            </main>
        </div>
    );
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
