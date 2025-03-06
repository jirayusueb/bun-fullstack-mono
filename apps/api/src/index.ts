import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";

// Create the Elysia app with CORS support
const app = new Elysia()
  .use(
    cors({
      origin: [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://yourdomain.com",
      ],
      credentials: true,
      allowedHeaders: ["content-type", "authorization"],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    })
  )
  // Main endpoint
  .get("/", () => "Hello Elysia")

  // Documentation endpoint
  .get("/api", () => ({
    name: "Fullstack API",
    version: "1.0.0",
    description: "API for the Fullstack Bun Monorepo Demo",
    endpoints: [
      { path: "/", method: "GET", description: "Welcome message" },
      { path: "/api", method: "GET", description: "API documentation" },
      { path: "/health", method: "GET", description: "Health check endpoint" },
      { path: "/time", method: "GET", description: "Get current server time" },
      {
        path: "/echo",
        method: "POST",
        description: "Echo back the request body",
      },
    ],
  }))

  // Health check endpoint
  .get("/health", () => ({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    version: process.env.npm_package_version || "1.0.0",
    environment: process.env.NODE_ENV || "development",
  }))

  // Get current server time
  .get("/time", () => ({
    time: new Date().toISOString(),
    unix: Date.now(),
    formatted: new Date().toLocaleString(),
  }))

  // Echo endpoint - returns whatever is sent
  .post("/echo", ({ body }) => ({
    received: body,
    timestamp: new Date().toISOString(),
  }))

  .listen(3100);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
