'use client';

import React from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/Button';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    localStorage.removeItem('token');
    localStorage.removeItem('mockUser');
    router.push('/');
  };

  const isActive = (path: string) => pathname === path;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container-app py-4 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <h1
              className="font-poppins text-2xl font-bold text-primary-600 cursor-pointer"
              onClick={() => router.push('/dashboard')}
            >
              FinanzasPro
            </h1>

            {/* Links */}
            <div className="flex gap-6">
              <button
                onClick={() => router.push('/dashboard')}
                className={`text-sm font-medium transition-colors ${
                  isActive('/dashboard')
                    ? 'text-primary-600 border-b-2 border-primary-600 pb-2'
                    : 'text-gray-600 dark:text-gray-400 hover:text-primary-600'
                }`}
              >
                Dashboard
              </button>

              <button
                onClick={() => router.push('/dashboard/accounts')}
                className={`text-sm font-medium transition-colors ${
                  isActive('/dashboard/accounts')
                    ? 'text-primary-600 border-b-2 border-primary-600 pb-2'
                    : 'text-gray-600 dark:text-gray-400 hover:text-primary-600'
                }`}
              >
                Mis Cuentas
              </button>
            </div>
          </div>

          {/* Logout */}
          <Button variant="secondary" size="sm" onClick={handleLogout}>
            Cerrar Sesión
          </Button>
        </div>
      </nav>

      {/* Content */}
      {children}
    </div>
  );
}
