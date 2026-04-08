# 📘 Guía de inicio rápido

Bienvenido a **FinanzasPro**. Esta guía te ayudará a empezar en 5 minutos.

---

## 🚀 Quick Start (5 minutos)

### 1. Clonar proyecto

```bash
git clone <repo-url>
cd proyecto-finanzas
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env.local
```

Edita `.env.local` con tus configuraciones.

### 4. Iniciar base de datos

```bash
docker-compose up -d
```

### 5. Ejecutar migraciones

```bash
npm run db:migrate
```

### 6. Iniciar servidor de desarrollo

```bash
npm run dev
```

✅ **¡Listo!** Tu app está en http://localhost:3000

---

## 📱 Primera prueba

1. Abre http://localhost:3000
2. Haz clic en "Crear Cuenta"
3. Completa el formulario de registro
4. ¡Bienvenido al dashboard!

---

## 🛠️ Estructura básica

```
src/
├── app/                # Páginas (Next.js App Router)
│   ├── page.tsx       # Página de inicio
│   ├── auth/          # Autenticación
│   ├── dashboard/     # Dashboard principal
│   └── layout.tsx     # Layout global
├── components/        # Componentes reutilizables
│   ├── Button.tsx
│   ├── Card.tsx
│   ├── Input.tsx
│   └── ...
├── types/            # Tipos TypeScript
├── api/              # Cliente API
├── hooks/            # Hooks personalizados
├── store/            # Estado global (Zustand)
└── utils/            # Funciones auxiliares
```

---

## 📚 Próximos pasos

1. **Implementar API Backend** - Crear endpoints REST
2. **Sistema de Autenticación** - JWT completo
3. **Gestión de Cuentas** - CRUD de cuentas
4. **Transacciones** - Ingreso/egreso
5. **Dashboard** - Gráficos y resumen
6. **Deudas** - Gestión de deudas
7. **Presupuestos** - Control de gastos
8. **Deploy** - Lanzar a producción

---

## 💡 Tips útiles

### Ver documentos de diseño

```bash
# Arquitectura
open docs/ARQUITECTURA.md

# Base de datos
open docs/BASE_DE_DATOS.md

# API
open docs/API.md

# Wireframes UI
open docs/WIREFRAMES.md

# Deploy
open docs/DEPLOY.md
```

### Comandos útiles

```bash
# Desarrollo
npm run dev

# Lint y format
npm run lint
npm run format

# Build
npm run build
npm run start

# Testing
npm run test
npm run test:watch

# Base de datos
npm run db:migrate
npm run db:push
npm run db:studio  # UI visual
```

---

## 🔐 Seguridad

⚠️ **IMPORTANTE**: Nunca comitees `.env.local` a git

```bash
# Verificar .gitignore
cat .gitignore
# Debe contener: .env.local, .env.*.local
```

---

## 🆘 Problemas comunes

### "Port 3000 in use"

```bash
# Encontrar proceso en puerto 3000
lsof -i :3000

# Matar proceso (macOS/Linux)
kill -9 <PID>

# O usar otro puerto
npm run dev -- -p 3001
```

### "Module not found"

```bash
# Reinstalar dependencias
rm -rf node_modules
npm install
```

### "Database connection refused"

```bash
# Verificar Docker
docker-compose ps

# Reiniciar
docker-compose restart db
```

---

## 📖 Recursos

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Zustand](https://github.com/pmndrs/zustand)

---

## 💬 Soporte

¿Preguntas o problemas? Revisa los documentos en `/docs` o crea un issue en GitHub.

---

**¡Que disfrutes desarrollando FinanzasPro! 🚀**
