'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { MoneyDisplay } from '@/components/MoneyDisplay';
import { apiClient } from '@/api/client';

interface Account {
  id: string;
  name: string;
  type: 'digital' | 'cash';
  bank?: string;
  balance: number;
  currency: string;
}

interface Bank {
  id: string;
  name: string;
  logo: string;
  url: string;
}

const BANKS: Bank[] = [
  {
    id: 'BCP',
    name: 'BCP',
    logo: 'https://www.viabcp.com/ViaBCPThemeLight/images/favicon.ico',
    url: 'https://www.viabcp.com',
  },
  {
    id: 'Interbank',
    name: 'Interbank',
    logo: 'https://interbank.pe/o/public-zone-dxp-theme/images/favicon.ico',
    url: 'https://interbank.pe',
  },
  {
    id: 'BBVA',
    name: 'BBVA',
    logo: 'https://www.bbva.pe/content/dam/library/favicons/favicon.ico',
    url: 'https://www.bbva.pe',
  },
  {
    id: 'Scotiabank',
    name: 'Scotiabank',
    logo: 'https://cdn.aglty.io/scotiabank-peru/icons/favicons/rebrand-2019/favicon.ico',
    url: 'https://www.scotiabank.com.pe',
  },
  {
    id: 'BN',
    name: 'Banco de la Nación',
    logo: 'https://www.bn.com.pe/img/isotipoBN.png',
    url: 'https://www.bn.com.pe',
  },
  {
    id: 'Otros',
    name: 'Otros',
    logo: '⋯',
    url: '#',
  },
];

