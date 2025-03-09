'use client';

import { Button } from '@workspace/ui/components/button';
import { useApiHealth } from '@/hooks/use-api-health';
import { formatRelativeTime } from '@/lib/utils/format';

export function ApiStatus() {
  const {
    data,
    isLoading,
    isError,
    refetch,
    dataUpdatedAt
  } = useApiHealth({
    refetchInterval: 30000, // Refetch every 30 seconds
    refetchOnWindowFocus: true,
  });

  if (isLoading) {
    return (
      <div className="p-4 rounded border animate-pulse">
        <div className="h-5 w-32 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 w-full bg-gray-100 rounded"></div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-4 rounded border border-red-200 bg-red-50 text-red-700">
        <h3 className="text-lg font-medium mb-2">API Status</h3>
        <p className="mb-2">Unable to connect to API</p>
        <Button
          onClick={() => refetch()}
          variant="outline"
          size="sm"
        >
          Retry Connection
        </Button>
      </div>
    );
  }

  return (
    <div
      className={`p-4 rounded border ${
        data.isAvailable
          ? 'border-green-200 bg-green-50 text-green-700'
          : 'border-red-200 bg-red-50 text-red-700'
      }`}
    >
      <h3 className="text-lg font-medium mb-2">API Status</h3>
      <p className="mb-2">{data.message}</p>

      {data.status && (
        <div className="text-sm space-y-1 mt-4">
          <p>Environment: {data.status.environment}</p>
          <p>Uptime: {Math.floor(data.status.uptime)} seconds</p>
          <p>
            Last checked: {formatRelativeTime(new Date(dataUpdatedAt))}
          </p>
        </div>
      )}

      <div className="mt-4">
        <Button
          onClick={() => refetch()}
          variant="outline"
          size="sm"
        >
          Refresh Status
        </Button>
      </div>
    </div>
  );
}
