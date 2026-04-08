# 🚀 Guía de Deploy

## Ambientes

- **Desarrollo**: localhost:3000
- **Testing**: staging.finanzaspro.com
- **Producción**: finanzaspro.com

---

## 1. Prerequisites

```bash
# Node.js v18+
node --version

# npm o pnpm
npm --version

# Docker & Docker Compose (para BD local)
docker --version
docker-compose --version
```

---

## 2. Desarrollo Local

### Setup inicial

```bash
# Clonar proyecto
git clone <repo-url>
cd proyecto-finanzas

# Instalar dependencias
npm install

# Copiar y configurar env
cp .env.example .env.local

# Iniciar servicios con Docker
docker-compose up -d

# Ejecutar migraciones
npm run db:migrate

# Iniciar dev server
npm run dev
```

App estará disponible en: **http://localhost:3000**

### Scripts útiles

```bash
# Desarrollo
npm run dev

# Build
npm run build
npm run start

# Testing
npm run test
npm run test:watch

# Linting
npm run lint

# Formateo
npm run format

# Base de datos
npm run db:migrate
npm run db:push
npm run db:studio  # UI visual para BD
```

---

## 3. Deploy en Vercel (Frontend)

### Opción A: Git Integration

1. Push a GitHub
2. Ir a [vercel.com](https://vercel.com)
3. Conectar repo
4. Configurar variables de entorno
5. Deploy automático

### Opción B: CLI

```bash
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Producción
vercel --prod
```

### Variables de entorno en Vercel

```
NEXT_PUBLIC_API_URL=https://api.finanzaspro.com/api
NEXT_PUBLIC_APP_NAME=FinanzasPro
```

---

## 4. Deploy en Railway (Backend + DB)

### Setup

```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Login
railway login

# Iniciar proyecto
railway init

# Agregar PostgreSQL
railway add --plugin postgresql

# Agregar Redis
railway add --plugin redis
```

### Configurar variables

En dashboard de Railway:
```
DATABASE_URL=postgresql://...
NEXTAUTH_SECRET=your-secret
JWT_SECRET=your-jwt-secret
NODE_ENV=production
```

### Deploy

```bash
# Deploy
railway up

# Ver logs
railway logs

# Ver variables
railway variables
```

---

## 5. Deploy Manual en Servidor (VPS)

### Preparación del servidor

```bash
# SSH al servidor
ssh user@server-ip

# Instalar dependencias
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Instalar PM2
sudo npm install -g pm2

# Instalar Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
```

### Deploy

```bash
# Clonar repo
cd /opt
git clone <repo-url>
cd proyecto-finanzas

# Instalar dependencias
npm install --production

# Build
npm run build

# Configurar PM2
pm2 start npm --name "finanzas-pro" -- start

# Hacer persistente
pm2 startup
pm2 save

# Ver estado
pm2 status
pm2 logs
```

### Nginx como Reverse Proxy

```nginx
server {
    listen 80;
    server_name api.finanzaspro.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Reload nginx
sudo systemctl reload nginx
```

---

## 6. SSL/TLS (HTTPS)

### Con Certbot

```bash
sudo apt-get install certbot python3-certbot-nginx

# Obtener certificado
sudo certbot certonly --nginx -d api.finanzaspro.com

# Auto renovación
sudo systemctl enable certbot.timer
```

---

## 7. Monitoreo en Producción

### error Tracking - Sentry

```bash
npm install @sentry/nextjs
```

```typescript
// next.config.js
const withSentry = require('@sentry/nextjs')();

module.exports = withSentry({
  // ... config
});
```

### Logs - CloudWatch / Papertrail

```bash
# Tail logs
pm2 logs finanzas-pro

# Guardar logs
pm2 logs > /var/log/finanzas-pro.log
```

### Métricas - DataDog / New Relic

```bash
npm install newrelic

# En archivo de inicio
require('newrelic');
```

---

## 8. CI/CD - GitHub Actions

Crear `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm ci
      - run: npm run lint
      - run: npm run test

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
```

---

## 9. Checklist pre-Deploy

- [ ] Variables de entorno configuradas
- [ ] Base de datos migrada
- [ ] Tests pasando
- [ ] Lint sin errores
- [ ] Build sin errores
- [ ] APIs testeadas
- [ ] CORS configurado
- [ ] SSL/TLS activo
- [ ] Backups configurados
- [ ] Monitoreo activo

---

## 10. Rollback

```bash
# Railway
railway rollback

# Vercel
vercel rollback

# Manual
pm2 restart finanzas-pro
```

---

## 11. Backup (Importante!)

```bash
# PostgreSQL
pg_dump -h localhost -U admin -d finanzas_db > backup.sql

# Restaurar
psql -h localhost -U admin -d finanzas_db < backup.sql

# Backup automático (cron)
0 2 * * * pg_dump -h localhost -U admin finanzas_db | gzip > /backups/finanzas_$(date +\%Y\%m\%d).sql.gz
```

---

## 📞 Troubleshooting

### Error: "Cannot find module"

```bash
npm install
npm run build
```

### Error: "Port 3000 already in use"

```bash
lsof -i :3000  # Encontrar proceso
kill -9 <PID>
```

### Error: "Database connection refused"

```bash
# Verificar PostgreSQL
docker-compose logs db

# Reiniciar
docker-compose restart db
```

---

¡Listo para deployar! 🚀