export default function AccountsPage() {
  const router = useRouter();
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingAccountId, setEditingAccountId] = useState<string | null>(null);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'digital' as 'digital' | 'cash',
    bank: '',
    balance: '',
  });

  useEffect(() => {
    fetchAccounts();
  }, []);

  const fetchAccounts = async () => {
    try {
      const response = await apiClient.get<Account[]>('/accounts');
      if (response.success && response.data) {
        setAccounts(response.data);
      }
    } catch (error) {
      console.error('Error fetching accounts:', error);
    }
    setLoading(false);
  };

  const handleAddClick = () => {
    setEditingAccountId(null);
    setFormData({ name: '', type: 'digital', bank: '', balance: '' });
    setShowForm(true);
  };

  const handleEditClick = (account: Account) => {
    setEditingAccountId(account.id);
    setFormData({
      name: account.name,
      type: account.type,
      bank: account.bank || '',
      balance: account.balance.toString(),
    });
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setFormData({ name: '', type: 'digital', bank: '', balance: '' });
    setEditingAccountId(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name || !formData.balance) {
      alert('Completa todos los campos');
      return;
    }

    if (!editingAccountId && formData.type === 'digital' && !formData.bank) {
      alert('Selecciona un banco');
      return;
    }

    setSubmitLoading(true);

    try {
      if (editingAccountId) {
        // Editar cuenta existente
        const updatedAccounts = accounts.map(acc =>
          acc.id === editingAccountId
            ? { ...acc, balance: parseFloat(formData.balance) }
            : acc
        );
        setAccounts(updatedAccounts);
      } else {
        // Agregar nueva cuenta
        const data = {
          name: formData.name,
          type: formData.type,
          bank: formData.type === 'digital' ? formData.bank : undefined,
          balance: parseFloat(formData.balance),
        };

        const response = await apiClient.post('/accounts', data);
        if (response.success) {
          await fetchAccounts();
        } else {
          alert('Error al agregar la cuenta');
          return;
        }
      }
      handleCancel();
    } finally {
      setSubmitLoading(false);
    }
  };

  const digitalAccounts = accounts.filter(a => a.type === 'digital');
  const cashAccounts = accounts.filter(a => a.type === 'cash');
  const totalDigital = digitalAccounts.reduce((sum, a) => sum + a.balance, 0);
  const totalCash = cashAccounts.reduce((sum, a) => sum + a.balance, 0);
  const totalAll = totalDigital + totalCash;

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
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="font-poppins text-4xl font-bold mb-2">Mis Cuentas</h1>
            <p className="text-gray-600 dark:text-gray-400">Gestiona tu dinero digital y en efectivo</p>
          </div>
          <Button onClick={handleAddClick}>+ Agregar Cuenta</Button>
        </div>

        {/* Resumen total */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/30 dark:to-primary-800/30">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Total General</p>
            <MoneyDisplay amount={totalAll} size="lg" />
          </Card>

          <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/30 dark:to-blue-800/30">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Dinero Digital</p>
            <MoneyDisplay amount={totalDigital} size="lg" />
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">{digitalAccounts.length} cuentas</p>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30">
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Efectivo</p>
            <MoneyDisplay amount={totalCash} size="lg" />
            <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">{cashAccounts.length} cuentas</p>
          </Card>
        </div>

        {/* Formulario para agregar nueva cuenta */}
        {showForm && !editingAccountId && (
          <Card className="p-6 mb-8 border-2 border-primary-200 dark:border-primary-800">
            <h2 className="text-xl font-bold mb-4">
              Agregar Nueva Cuenta
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <Input
                  label="Nombre de la cuenta"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ej: Mi Interbank"
                  required
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Tipo de cuenta
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as 'digital' | 'cash', bank: '' })}
                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                    disabled={!!editingAccountId}
                  >
                    <option value="digital">Dinero Digital</option>
                    <option value="cash">Efectivo</option>
                  </select>
                </div>
              </div>

              {formData.type === 'digital' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Banco
                  </label>
                  <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
                    {BANKS.map((bank) => (
                      <button
                        key={bank.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, bank: bank.id })}
                        disabled={!!editingAccountId}
                        className={`w-full p-3 rounded-lg border-2 flex flex-col items-center justify-center gap-1 transition-all ${
                          editingAccountId ? 'opacity-50 cursor-not-allowed' : ''
                        } ${ formData.bank === bank.id
                          ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-primary-300'
                        }`}
                      >
                        {bank.id === 'Otros' ? (
                          <span className="text-2xl">📱</span>
                        ) : (
                          <img src={bank.logo} alt={bank.name} className="w-6 h-6" />
                        )}
                        <span className="text-xs font-medium text-center">{bank.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <Input
                label="Saldo actual"
                type="number"
                step="0.01"
                value={formData.balance}
                onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
                placeholder="0.00"
                required
              />

              <div className="flex gap-3 justify-end">
                <Button
                  variant="secondary"
                  onClick={handleCancel}
                  type="button"
                >
                  Cancelar
                </Button>
                <Button type="submit" isLoading={submitLoading}>
                  Agregar Cuenta
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Dinero Digital */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            💳 Dinero Digital
            <span className="ml-2 text-primary-600">S/ {totalDigital.toFixed(2)}</span>
          </h2>

          {digitalAccounts.length > 0 ? (
            <div className="grid gap-4">
              {digitalAccounts.map(account => {
                const bank = BANKS.find(b => b.id === account.bank);
                const isEditing = editingAccountId === account.id;
                return (
                  <div key={account.id}>
                    <Card className="p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4 flex-1">
                          {bank && bank.id === 'Otros' ? (
                            <span className="text-2xl">📱</span>
                          ) : bank ? (
                            <img src={bank.logo} alt={bank.name} className="w-8 h-8" />
                          ) : null}
                          <div>
                            <h3 className="font-semibold text-lg">{account.name}</h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{account.bank}</p>
                          </div>
                        </div>
                        <div className="text-right flex flex-col items-end gap-2">
                          <MoneyDisplay amount={account.balance} size="lg" />
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleEditClick(account)}
                          >
                            Editar
                          </Button>
                        </div>
                      </div>
                    </Card>
                    {isEditing && (
                      <Card className="p-6 mt-4 border-2 border-primary-200 dark:border-primary-800">
                        <h2 className="text-xl font-bold mb-4">Editar Cuenta</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <Input
                              label="Nombre de la cuenta"
                              type="text"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              placeholder="Ej: Mi Interbank"
                              required
                            />
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Tipo de cuenta
                              </label>
                              <select
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value as 'digital' | 'cash', bank: '' })}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                                disabled
                              >
                                <option value="digital">Dinero Digital</option>
                                <option value="cash">Efectivo</option>
                              </select>
                            </div>
                          </div>
                          <Input
                            label="Saldo actual"
                            type="number"
                            step="0.01"
                            value={formData.balance}
                            onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
                            placeholder="0.00"
                            required
                          />
                          <div className="flex gap-3 justify-end">
                            <Button
                              variant="secondary"
                              onClick={handleCancel}
                              type="button"
                            >
                              Cancelar
                            </Button>
                            <Button type="submit" isLoading={submitLoading}>
                              Guardar Cambios
                            </Button>
                          </div>
                        </form>
                      </Card>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <Card className="p-8 text-center text-gray-500">
              <p>No tienes cuentas digitales. Agrega una para empezar.</p>
            </Card>
          )}
        </div>

        {/* Efectivo */}
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            💵 Efectivo
            <span className="ml-2 text-green-600">S/ {totalCash.toFixed(2)}</span>
          </h2>

          {cashAccounts.length > 0 ? (
            <div className="grid gap-4">
              {cashAccounts.map(account => {
                const isEditing = editingAccountId === account.id;
                return (
                  <div key={account.id}>
                    <Card className="p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4 flex-1">
                        <span className="text-2xl">💵</span>
                        <div>
                          <h3 className="font-semibold text-lg">{account.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">Efectivo</p>
                        </div>
                        </div>
                        <div className="text-right flex flex-col items-end gap-2">
                          <MoneyDisplay amount={account.balance} size="lg" />
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => handleEditClick(account)}
                          >
                            Editar
                          </Button>
                        </div>
                      </div>
                    </Card>
                    {isEditing && (
                      <Card className="p-6 mt-4 border-2 border-primary-200 dark:border-primary-800">
                        <h2 className="text-xl font-bold mb-4">Editar Cuenta</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                          <div className="grid md:grid-cols-2 gap-4">
                            <Input
                              label="Nombre de la cuenta"
                              type="text"
                              value={formData.name}
                              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                              placeholder="Ej: Efectivo"
                              required
                            />
                            <div>
                              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                Tipo de cuenta
                              </label>
                              <select
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value as 'digital' | 'cash', bank: '' })}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                                disabled
                              >
                                <option value="digital">Dinero Digital</option>
                                <option value="cash">Efectivo</option>
                              </select>
                            </div>
                          </div>
                          <Input
                            label="Saldo actual"
                            type="number"
                            step="0.01"
                            value={formData.balance}
                            onChange={(e) => setFormData({ ...formData, balance: e.target.value })}
                            placeholder="0.00"
                            required
                          />
                          <div className="flex gap-3 justify-end">
                            <Button
                              variant="secondary"
                              onClick={handleCancel}
                              type="button"
                            >
                              Cancelar
                            </Button>
                            <Button type="submit" isLoading={submitLoading}>
                              Guardar Cambios
                            </Button>
                          </div>
                        </form>
                      </Card>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <Card className="p-8 text-center text-gray-500">
              <p>No tienes efectivo registrado. Agrega para empezar.</p>
            </Card>
          )}
        </div>

        {/* Botón volver */}
        <div className="mt-8">
          <Button variant="secondary" onClick={() => router.push('/dashboard')}>
            ← Volver al Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
}
