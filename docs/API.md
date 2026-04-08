# 🔌 API REST - Documentación

## Base URL

```
Desarrollo:  http://localhost:3000/api
Producción:  https://api.finanzaspro.com/api
```

---

## 📋 Autenticación

Todos los endpoints (excepto auth) requieren token JWT:

```
Authorization: Bearer {token}
```

---

## 🔐 Endpoints de Autenticación

### Register (Registro)

```http
POST /auth/register

Content-Type: application/json

{
  "email": "usuario@example.com",
  "password": "SecurePass123!",
  "first_name": "Juan",
  "last_name": "Pérez",
  "currency": "PEN",
  "timezone": "America/Lima"
}

HTTP/1.1 201 Created
{
  "success": true,
  "user": {
    "id": "uuid-here",
    "email": "usuario@example.com",
    "first_name": "Juan",
    "last_name": "Pérez"
  },
  "token": "eyJhbGc...",
  "refresh_token": "eyJhbGc..."
}
```

### Login

```http
POST /auth/login

{
  "email": "usuario@example.com",
  "password": "SecurePass123!"
}

HTTP/1.1 200 OK
{
  "success": true,
  "token": "eyJhbGc...",
  "refresh_token": "eyJhbGc...",
  "user": {...}
}
```

### Refresh Token

```http
POST /auth/refresh

{
  "refresh_token": "eyJhbGc..."
}

HTTP/1.1 200 OK
{
  "success": true,
  "token": "eyJhbGc..."
}
```

### Logout

```http
POST /auth/logout
Authorization: Bearer {token}

HTTP/1.1 200 OK
{
  "success": true,
  "message": "Logged out successfully"
}
```

---

## 💰 Endpoints de Cuentas

### Obtener todas las cuentas

```http
GET /accounts
Authorization: Bearer {token}

HTTP/1.1 200 OK
{
  "success": true,
  "data": [
    {
      "id": "uuid-account-1",
      "name": "BCP",
      "type": "bank",
      "balance": 8450.50,
      "available_balance": 6200.00,
      "committed_balance": 2250.50,
      "currency": "PEN",
      "created_at": "2026-01-15T10:30:00Z"
    },
    {
      "id": "uuid-account-2",
      "name": "Efectivo",
      "type": "cash",
      "balance": 3200.00,
      "available_balance": 3200.00,
      "committed_balance": 0,
      "currency": "PEN",
      "created_at": "2026-01-15T10:30:00Z"
    }
  ],
  "summary": {
    "total_balance": 15450.50,
    "total_available": 8230.00,
    "total_committed": 7220.50
  }
}
```

### Crear cuenta

```http
POST /accounts
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Interbank Ahorros",
  "type": "bank",
  "currency": "PEN",
  "initial_balance": 1000.00,
  "description": "Cuenta de ahorros"
}

HTTP/1.1 201 Created
{
  "success": true,
  "data": {
    "id": "uuid-new-account",
    "name": "Interbank Ahorros",
    "type": "bank",
    "balance": 1000.00,
    "available_balance": 1000.00,
    "committed_balance": 0,
    "created_at": "2026-04-08T15:45:00Z"
  }
}
```

### Actualizar cuenta

```http
PUT /accounts/:accountId
Authorization: Bearer {token}

{
  "name": "Interbank Ahorros 2026",
  "description": "Actualizado"
}

HTTP/1.1 200 OK
{
  "success": true,
  "data": {...}
}
```

### Eliminar cuenta

```http
DELETE /accounts/:accountId
Authorization: Bearer {token}

HTTP/1.1 200 OK
{
  "success": true,
  "message": "Account deleted successfully"
}
```

---

## 💸 Endpoints de Transacciones

### Obtener transacciones

```http
GET /transactions?
  account_id=uuid&
  category_id=uuid&
  type=expense&
  from_date=2026-04-01&
  to_date=2026-04-08&
  limit=50&
  offset=0

Authorization: Bearer {token}

HTTP/1.1 200 OK
{
  "success": true,
  "data": [
    {
      "id": "uuid-tx-1",
      "account_id": "uuid-account",
      "category_id": "uuid-category",
      "amount": 85.50,
      "type": "expense",
      "description": "Compra en Tottus",
      "date": "2026-04-08",
      "created_at": "2026-04-08T14:23:00Z"
    }
  ],
  "pagination": {
    "total": 245,
    "limit": 50,
    "offset": 0,
    "pages": 5
  }
}
```

### Crear transacción

