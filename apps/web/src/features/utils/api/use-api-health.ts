'use client';

import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { clientApi } from '@/lib/api/client';
import { utilsKeys } from './keys';

export interface ApiHealthResponse {
  status: string;
  timestamp: string;
  uptime: number;
  version: string;
  environment: string;
}

export interface ApiHealthResult {
  isAvailable: boolean;
  message: string;
  status: ApiHealthResponse | null;
}

/**
 * Hook for querying the API health status
 */
export function useApiHealth(
  options?: Omit<UseQueryOptions<ApiHealthResult, Error, ApiHealthResult>, 'queryKey' | 'queryFn'>
) {
  return useQuery<ApiHealthResult, Error>({
    queryKey: utilsKeys.health(),
    queryFn: async (): Promise<ApiHealthResult> => {
      try {
        const res = await clientApi.api.utils.health.get();

        if (!res.data) {
          throw new Error('No data returned');
        }

        return {
          isAvailable: true,
          message: `API is online (v${res.data.version || 'unknown'})`,
          status: res.data as ApiHealthResponse,
        };
      } catch (error) {
        return {
          isAvailable: false,
          message: 'API is unavailable',
          status: null,
        };
      }
    },
    ...options,
  });
}
