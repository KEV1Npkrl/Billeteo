#!/bin/bash

# 🚀 Setup script para desarrollo local

echo "🚀 Iniciando setup de FinanzasPro..."

# Colores
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Verificar Node.js
echo -e "\n${BLUE}📋 Verificando Node.js...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js no está instalado${NC}"
    exit 1
fi
echo -e "${GREEN}✓ Node.js $(node --version)${NC}"

# Verificar npm
echo -e "\n${BLUE}📋 Verificando npm...${NC}"
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm no está instalado${NC}"
    exit 1
fi
echo -e "${GREEN}✓ npm $(npm --version)${NC}"

# Verificar Docker
echo -e "\n${BLUE}📋 Verificando Docker...${NC}"
if ! command -v docker &> /dev/null; then
    echo -e "${RED}⚠️  Docker no está instalado (necesario para BD)${NC}"
fi

# Instalar dependencias
echo -e "\n${BLUE}📦 Instalando dependencias...${NC}"
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Dependencias instaladas${NC}"
else
    echo -e "${RED}❌ Error al instalar dependencias${NC}"
    exit 1
fi

# Copiar .env
echo -e "\n${BLUE}📝 Configurando variables de entorno...${NC}"
if [ ! -f .env.local ]; then
    cp .env.example .env.local
    echo -e "${GREEN}✓ .env.local creado${NC}"
    echo -e "${BLUE}   ⚠️  Recuerda editar .env.local con tus valores${NC}"
else
    echo -e "${GREEN}✓ .env.local ya existe${NC}"
fi

# Docker Compose
echo -e "\n${BLUE}🐳 Iniciando servicios con Docker...${NC}"
if command -v docker-compose &> /dev/null; then
    docker-compose up -d
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ Servicios iniciados${NC}"
        sleep 3
    else
        echo -e "${RED}❌ Error al iniciar Docker Compose${NC}"
        exit 1
    fi
else
    echo -e "${BLUE}⚠️  Docker Compose no disponible${NC}"
fi

# Migraciones (opcional si tienes Prisma)
# echo -e "\n${BLUE}🗄️  Corriendo migraciones...${NC}"
# npm run db:migrate

echo -e "\n${GREEN}✅ Setup completado!${NC}"
echo -e "\n${BLUE}Próximos pasos:${NC}"
echo -e "  1. Edita .env.local si es necesario"
echo -e "  2. npm run dev"
echo -e "  3. Abre http://localhost:3000"
echo -e "\n${BLUE}Documentación:${NC}"
echo -e "  - Guía rápida: GETTING_STARTED.md"
echo -e "  - Arquitectura: docs/ARQUITECTURA.md"
echo -e "  - BD: docs/BASE_DE_DATOS.md"
echo -e "  - API: docs/API.md"
echo -e "  - Deploy: docs/DEPLOY.md"

echo ""
