'use client';

import { UseQueryOptions, useQuery } from '@tanstack/react-query';
import { clientApi } from '@/lib/api/client';
import { utilsKeys } from './keys';

export interface ServerTimeResponse {
  time: string;
  unix: number;
  formatted: string;
}

/**
 * Hook for querying the server time
 */
export function useServerTime(
  options?: Omit<UseQueryOptions<ServerTimeResponse, Error, ServerTimeResponse>, 'queryKey' | 'queryFn'>
) {
  return useQuery<ServerTimeResponse, Error>({
    queryKey: utilsKeys.time(),
    queryFn: async () => {
      const res = await clientApi.api.utils.time.get();
      return res.data as ServerTimeResponse;
    },
    ...options,
  });
}
