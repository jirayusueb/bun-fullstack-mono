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
- **Database Integration** - PostgreSQL with Drizzle ORM

## Project Structure

```
src/
├── config/            # Configuration files
│   ├── cors.ts        # CORS configuration
│   └── swagger.ts     # Swagger documentation configuration
├── db/                # Database integration
│   ├── client.ts      # Database client configuration
│   ├── migrate.ts     # Migration utility
│   └── schema.ts      # Database schema definitions
├── routes/            # API route handlers
│   ├── general.ts     # General endpoints (/, /api)
│   ├── util.ts        # Utility endpoints (/health, /time, /echo)
│   └── db.ts          # Database endpoints (/db/*)
├── env.ts             # Environment variable validation
└── index.ts           # Application entry point
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (latest version)
- PostgreSQL database

### Installation

1. Clone the repository
2. Install dependencies:

```bash
cd apps/api
bun install
```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Set your `DATABASE_URL` and other values as needed

### Database Setup

1. Generate migrations based on your schema:

```bash
bun run db:generate
```

2. Run the migrations to set up your database:

```bash
bun run db:migrate
```

3. To explore your database with a visual interface:

```bash
bun run db:studio
```

## Development

Start the development server with hot reloading:

```bash
bun run dev
```

The server will be available at http://localhost:8000/

## API Endpoints

| Method | Endpoint                | Description                     |
| ------ | ----------------------- | ------------------------------- |
| GET    | /                       | Welcome message                 |
| GET    | /api                    | API documentation overview      |
| GET    | /swagger                | Swagger UI documentation        |
| GET    | /health                 | Health check with system status |
| GET    | /time                   | Current server time             |
| POST   | /echo                   | Echo back the request body      |
| GET    | /db/users               | Get all users                   |
| GET    | /db/users/:id           | Get user by ID                  |
| POST   | /db/users               | Create a new user               |
| GET    | /db/tasks               | Get all tasks                   |
| GET    | /db/users/:userId/tasks | Get tasks for a specific user   |

## Available Scripts

| Command               | Description                                 |
| --------------------- | ------------------------------------------- |
| `bun run dev`         | Start development server with hot reloading |
| `bun run start`       | Start production server                     |
| `bun run build`       | Build for production (output to `dist/`)    |
| `bun run test`        | Run tests                                   |
| `bun run lint`        | Run type checking                           |
| `bun run clean`       | Remove build artifacts and dependencies     |
| `bun run db:generate` | Generate database migrations                |
| `bun run db:migrate`  | Run database migrations                     |
| `bun run db:studio`   | Open Drizzle Studio web interface           |

## Environment Variables

| Variable       | Description                                 | Default                     |
| -------------- | ------------------------------------------- | --------------------------- |
| `NODE_ENV`     | Environment (development, test, production) | `development`               |
| `PORT`         | The port to run the server on               | `8000`                      |
| `API_URL`      | The URL of the API                          | `http://localhost:8000`     |
| `CORS_ORIGINS` | Comma-separated list of allowed origins     | `http://localhost:3000,...` |
| `DATABASE_URL` | PostgreSQL connection string                | -                           |

## Extending the API

### Adding New Routes

1. Create a new file in the `src/routes` directory:

```typescript
// src/routes/users.ts
import { Elysia } from 'elysia';

export const userRoutes = new Elysia({ prefix: '/users' })
  .get('/', () => 'List of users', {
    detail: {
      tags: ['users'],
      description: 'Get all users',
    },
  })
  .get('/:id', ({ params: { id } }) => `User ${id}`, {
    detail: {
      tags: ['users'],
      description: 'Get user by ID',
    },
  });
```

2. Import and use in `src/index.ts`:

```typescript
import { userRoutes } from './routes/users';
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

### Working with the Database

Define new models in the schema:

```typescript
// src/db/schema.ts
export const products = pgTable('products', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  price: numeric('price').notNull(),
  // ...
});
```

Create routes to interact with your models:

```typescript
// src/routes/products.ts
import { Elysia, t } from 'elysia';
import { db } from '../db/client';
import { products } from '../db/schema';

export const productRoutes = new Elysia({ prefix: '/products' }).get(
  '/',
  async () => {
    return await db.select().from(products);
  }
);
// ... more routes
```

```javascript
[
  { name: "general", description: "General endpoints" },
  { name: "utils", description: "Utility endpoints" },
  { name: "users", description: "User management endpoints" },
],
```
