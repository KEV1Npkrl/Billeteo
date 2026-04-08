@echo off
REM 🚀 Setup script para Windows

echo.
echo 🚀 Iniciando setup de FinanzasPro...
echo.

REM Verificar Node.js
echo 📋 Verificando Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js no está instalado
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✓ Node.js %NODE_VERSION%

REM Verificar npm
echo 📋 Verificando npm...
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm no está instalado
    exit /b 1
)
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo ✓ npm %NPM_VERSION%

REM Instalar dependencias
echo.
echo 📦 Instalando dependencias...
call npm install
if errorlevel 1 (
    echo ❌ Error al instalar dependencias
    exit /b 1
)
echo ✓ Dependencias instaladas

REM Copiar .env
echo.
echo 📝 Configurando variables de entorno...
if not exist .env.local (
    copy .env.example .env.local
    echo ✓ .env.local creado
    echo ⚠️  Recuerda editar .env.local con tus valores
) else (
    echo ✓ .env.local ya existe
)

REM Docker Compose
echo.
echo 🐳 Iniciando servicios con Docker...
docker-compose --version >nul 2>&1
if errorlevel 1 (
    echo ⚠️  Docker Compose no disponible
) else (
    call docker-compose up -d
    if errorlevel 1 (
        echo ❌ Error al iniciar Docker Compose
        exit /b 1
    )
    echo ✓ Servicios iniciados
    timeout /t 3 /nobreak
)

echo.
echo ✅ Setup completado!
echo.
echo Próximos pasos:
echo   1. Edita .env.local si es necesario
echo   2. npm run dev
echo   3. Abre http://localhost:3000
echo.
echo Documentación:
echo   - Guía rápida: GETTING_STARTED.md
echo   - Arquitectura: docs/ARQUITECTURA.md
echo   - BD: docs/BASE_DE_DATOS.md
echo   - API: docs/API.md
echo   - Deploy: docs/DEPLOY.md
echo.
