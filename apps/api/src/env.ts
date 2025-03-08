import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  /*
   * Server-side Environment variables schema
   */
  server: {
    NODE_ENV: z
      .enum(["development", "test", "production"])
      .default("development"),
    PORT: z.coerce.number().default(3100),
    API_URL: z.string().url().default("http://localhost:3100"),
    CORS_ORIGINS: z
      .string()
      .default("http://localhost:3000,http://127.0.0.1:3000")
      .transform((val) => val.split(",")),
  },

  /*
   * Client prefix for environment variables
   */
  clientPrefix: "PUBLIC_",

  /*
   * Skip validation in production for better performance
   */
  skipValidation: process.env.NODE_ENV === "production",

  /*
   * Client exposed variables will be injected at build time
   * and will be empty in this server environment
   */
  client: {},

  /**
   * How to get the environment variables
   */
  runtimeEnv: process.env,
});
