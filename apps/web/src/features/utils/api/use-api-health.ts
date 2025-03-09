"use client";

import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { clientApi } from "@/lib/api/client";
import { utilsKeys } from "./keys";
import type { ApiHealthResponse } from "@workspace/api-types";

export interface ApiHealthResult {
  isAvailable: boolean;
  message: string;
  status: ApiHealthResponse | null;
}

/**
 * Hook for querying the API health status
 */
export function useApiHealth(
  options?: Omit<
    UseQueryOptions<ApiHealthResult, Error, ApiHealthResult>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery<ApiHealthResult, Error>({
    queryKey: utilsKeys.health(),
    queryFn: async (): Promise<ApiHealthResult> => {
      try {
        // @ts-ignore - The API structure might be different than expected
        const res = await clientApi.utils.health.get();

        if (!res.data?.data) {
          throw new Error("No data returned");
        }

        const healthData = res.data.data as ApiHealthResponse;

        return {
          isAvailable: true,
          message: `API is online (v${healthData.version || "unknown"})`,
          status: healthData,
        };
      } catch (error) {
        return {
          isAvailable: false,
          message: "API is unavailable",
          status: null,
        };
      }
    },
    ...options,
  });
}
