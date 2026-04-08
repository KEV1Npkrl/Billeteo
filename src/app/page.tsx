'use client';

import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Card } from '@/components/Card';
import { MoneyDisplay } from '@/components/MoneyDisplay';
import { ProgressBar } from '@/components/ProgressBar';

export { Button, Input, Card, MoneyDisplay, ProgressBar };

export default function Page() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="container-app py-12">
        <div className="text-center mb-12">
          <h1 className="font-poppins text-5xl font-bold mb-4">FinanzasPro</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Sistema de Gestión Financiera Personal
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card shadow="lg" className="p-8">
            <h2 className="text-2xl font-bold mb-4">¿Listo para empezar?</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Controla tu dinero de forma clara, realista y útil para tomar mejores decisiones
              financieras.
            </p>
            <div className="space-y-3">
              <Button className="w-full" onClick={() => window.location.href = '/auth/register'}>
                Crear Cuenta
              </Button>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => window.location.href = '/auth/login'}
              >
                Iniciar Sesión
              </Button>
            </div>
          </Card>

          <Card shadow="lg" className="p-8 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900 dark:to-primary-800">
            <h3 className="text-lg font-bold mb-4">Características principales</h3>
            <ul className="space-y-2 text-sm">
              <li>✓ Gestión de múltiples cuentas</li>
              <li>✓ Registro de ingresos y gastos</li>
              <li>✓ Control de deudas y presupuestos</li>
              <li>✓ Análisis y reportes automáticos</li>
              <li>✓ Alertas inteligentes</li>
              <li>✓ Sincronización en la nube</li>
            </ul>
          </Card>
        </div>

        <div className="mt-20 text-center text-gray-600 dark:text-gray-400">
          <p>© 2026 FinanzasPro - Todos los derechos reservados</p>
        </div>
      </div>
    </div>
  );
}
