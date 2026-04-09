// Tipos de usuario
export type User = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  phone?: string;
  currency: string;
  timezone: string;
  theme: 'light' | 'dark';
  created_at: string;
  updated_at: string;
};

// Tipos de cuenta
export type AccountType = 'cash' | 'bank' | 'digital_wallet' | 'credit_card';

export type Account = {
  id: string;
  user_id: string;
  name: string;
  type: AccountType;
  icon?: string;
  color: string;
  currency: string;
  balance: number;
  available_balance: number;
  committed_balance: number;
  description?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

// Tipos de transacción
export type TransactionType = 'income' | 'expense' | 'transfer';
export type TransactionStatus = 'pending' | 'completed' | 'cancelled';

export type Transaction = {
  id: string;
  user_id: string;
  account_id: string;
  category_id: string;
  amount: number;
  type: TransactionType;
  description: string;
  notes?: string;
  date: string;
  is_recurring: boolean;
  recurring_type?: 'daily' | 'weekly' | 'monthly' | 'yearly';
  status: TransactionStatus;
  tags?: string[];
  receipt_url?: string;
  created_at: string;
  updated_at: string;
};

// Tipos de categoría
export type CategoryType = 'income' | 'expense';

export type Category = {
  id: string;
  user_id: string;
  name: string;
  type: CategoryType;
  icon?: string;
  color?: string;
  parent_id?: string;
  is_custom: boolean;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

// Tipos de deuda
export type DebtStatus = 'active' | 'completed' | 'paused';

export type Debt = {
  id: string;
  user_id: string;
  name: string;
  creditor?: string;
  total_amount: number;
  remaining_amount: number;
  paid_amount: number;
  monthly_payment: number;
  interest_rate: number;
  interest_paid: number;
  start_date: string;
  due_date: string;
  monthly_due_day: number;
  number_of_payments: number;
  payments_made: number;
  status: DebtStatus;
  description?: string;
  created_at: string;
  updated_at: string;
};

export type DebtPayment = {
  id: string;
  debt_id: string;
  amount: number;
  date: string;
  payment_number: number;
  status: 'scheduled' | 'completed' | 'missed';
  transaction_id?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
};

// Tipos de presupuesto
export type Budget = {
  id: string;
  user_id: string;
  category_id: string;
  month: number;
  year: number;
  limit_amount: number;
  used_amount: number;
  alert_threshold: number;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
};

// Tipos de ahorro - SISTEMA PROFESIONAL CON 3 MÉTODOS
export type SavingsFrequency = 'daily' | 'weekly' | 'monthly' | 'yearly';
export type SavingsContributionMethod = 'by_installments' | 'by_amount' | 'automatic';

// Configuración específica de frecuencia
export type FrequencyConfig = {
  frequency: SavingsFrequency;
  monthly_week_day?: 'inicio' | 'quincena' | 'fin' | number; // día específico si es número
  weekly_day?: number; // 0=lunes, 1=martes, ... 6=domingo
  // Sin config extra para daily/yearly
};

// Configuración del método de aporte
export type ContributionConfig = 
  | { method: 'by_installments'; total_installments: number }  // A: por cuotas
  | { method: 'by_amount'; amount_per_period: number }        // B: por monto
  | { method: 'automatic'; target_date: string };             // C: automático

// Simulación de ahorro
export type SavingsSimulation = {
  total_amount: number;
  target_date: string;
  installments_count: number;
  amount_per_installment: number;
  is_realistic: boolean; // basado en ingresos - egresos
  monthly_income?: number;
  monthly_expenses?: number;
  monthly_available?: number;
  suggested_amount?: number;
};

// Aporte realizado
export type SavingsContribution = {
  id: string;
  goal_id: string;
  amount: number;
  scheduled_date: string;
  completed_date?: string;
  status: 'scheduled' | 'completed' | 'missed';
  transaction_id?: string;
  notes?: string;
  created_at: string;
};

// Meta de ahorro completa
export type SavingsGoal = {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  goal_amount: number;
  current_amount: number;
  contribution_method: ContributionConfig;
  frequency_config: FrequencyConfig;
  contributions: SavingsContribution[];
  priority: 'low' | 'medium' | 'high';
  status: 'active' | 'completed' | 'paused';
  
  // Fechas
  start_date: string;
  target_date?: string;
  completed_date?: string;
  
  // Simulación guardada
  last_simulation?: SavingsSimulation;
  
  // Configuraciones adicionales
  allow_early_payment: boolean; // permite adelantar pagos
  
  created_at: string;
  updated_at: string;
};

// Tipos de alertas
export type AlertSeverity = 'info' | 'warning' | 'danger';
export type AlertType = 
  | 'debt_payment_due'
  | 'budget_exceeded'
  | 'low_balance'
  | 'high_spending'
  | 'savings_milestone'
  | 'expense_anomaly';

export type Alert = {
  id: string;
  user_id: string;
  type: AlertType;
  title: string;
  message: string;
  severity: AlertSeverity;
  action_url?: string;
  is_read: boolean;
  is_dismissed: boolean;
  data?: Record<string, any>;
  created_at: string;
  read_at?: string;
};

// Resumen financiero
export type FinancialSummary = {
  total_balance: number;
  available_balance: number;
  committed_balance: number;
  total_debt: number;
  monthly_income: number;
  monthly_expenses: number;
  balance_this_month: number;
  can_spend: number;
  accounts_count: number;
  debts_count: number;
};

// API Response genérica
export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: Array<{
      field: string;
      message: string;
    }>;
  };
  message?: string;
};

// Paginación
export type PaginationParams = {
  limit?: number;
  offset?: number;
  page?: number;
};

export type PaginationMeta = {
  total: number;
  limit: number;
  offset: number;
  pages: number;
  current_page: number;
};

// Análisis
export type Insight = {
  type: 'spending_pattern' | 'balance_trend' | 'saving_opportunity' | 'anomaly';
  severity: AlertSeverity;
  message: string;
  details: Record<string, any>;
};
