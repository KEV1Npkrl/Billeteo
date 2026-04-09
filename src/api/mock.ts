// Mock de API para desarrollo del frontend
// Reemplaza las llamadas reales mientras se desarrolla la interfaz

interface MockUser {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  currency: string;
  token: string;
}

interface MockAccount {
  id: string;
  name: string;
  type: 'digital' | 'cash';
  bank?: string;
  balance: number;
  currency: string;
}

interface MockTransaction {
  id: string;
  account_id: string;
  amount: number;
  description: string;
  category: string;
  type: 'income' | 'expense';
  date: string;
}

// Almacenamiento simulado en localStorage
const getStoredUser = (): MockUser | null => {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem('mockUser');
  return stored ? JSON.parse(stored) : null;
};

const storeUser = (user: MockUser) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('mockUser', JSON.stringify(user));
};

// Mock de usuarios registrados
const mockUsers: Record<string, MockUser & { password: string }> = {
  'test@example.com': {
    id: 'user-1',
    email: 'test@example.com',
    first_name: 'Test',
    last_name: 'User',
    currency: 'PEN',
    password: 'Password123',
    token: 'mock-token-123',
  },
};

// Mock de cuentas
const mockAccounts: Record<string, MockAccount[]> = {
  'user-1': [
    // Cuentas digitales
    {
      id: 'acc-1',
      name: 'Interbank',
      type: 'digital',
      bank: 'Interbank',
      balance: 5000,
      currency: 'PEN',
    },
    {
      id: 'acc-2',
      name: 'BCP - Cta 1',
      type: 'digital',
      bank: 'BCP',
      balance: 8500,
      currency: 'PEN',
    },
    {
      id: 'acc-3',
      name: 'BCP - Cta 2',
      type: 'digital',
      bank: 'BCP',
      balance: 3200,
      currency: 'PEN',
    },
    {
      id: 'acc-4',
      name: 'BBVA',
      type: 'digital',
      bank: 'BBVA',
      balance: 2000,
      currency: 'PEN',
    },
    {
      id: 'acc-6',
      name: 'Banco de la Nación',
      type: 'digital',
      bank: 'BN',
      balance: 1500,
      currency: 'PEN',
    },
    // Efectivo
    {
      id: 'acc-5',
      name: 'Efectivo',
      type: 'cash',
      balance: 2000,
      currency: 'PEN',
    },
  ],
};

// Mock de transacciones
const mockTransactions: Record<string, MockTransaction[]> = {
  'user-1': [
    {
      id: 'tx-1',
      account_id: 'acc-1',
      amount: 2500,
      description: 'Sueldo',
      category: 'income',
      type: 'income',
      date: '2026-04-01',
    },
    {
      id: 'tx-2',
      account_id: 'acc-1',
      amount: 150,
      description: 'Supermercado',
      category: 'groceries',
      type: 'expense',
      date: '2026-04-02',
    },
    {
      id: 'tx-3',
      account_id: 'acc-1',
      amount: 80,
      description: 'Gasolina',
      category: 'transportation',
      type: 'expense',
      date: '2026-04-03',
    },
    {
      id: 'tx-4',
      account_id: 'acc-2',
      amount: 500,
      description: 'Transferencia desde Corriente',
      category: 'transfer',
      type: 'income',
      date: '2026-04-04',
    },
  ],
};

// Mock de ahorros
interface MockSavingsContribution {
  id: string;
  goal_id: string;
  amount: number;
  scheduled_date: string;
  completed_date?: string;
  status: 'scheduled' | 'completed' | 'missed';
  transaction_id?: string;
}

interface MockSavingsGoal {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  goal_amount: number;
  current_amount: number;
  contribution_method: any;
  frequency_config: any;
  contributions: MockSavingsContribution[];
  priority: 'low' | 'medium' | 'high';
  status: 'active' | 'completed' | 'paused';
  start_date: string;
  target_date?: string;
  completed_date?: string;
  last_simulation?: any;
  allow_early_payment: boolean;
  emergency_mode: boolean;
  enable_rounding: boolean;
  created_at: string;
  updated_at: string;
}

