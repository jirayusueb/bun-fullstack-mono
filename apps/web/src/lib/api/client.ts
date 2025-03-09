// import type { App } from '@workspace/api';
import { treaty } from '@elysiajs/eden';
import { env } from '@/env';

// Temporary type definition until the API types are properly built
type App = any;

// Create a client for server components
export const serverApi = treaty<App>(env.API_URL);

// Create a client for client components
export const clientApi = treaty<App>(env.NEXT_PUBLIC_API_URL);

// Helper function to check if API is available
export async function checkApiStatus() {
  try {
    // Use the client directly without the 'api' property
    // @ts-ignore - The API structure might be different than expected
    const res = await clientApi.utils.health.get();
    if (!res.data) {
      throw new Error('No data returned');
    }
    return {
      isAvailable: true,
      message: `API is online (v${res.data.version || 'unknown'})`,
      status: res.data,
    };
  }
  catch {
    return {
      isAvailable: false,
      message: 'API is unavailable',
      status: null,
    };
  }
}
