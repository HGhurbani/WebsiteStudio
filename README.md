# WebsiteStudio

A modern full-stack website management and page-building studio built with **React + Vite** on the frontend and **Express + TypeScript** on the backend.

WebsiteStudio helps teams manage websites, organize pages, and compose page content using reusable sections and templates through a clean dashboard-style interface.

## ✨ Features

- **Website Management**
  - Create, update, list, and delete websites.
  - Configure domain, active state, brand colors, and supported languages.
- **Page Management**
  - Create and edit pages per website.
  - Manage page metadata such as slug, publication status, and header template.
- **Content Builder**
  - Build pages with configurable section types:
    - Hero
    - Services
    - Gallery
    - Video
    - Text
- **Template Support**
  - Includes predefined header template options.
- **Typed API Contracts**
  - Shared schema/types between client and server for safer development.
- **Validation**
  - Request payload validation using Zod-backed schemas.

## 🧱 Tech Stack

### Frontend
- React 18
- Vite
- TypeScript
- Tailwind CSS
- TanStack Query
- Wouter
- Zustand
- Radix UI components

### Backend
- Node.js
- Express
- TypeScript
- Zod
- Drizzle ORM (schema-ready)

## 📁 Project Structure

```text
.
├── client/             # Frontend app (React + Vite)
├── server/             # Express API and server runtime
├── shared/             # Shared schema and TypeScript types
├── migrations/         # Database migrations (when generated)
├── drizzle.config.ts   # Drizzle ORM configuration
└── package.json
```

## 🚀 Getting Started

### 1) Prerequisites

- Node.js 18+
- npm 9+

### 2) Install dependencies

```bash
npm install
```

### 3) Run the development server

```bash
npm run dev
```

The application runs on:

- **http://localhost:5000** (both API and frontend in development)

## 🛠️ Available Scripts

- `npm run dev` — start the development server
- `npm run build` — build frontend and bundle backend into `dist/`
- `npm run start` — run the production build from `dist/`
- `npm run check` — run TypeScript type checking
- `npm run db:push` — push Drizzle schema changes (requires `DATABASE_URL`)

## 🗄️ Data Layer Notes

- The current runtime uses an **in-memory storage implementation** (`MemStorage`) with seed data, which is great for local development and demos.
- The project already includes **Drizzle ORM schema/config**, so you can evolve it toward PostgreSQL-backed persistence.

## 🌐 API Overview

Main REST endpoints include:

- `GET /api/websites`
- `GET /api/websites/:id`
- `POST /api/websites`
- `PATCH /api/websites/:id`
- `DELETE /api/websites/:id`
- `GET /api/websites/:websiteId/pages`
- `GET /api/pages/:id`
- `POST /api/pages`
- `PATCH /api/pages/:id`
- `DELETE /api/pages/:id`
- `GET /api/header-templates`

## 🔒 Environment Variables

Only required when using database tooling:

- `DATABASE_URL` — PostgreSQL connection string (required by `drizzle.config.ts` and `npm run db:push`)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a pull request

## 📄 License

MIT
