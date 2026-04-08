# 🎨 Wireframes y Diseño UX/UI

## 1. Dashboard Principal

```
┌─────────────────────────────────────────────────────────────┐
│ ☰ FinanzasPro                          🔔 👤          ⚙️     │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  📊 RESUMEN FINANCIERO                                        │
│  ┌─────────────────────┬──────────────────────┐              │
│  │ 💵 Dinero Total     │ 💸 Dinero Disponible│              │
│  │ S/ 15,450.50        │ S/ 8,230.00         │              │
│  │ ↑ 2.5% vs mes pasado│ Después de deudas  │              │
│  └─────────────────────┴──────────────────────┘              │
│                                                               │
│  ┌─────────────────────┬──────────────────────┐              │
│  │ 📉 Dinero Comprometido │ 🎯 Gasto Este Mes│              │
│  │ S/ 7,220.50         │ S/ 3,450.00         │              │
│  │ Deudas próximas     │ De S/ 5,000 presupuesto
│  └─────────────────────┴──────────────────────┘              │
│                                                               │
│  ┌─────────────────────────────────────────────┐            │
│  │ 📊 DISTRIBUCIÓN POR CUENTAS                 │            │
│  │ ┌──────────────────────────────────────┐   │            │
│  │ │ 🏦 BCP: S/ 8,450.50 (54.7%)         │   │            │
│  │ │ 💵 Efectivo: S/ 3,200 (20.7%)       │   │            │
│  │ │ 📱 Yape: S/ 2,150 (13.9%)           │   │            │
│  │ │ 🏧 Interbank: S/ 1,650 (10.7%)      │   │            │
│  │ └──────────────────────────────────────┘   │            │
│  └─────────────────────────────────────────────┘            │
│                                                               │
│  ┌─────────────────────────────────────────────┐            │
│  │ 📈 GASTOS POR CATEGORÍA (Últimos 30 días)   │            │
│  │ ┌──────────────────────────────────────┐   │            │
│  │ │ [Gráfico Pastel]                      │   │            │
│  │ │ 🏠 Hogar: 35% - S/ 1,207           │   │            │
│  │ │ 🍔 Alimentación: 28% - S/ 966      │   │            │
│  │ │ 🚗 Transporte: 20% - S/ 690        │   │            │
│  │ │ 🎮 Entretenimiento: 17% - S/ 587   │   │            │
│  │ └──────────────────────────────────────┘   │            │
│  └─────────────────────────────────────────────┘            │
│                                                               │
│  ┌─────────────────────────────────────────────┐            │
│  │ ⚠️  ALERTAS IMPORTANTES                      │            │
│  │ 🔴 Pago TDC Scotiabank: Hoy                │            │
│  │ 🟡 Presupuesto Hogar: 78% usado            │            │
│  │ 🟢 Meta de ahorro: 65% completada          │            │
│  └─────────────────────────────────────────────┘            │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 2. Gestión de Cuentas

```
┌─────────────────────────────────────────────────────────────┐
│ ☰ MIS CUENTAS                           [+ Nueva Cuenta]   │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  💰 TOTAL EN TODAS LAS CUENTAS: S/ 15,450.50                │
│  💸 DISPONIBLE: S/ 8,230.00                                 │
│  📉 COMPROMETIDO: S/ 7,220.50                               │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 🏦 BCP - Cuenta Corriente                            │  │
│  │ Saldo: S/ 8,450.50                                   │  │
│  │ ├─ Saldo disponible: S/ 6,200                        │  │
│  │ └─ Comprometido: S/ 2,250.50 (pago próximo)         │  │
│  │ [Ver movimientos] [Editar] [Más opciones]           │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 💵 Efectivo                                          │  │
│  │ Saldo: S/ 3,200                                      │  │
│  │ ├─ Saldo disponible: S/ 3,200                        │  │
│  │ └─ Comprometido: S/ 0                               │  │
│  │ [Ver movimientos] [Editar] [Más opciones]           │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 📱 Yape                                              │  │
│  │ Saldo: S/ 2,150                                      │  │
│  │ ├─ Saldo disponible: S/ 2,150                        │  │
│  │ └─ Comprometido: S/ 0                               │  │
│  │ [Ver movimientos] [Editar] [Más opciones]           │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │ 🏧 Interbank - Ahorros                               │  │
│  │ Saldo: S/ 1,650                                      │  │
│  │ ├─ Saldo disponible: S/ 1,650                        │  │
│  │ └─ Comprometido: S/ 0                               │  │
│  │ [Ver movimientos] [Editar] [Más opciones]           │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

