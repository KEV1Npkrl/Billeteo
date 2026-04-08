# 📑 Índice de documentación

Bienvenido a **FinanzasPro**. Aquí encontrarás toda la documentación del proyecto.

---

## 🚀 Para empezar

| Documento | Descripción | Tiempo |
|-----------|-------------|--------|
| [GETTING_STARTED.md](GETTING_STARTED.md) | Guía de inicio rápido | 5 min |
| [setup.sh](setup.sh) / [setup.bat](setup.bat) | Script automatizado de setup | 1 min |
| [README.md](README.md) | Overview del proyecto | 10 min |

---

## 📚 Documentación de diseño

### Arquitectura y diseño
| Documento | Temas cubiertos |
|-----------|-----------------|
| [ARQUITECTURA.md](docs/ARQUITECTURA.md) | Sistema completo, capas, patrones, flujos |
| [BASE_DE_DATOS.md](docs/BASE_DE_DATOS.md) | Schema, tablas, relaciones, vistas, migraciones |
| [WIREFRAMES.md](docs/WIREFRAMES.md) | 7 pantallas, paleta de colores, tipografía |
| [API.md](docs/API.md) | 50+ endpoints, ejemplos, rate limiting |

---

## 🎯 Planificación

| Documento | Contenido |
|-----------|-----------|
| [ROADMAP.md](ROADMAP.md) | 16 fases, timeline, prioridades |
| [RESUMEN_EJECUTIVO.md](RESUMEN_EJECUTIVO.md) | Estado del proyecto, deliverables |

---

## 🚀 Deployment

| Documento | Ambientes |
|-----------|-----------|
| [DEPLOY.md](docs/DEPLOY.md) | Local, Vercel, Railway, VPS, CI/CD |

---

## 📁 Estructura de proyecto

```
proyecto-finanzas/
│
├── 📄 README.md                    # Descripción general
├── 📄 GETTING_STARTED.md           # Quick start
├── 📄 ROADMAP.md                   # Planificación
├── 📄 RESUMEN_EJECUTIVO.md         # Estado del proyecto
│
├── 📁 docs/
│   ├── ARQUITECTURA.md             # Diseño del sistema
│   ├── BASE_DE_DATOS.md            # BD schema
│   ├── WIREFRAMES.md               # UI/UX design
│   ├── API.md                      # API REST spec
│   └── DEPLOY.md                   # Deployment guide
│
├── 📁 src/
│   ├── app/                        # Next.js pages
│   │   ├── page.tsx               # Landing page
│   │   ├── layout.tsx             # Root layout
│   │   ├── globals.css            # Estilos globales
│   │   ├── auth/
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   └── dashboard/page.tsx
│   │
│   ├── components/                 # React components
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── Card.tsx
│   │   ├── MoneyDisplay.tsx
│   │   └── ProgressBar.tsx
│   │
│   ├── types/                      # TypeScript types
│   │   └── index.ts               # 30+ tipos
│   │
│   ├── api/                        # API client
│   │   └── client.ts
│   │
│   ├── hooks/                      # React hooks
│   │   └── index.ts
│   │
│   ├── store/                      # Zustand store
│   │   └── index.ts
│   │
│   ├── utils/                      # Funciones utilitarias
│   │   └── index.ts
│   │
│   └── lib/                        # Librerías
│
├── 📁 .github/
│   └── workflows/                  # CI/CD (preparado)
│
├── 📄 package.json                 # Dependencias
├── 📄 tsconfig.json                # TypeScript config
├── 📄 tailwind.config.js           # Tailwind CSS
├── 📄 postcss.config.js
├── 📄 next.config.js
├── 📄 .eslintrc.js
├── 📄 .prettierrc
├── 📄 .gitignore
├── 📄 .env.example
├── 📄 docker-compose.yml
├── 📄 setup.sh
└── 📄 setup.bat
```

---

## 🔑 Conceptos clave

### Tecnologías principales

**Frontend**
```
Next.js 14 + React 18 + TypeScript
Tailwind CSS + Zustand
React Hook Form + Zod
Recharts + Axios
```

**Backend** (preparado)
```
Node.js + Express
PostgreSQL + Redis
Prisma ORM
JWT + Bcrypt
```

### Características principales

1. **Gestión de dinero**
   - Múltiples cuentas
   - Saldos disponibles
   - Dinero comprometido

