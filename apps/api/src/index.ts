import { Elysia } from "elysia";
import logger from "logixlysia";
import { env } from "./env";
import { generalRoutes } from "./routes/general";
import { utilRoutes } from "./routes/util";
import { swaggerConfig } from "./config/swagger";
import { corsConfig } from "./config/cors";

// Create the Elysia app
const app = new Elysia()
  // Add Swagger documentation
  .use(swaggerConfig)
  // Add logger middleware
  .use(logger())
  // Add CORS middleware
  .use(corsConfig)
  // Use route groups
  .use(generalRoutes)
  .use(utilRoutes)
  .listen(env.PORT);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${env.PORT}`);

export type App = typeof app;
