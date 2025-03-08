# API with Elysia, Bun, and Enhanced Features

A modern, type-safe API built with Elysia.js and Bun runtime, featuring Swagger documentation, environment validation, and a modular architecture.

## Features

This API includes:

- **Elysia.js** - Fast and flexible web framework for Bun
- **Swagger Documentation** - Interactive API docs via @elysiajs/swagger
- **Type-safe Environment Variables** - Validation using @t3-oss/env-core and zod
- **Logging** - Request logging with logixlysia
- **CORS Support** - Secure cross-origin configuration
- **Modular Architecture** - Well-organized routes and configuration files

## Project Structure

```
src/
├── config/            # Configuration files
│   ├── cors.ts        # CORS configuration
│   └── swagger.ts     # Swagger documentation configuration
├── routes/            # API route handlers
│   ├── general.ts     # General endpoints (/, /api)
│   └── util.ts        # Utility endpoints (/health, /time, /echo)
├── env.ts             # Environment variable validation
└── index.ts           # Application entry point
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (latest version)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
cd apps/api
bun install
```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Adjust values as needed

## Development

Start the development server with hot reloading:

```bash
bun run dev
```

The server will be available at http://localhost:3100/

## API Endpoints

| Method | Endpoint | Description                     |
| ------ | -------- | ------------------------------- |
| GET    | /        | Welcome message                 |
| GET    | /api     | API documentation overview      |
| GET    | /swagger | Swagger UI documentation        |
| GET    | /health  | Health check with system status |
| GET    | /time    | Current server time             |
| POST   | /echo    | Echo back the request body      |

## Available Scripts

| Command         | Description                                 |
| --------------- | ------------------------------------------- |
| `bun run dev`   | Start development server with hot reloading |
| `bun run start` | Start production server                     |
| `bun run build` | Build for production (output to `dist/`)    |
| `bun run test`  | Run tests                                   |
| `bun run lint`  | Run type checking                           |
| `bun run clean` | Remove build artifacts and dependencies     |

## Environment Variables

| Variable       | Description                                 | Default                     |
| -------------- | ------------------------------------------- | --------------------------- |
| `NODE_ENV`     | Environment (development, test, production) | `development`               |
| `PORT`         | The port to run the server on               | `3100`                      |
| `API_URL`      | The URL of the API                          | `http://localhost:3100`     |
| `CORS_ORIGINS` | Comma-separated list of allowed origins     | `http://localhost:3000,...` |

## Extending the API

### Adding New Routes

1. Create a new file in the `src/routes` directory:

```typescript
// src/routes/users.ts
import { Elysia } from "elysia";

export const userRoutes = new Elysia({ prefix: "/users" })
  .get("/", () => "List of users", {
    detail: {
      tags: ["users"],
      description: "Get all users",
    },
  })
  .get("/:id", ({ params: { id } }) => `User ${id}`, {
    detail: {
      tags: ["users"],
      description: "Get user by ID",
    },
  });
```

2. Import and use in `src/index.ts`:

```typescript
import { userRoutes } from "./routes/users";
// ...
app.use(userRoutes);
```

### Adding Swagger Tags

Update the Swagger configuration in `src/config/swagger.ts` to include new tags:

```typescript
tags: [
  // ... existing tags
  { name: "users", description: "User management endpoints" },
],
```