---

## 3. Registro de Movimientos

```
┌──────────────────────────────────────────────────────────┐
│ ☰ REGISTRAR MOVIMIENTO                                   │
├──────────────────────────────────────────────────────────┤
│                                                            │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Tipo de movimiento                             ⚙️ │   │
│  │ ⚪ Ingreso  ⚫ Egreso  ○ Transferencia           │   │
│  └──────────────────────────────────────────────────┘   │
│                                                            │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Monto                                             │   │
│  │ S/ [_________________]                           │   │
│  │ Validación: > 0                                 │   │
│  └──────────────────────────────────────────────────┘   │
│                                                            │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Cuenta de origen *                               │   │
│  │ [▼ Seleccionar cuenta]                           │   │
│  │ BCP, Efectivo, Yape, Interbank                  │   │
│  └──────────────────────────────────────────────────┘   │
│                                                            │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Categoría *                                       │   │
│  │ [▼ Seleccionar categoría]                        │   │
│  │ Hogar, Alimentación, Transporte...              │   │
│  └──────────────────────────────────────────────────┘   │
│                                                            │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Subcategoría (opcional)                          │   │
│  │ [▼ Seleccionar subcategoría]                     │   │
│  └──────────────────────────────────────────────────┘   │
│                                                            │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Fecha                                             │   │
│  │ [📅 08/04/2026]                                  │   │
│  └──────────────────────────────────────────────────┘   │
│                                                            │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Descripción *                                     │   │
│  │ [___ Compra en Tottus _______________________]   │   │
│  └──────────────────────────────────────────────────┘   │
│                                                            │
│  ┌──────────────────────────────────────────────────┐   │
│  │ ¿Es recurrente?                                  │   │
│  │ ⚪ No  ⚫ Sí                                      │   │
│  │ [Tipo: Mensual]                                 │   │
│  └──────────────────────────────────────────────────┘   │
│                                                            │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Archivo (recibo/evidencia)                       │   │
│  │ [📎 Adjuntar archivo]                            │   │
│  └──────────────────────────────────────────────────┘   │
│                                                            │
│  [Cancelar]  [Guardar]                                    │
│                                                            │
└──────────────────────────────────────────────────────────┘
```

---

## 4. Gestión de Deudas