```http
POST /transactions
Authorization: Bearer {token}

{
  "account_id": "uuid-account",
  "category_id": "uuid-category",
  "amount": 85.50,
  "type": "expense",
  "description": "Compra en Tottus",
  "date": "2026-04-08",
  "is_recurring": false
}

HTTP/1.1 201 Created
{
  "success": true,
  "data": {
    "id": "uuid-new-tx",
    "account_id": "uuid-account",
    "category_id": "uuid-category",
    "amount": 85.50,
    "type": "expense",
    "description": "Compra en Tottus",
    "date": "2026-04-08",
    "created_at": "2026-04-08T14:23:00Z"
  }
}
```

### Actualizar transacción

```http
PUT /transactions/:transactionId
Authorization: Bearer {token}

{
  "amount": 90.00,
  "description": "Compra actualizada",
  "category_id": "new-uuid-category"
}

HTTP/1.1 200 OK
{
  "success": true,
  "data": {...}
}
```

### Eliminar transacción

```http
DELETE /transactions/:transactionId
Authorization: Bearer {token}

HTTP/1.1 200 OK
{
  "success": true,
  "message": "Transaction deleted"
}
```

---

## 💳 Endpoints de Deudas

### Listar deudas

```http
GET /debts?status=active

Authorization: Bearer {token}

HTTP/1.1 200 OK
{
  "success": true,
  "data": [
    {
      "id": "uuid-debt-1",
      "name": "TDC Scotiabank",
      "creditor": "Scotiabank",
      "total_amount": 3500.00,
      "remaining_amount": 3500.00,
      "paid_amount": 0,
      "monthly_payment": 900.00,
      "interest_rate": 5.2,
      "due_date": "2026-04-08",
      "monthly_due_day": 8,
      "status": "active",
      "payments_made": 0,
      "number_of_payments": 4,
      "created_at": "2026-03-15T10:00:00Z"
    }
  ],
  "summary": {
    "total_debt": 7220.50,
    "debt_count": 3,
    "next_payment_date": "2026-04-08",
    "next_payment_amount": 2250.50
  }
}
```

### Crear deuda

```http
POST /debts
Authorization: Bearer {token}

{
  "name": "Préstamo BCP",
  "creditor": "Banco de Crédito del Perú",
  "total_amount": 2850.00,
  "monthly_payment": 450.00,
  "interest_rate": 3.8,
  "monthly_due_day": 15,
  "number_of_payments": 8,
  "start_date": "2026-01-15",
  "category_id": "uuid-category"
}

HTTP/1.1 201 Created
{
  "success": true,
  "data": {
    "id": "uuid-new-debt",
    "name": "Préstamo BCP",
    "total_amount": 2850.00,
    "remaining_amount": 2850.00,
    "monthly_payment": 450.00,
    "status": "active",
    "created_at": "2026-04-08T10:00:00Z"
  }
}
```

### Pagar cuota de deuda

```http
POST /debts/:debtId/payments
Authorization: Bearer {token}

{
  "amount": 450.00,
  "date": "2026-04-15",
  "account_id": "uuid-account"
}

HTTP/1.1 201 Created
{
  "success": true,
  "data": {
    "id": "uuid-payment",
    "debt_id": "uuid-debt",
    "amount": 450.00,
    "date": "2026-04-15",
    "payment_number": 1,
    "status": "completed",
    "created_at": "2026-04-08T10:00:00Z"
  }
}
```

### Obtener historial de pagos

```http
GET /debts/:debtId/payments

Authorization: Bearer {token}

HTTP/1.1 200 OK
{
  "success": true,
  "data": [
    {
      "id": "uuid-payment-1",
      "amount": 450.00,
      "date": "2026-04-15",
      "payment_number": 1,
      "status": "completed",
      "created_at": "2026-04-15T10:00:00Z"
    }
  ]
}
```

---

## 📊 Endpoints de Dashboard

### Resumen financiero

```http
GET /dashboard/summary

Authorization: Bearer {token}

HTTP/1.1 200 OK
{
  "success": true,
  "data": {
    "total_balance": 15450.50,
    "available_balance": 8230.00,
    "committed_balance": 7220.50,
    "total_debt": 7220.50,
    "monthly_income": 4200.00,
    "monthly_expenses": 3450.00,
    "balance_this_month": 750.00,
    "can_spend": 1780.00,
    "accounts_count": 4,
    "debts_count": 3
  }
}
```

### Distribución de dinero

