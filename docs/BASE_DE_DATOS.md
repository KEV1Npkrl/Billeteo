# 🗄️ Diseño de Base de Datos

## Diagrama ER (Entity-Relationship)

```
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│    USERS     │         │   ACCOUNTS   │         │   BALANCES   │
├──────────────┤         ├──────────────┤         ├──────────────┤
│ id (PK)      │←───┬────│ id (PK)      │────┬───→│ id (PK)      │
│ email        │    │    │ user_id (FK) │    │    │ account_id   │
│ password     │    │    │ name         │    │    │ date         │
│ first_name   │    │    │ type         │    │    │ balance      │
│ last_name    │    │    │ currency     │    │    │ available    │
│ created_at   │    │    │ created_at   │    │    │ committed    │
│ updated_at   │    │    │ updated_at   │    │    │ created_at   │
└──────────────┘    │    └──────────────┘    │    └──────────────┘
                    │          ↓             │
                    │    ┌──────────────┐   │
                    │    │TRANSACTIONS  │   │
                    │    ├──────────────┤   │
                    └───→│ id (PK)      │←──┘
                         │ account_id   │
                         │ user_id      │
                         │ category_id  │
                         │ amount       │
                         │ type         │
                         │ description  │
                         │ date         │
                         │ created_at   │
                         └──────────────┘
                                ↕
                         ┌──────────────┐
                         │ CATEGORIES   │
                         ├──────────────┤
                         │ id (PK)      │
                         │ user_id (FK) │
                         │ name         │
                         │ icon         │
                         │ color        │
                         │ parent_id    │
                         │ created_at   │
                         └──────────────┘

┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│    DEBTS     │         │  DEBT_PAYMENTS│        │   BUDGETS    │
├──────────────┤         ├──────────────┤         ├──────────────┤
│ id (PK)      │←───┬────│ id (PK)      │         │ id (PK)      │
│ user_id (FK) │    │    │ debt_id (FK) │         │ user_id (FK) │
│ name         │    │    │ amount       │         │ category_id  │
│ total_amount │    │    │ date         │         │ month        │
│ remaining    │    │    │ status       │         │ limit        │
│ monthly_pay  │    │    │ created_at   │         │ used         │
│ interest     │    │    └──────────────┘         │ year         │
│ due_date     │    │                             │ created_at   │
│ status       │    └─────────────────────────────┴──────────────┘
│ created_at   │
└──────────────┘

┌──────────────┐         ┌──────────────┐
│   SAVINGS    │         │    ALERTS    │
├──────────────┤         ├──────────────┤
│ id (PK)      │         │ id (PK)      │
│ user_id (FK) │         │ user_id (FK) │
│ name         │         │ type         │
│ goal_amount  │         │ title        │
│ current      │         │ message      │
│ deadline     │         │ severity     │
│ created_at   │         │ read         │
└──────────────┘         │ created_at   │
                         └──────────────┘
```

---

## Tablas detalladas

### 1. USERS

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  profile_picture_url TEXT,
  currency VARCHAR(3) DEFAULT 'USD',
  language VARCHAR(5) DEFAULT 'es',
  timezone VARCHAR(50) DEFAULT 'America/Lima',
  theme VARCHAR(10) DEFAULT 'light',
  two_factor_enabled BOOLEAN DEFAULT FALSE,
  email_verified BOOLEAN DEFAULT FALSE,
  status VARCHAR(20) DEFAULT 'active',
  last_login TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT email_format CHECK (email LIKE '%@%.%')
);

CREATE INDEX idx_users_email ON users(email);
```

### 2. ACCOUNTS

```sql
CREATE TABLE accounts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(50) NOT NULL, -- 'cash', 'bank', 'digital_wallet', 'credit_card'
  icon VARCHAR(50),
  color VARCHAR(7) DEFAULT '#3B82F6',
  currency VARCHAR(3) DEFAULT 'USD',
  balance DECIMAL(15, 2) DEFAULT 0,
  available_balance DECIMAL(15, 2) DEFAULT 0,
  committed_balance DECIMAL(15, 2) DEFAULT 0,
  description TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  display_order INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT positive_balance CHECK (balance >= 0)
);

