#!/bin/bash
# Script para crear archivo de variables de entorno locales

echo "Creando .env.local..."

cat > .env.local << 'EOF'
# ============ APP CONFIG ============
NEXT_PUBLIC_APP_NAME="FinanzasPro"
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_PUBLIC_API_URL="http://localhost:3000/api"

# ============ DATABASE ============
DATABASE_URL="postgresql://admin:password123@localhost:5432/finanzas_db"
DATABASE_TEST_URL="postgresql://admin:password123@localhost:5432/finanzas_test"

# ============ AUTHENTICATION ============
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-change-in-production"
JWT_SECRET="your-jwt-secret-key-change-in-production"

# ============ API KEYS ============
API_KEY="your-api-key-here"

# ============ ENVIRONMENT ============
NODE_ENV="development"
LOG_LEVEL="debug"

# ============ FEATURES ============
NEXT_PUBLIC_ENABLE_ANALYTICS="false"
NEXT_PUBLIC_ENABLE_2FA="false"
EOF

echo "✅ .env.local creado exitosamente"
echo ""
echo "⚠️  Recuerda cambiar las contraseñas en producción"
echo "⚠️  No comitees .env.local a git"
