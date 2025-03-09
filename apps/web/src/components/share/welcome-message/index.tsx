'use client';

import { Button } from '@workspace/ui/components/button';
import { useServerTime } from '@/features/utils/api/use-server-time';

export function WelcomeMessage() {
  const {
    data,
    isLoading,
    isError,
    refetch,
    isFetching
  } = useServerTime({
    enabled: false, // Don't fetch on component mount
  });

  return (
    <div className="flex flex-col items-center gap-4 p-6 border rounded-lg bg-background/50">
      <h1 className="text-2xl font-bold">Welcome to the Fullstack Monorepo</h1>
      <p className="text-center text-muted-foreground">
        This is a modern fullstack monorepo with Bun, Next.js, and Elysia.js
      </p>

      <div className="flex flex-col items-center gap-2 mt-4">
        <Button
          onClick={() => refetch()}
          disabled={isLoading || isFetching}
          className="w-full"
        >
          {isFetching ? 'Loading...' : 'Get Server Time'}
        </Button>

        {isError ? (
          <p className="text-sm text-red-500 mt-2">Failed to fetch time from API</p>
        ) : data ? (
          <div className="text-sm text-center mt-2">
            <p className="font-medium">Server time: {data.formatted}</p>
          </div>
        ) : null}
      </div>

      <div className="text-center text-xs text-muted-foreground mt-4">
        <p>
          Edit <code className="font-mono bg-muted p-1 rounded">apps/web/src/app/page.tsx</code> to get started
        </p>
      </div>
    </div>
  );
}
