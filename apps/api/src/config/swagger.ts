import { swagger } from "@elysiajs/swagger";

export const swaggerConfig = swagger({
  path: "/swagger",
  documentation: {
    info: {
      title: "Fullstack API",
      version: "1.0.0",
      description: "API for the Fullstack Bun Monorepo Demo",
      contact: {
        name: "API Support",
        email: "support@example.com",
      },
      license: {
        name: "MIT",
      },
    },
    tags: [
      { name: "general", description: "General endpoints" },
      { name: "utils", description: "Utility endpoints" },
    ],
    servers: [
      {
        url: "http://localhost:3100",
        description: "Development server",
      },
      {
        url: "https://api.yourdomain.com",
        description: "Production server",
      },
    ],
  },
  // Enable Swagger UI (it's enabled by default)
});
