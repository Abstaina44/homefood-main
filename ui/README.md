# Gathered Ladle — Web

React frontend for **Gathered Ladle**, a family-run home kitchen. Browse the menu,
place orders, request catering, and chat with the AI ordering assistant. Talks to the
[API in `../server`](../server).

## Tech stack

| Layer     | Tools                                         |
| --------- | --------------------------------------------- |
| UI        | React 19, TypeScript, React Router 7          |
| Build     | Vite 8                                        |
| Styling   | Tailwind CSS 3, PostCSS, `tailwindcss-themer` |
| Animation | GSAP                                          |
| Lint      | ESLint, typescript-eslint                     |

## Getting started

Requires **Node.js 18+** and the backend running (default `http://localhost:4000`).

```bash
npm install
cp .env.example .env      # set VITE_API_URL if the API isn't on :4000
npm run dev               # http://localhost:5173
```

## Scripts

| Command           | Description                             |
| ----------------- | --------------------------------------- |
| `npm run dev`     | Start the Vite dev server (port 5173)   |
| `npm run build`   | Type-check + production build → `dist/` |
| `npm run preview` | Serve the production build locally      |
| `npm run lint`    | Run ESLint                              |

## Environment

All `VITE_*` variables are exposed to the client at build time.

```env
# API base URL — no trailing slash
VITE_API_URL=http://localhost:4000
```

## Project structure

```
ui/
├── index.html            # App shell + boot loader
├── tailwind.config.js    # Design tokens + tailwindcss-themer palettes
├── postcss.config.cjs    # PostCSS pipeline
├── vite.config.ts
└── src/
    ├── main.tsx          # App entry, providers
    ├── App.tsx           # Route definitions
    ├── index.css         # Global styles, @layer components
    ├── auth/             # AuthContext, session handling
    ├── theme/            # ThemeProvider (palette switching)
    ├── constants/        # Shared constants (auth, theme ids)
    ├── components/       # Reusable UI (Header, Hero, MenuItemCard, …)
    ├── pages/            # Route-level views
    ├── layouts/          # SiteLayout (header / footer chrome)
    ├── hooks/            # useScrollNav, useInView, …
    └── lib/              # API client, helpers
```

## API integration

The client calls the API through `src/lib/api.ts`; authenticated requests send a
`Bearer` token stored in `localStorage`.

```ts
import { apiJson } from "./lib/api";
const menu = await apiJson("/api/menu/catalog");
```

## Production build

```bash
npm run build      # outputs dist/
npm run preview    # optional local smoke test
```

Serve `dist/` as static files behind any CDN or host. Point `VITE_API_URL` at your
production backend and make sure its CORS allows the site's origin.
