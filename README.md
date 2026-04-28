# AeroDesign Command Center

A full-stack website for AeroDesign student teams that combines attendance management, daily work tracking, learning revision, reporting, and team productivity analytics in one professional platform.

## What’s Included

- Modern responsive landing page with startup-style UI, dark/light mode, motion, and team branding
- Role-based auth flow design for `admin`, `lead`, and `member`
- Next.js auth gateway with `httpOnly` cookie sessions backed by the Express JWT endpoints
- Member management with domain assignment, batch/year metadata, and profile analytics
- Daily work log system with learning summaries, blockers, attachments, approval state, and history
- Attendance system with present/absent/leave/late tracking, manual override, and analytics-ready data
- Dashboard with productivity metrics, attendance trends, domain progress, leaderboard, recent submissions, and alerts
- Learning and fundamentals tracker with roadmap stages, mentor feedback, and revision progress
- Calendar-style activity heatmap and streak tracking
- Export/report endpoints for `xlsx`, `csv`, and `json`
- Backup/restore API endpoints for admin data snapshots

## Stack

- Frontend: Next.js 15, React 19, Tailwind CSS, Framer Motion, Recharts
- Backend: Node.js, Express, JWT, Multer
- Shared domain model: TypeScript workspace package
- Database path: Prisma schema for PostgreSQL included in `apps/api/prisma/schema.prisma`

## Repo Structure

```text
apps/
  api/      Express API, exports, auth routes, Prisma schema
  web/      Next.js frontend and dashboard UI
packages/
  shared/   Shared types, seed data, analytics helpers
```

## Local Setup

1. Install dependencies at the repo root:

```bash
npm install
```

2. Copy environment variables:

```bash
cp .env.example .env
```

3. Start the API:

```bash
npm run dev:api
```

4. Start the frontend:

```bash
npm run dev:web
```

5. Open:

- Frontend: [http://localhost:3000](http://localhost:3000)
- API: [http://localhost:4000](http://localhost:4000)

## Demo Accounts

- `aarav@aerodesign.team / admin123`
- `nisha@aerodesign.team / lead123`
- `meera@aerodesign.team / member123`

## Important Notes

- The frontend is designed to fall back to seeded shared data if the Express API is not running, so the UI still renders during early setup.
- Login, signup, logout, forgot-password, reset-password, and session validation are routed through Next.js server handlers that set an `httpOnly` session cookie.
- The current backend uses in-memory seeded data for a zero-friction demo flow.
- A production PostgreSQL schema is already included with Prisma so persistence can be moved from in-memory state to a database-backed repository layer.
- Uploads currently use local `uploads/` storage through Multer. You can swap this to Cloudinary or Firebase Storage using the env placeholders in `.env.example`.

## Core API Endpoints

### Authentication

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`
- `GET /api/auth/session/:token`

### Main Product Modules

- `GET /api/dashboard`
- `GET /api/members`
- `GET /api/members/:id`
- `POST /api/members`
- `PATCH /api/members/:id`
- `DELETE /api/members/:id`
- `GET /api/logs`
- `POST /api/logs`
- `PATCH /api/logs/:id`
- `GET /api/attendance`
- `POST /api/attendance`
- `PATCH /api/attendance/:id`
- `GET /api/learning`
- `PATCH /api/learning/:id`
- `GET /api/notifications`
- `POST /api/notifications`
- `GET /api/search`

### Reports and Backup

- `GET /api/reports/team?format=xlsx`
- `GET /api/reports/attendance?format=csv`
- `GET /api/reports/logs?format=json`
- `GET /api/reports/members/:id?format=xlsx`
- `GET /api/reports/backup`
- `POST /api/reports/restore`

## Suggested Next Production Steps

1. Replace the in-memory `db` in `apps/api/src/store.ts` with Prisma repository calls.
2. Wire frontend auth forms to the login/signup endpoints and persist JWT in secure cookies.
3. Add email delivery for password reset and notification reminders.
4. Connect uploads to Cloudinary or Firebase Storage.
5. Add a quiz engine for fundamentals revision and scheduled cron jobs for weekly summaries.
