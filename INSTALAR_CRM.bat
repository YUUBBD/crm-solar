@echo off
setlocal
cd /d "%~dp0"
echo ========================================
echo        SOLAR CRM - INSTALACION
 echo ========================================
echo.
echo [1/4] Instalando dependencias...
call npm install
if errorlevel 1 goto error

echo.
echo [2/4] Generando Prisma Client...
call npm run db:generate
if errorlevel 1 goto error

echo.
echo [3/4] Creando/actualizando base de datos...
call npm run db:push
if errorlevel 1 goto error

echo.
echo [4/4] Cargando datos de prueba...
call npm run db:seed
if errorlevel 1 goto error

echo.
echo ========================================
echo INSTALACION TERMINADA
 echo ========================================
echo.
echo Para iniciar el CRM ejecuta: npm run dev
pause
exit /b 0
:error
echo.
echo HUBO UN ERROR. Copia el mensaje de arriba y envialo.
pause
exit /b 1