CREATE INDEX idx_accounts_user_id ON accounts(user_id);
CREATE INDEX idx_accounts_active ON accounts(user_id, is_active);
```

### 3. BALANCES (Histórico)

```sql
CREATE TABLE balances (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  balance DECIMAL(15, 2) NOT NULL,
  available DECIMAL(15, 2) NOT NULL,
  committed DECIMAL(15, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(account_id, date)
);

CREATE INDEX idx_balances_account_date ON balances(account_id, date);
```

### 4. CATEGORIES

```sql
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  type VARCHAR(20) NOT NULL, -- 'income', 'expense'
  icon VARCHAR(50),
  color VARCHAR(7),
  parent_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  is_custom BOOLEAN DEFAULT TRUE,
  display_order INT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_categories_user_id ON categories(user_id);
CREATE INDEX idx_categories_parent_id ON categories(parent_id);
```

### 5. TRANSACTIONS

```sql
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  account_id UUID NOT NULL REFERENCES accounts(id) ON DELETE RESTRICT,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE RESTRICT,
  amount DECIMAL(15, 2) NOT NULL,
  type VARCHAR(20) NOT NULL, -- 'income', 'expense', 'transfer'
  description TEXT,
  notes TEXT,
  date DATE NOT NULL,
  is_recurring BOOLEAN DEFAULT FALSE,
  recurring_type VARCHAR(20), -- 'daily', 'weekly', 'monthly', 'yearly'
  tags VARCHAR(255),
  receipt_url TEXT,
  status VARCHAR(20) DEFAULT 'completed', -- 'pending', 'completed', 'cancelled'
  created_by_user_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT positive_amount CHECK (amount > 0)
);

CREATE INDEX idx_transactions_user_id ON transactions(user_id);
CREATE INDEX idx_transactions_account_id ON transactions(account_id);
CREATE INDEX idx_transactions_category_id ON transactions(category_id);
CREATE INDEX idx_transactions_date ON transactions(user_id, date);
CREATE INDEX idx_transactions_type ON transactions(user_id, type);
```

### 6. DEBTS

```sql
CREATE TABLE debts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  creditor VARCHAR(255),
  total_amount DECIMAL(15, 2) NOT NULL,
  remaining_amount DECIMAL(15, 2) NOT NULL,
  paid_amount DECIMAL(15, 2) DEFAULT 0,
  monthly_payment DECIMAL(15, 2),
  interest_rate DECIMAL(5, 2) DEFAULT 0,
  interest_paid DECIMAL(15, 2) DEFAULT 0,
  start_date DATE,
  due_date DATE,
  monthly_due_day INT,
  number_of_payments INT,
  payments_made INT DEFAULT 0,
  status VARCHAR(20) DEFAULT 'active', -- 'active', 'completed', 'paused'
  description TEXT,
  category_id UUID REFERENCES categories(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT positive_amounts CHECK (
    total_amount > 0 AND 
    remaining_amount >= 0 AND 
    monthly_payment > 0
  )
);

CREATE INDEX idx_debts_user_id ON debts(user_id);
CREATE INDEX idx_debts_status ON debts(user_id, status);
CREATE INDEX idx_debts_due_date ON debts(user_id, due_date);
```

### 7. DEBT_PAYMENTS

```sql
CREATE TABLE debt_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  debt_id UUID NOT NULL REFERENCES debts(id) ON DELETE CASCADE,
  amount DECIMAL(15, 2) NOT NULL,
  date DATE NOT NULL,
  status VARCHAR(20) DEFAULT 'completed', -- 'scheduled', 'completed', 'missed'
  payment_number INT,
  transaction_id UUID REFERENCES transactions(id) ON DELETE SET NULL,
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT positive_amount CHECK (amount > 0)
);

CREATE INDEX idx_debt_payments_debt_id ON debt_payments(debt_id);
CREATE INDEX idx_debt_payments_date ON debt_payments(debt_id, date);
```

### 8. BUDGETS

```sql
CREATE TABLE budgets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  category_id UUID NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
  month INT NOT NULL,
  year INT NOT NULL,
  limit_amount DECIMAL(15, 2) NOT NULL,
  used_amount DECIMAL(15, 2) DEFAULT 0,
  status VARCHAR(20) DEFAULT 'active',
  alert_threshold INT DEFAULT 80, -- porcentaje
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  UNIQUE(user_id, category_id, month, year),
  CONSTRAINT valid_month CHECK (month BETWEEN 1 AND 12),
  CONSTRAINT valid_year CHECK (year >= 2000 AND year <= 2100)
);

