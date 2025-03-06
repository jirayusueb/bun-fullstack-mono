# Bun Fullstack Monorepo

A modern fullstack application built with Bun, Next.js, Elysia, and TanStack Query, all organized in a monorepo structure.

## Features

- **Monorepo Structure**: Managed with Turborepo for efficient builds and dependency management
- **Next.js Frontend**: Modern React application with the App Router
- **Elysia API**: Fast, type-safe API built with Elysia.js and Bun
- **Type Safety**: End-to-end type safety with TypeScript
- **Data Fetching**: Efficient client-side data fetching with TanStack Query
- **Environment Variables**: Type-safe environment variables with T3 Env
- **UI Components**: Shadcn/UI components for a beautiful UI
- **CORS Support**: Properly configured CORS for API access

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) (v1.0.0 or higher)
- [Node.js](https://nodejs.org) (v18.0.0 or higher)

### Installation

```bash
# Clone the repository
git clone https://github.com/jirayusueb/bun-fullstack-mono.git
cd bun-fullstack-mono

# Install dependencies
bun install
```

### Development

```bash
# Start the development server for both API and web
bun run dev

# Start only the API
cd apps/api && bun run dev

# Start only the web app
cd apps/web && bun run dev
```

## Structure

- `apps/`
  - `api/` - Elysia.js API
  - `web/` - Next.js frontend
- `packages/`
  - `ui/` - Shared UI components
  - `eslint-config/` - Shared ESLint configurations
  - `typescript-config/` - Shared TypeScript configurations

## Adding Components

To add UI components to your app:

```bash
bunx shadcn-ui@latest add button -c apps/web
```

## License

MIT
