"use client";

import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import { clientApi } from "@/lib/api/client";
import { utilsKeys } from "./keys";
import type { ServerTimeResponse } from "@workspace/api-types";

/**
 * Hook for querying the server time
 */
export function useServerTime(
  options?: Omit<
    UseQueryOptions<ServerTimeResponse, Error, ServerTimeResponse>,
    "queryKey" | "queryFn"
  >
) {
  return useQuery<ServerTimeResponse, Error>({
    queryKey: utilsKeys.time(),
    queryFn: async () => {
      // @ts-ignore - The API structure might be different than expected
      const res = await clientApi.utils.time.get();

      if (res.error?.value) {
        throw new Error(res.error.value as string);
      }

      if (!res.data?.data) {
        throw new Error("Failed to fetch server time");
      }

      return res.data.data as ServerTimeResponse;
    },
    ...options,
  });
}