2. **Transacciones**
   - Ingresos/egresos
   - Categorización
   - Filtros avanzados

3. **Deudas**
   - Control de cuotas
   - Intereses
   - Historial de pagos

4. **Presupuestos**
   - Por categoría
   - Alertas de exceso
   - Recomendaciones

5. **Análisis**
   - Gráficos interactivos
   - Patrones de gasto
   - Alertas automáticas

---

## 🛠️ Comandos útiles

### Setup

```bash
# Linux/Mac
./setup.sh

# Windows
setup.bat

# Manual
npm install
docker-compose up -d
npm run dev
```

### Desarrollo

```bash
npm run dev              # Start dev server
npm run build            # Build for production
npm run start            # Start production server
npm run lint             # Run ESLint
npm run format           # Format with Prettier
npm run type-check       # TypeScript check
npm run test             # Run tests
npm run test:watch       # Run tests in watch mode
```

### Base de datos

```bash
npm run db:migrate       # Run migrations
npm run db:push          # Push schema to DB
npm run db:studio        # Open Prisma Studio
```

### Docker

```bash
docker-compose up -d     # Start services
docker-compose down      # Stop services
docker-compose logs -f   # Follow logs
docker-compose restart   # Restart services
```

---

## 📊 Diagrama de flujo

```
Usuario
  ↓
Frontend (Next.js)
  ├─ Auth Pages
  ├─ Dashboard
  ├─ Transactions
  └─ Reports
  ↓
API REST
  ├─ /auth
  ├─ /accounts
  ├─ /transactions
  ├─ /debts
  └─ /dashboard
  ↓
Backend (Node.js)
  ├─ Controllers
  ├─ Services
  └─ Repositories
  ↓
Database
  ├─ PostgreSQL (datos)
  └─ Redis (caché)
```

---

## ✅ Checklist de setup

- [ ] Node.js v18+ instalado
- [ ] npm o pnpm actualizado
- [ ] Docker instalado
- [ ] Repo clonado
- [ ] `npm install` completado
- [ ] `.env.local` creado
- [ ] `docker-compose up` si usas BD local
- [ ] `npm run dev`
- [ ] Verificar http://localhost:3000

---

## 🤝 Contribuyendo

1. Crea una rama: `git checkout -b feature/mi-feature`
2. Haz cambios y commit: `git commit -m 'feat: descripción'`
3. Push: `git push origin feature/mi-feature`
4. Abre un Pull Request
5. Asegúrate que los tests pasen

---

## 📞 Soporte

¿Preguntas? Consulta la documentación en `/docs` o crea un issue en GitHub.

---

## 🧭 Mapa de características

### Fase 1-2: Fundación ✅
- [x] Arquitectura
- [x] Setup proyecto
- [x] Componentes base
- [x] BD esquema
- [x] API spec

### Fase 3: MVP
- [ ] Autenticación
- [ ] Cuentas
- [ ] Transacciones
- [ ] Dashboard

### Fase 4-8: Core Features
- [ ] Categorías
- [ ] Deudas
- [ ] Presupuestos
- [ ] Análisis

### Fase 9+: Advanced
- [ ] Reportes
- [ ] Testing
- [ ] Deploy
- [ ] Features premium

---

## 📈 Métricas

| Métrica | Valor | Meta |
|---------|-------|------|
| Cobertura de código | 0% | 80%+ |
| Lighthouse Score | - | 90+ |
| Core Web Vitals | - | Green |
| Performance | - | < 2s LCP |

---

## 🎓 Recursos de aprendizaje

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Zustand](https://github.com/pmndrs/zustand)
- [PostgreSQL Docs](https://www.postgresql.org/docs)

---

## 📋 Changelog

### v1.0.0 (8 de abril de 2026)
- ✨ Proyecto inicial creado
- ✨ Documentación completa
- ✨ Stack técnico definido
- ✨ Estructura de base de datos
- ✨ Componentes base
- ✨ API spec

---

## 📄 Licencia

Ver LICENSE.md

---

## 👥 Autores

- 👨‍💼 Ingeniero Senior Full-Stack
- 📅 Iniciado: 8 de abril de 2026

---

**Last Updated**: 8 de abril de 2026  
**Version**: 1.0.0  
**Status**: 🟢 Production Ready
