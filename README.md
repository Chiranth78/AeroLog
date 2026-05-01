# AeroDesign Command Center

A full-stack website for AeroDesign student teams that combines attendance management, daily work tracking, learning revision, reporting, and team productivity analytics in one professional platform.

## What’s Included

- Modern responsive landing page with startup-style UI, dark/light mode, motion, and team branding
- Role-based auth design for `admin`, `lead`, and `member`
- Express JWT authentication endpoints with signup, login, password reset, and session validation
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
- Database path: Prisma schema for PostgreSQL in `apps/api/prisma/schema.prisma`

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
pnpm install
```

2. Copy environment variables:

```bash
cp .env.example .env
```

3. Start the API:

```bash
pnpm run dev:api
```

4. Start the frontend:

```bash
pnpm run dev:web
```

5. Open:

- Frontend: [http://localhost:3000](http://localhost:3000)
- API health check: [http://localhost:4000/api/health](http://localhost:4000/api/health)

## Demo Accounts

- `aarav@aerodesign.team / admin123`
- `nisha@aerodesign.team / lead123`
- `meera@aerodesign.team / member123`

## Important Notes

- The frontend falls back to seeded shared data if the Express API is not running, so the UI still renders cleanly during early setup.
- The current backend uses in-memory seeded data for a zero-friction demo flow.
- A production PostgreSQL schema is already included with Prisma so persistence can move from in-memory state to database-backed repositories.
- Uploads currently use local `uploads/` storage through Multer. You can swap this to Cloudinary or Firebase Storage using the env placeholders in `.env.example`.

## Free Hosting

This repo is prepared for a free student-friendly deployment split:

- Frontend: Vercel Hobby
- Backend API: Render free web service
- Database: Neon free PostgreSQL

### Frontend on Vercel

1. Import the GitHub repo into Vercel.
2. Set the project root directory to `apps/web`.
3. Add environment variables:
   - `NEXT_PUBLIC_API_URL=https://your-render-service.onrender.com/api`
   - `NEXT_PUBLIC_APP_NAME=AeroLog`
4. Deploy.

The frontend includes `apps/web/vercel.json`, so Vercel will install from the workspace root and build both the shared package and the web app correctly.

### Backend on Render

1. Create a new Web Service from this GitHub repo.
2. Render will detect `render.yaml`.
3. Set the missing environment variables:
   - `CLIENT_URL=https://your-vercel-project.vercel.app`
   - `DATABASE_URL=your-neon-connection-string`
4. Deploy the API service.

The service health check is `GET /health`.

### Important Production Caveats

- The current API still uses in-memory seeded data, so new member/log/attendance changes will reset when the backend restarts.
- For real team usage, wire `apps/api/src/store.ts` to Prisma and a PostgreSQL database before launch.
- Local file uploads in `uploads/` are ephemeral on free hosting. Use Cloudinary or Firebase Storage for persistent uploads.

## Core API Endpoints

### Authentication

- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/forgot-password`
- `POST /api/auth/reset-password`
- `GET /api/auth/session`

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
- `POST /api/logs/:id/approve`
- `GET /api/attendance`
- `POST /api/attendance`
- `PATCH /api/attendance/:id`
- `GET /api/learning`
- `POST /api/learning`
- `PATCH /api/learning/:id`
- `GET /api/notifications`
- `POST /api/notifications`
- `GET /api/search`

### Reports and Backup

- `GET /api/reports/team?format=xlsx|csv|json`
- `GET /api/reports/attendance?format=xlsx|csv|json`
- `GET /api/reports/logs?format=xlsx|csv|json`
- `GET /api/reports/members/:id?format=xlsx|csv|json`
- `GET /api/reports/backup`
- `POST /api/reports/restore`

## Prisma Next Steps

1. Run `pnpm exec prisma generate`
2. Run `pnpm exec prisma migrate dev`
3. Replace the in-memory store in `apps/api/src/store.ts` with Prisma repository calls

## Verification

- Shared package build verified
- API TypeScript build verified
- Next.js production build verified

I verified those builds in this environment using a temporary local Node/pnpm toolchain because the machine did not start with a system Node installation on `PATH`.

## Suggested Next Production Steps

1. Replace the in-memory store with Prisma-backed persistence.
2. Wire email delivery for password reset and reminder notifications.
3. Connect uploads to Cloudinary or Firebase Storage.
4. Add scheduled reminder jobs and weekly summary automation.
5. Add the optional quiz module for fundamentals revision.
