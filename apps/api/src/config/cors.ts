import { cors } from "@elysiajs/cors";
import { env } from "../env";

export const corsConfig = cors({
  origin: env.CORS_ORIGINS,
  credentials: true,
  allowedHeaders: ["content-type", "authorization"],
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
});