const mockSavingsGoals: Record<string, MockSavingsGoal[]> = {
  'user-1': [
    {
      id: 'goal-1',
      user_id: 'user-1',
      name: 'Laptop Gamer',
      description: 'Para programar y jugar',
      goal_amount: 3000,
      current_amount: 800,
      contribution_method: { method: 'by_installments', total_installments: 6 },
      frequency_config: { frequency: 'monthly', monthly_week_day: 'inicio' },
      contributions: [
        {
          id: 'cont-1',
          goal_id: 'goal-1',
          amount: 500,
          scheduled_date: '2026-03-01',
          completed_date: '2026-03-01',
          status: 'completed',
        },
        {
          id: 'cont-2',
          goal_id: 'goal-1',
          amount: 300,
          scheduled_date: '2026-04-01',
          completed_date: '2026-04-03',
          status: 'completed',
        },
        {
          id: 'cont-3',
          goal_id: 'goal-1',
          amount: 500,
          scheduled_date: '2026-05-01',
          status: 'scheduled',
        },
      ],
      priority: 'high',
      status: 'active',
      start_date: '2026-03-01',
      target_date: '2026-08-01',
      last_simulation: {
        total_amount: 3000,
        target_date: '2026-08-01',
        installments_count: 6,
        amount_per_installment: 500,
        is_realistic: true,
        monthly_available: 800,
      },
      allow_early_payment: true,
      created_at: '2026-03-01T10:00:00Z',
      updated_at: '2026-04-03T15:30:00Z',
    },
  ],
};

