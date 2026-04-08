// Formatear dinero
export const formatCurrency = (
  amount: number,
  currency: string = 'PEN',
  locale: string = 'es-PE'
): string => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
};

// Formatear porcentaje
export const formatPercentage = (value: number, decimals: number = 1): string => {
  return `${(value * 100).toFixed(decimals)}%`;
};

// Formatear fecha
export const formatDate = (date: string | Date, format: string = 'dd/MM/yyyy'): string => {
  const dateObj = typeof date === 'string' ? new Date(date) : date;

  const day = String(dateObj.getDate()).padStart(2, '0');
  const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  const year = dateObj.getFullYear();
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');

  const formats: Record<string, string> = {
    'dd/MM/yyyy': `${day}/${month}/${year}`,
    'MM/dd/yyyy': `${month}/${day}/${year}`,
    'yyyy-MM-dd': `${year}-${month}-${day}`,
    'MMM dd, yyyy': dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit',
      year: 'numeric',
    }),
    'dd/MM/yyyy HH:mm': `${day}/${month}/${year} ${hours}:${minutes}`,
  };

  return formats[format] || dateObj.toLocaleDateString();
};

// Obtener color por tipo
export const getTypeColor = (type: string): string => {
  const colors: Record<string, string> = {
    income: '#10B981',
    expense: '#DC2626',
    transfer: '#3B82F6',
    active: '#10B981',
    completed: '#6B7280',
    danger: '#DC2626',
    warning: '#FBBF24',
    info: '#3B82F6',
  };
  return colors[type] || '#9CA3AF';
};

// Obtener mes en texto
export const getMonthName = (month: number, locale: string = 'es-PE'): string => {
  const date = new Date(2024, month - 1);
  return new Intl.DateTimeFormat(locale, { month: 'long' }).format(date);
};

// Calcular dinero disponible
export const calculateAvailableBalance = (
  totalBalance: number,
  totalDebt: number,
  nextPaymentAmount: number
): number => {
  return Math.max(0, totalBalance - totalDebt);
};

// Calcular cuánto puedo gastar
export const calculateSpendableAmount = (
  monthlyIncome: number,
  monthlyExpenses: number,
  totalDebt: number,
  savingsTarget: number = 0
): number => {
  const projectedSpending = monthlyIncome - monthlyExpenses - savingsTarget - totalDebt;
  return Math.max(0, projectedSpending);
};

// Validar email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Validar contraseña
export const isValidPassword = (password: string): boolean => {
  // Mínimo 8 caracteres, una mayúscula, una número
  return password.length >= 8 && /[A-Z]/.test(password) && /[0-9]/.test(password);
};

// Redondear a 2 decimales
export const round = (value: number, decimals: number = 2): number => {
  return Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
};

// Obtener primeras letras para avatar
export const getInitials = (firstName: string, lastName: string): string => {
  return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
};

// Obtener color para avatar
export const getAvatarColor = (name: string): string => {
  const colors = [
    '#3B82F6',
    '#EC4899',
    '#8B5CF6',
    '#10B981',
    '#F59E0B',
    '#EF4444',
  ];
  const hash = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[hash % colors.length];
};

// Delay para async/await
export const delay = (ms: number): Promise<void> =>
  new Promise(resolve => setTimeout(resolve, ms));

// Obtener mes y año actual
export const getCurrentMonthYear = (): { month: number; year: number } => {
  const now = new Date();
  return {
    month: now.getMonth() + 1,
    year: now.getFullYear(),
  };
};
