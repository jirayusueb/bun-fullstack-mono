import { NotFoundError, ValidationError } from "@/shared/domain/errors";
import type {
  ApiHealthResponse,
  ServerTimeResponse,
} from "@/shared/domain/types";
import { createSuccessResponse } from "@/shared/infrastructure/utils";
import { Elysia, t } from "elysia";

export const utilController = new Elysia({ prefix: "/api/utils" })
  // Health check endpoint
  .get("/health", () => {
    const healthData: ApiHealthResponse = {
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: process.env.npm_package_version || "0.0.1",
      environment: process.env.NODE_ENV || "development",
    };

    return createSuccessResponse(healthData);
  })

  // Server time endpoint
  .get("/time", () => {
    const now = new Date();

    const timeData: ServerTimeResponse = {
      time: now.toISOString(),
      unix: Math.floor(now.getTime() / 1000),
      formatted: now.toLocaleString(),
    };

    return createSuccessResponse(timeData);
  })

  // Example error endpoints
  .group("/errors", (app) =>
    app
      // Not found error example
      .get("/not-found", () => {
        throw new NotFoundError("Example resource not found");
      })

      // Validation error example
      .get("/validation", () => {
        throw new ValidationError("Example validation error", {
          fields: {
            name: "Name is required",
            email: "Invalid email format",
          },
        });
      })

      // Generic error example
      .get("/generic", () => {
        throw new Error("Something went wrong");
      })

      // Elysia validation error example
      .get(
        "/elysia-validation/:id",
        ({ params }) => {
          return createSuccessResponse({ id: params.id });
        },
        {
          params: t.Object({
            id: t.Numeric(),
          }),
        }
      )
  );
