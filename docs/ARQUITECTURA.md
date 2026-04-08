# 🏗️ Arquitectura del Sistema

## Visión general

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (Next.js)                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │  Dashboard   │  │   Accounts   │  │   Debts      │       │
│  │  (Gráficos)  │  │  (Management)│  │  (Planning)  │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │  Budgets     │  │  Analysis    │  │  Settings    │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└─────────────────────────────────────────────────────────────┘
                            ↕
                    [API GATEWAY / REST]
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                   BACKEND (Express/Node)                     │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Authentication & Authorization (JWT)               │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Controllers (Lógica de negocio)                     │   │
│  │  ├─ AccountController                               │   │
│  │  ├─ TransactionController                           │   │
│  │  ├─ DebtController                                  │   │
│  │  ├─ BudgetController                                │   │
│  │  └─ AnalyticsController                             │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Services (Reglas comerciales)                       │   │
│  │  ├─ FinancialCalculationService                      │   │
│  │  ├─ DebtCalculationService                          │   │
│  │  ├─ BudgetService                                   │   │
│  │  └─ AnalyticsService                                │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Repositories (Data Access)                          │   │
│  │  ├─ UserRepository                                  │   │
│  │  ├─ AccountRepository                               │   │
│  │  ├─ TransactionRepository                           │   │
│  │  ├─ DebtRepository                                  │   │
│  │  └─ CategoryRepository                              │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│              DATABASE LAYER (PostgreSQL)                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   Users      │  │   Accounts   │  │   Balances   │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │ Transactions │  │   Debts      │  │  Categories  │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│  │   Budgets    │  │    Savings   │  │   Alerts     │       │
│  └──────────────┘  └──────────────┘  └──────────────┘       │
└─────────────────────────────────────────────────────────────┘
                            ↕
                    [Cache Layer - Redis]
```

---

## Componentes principales

### 1️⃣ Frontend (Next.js + React)

**Responsabilidades:**
- UI responsiva (mobile-first)
- Gestión de estado local (Zustand/Context API)
- Llamadas API
- Validación de formularios
- Offline support

**Páginas principales:**
```
/
├── /dashboard          (resumen general)
├── /accounts           (gestión de cuentas)
├── /transactions       (registro de movimientos)
├── /debts              (gestión de deudas)
├── /budgets            (presupuestos)
├── /savings            (objetivos de ahorro)
├── /analytics          (análisis)
├── /settings           (configuración)
└── /auth               (autenticación)
```

### 2️⃣ Backend (Express/Node.js)

**Responsabilidades:**
- Autenticación y autorización
- Validación de datos
- Reglas de negocio
- Cálculos financieros
- Acceso a BD

**Capas:**
```
Routes → Controllers → Services → Repositories → Database
```

### 3️⃣ Base de datos (PostgreSQL)

**Características:**
- Relaciones normalizadas
- Índices para performance
- Triggers para cálculos automáticos
- Auditoría de cambios

---

## Flujos principales

### Flujo 1: Registrar un gasto

```
1. Usuario ingresa datos en formulario
2. Frontend valida datos
3. Frontend envía POST /api/transactions
4. Backend valida
5. Backend calcula impacto en:
   - Saldo de cuenta
   - Dinero disponible
   - Presupuesto usado
6. Backend guarda en BD
7. Backend retorna datos actualizados
8. Frontend actualiza estado local
9. Frontend re-renderiza UI
```

### Flujo 2: Ver dashboard

```
1. Usuario accede /dashboard
2. Frontend solicita GET /api/dashboard/summary
3. Backend:
   - Obtiene cuentas del usuario
   - Calcula dinero total
   - Calcula dinero disponible
   - Obtiene ingresos/gastos del mes
   - Obtiene deudas próximas
   - Calcula presupuesto disponible
4. Backend retorna JSON con datos
5. Frontend renderiza gráficos y resumen
```

### Flujo 3: Gestionar deuda

```
1. Usuario registra deuda
2. Sistema:
   - Calcula fecha próxima cuota
   - Descuenta de dinero disponible
   - Crea recordatorios
   - Genera alertas
3. Al pagar cuota:
   - Crea transacción de egreso
   - Actualiza estado de deuda
   - Recalcula dinero disponible
4. Muestra historial de pagos
```

---

## Patrones de diseño

### 1. Repository Pattern
Para abstracción de datos y facilitar testing

### 2. Service Layer
Lógica de negocio centralizada

### 3. Controller Pattern
Manejo de requests/responses

### 4. MVC + Clean Architecture
Separación clara de responsabilidades

---

## Seguridad

### Autenticación
- JWT tokens en localStorage
- Refresh tokens con rotación
- HttpOnly cookies (opcional)

### Autorización
- Role-based access control (RBAC)
- Middleware de verificación en cada ruta

### Validación
- Frontend: validación inmediata
- Backend: validación obligatoria de todos los inputs

### Encriptación
- Passwords con bcrypt
- HTTPS en transport
- Datos sensibles encriptados en BD

---

## Performance

### Frontend
- Lazy loading de componentes
- Code splitting automático con Next.js
- Caché de datos locales
- Imágenes optimizadas

### Backend
- Índices en BD para queries frecuentes
- Paginación en listados
- Redis para caché de datos calculados
- Connection pooling

---

## Monitoreo y Observabilidad

### Logs
```bash
# Winston para logging estructurado
logger.info('User logged in', { userId, timestamp })
logger.error('Database error', { error, query })
```

### Métricas
- Tiempo de respuesta API
- Error rate
- Uso de BD
- Concurrencia de usuarios

### Alertas
- Errores en producción
- Baja performance
- Cambios en transacciones sospechosas

---

## Escalabilidad

### Horizontal
- Stateless backend (sin sesiones locales)
- Base de datos centralizada
- CDN para assets

### Vertical
- Optimización de queries
- Índices estratégicos
- Caché distribuido

---

## Deployment

```
Desarrollo
    ↓
git push → GitHub Actions
    ↓
Testing automático
    ↓
Build & Deploy → Vercel (Frontend)
               → Railway/Render (Backend)
               → Database (AWS RDS)
    ↓
Monitoreo en vivo
```

