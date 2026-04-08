'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { Card } from '@/components/Card';
import { apiClient } from '@/api/client';
import { isValidEmail, isValidPassword } from '@/utils';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    currency: 'PEN',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Limpiar error para este campo
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.email || !isValidEmail(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.password || !isValidPassword(formData.password)) {
      newErrors.password = 'Min. 8 caracteres, mayúscula y número';
    }
    if (!formData.first_name.trim()) {
      newErrors.first_name = 'Nombre requerido';
    }
    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Apellido requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    setLoading(true);

    const response = await apiClient.post('/auth/register', formData);

    if (response.success && response.data) {
      localStorage.setItem('token', response.data.token);
      router.push('/dashboard');
    } else {
      setErrors({ submit: response.error?.message || 'Error al registrarse' });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-primary-100 dark:from-gray-950 dark:to-gray-900 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <div className="p-8">
          <h1 className="font-poppins text-3xl font-bold text-center mb-2">FinanzasPro</h1>
          <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
            Crea tu cuenta gratis
          </p>

          {errors.submit && (
            <div className="mb-4 p-4 bg-danger-50 dark:bg-danger-900/20 border border-danger-200 dark:border-danger-800 rounded-lg text-danger-600 dark:text-danger-400 text-sm">
              {errors.submit}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Nombre"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="Juan"
                error={errors.first_name}
              />
              <Input
                label="Apellido"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Pérez"
                error={errors.last_name}
              />
            </div>

            <Input
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="tu@email.com"
              error={errors.email}
            />

            <Input
              label="Contraseña"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              error={errors.password}
              autoComplete="new-password"
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Moneda
              </label>
              <select
                name="currency"
                value={formData.currency}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-950 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="PEN">PEN - Sol Peruano</option>
                <option value="USD">USD - Dólar Americano</option>
                <option value="UYU">UYU - Peso Uruguayo</option>
                <option value="CLP">CLP - Peso Chileno</option>
                <option value="ARS">ARS - Peso Argentino</option>
              </select>
            </div>

            <Button type="submit" className="w-full" isLoading={loading}>
              {loading ? 'Registrando...' : 'Crear Cuenta'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              ¿Ya tienes cuenta?{' '}
              <a href="/auth/login" className="text-primary-600 hover:text-primary-700 font-medium">
                Inicia sesión
              </a>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