CREATE INDEX idx_budgets_user_month_year ON budgets(user_id, month, year);
```

### 9. SAVINGS

```sql
CREATE TABLE savings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL,
  goal_amount DECIMAL(15, 2) NOT NULL,
  current_amount DECIMAL(15, 2) DEFAULT 0,
  deadline DATE,
  priority VARCHAR(20) DEFAULT 'medium', -- 'low', 'medium', 'high'
  description TEXT,
  status VARCHAR(20) DEFAULT 'active', -- 'active', 'completed', 'paused'
  category_id UUID REFERENCES categories(id),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  CONSTRAINT positive_amounts CHECK (
    goal_amount > 0 AND 
    current_amount >= 0 AND 
    current_amount <= goal_amount
  )
);

CREATE INDEX idx_savings_user_id ON savings(user_id);
```

### 10. ALERTS

```sql
CREATE TABLE alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type VARCHAR(50) NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT,
  severity VARCHAR(20) DEFAULT 'info', -- 'info', 'warning', 'danger'
  action_url TEXT,
  is_read BOOLEAN DEFAULT FALSE,
  is_dismissed BOOLEAN DEFAULT FALSE,
  data JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  read_at TIMESTAMP,
  
  CONSTRAINT valid_severity CHECK (severity IN ('info', 'warning', 'danger'))
);

CREATE INDEX idx_alerts_user_id_read ON alerts(user_id, is_read);
CREATE INDEX idx_alerts_created_at ON alerts(user_id, created_at DESC);
```

---

## Vistas útiles

```sql
-- Vista: Resumen financiero del usuario
CREATE VIEW vw_financial_summary AS
SELECT 
  u.id as user_id,
  SUM(a.balance) as total_balance,
  SUM(a.available_balance) as total_available,
  SUM(a.committed_balance) as total_committed,
  SUM(COALESCE(d.remaining_amount, 0)) as total_debt,
  COUNT(DISTINCT a.id) as number_of_accounts
FROM users u
LEFT JOIN accounts a ON u.id = a.user_id AND a.is_active = TRUE
LEFT JOIN debts d ON u.id = d.user_id AND d.status = 'active'
GROUP BY u.id;

-- Vista: Gastos del mes
CREATE VIEW vw_monthly_expenses AS
SELECT 
  u.id as user_id,
  DATE_TRUNC('month', t.date) as month,
  c.id as category_id,
  c.name as category_name,
  SUM(t.amount) as total_spent,
  COUNT(t.id) as transaction_count
FROM users u
JOIN transactions t ON u.id = t.user_id AND t.type = 'expense'
JOIN categories c ON t.category_id = c.id
GROUP BY u.id, DATE_TRUNC('month', t.date), c.id, c.name;
```

---

## Datos por defecto (seed)

```sql
-- Categorías por defecto para nuevos usuarios
INSERT INTO categories (user_id, name, type, icon, color, is_custom, display_order)
VALUES
  (user_id, '🏠 Hogar', 'expense', 'home', '#EC4899', FALSE, 1),
  (user_id, '  🍔 Alimentación', 'expense', 'utensils', '#F59E0B', FALSE, 2),
  (user_id, '🚗 Transporte', 'expense', 'car', '#10B981', FALSE, 3),
  (user_id, '🎮 Entretenimiento', 'expense', 'gamepad', '#8B5CF6', FALSE, 4),
  (user_id, '💼 Trabajo', 'expense', 'briefcase', '#3B82F6', FALSE, 5),
  (user_id, '💳 Finanzas', 'expense', 'credit-card', '#6366F1', FALSE, 6),
  (user_id, '❤️ Personal', 'expense', 'heart', '#DC2626', FALSE, 7),
  (user_id, '🎁 Otros', 'expense', 'gift', '#6B7280', FALSE, 8),
  (user_id, '💰 Ingreso', 'income', 'money', '#00D084', FALSE, 1);
```

---

## Migraciones

```bash
# Estructura de migraciones
migrations/
├── 001_create_users.sql
├── 002_create_accounts.sql
├── 003_create_transactions.sql
├── 004_create_debts.sql
├── 005_create_budgets.sql
├── 006_create_savings.sql
├── 007_create_alerts.sql
└── 008_create_views.sql
```

