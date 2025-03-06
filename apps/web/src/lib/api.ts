import { treaty } from "@elysiajs/eden";
import type { App } from "@workspace/api";
import { env } from "@/lib/env";

// Create a client for server components
export const serverClient = treaty<App>(env.API_URL);

// Create a client for client components
export const clientClient = treaty<App>(env.NEXT_PUBLIC_API_URL);

// Helper function to check if API is available
export async function checkApiStatus() {
  try {
    const res = await clientClient.health.get();
    if (!res.data) {
      throw new Error("No data returned");
    }
    return {
      isAvailable: true,
      message: `API is online (v${res.data.version || "unknown"})`,
      status: res.data,
    };
  } catch (error) {
    return {
      isAvailable: false,
      message: "API is unavailable",
      status: null,
    };
  }
}