```http
GET /dashboard/money-distribution

HTTP/1.1 200 OK
{
  "success": true,
  "data": {
    "by_account": [
      {
        "account_id": "uuid",
        "name": "BCP",
        "balance": 8450.50,
        "percentage": 54.7,
        "type": "bank"
      },
      {
        "account_id": "uuid",
        "name": "Efectivo",
        "balance": 3200.00,
        "percentage": 20.7,
        "type": "cash"
      }
    ]
  }
}
```

### Gastos por categoría

```http
GET /dashboard/expenses-by-category?month=4&year=2026

HTTP/1.1 200 OK
{
  "success": true,
  "data": [
    {
      "category_id": "uuid",
      "category_name": "Hogar",
      "total_spent": 1207.00,
      "percentage": 35,
      "transaction_count": 8,
      "icon": "home"
    },
    {
      "category_id": "uuid",
      "category_name": "Alimentación",
      "total_spent": 966.00,
      "percentage": 28,
      "transaction_count": 15,
      "icon": "utensils"
    }
  ]
}
```

### Historial mensual

```http
GET /dashboard/monthly-history?months=6

HTTP/1.1 200 OK
{
  "success": true,
  "data": [
    {
      "month": "2025-11",
      "income": 4200.00,
      "expenses": 3800.00,
      "balance": 400.00,
      "starting_balance": 12000.00,
      "ending_balance": 12400.00
    },
    {
      "month": "2025-12",
      "income": 4200.00,
      "expenses": 4100.00,
      "balance": 100.00,
      "starting_balance": 12400.00,
      "ending_balance": 12500.00
    }
  ]
}
```

### Alertas

```http
GET /dashboard/alerts?unread=true

HTTP/1.1 200 OK
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "type": "debt_payment_due",
      "title": "Pago de deuda próximo",
      "message": "Tu TDC Scotiabank vence hoy",
      "severity": "danger",
      "created_at": "2026-04-08T08:00:00Z"
    },
    {
      "id": "uuid",
      "type": "budget_exceeded",
      "title": "Presupuesto excedido",
      "message": "Has gastado el 78% de tu presupuesto de Hogar",
      "severity": "warning",
      "created_at": "2026-04-08T14:30:00Z"
    }
  ]
}
```

---

## 📈 Endpoints de Análisis

### Análisis automático

```http
GET /analytics/insights

HTTP/1.1 200 OK
{
  "success": true,
  "data": {
    "insights": [
      {
        "type": "spending_pattern",
        "severity": "warning",
        "message": "Estás gastando mucho en Uber",
        "details": {
          "category": "Transporte",
          "current": 450.00,
          "average": 200.00,
          "percentage_increase": 125
        }
      },
      {
        "type": "balance_trend",
        "severity": "info",
        "message": "Tu balance está bajando rápidamente",
        "details": {
          "trend": "descending",
          "days": 7,
          "lost": 850.00
        }
      }
    ]
  }
}
```

---

## 📅 Endpoints de Presupuesto

### Obtener presupuestos

```http
GET /budgets?month=4&year=2026

HTTP/1.1 200 OK
{
  "success": true,
  "data": [
    {
      "id": "uuid",
      "category_id": "uuid",
      "category_name": "Hogar",
      "limit": 1500.00,
      "used": 1000.00,
      "percentage_used": 67,
      "transactions_count": 8
    }
  ]
}
```

### Crear/Actualizar presupuesto

```http
POST /budgets
Authorization: Bearer {token}

{
  "category_id": "uuid",
  "month": 4,
  "year": 2026,
  "limit": 1500.00,
  "alert_threshold": 80
}

HTTP/1.1 201 Created
{...}
```

---

## ✅ Códigos de respuesta

```
200 OK              - Éxito
201 Created         - Recurso creado
400 Bad Request     - Datos inválidos
401 Unauthorized    - Token inválido o expirado
403 Forbidden       - No tiene permisos
404 Not Found       - Recurso no encontrado
409 Conflict        - Conflicto de datos
422 Unprocessable   - Datos no procesables
500 Server Error    - Error del servidor
```

---

## 🛡️ Rate Limiting

```
Por defecto: 100 solicitudes por 15 minutos
Headers de respuesta:
  X-RateLimit-Limit: 100
  X-RateLimit-Remaining: 95
  X-RateLimit-Reset: 1649437200
```

---

## 📚 Ejemplos de error

```json
{
  "success": false,
  "error": {
    "code": "INVALID_REQUEST",
    "message": "Validation failed",
    "details": [
      {
        "field": "email",
        "message": "Email is required"
      },
      {
        "field": "password",
        "message": "Password must be at least 8 characters"
      }
    ]
  }
}
```

