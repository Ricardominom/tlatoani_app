# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Tlatoani is a Montessori school-management platform. This repo (`tlatoani_app`) is the **parent-facing mobile app**, built with Expo + React Native + expo-router and TypeScript. Package manager is **pnpm** (do not use npm/yarn — see `.npmrc` with `node-linker=hoisted`, required for Metro to resolve modules correctly).

It is one of three repos in the project:
- `tlatoani_app` (this repo) — mobile app for parents
- `tlatoani-cms` — React/Vite web admin panel (for teachers/directors)
- `tlatoani-laravel` — Laravel API backend (Sanctum auth, `/api/v1`)

## Commands

```bash
pnpm install        # install deps (always use pnpm, never npm/yarn)
pnpm start          # start Expo dev server
pnpm android        # start with Android target
pnpm ios            # start with iOS target
pnpm web            # start with web target
pnpm lint           # expo lint (ESLint flat config, eslint-config-expo)
pnpm reset-project  # moves starter code to app-example/, creates blank app/
```

There is no test suite configured in this repo currently.

## Architecture

### Routing (expo-router, file-based)
- `src/app/_layout.tsx` — root layout: loads Nunito/Pacifico fonts, wraps everything in `AuthProvider`, controls splash screen
- `src/app/index.tsx` — entry redirect: routes to `(padre)/home` if a token exists, otherwise to `(auth)/login`
- `src/app/(auth)/` — unauthenticated routes (login)
- `src/app/(padre)/` — authenticated routes for the **parent** role (the only role currently implemented in this app — teacher/director flows exist only as mockups in the design docs, not here)
- Typed routes are enabled (`experiments.typedRoutes` in `app.json`)
- Path alias `@/*` maps to project root (see `tsconfig.json`)

### Auth — currently in DEMO MODE
`src/context/AuthContext.tsx` exposes `useAuth()` (user, token, isLoading, login, logout) via React Context. **The real API calls are commented out** and replaced with hardcoded demo values (`token: "demo-token"`, fake user). The comment `// descomentar para acceder a la conexion con API` marks exactly what to uncomment to wire up real auth — this swaps in `loginService`/`logoutService`/`getStoredToken` from `src/services/authService.ts`, which already implements the full flow against the Laravel backend (`POST /v1/auth/login`, `POST /v1/auth/logout`, token persisted via `expo-secure-store` under key `tlatoani_auth_token`).

When re-enabling real auth, also restore the `getStoredToken()` call in the `useEffect` that currently just sets `isLoading(false)`.

### API layer
- `src/config/env.ts` — `API_BASE_URL` (currently hardcoded to a local dev IP `http://192.168.100.2:8000/api` — update this to match your machine's LAN IP when testing against a local Laravel backend, since the device/simulator can't reach `localhost`)
- `src/services/api.ts` — shared Axios instance (JSON headers, 10s timeout)
- `src/services/authService.ts` — the only service implemented so far; pattern to follow when adding new ones (call `api`, unwrap `response.data.data`, handle SecureStore where relevant)

### Screens are mock-data driven
Every screen under `src/app/(padre)/` currently renders **hardcoded arrays** (e.g. `HIJOS`, `CARDS`, `AVISOS`, `FOTOS_MOCK`) defined inline in the screen files — there is no `useEffect`/data-fetching wired up anywhere yet. When integrating real data, the pattern is: define a service in `src/services/`, call it from the screen, and replace the mock array with state from the response. Zustand (`zustand` is a dependency) is not currently used anywhere — screens rely on local `useState`.

The "Avisos" tab is intentionally commented out in the tab bar config (`src/components/ui/TlatoaniTabIcons.tsx`, `TABS` array).

### Design system
`src/styles/global.ts` centralizes fonts, colors, radii, spacing. Color naming follows the school's Montessori group/animal branding (`abejas`=yellow, `hormigas`=green, `lobos`=pink, `halcones`=turquoise) plus semantic UI colors (`fondo`, `card`, `texto`, etc.). Reuse these tokens rather than hardcoding hex values in new screens/components.

Fonts: Nunito (regular/semibold/bold/extrabold/black) for body text, Pacifico for branding/display — both loaded in the root layout via `@expo-google-fonts/*`.

### Reusable UI components
`src/components/ui/` — `FeedCard` (renders different card types: aviso, bitácora, comida, colegiatura, general — used on the home feed), `TlatoaniTabIcons` (custom tab bar), `HeaderHome`, `FiltrosHijos`, `CarruselAnimales`, `AnimalKit` (Montessori group avatars/icons).
