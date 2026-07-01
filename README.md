# Quizzify

![Next.js](https://img.shields.io/badge/Next.js-14.2.4-black?logo=next.js)
![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?logo=tailwind-css)
![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-0.31-C5F74F)
![License](https://img.shields.io/badge/license-sin%20especificar-lightgrey)

Quizzify es una plataforma web de aprendizaje gamificado inspirada en Duolingo, construida con Next.js. Permite a un usuario autenticado elegir un curso (por ejemplo, Inglés o Verbal), avanzar por unidades y lecciones, y resolver desafíos tipo quiz (selección múltiple / de asistencia) mientras el sistema registra su progreso, puntos y "corazones" (vidas).

> Nota: no se encontraron badges de build/CI ni de versión publicada en npm en el repositorio, por lo que los badges anteriores son informativos del stack tecnológico, no de un pipeline de integración continua activo.

## Tabla de contenidos

- [Características principales](#características-principales)
- [Tecnologías / stack utilizado](#tecnologías--stack-utilizado)
- [Requisitos previos](#requisitos-previos)
- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Variables de entorno](#variables-de-entorno)
- [Cómo correr pruebas](#cómo-correr-pruebas)
- [Cómo contribuir](#cómo-contribuir)
- [Licencia](#licencia)

## Características principales

- **Autenticación de usuarios** con [Clerk](https://clerk.com/) (registro e inicio de sesión mediante modal, botón de usuario, cierre de sesión) y rutas protegidas a través de `middleware.ts`.
- **Selección de curso**: pantalla `/courses` donde el usuario elige entre los cursos disponibles (definidos en la base de datos, p. ej. Inglés y Verbal).
- **Ruta de aprendizaje** (`/learn`) organizada en unidades y lecciones, con indicador visual de la lección activa y del progreso por unidad.
- **Sistema de lecciones tipo quiz** (`/lesson`): desafíos de tipo `SELECT` y `ASSIST`, con opciones de respuesta que pueden incluir imagen y audio.
- **Progreso persistente del usuario**: puntos, corazones (vidas) y curso activo almacenados por usuario en base de datos (tabla `user_progress`).
- **Modal de confirmación de salida** de una lección en curso (mediante estado global mínimo con Zustand).
- **Panel lateral de navegación** con accesos a Learn, Leaderboard, Quests y Shop (estos tres últimos son actualmente enlaces de navegación sin una página/funcionalidad implementada detrás).
- **Semillas de base de datos** (`scripts/seed.ts`) para poblar unidades, lecciones, desafíos y opciones de ejemplo.
- **Drizzle Studio** integrado como GUI para inspeccionar y editar la base de datos durante el desarrollo.

## Tecnologías / stack utilizado

**Framework y lenguaje**
- [Next.js 14](https://nextjs.org/) (App Router) con React 18 y TypeScript 5.

**UI / estilos**
- Tailwind CSS 3, `tailwindcss-animate`, `class-variance-authority`, `clsx`, `tailwind-merge`.
- Componentes basados en [shadcn/ui](https://ui.shadcn.com/) sobre primitivas de Radix UI (`@radix-ui/react-dialog`, `@radix-ui/react-progress`, `@radix-ui/react-slot`).
- Iconos con `lucide-react`, notificaciones con `sonner`, soporte de temas con `next-themes`.
- `react-circular-progressbar` para indicadores de progreso.

**Autenticación**
- [Clerk](https://clerk.com/) (`@clerk/nextjs`) para registro, login y gestión de sesión/usuario.

**Base de datos**
- [Drizzle ORM](https://orm.drizzle.team/) (`drizzle-orm`, `drizzle-kit`) sobre PostgreSQL.
- [Neon Serverless Postgres](https://neon.tech/) como driver de conexión (`@neondatabase/serverless`).

**Estado y utilidades**
- [Zustand](https://github.com/pmndrs/zustand) para estado global ligero (modal de salida).
- `dotenv` para carga de variables de entorno en scripts.

**Herramientas de desarrollo**
- ESLint (`eslint-config-next`).
- `tsx` para ejecutar scripts TypeScript (seed).

## Requisitos previos

- **Node.js**: se recomienda 18.18 o superior (requisito mínimo de Next.js 14). No hay un campo `engines` en `package.json` que lo fije explícitamente.
- **npm**: el repositorio incluye `package-lock.json`, por lo que se asume npm como gestor de paquetes (no hay `yarn.lock` ni `pnpm-lock.yaml`).
- **Base de datos PostgreSQL**: el proyecto usa el driver serverless de Neon (`@neondatabase/serverless`), por lo que se recomienda una base de datos [Neon](https://neon.tech/), aunque cualquier Postgres accesible por cadena de conexión debería funcionar con ese driver.
- **Cuenta de Clerk**: necesaria para obtener las claves de API de autenticación (`NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` y `CLERK_SECRET_KEY`).

## Instalación

```bash
# 1. Clonar el repositorio
git clone https://github.com/Noodle96/Quizzify.git
cd Quizzify

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
# Crea un archivo .env en la raíz del proyecto (ver sección "Variables de entorno")

# 4. Aplicar el esquema de Drizzle a la base de datos
npm run db:push

# 5. (Opcional) Poblar la base de datos con datos de ejemplo
npm run db:seed

# 6. Levantar el servidor de desarrollo
npm run dev
```

La aplicación quedará disponible en [http://localhost:3000](http://localhost:3000).

## Uso

Scripts definidos en `package.json`:

| Comando | Descripción |
|---|---|
| `npm run dev` | Inicia el servidor de desarrollo de Next.js. |
| `npm run build` | Genera el build de producción. |
| `npm run start` | Sirve el build de producción (requiere `npm run build` previo). |
| `npm run lint` | Ejecuta ESLint (`next lint`) sobre el proyecto. |
| `npm run db:studio` | Abre [Drizzle Studio](https://orm.drizzle.team/drizzle-studio/overview) para explorar/editar la base de datos. |
| `npm run db:push` | Sincroniza el esquema de `db/schema.ts` con la base de datos (`drizzle-kit push`). |
| `npm run db:seed` | Ejecuta `scripts/seed.ts` para insertar unidades, lecciones, desafíos y opciones de ejemplo. |

Flujo típico de uso de la aplicación una vez levantada:

1. Entrar a `/` (landing) e iniciar sesión o registrarse mediante el modal de Clerk.
2. Elegir un curso en `/courses`.
3. Avanzar por las unidades y lecciones en `/learn`.
4. Resolver los desafíos de una lección en `/lesson`, donde se descuentan corazones por respuestas incorrectas y se suman puntos por respuestas correctas.

> Nota encontrada en el propio repositorio (`readmeRussell.txt`), a modo de recordatorio de flujo de trabajo del autor:
> ```
> npm run dev
> npm run db:studio
> npm run db:seed || npm run db:push
> ```

## Estructura del proyecto

```
Quizzify/
├── actions/                 # Server actions (ej. actualizar el progreso del usuario)
│   └── user-progress.ts
├── app/                     # App Router de Next.js
│   ├── (marketing)/         # Landing pública: header, footer, página de inicio, /docs
│   ├── (main)/              # Secciones autenticadas: /courses, /learn, /test
│   ├── lesson/              # Flujo de una lección/quiz (Quiz, Challenge, HeaderLesson, etc.)
│   ├── buttons/             # Página de ejemplo de variantes del componente Button
│   ├── layout.tsx           # Layout raíz (ClerkProvider, fuentes, Toaster, ExitModal)
│   └── globals.css
├── components/               # Componentes compartidos de la interfaz
│   ├── modals/               # Modales (ej. confirmación de salida de lección)
│   └── ui/                   # Componentes base estilo shadcn/ui (button, dialog, progress, sheet, sonner)
├── db/
│   ├── schema.ts             # Esquema de Drizzle: courses, units, lessons, challenges, challenge_options, user_progress, challenges_progress
│   ├── queries.ts            # Consultas cacheadas (getCourses, getUnits, getLesson, getCourseProgress, etc.)
│   └── drizzle.ts            # Cliente de Drizzle + Neon
├── lib/
│   └── utils.ts              # Utilidad `cn` para combinar clases de Tailwind
├── scripts/
│   └── seed.ts               # Script de siembra de datos de ejemplo
├── store/
│   └── use-exit-modal.ts     # Store de Zustand para el modal de salida
├── public/                   # Imágenes/SVGs (mascota, íconos de cursos, ilustraciones)
├── drizzle.config.ts         # Configuración de drizzle-kit (dialecto postgresql)
├── middleware.ts             # Middleware de Clerk para proteger rutas
├── tailwind.config.ts
├── next.config.mjs
├── tsconfig.json
└── package.json
```

## Variables de entorno

Se recomienda crear un archivo `.env` (ya excluido en `.gitignore`) en la raíz del proyecto. No existe un archivo `.env.example` en el repositorio, así que estas variables se han inferido de las librerías utilizadas en el código:

| Variable | Confirmada en el código | Descripción |
|---|---|---|
| `DATABASE_URL` | Sí (`db/drizzle.ts`, `scripts/seed.ts`, `drizzle.config.ts`) | Cadena de conexión a la base de datos PostgreSQL (Neon). |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | No explícita en el código; requerida por convención del SDK `@clerk/nextjs` al usar `ClerkProvider` | Clave pública de Clerk para el cliente. |
| `CLERK_SECRET_KEY` | No explícita en el código; requerida por convención del SDK `@clerk/nextjs` al usar `authMiddleware` | Clave secreta de Clerk para el servidor. |

> Estas dos últimas variables no aparecen como referencias literales `process.env.*` en el código porque el SDK de Clerk las lee internamente por convención de nombre; se documentan aquí porque el proyecto no funcionará sin ellas si se usa Clerk tal como está integrado. Si el proyecto usa nombres de variables distintos (por ejemplo, URLs personalizadas de sign-in/sign-up), no se encontró evidencia de ello en el código.

## Cómo correr pruebas

No se encontró ningún framework de pruebas configurado en el repositorio (no hay Jest, Vitest, Playwright, Cypress ni carpetas `__tests__`/`*.test.ts` visibles, y `package.json` no define un script `test`). Actualmente el proyecto no cuenta con pruebas automatizadas.

## Cómo contribuir

El repositorio no incluye un archivo `CONTRIBUTING.md` ni un proceso de contribución formalmente documentado. Como es un repositorio público en GitHub, se sugiere el flujo estándar mientras no exista una guía específica:

1. Haz un fork del repositorio.
2. Crea una rama descriptiva para tu cambio (`git checkout -b feature/mi-cambio`).
3. Realiza tus cambios y verifica que `npm run lint` no reporte errores.
4. Haz commit y push de tu rama.
5. Abre un Pull Request describiendo el cambio propuesto.

## Licencia

Este repositorio **no incluye un archivo `LICENSE`**. Por defecto, esto significa que todos los derechos quedan reservados por el autor y el código no cuenta con una licencia de código abierto explícita, incluso siendo un repositorio público (comportamiento estándar de GitHub para repositorios sin licencia). Si deseas publicarlo bajo una licencia específica (por ejemplo, MIT), se recomienda añadir un archivo `LICENSE` en la raíz del proyecto.
