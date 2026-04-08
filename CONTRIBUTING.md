# 🤝 Guía de Contribución

Gracias por tu interés en contribuir a **FinanzasPro**. Siéntete libre de reportar bugs, sugerir mejoras o contribuir código.

---

## 📋 Requisitos

- Node.js 18+
- npm o pnpm
- Docker (para BD local)
- Git
- Editor: VSCode recomendado

---

## 🚀 Setup para desarrollo

### 1. Fork y clonar

```bash
# Clonar tu fork
git clone https://github.com/tu-usuario/finanzas-pro.git
cd finanzas-pro

# Agregar upstream
git remote add upstream https://github.com/original/finanzas-pro.git
```

### 2. Crear rama

```bash
# Actualizar main
git fetch upstream
git checkout main
git merge upstream/main

# Crear rama de feature
git checkout -b feature/descripcion-corta
```

### 3. Setup local

```bash
npm install
cp .env.example .env.local
docker-compose up -d
npm run dev
```

---

## 💻 Desarrollo

### Flujo de trabajo

1. **Crear rama** desde `main`:
   ```bash
   git checkout -b feature/nueva-caracteristica
   ```

2. **Hacer cambios** y commitear:
   ```bash
   git add .
   git commit -m "feat: descripción de cambio"
   ```

3. **Subir cambios**:
   ```bash
   git push origin feature/nueva-caracteristica
   ```

4. **Abrir Pull Request** en GitHub

### Estándares de código

#### Commits

Usa commitizen:

```bash
npm run commit
# O sigue el formato:
# feat: nueva característica
# fix: corrección de bug
# docs: documentación
# style: formateo
# refactor: refactorización
# test: agregar tests
# chore: tareas mantto
```

#### Código

```typescript
// ✅ CORRECTO

// Tipo claro
const formatMoney = (amount: number): string => {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
  }).format(amount);
};

// Nombres descriptivos
interface UserAccount {
  id: string;
  user_id: string;
  name: string;
}

// ❌ EVITAR

// Tipos genéricos
const fmt = (a: any) => { ... };

// Variables cortas
const u = { ... };
```

#### Componentes React

```typescript
// ✅ CORRECTO

interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading, children }, ref) => {
    // Implementación
  }
);

Button.displayName = 'Button';

// ❌ EVITAR

// Componentes sin proptypes/tipos
const Btn = ({ ...props }) => { ... };

// Múltiples responsabilidades
const ComplexButton = ({ ...props }) => {
  // Lógica de negocio
  // Estilos
  // Efectos
};
```

### Linting y Formateo

```bash
# Lint
npm run lint

# Format
npm run format

# Ambos
npm run lint && npm run format
```

---

## 🧪 Testing

### Ejecutar tests

```bash
npm run test              # Una pasada
npm run test:watch       # Watch mode
npm run test:coverage    # Con cobertura
```

### Escribir tests

```typescript
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/Button';

describe('Button', () => {
  it('renders button with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    screen.getByText('Click').click();
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
```

---

## 📝 Documentación

### Agregar documentación

1. Para features nuevas: `docs/FEATURES.md`
2. Para cambios de API: actualizar `docs/API.md`
3. Para arquitectura: actualizar `docs/ARQUITECTURA.md`
4. Para BD: actualizar `docs/BASE_DE_DATOS.md`

### Comentarios en código

```typescript
/**
 * Calcula el dinero disponible considerando deudas
 * @param total - Total en cuentas
 * @param debt - Deuda total
 * @returns Dinero disponible
 */
export const calculateAvailable = (total: number, debt: number): number => {
  return Math.max(0, total - debt);
};
```

---

## 🔄 Pull Request

### Checklist antes de crear PR

- [ ] Rama actualizada con `main`
- [ ] Código formateado (`npm run format`)
- [ ] Tests pasan (`npm run test`)
- [ ] Lint sin errores (`npm run lint`)
- [ ] Documentación actualizada
- [ ] Commits descriptivos
- [ ] No hay conflictos

### Template de PR

```markdown
## Descripción

Breve descripción del cambio

## Tipo de cambio

- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Cambios propuestos

- Punto 1
- Punto 2

## Cómo probar

1. Paso 1
2. Paso 2

## Screenshots (si aplica)

[Agregar screenshots]

## Ticket relacionado

Cierra #123

## Checklist

- [ ] Tests agregados/actualizados
- [ ] Documentación actualizada
- [ ] Sin breaking changes
- [ ] Lint pasa
```

---

## 🐛 Reportar Bugs

### Checklist

- [ ] Problema reproducible
- [ ] Versión de Node.js
- [ ] Pasos para reproducir
- [ ] Comportamiento esperado
- [ ] Comportamiento actual
- [ ] Screenshots/logs

### Template

```markdown
**Título descriptivo del bug**

## Pasos para reproducir

1.
2.
3.

## Comportamiento esperado

...

## Comportamiento actual

...

## Stack

- Node: $(node --version)
- npm: $(npm --version)
- OS: [Windows/Linux/Mac]

## Logs

\`\`\`
Agregar logs relevantes
\`\`\`

## Archivos adjuntos

[Screenshots si aplica]
```

---

## 💡 Sugerir Mejoras

Abre un issue con:

1. Descripción clara de la mejora
2. Por qué es útil
3. Ejemplo de uso propuesto
4. Alternativas consideradas

---

## 🎓 Proyectos buenos para empezar

Issues etiquetados con:
- `good-first-issue`: Para nuevos contribuidores
- `help-wanted`: Necesitan ayuda
- `beginner`: Nivel principiante

---

## 📚 Recursos útiles

- [React docs](https://react.dev)
- [Next.js docs](https://nextjs.org/docs)
- [TypeScript handbook](https://www.typescriptlang.org/docs)
- [Tailwind docs](https://tailwindcss.com)

---

## ✉️ Preguntas?

- 💬 Abre una Discusión
- 📧 Contacta a los mantenedores
- 🐛 Crea un Issue

---

**Gracias por contribuir a FinanzasPro! 🎉**
