'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Card } from '@/components/Card';
import { apiClient } from '@/api/client';

export default function LoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const response = await apiClient.post('/auth/login', formData);

    if (response.success && response.data) {
      localStorage.setItem('token', response.data.token);
      router.push('/dashboard');
    } else {
      setError(response.error?.message || 'Error al iniciar sesión');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-950 dark:to-gray-900">
      <Card className="w-full max-w-md shadow-lg">
        <div className="p-8">
          <h1 className="font-poppins text-3xl font-bold text-center mb-2">FinanzasPro</h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            Iniciá sesión en tu cuenta
          </p>

          {error && (
            <div className="mb-4 p-4 bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800 rounded-lg text-danger-600 dark:text-danger-400 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              required
            />

            <Input
              label="Contraseña"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />

            <Button type="submit" className="w-full" isLoading={loading}>
              {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ¿No tienes cuenta?{' '}
              <a href="/auth/register" className="text-primary-600 hover:text-primary-700 font-medium">
                Regístrate aquí
              </a>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
