# 💰 FinanzasPro - Sistema de Gestión Financiera Personal

> Una aplicación web moderna, tipo fintech, para controlar completamente tus finanzas personales desde PC y celular.

## 🎯 Objetivo

Proporcionar una visión clara, realista y utilizable de tu dinero para tomar mejores decisiones financieras.

---

## 📋 Características principales

### ✅ Gestión de dinero actual
- **Vista clara** del dinero total, disponible y comprometido
- **Múltiples cuentas**: Efectivo, bancarias, billeteras digitales
- **Separación realista** entre dinero disponible y deudas

### 📊 Dashboard inteligente
- Resumen de ingresos/gastos mensuales
- Gráficos interactivos (pastel, línea, barras)
- Distribución de dinero por cuentas
- Presupuesto disponible para gastar

### 💸 Registro completo
- Ingresos y egresos con categorías/subcategorías
- Asociación obligatoria a cuentas
- Edición y eliminación de movimientos
- Filtros avanzados

### 💳 Gestión de deudas
- Registro de deudas con cuotas e intereses
- Próximas cuotas visibles
- Historial de pagos
- Impacto automático en dinero disponible

### 🏦 Sistema de ahorro
- Objetivos de ahorro configurables
- Seguimiento de progreso
- Movimientos entre cuentas

### 📅 Presupuesto
- Cálculo automático de gasto disponible
- Recomendaciones inteligentes
- Alertas de exceso de gasto

### 🤖 Análisis automático
- Patrones de gastos
- Recomendaciones financieras
- Alertas sobre cambios anormales

---

## 🛠️ Stack técnico

```
FRONTEND
├── Next.js 14+ (React)
├── TypeScript
├── Tailwind CSS
├── Recharts (gráficos)
└── ShadcnUI (componentes)

BACKEND
├── Node.js/Express
├── TypeScript
└── JWT (autenticación)

DATABASE
├── PostgreSQL (principal)
└── Redis (caché)

INFRA
├── Docker
├── GitHub Actions (CI/CD)
└── Deploy: Vercel + Railway/Render
```

---

## 📁 Estructura del proyecto

```
proyecto-finanzas/
├── docs/
│   ├── ARQUITECTURA.md
│   ├── BASE_DE_DATOS.md
│   ├── WIREFRAMES.md
│   └── API.md
├── src/
│   ├── frontend/
│   │   ├── app/
│   │   ├── components/
│   │   ├── lib/
│   │   └── styles/
│   └── backend/
│       ├── controllers/
│       ├── models/
│       ├── routes/
│       ├── middleware/
│       └── config/
├── .env.example
├── docker-compose.yml
└── package.json
```

---

## 🚀 Quick Start

```bash
# Clonar proyecto
git clone ...

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local

# Ejecutar en desarrollo
npm run dev

# Build producción
npm run build
npm run start
```

---

## 📚 Documentación

- [Arquitectura](./docs/ARQUITECTURA.md)
- [Base de datos](./docs/BASE_DE_DATOS.md)
- [Wireframes](./docs/WIREFRAMES.md)
- [API REST](./docs/API.md)

---

## 🎨 Características UX/UI

- **Mobile-first**: Optimizado para celular
- **Responsive**: PC, tablet, móvil
- **Dark/Light mode**: Tema adaptable
- **Colores significativos**:
  - 🟢 Verde: dinero positivo, ingresos
  - 🔴 Rojo: gastos, deudas, alertas
  - 🔵 Azul: información, acciones
- **Accesibilidad**: WCAG 2.1 AA

---

## 👥 Fases de desarrollo

- [x] Fase 1: Arquitectura y diseño
- [ ] Fase 2: Backend API
- [ ] Fase 3: Frontend base
- [ ] Fase 4: Autenticación
- [ ] Fase 5: Gestión de dinero
- [ ] Fase 6: Dashboard y gráficos
- [ ] Fase 7: Deudas y presupuestos
- [ ] Fase 8: Análisis y alertas
- [ ] Fase 9: Testing y optimización
- [ ] Fase 10: Deploy producción

---

## 📞 Soporte

Para reportar bugs o sugerencias: [crear issue]

---

**FinanzasPro** © 2026 - Sistema de Gestión Financiera Personal
