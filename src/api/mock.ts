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
};
