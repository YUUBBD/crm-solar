# Solar CRM

CRM para una empresa de energía solar, preparado para desarrollo local y despliegue 24/7 con **Vercel + Supabase PostgreSQL**. Incluye clientes, ventas, seguimientos, visitas, presupuestos, instalaciones, inventario, postventa, viajes, gastos y **mapa de clientes con geocodificación**.

## 1. Probar localmente

Este proyecto ahora usa PostgreSQL. Para probarlo en tu PC necesitás una base PostgreSQL y configurar `.env`.

1. Copiá `.env.example` como `.env`.
2. Completá `DATABASE_URL` y `DIRECT_URL`.
3. Ejecutá:

```cmd
npm install
npm run db:generate
npm run db:migrate:dev -- --name init
npm run db:seed
npm run dev
```

Abrí `http://localhost:3000`.

## 2. Producción: Supabase + Vercel

### Supabase

1. Creá un proyecto en Supabase.
2. En **Connect / Database**, copiá las conexiones PostgreSQL.
3. Usá la conexión **Transaction pooler (6543)** como `DATABASE_URL` y la conexión directa/session (5432) como `DIRECT_URL`.
4. En `DATABASE_URL` mantené `pgbouncer=true&connection_limit=1`.
5. Configurá `GEOCODING_USER_AGENT` con un identificador real de tu empresa y un email de contacto.

### Migrar la base

Desde una PC con Node/npm:

```cmd
npm install
npm run db:generate
npm run db:migrate:dev -- --name init
npm run db:seed
```

Para una base ya preparada con las migraciones del repositorio, Vercel puede ejecutar `npm run db:migrate` antes del arranque/deploy si lo necesitás.

> No uses SQLite para la versión 24/7. Supabase PostgreSQL es la base recomendada para producción.

### Vercel

1. Subí este proyecto a GitHub.
2. Importá el repositorio en Vercel.
3. En **Settings → Environment Variables**, agregá `DATABASE_URL`, `DIRECT_URL` y `GEOCODING_USER_AGENT`.
4. Deploy.

Vercel detecta Next.js automáticamente.

## 3. Mapa

La ruta `/mapa` muestra clientes con `lat` y `lng`. Desde **Clientes** podés escribir dirección, ciudad y provincia y usar **Ubicar dirección en el mapa**. El backend consulta Nominatim/OpenStreetMap y guarda las coordenadas en PostgreSQL.

Para una empresa con mucho volumen de geocodificaciones conviene migrar después a un proveedor comercial de geocoding/rutas (Google Maps o Mapbox) y mantener la misma estructura `lat/lng`.

## 4. Importante antes de usar con clientes reales

La versión actual es funcional, pero todavía hay que agregar autenticación real y permisos por rol antes de exponer información sensible a Internet. También conviene configurar dominio, backups, monitoreo y políticas de acceso.
