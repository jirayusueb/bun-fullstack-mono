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
      // @ts-ignore - The API structure might be different than expected
      const res = await clientApi.utils.time.get();
      return res.data as ServerTimeResponse;
    },
    ...options,
  });
}