```
┌────────────────────────────────────────────────────────┐
│ ☰ MIS DEUDAS                    [+ Nueva Deuda]       │
├────────────────────────────────────────────────────────┤
│                                                          │
│  📊 RESUMEN DE DEUDAS                                  │
│  ┌────────────────────────────────────────────────┐  │
│  │ Total que debo: S/ 7,220.50                   │  │
│  │ Pagos próximos este mes: S/ 2,250.50          │  │
│  │ Última cuota: 15 de abril                     │  │
│  │ Impacto en dinero disponible: -46.8%         │  │
│  └────────────────────────────────────────────────┘  │
│                                                          │
│  🔴 DEUDAS ACTIVAS                                    │
│                                                          │
│  ┌────────────────────────────────────────────────┐  │
│  │ 💳 TDC Scotiabank                              │  │
│  │ Deuda total: S/ 3,500                         │  │
│  │ ├─ Falta por pagar: S/ 3,500                  │  │
│  │ ├─ Cuota mensual: S/ 900                      │  │
│  │ ├─ ⚠️  PRÓXIMA CUOTA: HOY (08/04)             │  │
│  │ └─ Interés: 5.2%                              │  │
│  │ [Ver detalle] [Pagar] [Editar]                │  │
│  └────────────────────────────────────────────────┘  │
│                                                          │
│  ┌────────────────────────────────────────────────┐  │
│  │ 🏦 Préstamo Personal BCP                       │  │
│  │ Deuda total: S/ 2,850                         │  │
│  │ ├─ Falta por pagar: S/ 2,200                  │  │
│  │ ├─ Cuota mensual: S/ 450                      │  │
│  │ ├─ Próxima cuota: 15 de abril                 │  │
│  │ ├─ Pagos completados: 2/8                     │  │
│  │ └─ Interés: 3.8%                              │  │
│  │ [Ver detalle] [Pagar] [Editar]                │  │
│  └────────────────────────────────────────────────┘  │
│                                                          │
│  ┌────────────────────────────────────────────────┐  │
│  │ 👥 Préstamo a Padrino                          │  │
│  │ Deuda total: S/ 870                           │  │
│  │ ├─ Falta por pagar: S/ 870                    │  │
│  │ ├─ Cuota mensual: S/ 870                      │  │
│  │ ├─ Próxima cuota: 20 de abril                 │  │
│  │ └─ Interés: 0%                                │  │
│  │ [Ver detalle] [Pagar] [Editar]                │  │
│  └────────────────────────────────────────────────┘  │
│                                                          │
│  ✅ DEUDAS COMPLETADAS                                │
│  └─ BCP Tarjeta de Crédito (pagada el 01/04/2026)   │
│                                                          │
└────────────────────────────────────────────────────────┘
```

---

## 5. Presupuesto

```
┌────────────────────────────────────────────────────────┐
│ ☰ PRESUPUESTO - ABRIL 2026                            │
├────────────────────────────────────────────────────────┤
│                                                          │
│  💡 RECOMENDACIONES                                    │
│  ┌────────────────────────────────────────────────┐  │
│  │ Puedo gastar: S/ 5,230 este mes                │  │
│  │ He gastado: S/ 3,450 (66% del presupuesto)    │  │
│  │ Puedo gastar aún: S/ 1,780                     │  │
│  │ 📈 Tendencia: gasto normal                     │  │
│  └────────────────────────────────────────────────┘  │
│                                                          │
│  📊 PRESUPUESTO POR CATEGORÍA                         │
│                                                          │
│  🏠 HOGAR - Presupuesto: S/ 1,500                     │
│  ██████████░░░░░░░░ 67% usado (S/ 1,000)            │
│  [Ajustar] [Ver movimientos]                         │
│                                                          │
│  🍔 ALIMENTACIÓN - Presupuesto: S/ 1,200             │
│  ████░░░░░░░░░░░░░░ 33% usado (S/ 400)              │
│  [Ajustar] [Ver movimientos]                         │
│                                                          │
│  🚗 TRANSPORTE - Presupuesto: S/ 600                 │
│  ████████████░░░░░░ 66% usado (S/ 400)              │
│  [Ajustar] [Ver movimientos]                         │
│                                                          │
│  🎮 ENTRETENIMIENTO - Presupuesto: S/ 400            │
│  █████░░░░░░░░░░░░░ 27% usado (S/ 110)              │
│  [Ajustar] [Ver movimientos]                         │
│                                                          │
│  ❤️  PERSONAL - Presupuesto: S/ 500                  │
│  ████████░░░░░░░░░░ 40% usado (S/ 200)              │
│  [Ajustar] [Ver movimientos]                         │
│                                                          │
│  🎁 OTROS - Sin presupuesto                          │
│  [Establecer presupuesto]                             │
│                                                          │
│  [Editar presupupesto] [Descargar reporte]           │
│                                                          │
└────────────────────────────────────────────────────────┘
```

---

## 6. Móvil (Mobile-First)