export const mockApi = {
  // Auth
  register: async (data: any) => {
    await new Promise(resolve => setTimeout(resolve, 800)); // Simular delay

    if (mockUsers[data.email]) {
      throw new Error('Email ya registrado');
    }

    const newUser: MockUser & { password: string } = {
      id: `user-${Date.now()}`,
      email: data.email,
      first_name: data.first_name,
      last_name: data.last_name,
      currency: data.currency || 'PEN',
      password: data.password,
      token: `mock-token-${Date.now()}`,
    };

    mockUsers[data.email] = newUser;
    mockAccounts[newUser.id] = mockAccounts['user-1']; // Copiar cuentas de prueba
    mockTransactions[newUser.id] = mockTransactions['user-1']; // Copiar transacciones de prueba

    const { password, ...userWithoutPassword } = newUser;
    storeUser(userWithoutPassword);

    return userWithoutPassword;
  },

  login: async (data: any) => {
    await new Promise(resolve => setTimeout(resolve, 800));

    const user = mockUsers[data.email];

    if (!user || user.password !== data.password) {
      throw new Error('Email o contraseña incorrectos');
    }

    const { password, ...userWithoutPassword } = user;
    storeUser(userWithoutPassword);

    return userWithoutPassword;
  },

  logout: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mockUser');
    }
  },

  // Accounts
  getAccounts: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const user = getStoredUser();
    if (!user) throw new Error('No authenticated');
    return mockAccounts[user.id] || [];
  },

  addAccount: async (data: any) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    const user = getStoredUser();
    if (!user) throw new Error('No authenticated');

    const newAccount: MockAccount = {
      id: `acc-${Date.now()}`,
      name: data.name,
      type: data.type,
      bank: data.bank,
      balance: parseFloat(data.balance) || 0,
      currency: data.currency || 'PEN',
    };

    if (!mockAccounts[user.id]) {
      mockAccounts[user.id] = [];
    }
    mockAccounts[user.id].push(newAccount);

    return newAccount;
  },

  // Transactions
  getTransactions: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const user = getStoredUser();
    if (!user) throw new Error('No authenticated');
    return mockTransactions[user.id] || [];
  },

  addTransaction: async (data: any) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    const user = getStoredUser();
    if (!user) throw new Error('No authenticated');

    const newTransaction: MockTransaction = {
      id: `tx-${Date.now()}`,
      account_id: data.account_id,
      amount: data.amount,
      description: data.description,
      category: data.category,
      type: data.type,
      date: data.date || new Date().toISOString().split('T')[0],
    };

    if (!mockTransactions[user.id]) {
      mockTransactions[user.id] = [];
    }
    mockTransactions[user.id].push(newTransaction);

    // Actualizar balance de la cuenta
    const accounts = mockAccounts[user.id];
    const account = accounts.find(a => a.id === data.account_id);
    if (account) {
      if (data.type === 'income') {
        account.balance += data.amount;
      } else {
        account.balance -= data.amount;
      }
    }

    return newTransaction;
  },

  // Dashboard
  getDashboardSummary: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const user = getStoredUser();
    if (!user) throw new Error('No authenticated');

    const accounts = mockAccounts[user.id] || [];
    const transactions = mockTransactions[user.id] || [];

    const digitalBalance = accounts
      .filter(a => a.type === 'digital')
      .reduce((sum, acc) => sum + acc.balance, 0);
    
    const cashBalance = accounts
      .filter(a => a.type === 'cash')
      .reduce((sum, acc) => sum + acc.balance, 0);

    const totalBalance = digitalBalance + cashBalance;
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      total_balance: totalBalance,
      digital_balance: digitalBalance,
      cash_balance: cashBalance,
      monthly_income: income,
      monthly_expenses: expenses,
      accounts_count: accounts.length,
    };
  },

  getExpensesByCategory: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const user = getStoredUser();
    if (!user) throw new Error('No authenticated');

    const transactions = mockTransactions[user.id] || [];
    const byCategory: Record<string, number> = {};

    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        byCategory[t.category] = (byCategory[t.category] || 0) + t.amount;
      });

    return Object.entries(byCategory).map(([category, amount]) => ({
      category,
      amount,
    }));
  },

  // ===== AHORROS / METAS =====
  getSavingsGoals: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const user = getStoredUser();
    if (!user) throw new Error('No authenticated');
    return mockSavingsGoals[user.id] || [];
  },

  getSavingsGoal: async (goalId: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const user = getStoredUser();
    if (!user) throw new Error('No authenticated');
    const goal = (mockSavingsGoals[user.id] || []).find(g => g.id === goalId);
    if (!goal) throw new Error('Goal not found');
    return goal;
  },

  // Crear una nueva meta de ahorro
  createSavingsGoal: async (data: any) => {
    await new Promise(resolve => setTimeout(resolve, 700));
    const user = getStoredUser();
    if (!user) throw new Error('No authenticated');

    // Calcular contributions basado en el método elegido
    const contributions: MockSavingsContribution[] = [];
    let currentDate = new Date(data.start_date || new Date());
    let amountPerContribution = 0;
    let totalContributions = 0;

    // Determinar número y monto de contribuciones
    if (data.contribution_method.method === 'by_installments') {
      totalContributions = data.contribution_method.total_installments;
      amountPerContribution = data.goal_amount / totalContributions;
    } else if (data.contribution_method.method === 'by_amount') {
      amountPerContribution = data.contribution_method.amount_per_period;
      totalContributions = Math.ceil(data.goal_amount / amountPerContribution);
    } else if (data.contribution_method.method === 'automatic') {
      // Automático: calcular basado en fecha objetivo
      const targetDate = new Date(data.contribution_method.target_date);
      const frequency = data.frequency_config.frequency;
      
      if (frequency === 'daily') {
        const daysLeft = Math.ceil((targetDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
        totalContributions = daysLeft;
      } else if (frequency === 'weekly') {
        const weeksLeft = Math.ceil((targetDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24 * 7));
        totalContributions = weeksLeft;
      } else if (frequency === 'monthly') {
        const monthsLeft = (targetDate.getFullYear() - currentDate.getFullYear()) * 12 + (targetDate.getMonth() - currentDate.getMonth());
        totalContributions = monthsLeft > 0 ? monthsLeft : 1;
      } else if (frequency === 'yearly') {
        const yearsLeft = targetDate.getFullYear() - currentDate.getFullYear();
        totalContributions = yearsLeft > 0 ? yearsLeft : 1;
      }
      
      amountPerContribution = data.goal_amount / totalContributions;
    }

    // Generar contribuciones programadas
    for (let i = 0; i < totalContributions; i++) {
      const nextDate = new Date(currentDate);
      
      if (data.frequency_config.frequency === 'daily') {
        nextDate.setDate(nextDate.getDate() + i);
      } else if (data.frequency_config.frequency === 'weekly') {
        nextDate.setDate(nextDate.getDate() + i * 7);
      } else if (data.frequency_config.frequency === 'monthly') {
        nextDate.setMonth(nextDate.getMonth() + i);
        if (data.frequency_config.monthly_week_day) {
          if (data.frequency_config.monthly_week_day === 'inicio') {
            nextDate.setDate(1);
          } else if (data.frequency_config.monthly_week_day === 'quincena') {
            nextDate.setDate(15);
          } else if (data.frequency_config.monthly_week_day === 'fin') {
            nextDate.setDate(new Date(nextDate.getFullYear(), nextDate.getMonth() + 1, 0).getDate());
          } else {
            nextDate.setDate(data.frequency_config.monthly_week_day);
          }
        }
      } else if (data.frequency_config.frequency === 'yearly') {
        nextDate.setFullYear(nextDate.getFullYear() + i);
      }

      contributions.push({
        id: `cont-${Date.now()}-${i}`,
        goal_id: `goal-${Date.now()}`,
        amount: Math.round(amountPerContribution * 100) / 100,
        scheduled_date: nextDate.toISOString().split('T')[0],
        status: i === 0 ? 'completed' : 'scheduled',
        completed_date: i === 0 ? nextDate.toISOString().split('T')[0] : undefined,
      });
    }

    // Crear la meta
    const newGoal: MockSavingsGoal = {
      id: `goal-${Date.now()}`,
      user_id: user.id,
      name: data.name,
      description: data.description,
      goal_amount: data.goal_amount,
      current_amount: contributions[0]?.amount || 0,
      contribution_method: data.contribution_method,
      frequency_config: data.frequency_config,
      contributions,
      priority: data.priority || 'medium',
      status: 'active',
      start_date: data.start_date || new Date().toISOString().split('T')[0],
      target_date: data.contribution_method.target_date || undefined,
      last_simulation: {
        total_amount: data.goal_amount,
        target_date: data.contribution_method.target_date,
        installments_count: totalContributions,
        amount_per_installment: Math.round(amountPerContribution * 100) / 100,
        is_realistic: true,
      },
      allow_early_payment: data.allow_early_payment ?? true,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    if (!mockSavingsGoals[user.id]) {
      mockSavingsGoals[user.id] = [];
    }
    mockSavingsGoals[user.id].push(newGoal);

    // Crear transacción de egreso automáticamente
    const newTransaction: MockTransaction = {
      id: `tx-${Date.now()}`,
      account_id: data.account_id || 'acc-1',
      amount: contributions[0]?.amount || 0,
      description: `Ahorro: ${data.name}`,
      category: 'savings',
      type: 'expense',
      date: new Date().toISOString().split('T')[0],
    };

    if (!mockTransactions[user.id]) {
      mockTransactions[user.id] = [];
    }
    mockTransactions[user.id].push(newTransaction);

    // Actualizar balance de la cuenta
    const accounts = mockAccounts[user.id];
    const account = accounts.find(a => a.id === (data.account_id || 'acc-1'));
    if (account) {
      account.balance -= (contributions[0]?.amount || 0);
    }

    return newGoal;
  },

  // Actualizar una meta
  updateSavingsGoal: async (goalId: string, data: any) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    const user = getStoredUser();
    if (!user) throw new Error('No authenticated');

    const goals = mockSavingsGoals[user.id] || [];
    const goalIndex = goals.findIndex(g => g.id === goalId);
    if (goalIndex === -1) throw new Error('Goal not found');

    const goal = goals[goalIndex];
    goals[goalIndex] = {
      ...goal,
      ...data,
      updated_at: new Date().toISOString(),
    };

    return goals[goalIndex];
  },

  // Registrar un aporte/contribución
  addContribution: async (goalId: string, data: any) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    const user = getStoredUser();
    if (!user) throw new Error('No authenticated');

    const goals = mockSavingsGoals[user.id] || [];
    const goal = goals.find(g => g.id === goalId);
    if (!goal) throw new Error('Goal not found');

    // Crear la contribución
    const newContribution: MockSavingsContribution = {
      id: `cont-${Date.now()}`,
      goal_id: goalId,
      amount: data.amount,
      scheduled_date: data.scheduled_date || new Date().toISOString().split('T')[0],
      completed_date: new Date().toISOString().split('T')[0],
      status: 'completed',
    };

    goal.contributions.push(newContribution);
    goal.current_amount += data.amount;

    // Crear transacción de egreso
    const newTransaction: MockTransaction = {
      id: `tx-${Date.now()}`,
      account_id: data.account_id || 'acc-1',
      amount: data.amount,
      description: `Aporte a: ${goal.name}`,
      category: 'savings',
      type: 'expense',
      date: new Date().toISOString().split('T')[0],
    };

    if (!mockTransactions[user.id]) {
      mockTransactions[user.id] = [];
    }
    mockTransactions[user.id].push(newTransaction);

    // Actualizar balance de la cuenta
    const accounts = mockAccounts[user.id];
    const account = accounts.find(a => a.id === (data.account_id || 'acc-1'));
    if (account) {
      account.balance -= data.amount;
    }

    // Marcar como completada si la meta se alcanzó
    if (goal.current_amount >= goal.goal_amount) {
      goal.status = 'completed';
      goal.completed_date = new Date().toISOString().split('T')[0];
    }

    goal.updated_at = new Date().toISOString();
    return newContribution;
  },

  // Eliminar una meta
  deleteSavingsGoal: async (goalId: string) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const user = getStoredUser();
    if (!user) throw new Error('No authenticated');

    const goals = mockSavingsGoals[user.id] || [];
    const goalIndex = goals.findIndex(g => g.id === goalId);
    if (goalIndex === -1) throw new Error('Goal not found');

    mockSavingsGoals[user.id].splice(goalIndex, 1);
    return { success: true };
  },
};
