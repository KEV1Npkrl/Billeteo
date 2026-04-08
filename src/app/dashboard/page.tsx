'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card } from '@/components/Card';
import { MoneyDisplay } from '@/components/MoneyDisplay';
import { Button } from '@/components/Button';
import { formatCurrency } from '@/utils';
import { FinancialSummary } from '@/types';
import { apiClient } from '@/api/client';

interface DashboardData {
  total_balance: number;
  digital_balance: number;
  cash_balance: number;
  monthly_income: number;
  monthly_expenses: number;
  accounts_count: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [summary, setSummary] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSummary = async () => {
      const response = await apiClient.get<DashboardData>('/dashboard/summary');
      if (response.success && response.data) {
        setSummary(response.data);
      }
      setLoading(false);
    };

    fetchSummary();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="container-app py-8">
        <div className="mb-8">
          <h1 className="font-poppins text-4xl font-bold mb-2">Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Bienvenido a FinanzasPro</p>
        </div>

        {summary && (
          <>
            {/* Tarjetas principales */}
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="p-6 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/30">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Dinero Total</p>
                <MoneyDisplay amount={summary.total_balance} size="lg" />
                <p className="text-xs text-gray-500 mt-2">{summary.accounts_count} cuentas</p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Dinero Digital</p>
                <MoneyDisplay amount={summary.digital_balance} size="lg" />
                <p className="text-xs text-gray-500 mt-2">Cuentas bancarias</p>
              </Card>

              <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Efectivo</p>
                <MoneyDisplay amount={summary.cash_balance} size="lg" />
                <p className="text-xs text-gray-500 mt-2">En tu bolsillo</p>
              </Card>
            </div>

            {/* Resumen mensual */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <Card className="p-6">
                <h2 className="text-lg font-bold mb-4">Resumen del Mes</h2>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Ingresos</span>
                    <span className="text-lg font-bold text-success-600">
                      +{formatCurrency(summary.monthly_income)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Gastos</span>
                    <span className="text-lg font-bold text-danger-600">
                      -{formatCurrency(summary.monthly_expenses)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-primary-50 dark:bg-primary-900/20 rounded-lg border border-primary-200 dark:border-primary-800">
                    <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
                      Balance
                    </span>
                    <span className="text-lg font-bold text-primary-600">
                      {formatCurrency(summary.monthly_income - summary.monthly_expenses)}
                    </span>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-lg font-bold mb-4">Estado de Cuentas</h2>
                <div className="space-y-4">
                  <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400">Total de cuentas</p>
                    <p className="text-2xl font-bold">{summary.accounts_count}</p>
                  </div>
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={() => router.push('/dashboard/accounts')}
                  >
                    Gestionar Cuentas →
                  </Button>
                </div>
              </Card>
            </div>

            {/* Acciones rápidas */}
            <Card className="p-6">
              <h2 className="text-lg font-bold mb-4">Acciones rápidas</h2>
              <div className="flex flex-wrap gap-3">
                <Button variant="primary" onClick={() => router.push('/dashboard/accounts')}>
                  + Agregar Dinero
                </Button>
                <Button variant="secondary" onClick={() => alert('Próximamente')}>
                  + Registrar Gasto
                </Button>
                <Button variant="secondary" onClick={() => alert('Próximamente')}>
                  + Transferencia
                </Button>
                <Button variant="secondary" onClick={() => alert('Próximamente')}>
                  + Análisis
                </Button>
              </div>
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
