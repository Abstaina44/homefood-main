# Gathered Ladle — API

Node.js + Express + TypeScript backend for **Gathered Ladle**. Serves the menu,
handles customer accounts and orders, and powers the AI ordering assistant.

## Tech stack

- Node.js + Express
- TypeScript
- MongoDB + Mongoose
- Zod for request validation
- JWT auth (httpOnly cookie + Bearer token)
- OpenAI (via the AI SDK) for the ordering assistant

## Setup

Requires **Node.js 18+** and a **MongoDB** connection string
(a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster works).

```bash
npm install
cp .env.example .env      # set the values below
npm run dev               # http://localhost:4000
```

Production:

```bash
npm run build
npm start
```

## Environment

```env
PORT=4000
MONGO_URL=your_mongodb_connection_string   # required
DB_NAME=gathered_ladle
JWT_SECRET=replace_with_a_long_random_secret
FRONTEND_URL=http://localhost:5173          # web app origin (CORS / reset links)

# Optional — enables POST /api/agent/chat. Without it the endpoint returns 503.
# OPENAI_API_KEY=sk-...
# AI_MODEL=gpt-4o-mini
```

## API overview

Interactive docs (Swagger UI) at `GET /api/docs`; raw spec at `GET /api/docs.json`.
Protected endpoints expect `Authorization: Bearer <token>`.

**Auth**
- `POST /api/auth/register` — create an account
- `POST /api/auth/login` — sign in
- `POST /api/auth/forgot-password` / `POST /api/auth/reset-password`
- `POST /api/auth/verify-email`
- `GET /api/auth/me` — current user (Bearer)
- `POST /api/auth/logout`

**Menu & orders**
- `GET /api/menu/catalog` — public menu (dish ids, names, prices)
- `POST /api/orders` — place an order (optional Bearer attaches it to the account)
- `GET /api/orders/me` — list my orders (Bearer)
- `GET /api/orders/me/:orderId` — order detail (Bearer, owner only)

**AI ordering assistant**
- `POST /api/agent/chat` — body `{ "messages": [{ "role": "user" | "assistant", "content": "..." }] }`.
  Runs an OpenAI tool loop (`get_menu`, `preview_order`, `submit_order`). Requires `OPENAI_API_KEY`.

## Middleware & hardening

- `helmet` — secure headers
- `cors` — cross-origin config for the web app
- `express-rate-limit` + `express-slow-down` — abuse protection (stricter on `/api/agent/chat`)
- `hpp` + `express-mongo-sanitize` — parameter-pollution / Mongo-injection hardening
- `sanitize-html` + `validator` — clean order notes, normalize emails
- `compression`, `morgan`, `cookie-parser`
- Centralized 404 + error handler with request ids
