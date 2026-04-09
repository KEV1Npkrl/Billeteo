'use client';

import { useState, useEffect } from 'react';
import { apiClient } from '@/api/client';
import { SavingsGoal, SavingsFrequency, SavingsContributionMethod } from '@/types';
import { Button } from '@/components/Button';
import { Card } from '@/components/Card';
import { Input } from '@/components/Input';
import { ProgressBar } from '@/components/ProgressBar';

export default function SavingsPage() {
  const [goals, setGoals] = useState<SavingsGoal[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [activeGoalId, setActiveGoalId] = useState<string | null>(null);
  const [editingGoalId, setEditingGoalId] = useState<string | null>(null);
  const [showContributionForm, setShowContributionForm] = useState<string | null>(null);

  // Obtener fecha mínima permitida (hoy)
  const getMinDate = () => new Date().toISOString().split('T')[0];

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    goal_amount: '',
    priority: 'medium',
    start_date: new Date().toISOString().split('T')[0],
    contribution_method: 'by_installments' as SavingsContributionMethod,
    total_installments: '6',
    amount_per_period: '',
    target_date: '',
    frequency: 'monthly' as SavingsFrequency,
    monthly_week_day: 'inicio' as 'inicio' | 'quincena' | 'fin' | number,
    allow_early_payment: true,
  });

  const [contributionAmount, setContributionAmount] = useState('');
  const [simulation, setSimulation] = useState<any>(null);

  // Función auxiliar para obtener el último día del mes
  const getLastDayOfMonth = (date: Date): number => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  // Función auxiliar para calcular la próxima fecha de contribución
  const getNextContributionDate = (
    startDate: Date,
    frequency: string,
    monthlyWeekDay: string | number | undefined,
    installmentNumber: number
  ): Date => {
    const nextDate = new Date(startDate);

    if (frequency === 'daily') {
      nextDate.setDate(nextDate.getDate() + installmentNumber);
    } else if (frequency === 'weekly') {
      nextDate.setDate(nextDate.getDate() + installmentNumber * 7);
    } else if (frequency === 'monthly') {
      nextDate.setMonth(nextDate.getMonth() + installmentNumber);

      // Ajustar el día según la configuración
      if (monthlyWeekDay === 'inicio') {
        nextDate.setDate(1);
      } else if (monthlyWeekDay === 'quincena') {
        nextDate.setDate(15);
      } else if (monthlyWeekDay === 'fin') {
        nextDate.setDate(getLastDayOfMonth(nextDate));
      } else if (typeof monthlyWeekDay === 'number' || (typeof monthlyWeekDay === 'string' && !isNaN(Number(monthlyWeekDay)))) {
        const dayNum = typeof monthlyWeekDay === 'number' ? monthlyWeekDay : parseInt(monthlyWeekDay as string);
        const lastDay = getLastDayOfMonth(nextDate);
        nextDate.setDate(Math.min(dayNum, lastDay));
      }
    } else if (frequency === 'yearly') {
      nextDate.setFullYear(nextDate.getFullYear() + installmentNumber);
    }

    return nextDate;
  };

  // Cargar metas
  useEffect(() => {
    fetchGoals();
  }, []);

  const fetchGoals = async () => {
    try {
      setLoading(true);
      const response = await apiClient.get<SavingsGoal[]>('/savings-goals');
      if (response.success) {
        setGoals(response.data || []);
      }
    } catch (error) {
      console.error('Error fetching goals:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calcular simulación
  const calculateSimulation = () => {
    const goalAmount = parseFloat(formData.goal_amount);
    if (!goalAmount || goalAmount <= 0) return null;

    let installmentsCount = 0;
    let amountPerInstallment = 0;
    let estimatedEndDate = new Date();

    if (formData.contribution_method === 'by_installments') {
      installmentsCount = parseInt(formData.total_installments) || 1;
      amountPerInstallment = goalAmount / installmentsCount;

      estimatedEndDate = getNextContributionDate(
        new Date(formData.start_date),
        formData.frequency,
        formData.frequency === 'monthly' ? formData.monthly_week_day : undefined,
        installmentsCount
      );
    } else if (formData.contribution_method === 'by_amount') {
      const perPeriod = parseFloat(formData.amount_per_period) || 0;
      if (perPeriod <= 0) return null;

      installmentsCount = Math.ceil(goalAmount / perPeriod);
      amountPerInstallment = perPeriod;

      estimatedEndDate = getNextContributionDate(
        new Date(formData.start_date),
        formData.frequency,
        formData.frequency === 'monthly' ? formData.monthly_week_day : undefined,
        installmentsCount
      );
    } else if (formData.contribution_method === 'automatic' && formData.target_date) {
      const targetDate = new Date(formData.target_date);
      const startDate = new Date(formData.start_date);
      const timeDiff = targetDate.getTime() - startDate.getTime();

      if (formData.frequency === 'daily') {
        installmentsCount = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      } else if (formData.frequency === 'weekly') {
        installmentsCount = Math.ceil(timeDiff / (1000 * 60 * 60 * 24 * 7));
      } else if (formData.frequency === 'monthly') {
        installmentsCount =
          (targetDate.getFullYear() - startDate.getFullYear()) * 12 +
          (targetDate.getMonth() - startDate.getMonth());
      } else if (formData.frequency === 'yearly') {
        installmentsCount = targetDate.getFullYear() - startDate.getFullYear();
      }

      amountPerInstallment = goalAmount / Math.max(installmentsCount, 1);
      estimatedEndDate = new Date(formData.target_date);
    }

    return {
      total_amount: goalAmount,
      target_date: estimatedEndDate.toISOString().split('T')[0],
      installments_count: installmentsCount,
      amount_per_installment: Math.round(amountPerInstallment * 100) / 100,
      is_realistic: amountPerInstallment > 0,
    };
  };

  // Manejar cambios de formulario
  const handleFormChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  // Crear nueva meta
  const handleCreateGoal = async () => {
    if (!formData.name || !formData.goal_amount) return;

    try {
      const goalAmount = parseFloat(formData.goal_amount);
      const payload = {
        name: formData.name,
        description: formData.description,
        goal_amount: goalAmount,
        priority: formData.priority,
        start_date: formData.start_date,
        contribution_method:
          formData.contribution_method === 'by_installments'
            ? { method: 'by_installments', total_installments: parseInt(formData.total_installments) }
            : formData.contribution_method === 'by_amount'
            ? { method: 'by_amount', amount_per_period: parseFloat(formData.amount_per_period) }
            : { method: 'automatic', target_date: formData.target_date },
        frequency_config: {
          frequency: formData.frequency,
          monthly_week_day:
            formData.frequency === 'monthly'
              ? formData.monthly_week_day === 'inicio' || formData.monthly_week_day === 'quincena' || formData.monthly_week_day === 'fin'
                ? formData.monthly_week_day
                : parseInt(formData.monthly_week_day as string)
              : undefined,
        },
      };

      const response = await apiClient.post<SavingsGoal>('/savings-goals', payload);
      if (response.success) {
        await fetchGoals();
        setShowForm(false);
        setFormData({
          name: '',
          description: '',
          goal_amount: '',
          priority: 'medium',
          start_date: new Date().toISOString().split('T')[0],
          contribution_method: 'by_installments',
          total_installments: '6',
          amount_per_period: '',
          target_date: '',
          frequency: 'monthly',
          monthly_week_day: 'inicio',
          allow_early_payment: true,
        });
      }
    } catch (error) {
      console.error('Error creating goal:', error);
    }
  };

  // Registrar aporte
  const handleAddContribution = async (goalId: string) => {
    const amount = parseFloat(contributionAmount);
    if (!amount || amount <= 0) return;

    try {
      const response = await apiClient.post(`/savings-goals/${goalId}/contributions`, {
        amount,
        account_id: 'acc-1',
      });
      if (response.success) {
        await fetchGoals();
        setShowContributionForm(null);
        setContributionAmount('');
      }
    } catch (error) {
      console.error('Error adding contribution:', error);
    }
  };

  // Eliminar meta
  const handleDeleteGoal = async (goalId: string) => {
    if (!confirm('¿Deseas eliminar esta meta? Esta acción no se puede deshacer.')) return;

    try {
      const response = await apiClient.delete(`/savings-goals/${goalId}`);
      if (response.success) {
        await fetchGoals();
      }
    } catch (error) {
      console.error('Error deleting goal:', error);
    }
  };

  const currentSimulation = calculateSimulation();

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen">Cargando...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">💰 Metas de Ahorro</h1>
          <p className="text-gray-600">Planifica y controla tus ahorros con metas inteligentes</p>
        </div>
        <Button onClick={() => setShowForm(!showForm)} className="bg-green-600 hover:bg-green-700">
          {showForm ? '✕ Cerrar' : '+ Crear Meta'}
        </Button>
      </div>

      {/* Formulario Crear Meta */}
      {showForm && (
        <Card className="mb-8 border-2 border-green-200">
          <h2 className="text-xl font-bold mb-6">Nueva Meta de Ahorro</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Input
              label="Nombre de la meta"
              name="name"
              placeholder="Ej: Laptop, Viaje, Emergencia"
              value={formData.name}
              onChange={handleFormChange}
            />
            <Input
              label="Monto objetivo (S/)"
              name="goal_amount"
              type="number"
              placeholder="3000"
              value={formData.goal_amount}
              onChange={handleFormChange}
            />
            <Input
              label="Descripción"
              name="description"
              placeholder="Opcional"
              value={formData.description}
              onChange={handleFormChange}
            />
            <select
              name="priority"
              value={formData.priority}
              onChange={handleFormChange}
              className="border rounded px-3 py-2"
            >
              <option value="low">Baja Prioridad</option>
              <option value="medium">Prioridad Media</option>
              <option value="high">Alta Prioridad</option>
            </select>
          </div>

          {/* Método de Aporte */}
          <div className="bg-blue-50 p-4 rounded mb-6">
            <h3 className="font-bold mb-3">🔹 Elige tu método de aporte</h3>
            <div className="space-y-3">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="contribution_method"
                  value="by_installments"
                  checked={formData.contribution_method === 'by_installments'}
                  onChange={handleFormChange}
                  className="mr-2"
                />
                <span>
                  <strong>Por cuotas:</strong> Divide el total en X cuotas 
                  {formData.contribution_method === 'by_installments' && (
                    <Input
                      label="Número de cuotas"
                      name="total_installments"
                      type="number"
                      value={formData.total_installments}
                      onChange={handleFormChange}
                      className="mt-2 inline-block w-20"
                    />
                  )}
                </span>
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name="contribution_method"
                  value="by_amount"
                  checked={formData.contribution_method === 'by_amount'}
                  onChange={handleFormChange}
                  className="mr-2"
                />
                <span>
                  <strong>Por monto:</strong> Especifica cuánto ahorras por periodo
                  {formData.contribution_method === 'by_amount' && (
                    <Input
                      label="Monto por aporte (S/)"
                      name="amount_per_period"
                      type="number"
                      placeholder="200"
                      value={formData.amount_per_period}
                      onChange={handleFormChange}
                      className="mt-2"
                    />
                  )}
                </span>
              </label>

              <label className="flex items-center">
                <input
                  type="radio"
                  name="contribution_method"
                  value="automatic"
                  checked={formData.contribution_method === 'automatic'}
                  onChange={handleFormChange}
                  className="mr-2"
                />
                <span>
                  <strong>Automático:</strong> Define meta + fecha objetivo
                  {formData.contribution_method === 'automatic' && (
                    <Input
                      label="Fecha objetivo"
                      name="target_date"
                      type="date"
                      value={formData.target_date}
                      onChange={handleFormChange}
                      min={getMinDate()}
                      className="mt-2"
                    />
                  )}
                </span>
              </label>
            </div>
          </div>

          {/* Frecuencia */}
          <div className="bg-purple-50 p-4 rounded mb-6">
            <h3 className="font-bold mb-3">📅 Frecuencia de aportes</h3>
            <div className="grid grid-cols-2 gap-3 mb-3">
              <select
                name="frequency"
                value={formData.frequency}
                onChange={handleFormChange}
                className="border rounded px-3 py-2 col-span-2"
              >
                <option value="daily">Diario</option>
                <option value="weekly">Semanal</option>
                <option value="monthly">Mensual</option>
                <option value="yearly">Anual</option>
              </select>

              {formData.frequency === 'monthly' && (
                <select
                  name="monthly_week_day"
                  value={formData.monthly_week_day}
                  onChange={handleFormChange}
                  className="border rounded px-3 py-2 col-span-2"
                >
                  <option value="inicio">📅 Inicio de mes (día 1)</option>
                  <option value="quincena">📅 Quincena (día 15)</option>
                  <option value="fin">📅 Fin de mes (último día)</option>
                  <optgroup label="Elegir día específico">
                    {Array.from({ length: 31 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>
                        Día {i + 1}
                      </option>
                    ))}
                  </optgroup>
                </select>
              )}
            </div>
          </div>

          {/* Simulación */}
          {currentSimulation && (
            <div className="bg-green-50 p-4 rounded mb-6 border-l-4 border-green-500">
              <h3 className="font-bold mb-2">📊 Simulación</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Cuotas totales:</span>
                  <p className="font-bold">{currentSimulation.installments_count}</p>
                </div>
                <div>
                  <span className="text-gray-600">Por aporte:</span>
                  <p className="font-bold">S/ {currentSimulation.amount_per_installment}</p>
                </div>
                <div>
                  <span className="text-gray-600">Fecha estimada:</span>
                  <p className="font-bold">{new Date(currentSimulation.target_date).toLocaleDateString('es-PE')}</p>
                </div>
                <div>
                  <span className="text-gray-600">Realista:</span>
                  <p className="font-bold">{currentSimulation.is_realistic ? '✅ Sí' : '❌ No'}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button onClick={handleCreateGoal} className="bg-green-600 hover:bg-green-700 flex-1">
              ✅ Crear Meta
            </Button>
            <Button onClick={() => setShowForm(false)} className="bg-gray-400 flex-1">
              Cancelar
            </Button>
          </div>
        </Card>
      )}

      {/* Metas Existentes */}
      <div className="space-y-4">
        {goals.length === 0 ? (
          <Card className="text-center py-12">
            <p className="text-gray-600 mb-4">No tienes metas de ahorro aún</p>
            <Button onClick={() => setShowForm(true)} className="bg-green-600">
              + Crear tu primera meta
            </Button>
          </Card>
        ) : (
          goals.map(goal => {
            const progress = (goal.current_amount / goal.goal_amount) * 100;
            const remainingAmount = goal.goal_amount - goal.current_amount;
            const nextContribution = goal.contributions.find(c => c.status === 'scheduled');
            const completedCount = goal.contributions.filter(c => c.status === 'completed').length;

            return (
              <Card key={goal.id} className="border-l-4 border-blue-500 hover:shadow-lg transition">
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold">{goal.name}</h3>
                    {goal.description && <p className="text-gray-600 text-sm">{goal.description}</p>}
                    <div className="flex gap-2 mt-2">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded font-semibold">
                        {goal.priority === 'high' ? '🔴' : goal.priority === 'medium' ? '🟡' : '🟢'} {goal.priority}
                      </span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded font-semibold">
                        {goal.status === 'active' ? '✅ Activa' : goal.status === 'completed' ? '🎉 Completada' : '⏸️ Pausada'}
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-blue-600">S/ {goal.current_amount.toFixed(2)}</div>
                    <div className="text-sm text-gray-600">de S/ {goal.goal_amount}</div>
                  </div>
                </div>

                {/* Progreso */}
                <div className="mb-4">
                  <ProgressBar progress={Math.min(progress, 100)} />
                  <div className="flex justify-between text-xs text-gray-600 mt-1">
                    <span>{Math.round(progress)}%</span>
                    <span>S/ {remainingAmount.toFixed(2)} por ahorrar</span>
                  </div>
                </div>

                {/* Detalles */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 bg-gray-50 p-3 rounded text-sm">
                  <div>
                    <span className="text-gray-600">Cuotas</span>
                    <p className="font-bold">{completedCount}/{goal.contributions.length}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Frecuencia</span>
                    <p className="font-bold capitalize">{goal.frequency_config.frequency}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Método</span>
                    <p className="font-bold">
                      {goal.contribution_method.method === 'by_installments' && '📊 Cuotas'}
                      {goal.contribution_method.method === 'by_amount' && '💵 Monto'}
                      {goal.contribution_method.method === 'automatic' && '🤖 Automático'}
                    </p>
                  </div>
                  <div>
                    <span className="text-gray-600">Próximo</span>
                    <p className="font-bold">
                      {nextContribution ? new Date(nextContribution.scheduled_date).toLocaleDateString('es-PE') : '✅ Completada'}
                    </p>
                  </div>
                </div>

                {/* Información del próximo aporte */}
                {nextContribution && (
                  <div className="bg-yellow-50 p-3 rounded mb-4 border-l-4 border-yellow-400 text-sm">
                    <strong>📅 Próximo aporte:</strong> S/ {nextContribution.amount} el{' '}
                    {new Date(nextContribution.scheduled_date).toLocaleDateString('es-PE')}
                  </div>
                )}

                {/* Botones de acción */}
                <div className="flex flex-wrap gap-2">
                  {goal.status === 'active' && !showContributionForm && (
                    <Button
                      onClick={() => setShowContributionForm(goal.id)}
                      className="bg-green-600 hover:bg-green-700 text-sm"
                    >
                      💸 Registrar Aporte
                    </Button>
                  )}

                  {goal.status === 'active' && showContributionForm === goal.id && (
                    <div className="flex gap-2 w-full">
                      <Input
                        type="number"
                        placeholder="Monto del aporte"
                        value={contributionAmount}
                        onChange={e => setContributionAmount(e.target.value)}
                        className="flex-1"
                      />
                      <Button
                        onClick={() => handleAddContribution(goal.id)}
                        className="bg-green-600 hover:bg-green-700 text-sm"
                      >
                        ✅ Confirmar
                      </Button>
                      <Button
                        onClick={() => setShowContributionForm(null)}
                        className="bg-gray-400 text-sm"
                      >
                        ✕
                      </Button>
                    </div>
                  )}

                  <Button onClick={() => setActiveGoalId(activeGoalId === goal.id ? null : goal.id)} className="bg-blue-600 hover:bg-blue-700 text-sm">
                    📊 Detalles
                  </Button>

                  <Button onClick={() => handleDeleteGoal(goal.id)} className="bg-red-600 hover:bg-red-700 text-sm">
                    🗑️ Eliminar
                  </Button>
                </div>

                {/* Detalles expandidos */}
                {activeGoalId === goal.id && (
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-bold mb-3">📋 Historial de aportes</h4>
                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {goal.contributions.map(contrib => (
                        <div key={contrib.id} className="flex justify-between items-center p-2 bg-gray-50 rounded text-sm">
                          <span>
                            {contrib.scheduled_date}
                            <span className={`ml-2 font-semibold ${contrib.status === 'completed' ? 'text-green-600' : 'text-gray-600'}`}>
                              {contrib.status === 'completed' ? '✅' : '⏳'}
                            </span>
                          </span>
                          <span className="font-bold">S/ {contrib.amount.toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
