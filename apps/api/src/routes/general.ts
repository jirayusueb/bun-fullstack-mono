import { Elysia } from "elysia";

export const generalRoutes = new Elysia({ prefix: "" })
  // Main endpoint
  .get("/", () => "Hello Elysia", {
    detail: {
      tags: ["general"],
      description: "Welcome message",
    },
  })

  // Documentation endpoint
  .get(
    "/api",
    () => ({
      name: "Fullstack API",
      version: "1.0.0",
      description: "API for the Fullstack Bun Monorepo Demo",
      endpoints: [
        { path: "/", method: "GET", description: "Welcome message" },
        { path: "/api", method: "GET", description: "API documentation" },
        {
          path: "/swagger",
          method: "GET",
          description: "Swagger documentation",
        },
        {
          path: "/health",
          method: "GET",
          description: "Health check endpoint",
        },
        {
          path: "/time",
          method: "GET",
          description: "Get current server time",
        },
        {
          path: "/echo",
          method: "POST",
          description: "Echo back the request body",
        },
      ],
    }),
    {
      detail: {
        tags: ["general"],
        description: "API documentation",
      },
    }
  );