```
Pantalla ancho: ~375px

┌─────────────────────┐
│☰ FinanzasPro  🔔 👤│
├─────────────────────┤
│                     │
│  💵 S/ 15,450.50    │
│  Dinero total       │
│                     │
│  💸 S/ 8,230        │
│  Disponible         │
│                     │
│  ┌───────────────┐  │
│  │¿Qué hiciste con tu dinero?
│  │               │  │
│  │[+ Ingreso]    │  │
│  │[+ Egreso]     │  │
│  │[+ Préstamo]   │  │
│  └───────────────┘  │
│                     │
│  📊 GASTOS HOY     │
│                     │
│  Alimentación       │
│  S/ 85.00          │
│  12:30 - Tottus    │
│                     │
│  Transporte        │
│  S/ 15.00          │
│  08:45 - Taxi      │
│                     │
│  [Ver más]         │
│                     │
│  ⚠️ ALERTA          │
│  Próxima cuota:    │
│  TDC - HOY         │
│  S/ 900            │
│  [Ver]             │
│                     │
│  ═════════════════ │
│  🏦 BCP S/8,450    │
│  💵 Efectivo S/3.2K│
│  📱 Yape S/2,150   │
│  ═════════════════ │
│                     │
│ [🏠] [💰] [💳] [📊]│
│ Hogar Dinero Deudas Más
│                     │
└─────────────────────┘
```

---

## 7. Análisis y Reportes

```
┌────────────────────────────────────────────────────────┐
│ ☰ ANÁLISIS                    [📅 Mes: Abril 2026]   │
├────────────────────────────────────────────────────────┤
│                                                          │
│  📈 TENDENCIAS                                         │
│                                                          │
│     ┌─────────────────────────────────────────┐       │
│  2K │                            ╱╲            │       │
│  1K │       ╱╲       ╱╲      ╱╲ ╱  ╲ ╱╲       │       │
│  0K │  ────╱  ╲────╱  ╲────╱  ╲╱    ╳   ╲     │       │
│     │Abr  May   Jun   Jul   Ago  Sep  Oct Nov│       │
│     └─────────────────────────────────────────┘       │
│                                                          │
│  Gastos promedio mensual: S/ 3,650                    │
│  Este mes: S/ 3,450 (-5.5% vs promedio)              │
│                                                          │
│  🔍 PATRONES DETECTADOS                               │
│                                                          │
│  ⚠️  "Estás gastando mucho en Uber"                    │
│      Abril: S/ 450 (+120% vs mes pasado)             │
│      Sugerencia: considerar transporte público        │
│                                                          │
│  🟡 "Tu balance de transporte está bajo"              │
│      Saldo: S/ 3,200 (baja en últimos 7 días)        │
│                                                          │
│  🟢 "Meta de ahorro: En camino"                        │
│      65% completada - S/ 3,250 de S/ 5,000           │
│      Días para cumplir: 23                            │
│                                                          │
│  💰 DISTRIBUCION DE GASTOS (ABRIL)                    │
│                                                          │
│     🏠 35% - S/ 1,207  (Hogar)                         │
│     🍔 28% - S/ 966    (Alimentación)                 │
│     🚗 20% - S/ 690    (Transporte)                   │
│     🎮 17% - S/ 587    (Entretenimiento)             │
│                                                          │
│  [📥 Descargar PDF] [📊 Descargar Excel]              │
│                                                          │
└────────────────────────────────────────────────────────┘
```

---

## Paleta de colores

```
PRIMARIOS:
  ✅ Verde (Positivo): #10B981, #059669
  ❌ Rojo (Negativo): #DC2626, #991B1B
  ℹ️  Azul (Información): #3B82F6, #1D4ED8

NEUTROS:
  Fondo: #F9FAFB, #FFFFFF
  Texto oscuro: #111827
  Texto claro: #9CA3AF
  Bordes: #E5E7EB

ADVERTENCIAS:
  Amarillo: #FBBF24
  Naranja: #F97316
  
GRADIENTES:
  Success: #10B981 → #059669
  Danger: #DC2626 → #991B1B
  Primary: #3B82F6 → #1D4ED8
```

---

## Tipografía

```
Fuentes principales:
  Inter (sistema base)
  Poppins (títulos)
  
Escala:
  H1: 32px / 2.5rem - Títulos principales
  H2: 24px / 1.5rem - Subtítulos
  H3: 20px / 1.25rem - Títulos secciones
  Body: 16px / 1rem - Texto base
  Small: 14px / 0.875rem - Detalles
  Tiny: 12px / 0.75rem - Labels
```

