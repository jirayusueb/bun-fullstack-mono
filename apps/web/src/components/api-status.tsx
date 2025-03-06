"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "@workspace/ui/components/button";
import { checkApiStatus } from "@/lib/api";

export function ApiStatus() {
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["api-status"],
    queryFn: checkApiStatus,
  });

  return (
    <div className="flex flex-col items-center gap-4 p-4 border rounded-lg bg-background/50">
      <h2 className="text-xl font-semibold">API Status</h2>

      {isLoading ? (
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 animate-pulse rounded-full bg-yellow-300" />
          <p>Checking status...</p>
        </div>
      ) : isError ? (
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <p className="text-red-500">API is offline</p>
        </div>
      ) : data?.isAvailable ? (
        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-500" />
            <p className="text-green-500">{data.message}</p>
          </div>

          {data.status && (
            <div className="text-xs text-gray-500 mt-2 border-t pt-2 space-y-1">
              <p>Environment: {data.status.environment}</p>
              <p>Uptime: {Math.floor(data.status.uptime)} seconds</p>
              <p>
                Updated: {new Date(data.status.timestamp).toLocaleTimeString()}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-full bg-red-500" />
          <p className="text-red-500">{data?.message}</p>
        </div>
      )}

      <Button
        size="sm"
        variant="outline"
        onClick={() => refetch()}
        disabled={isLoading}
        className="mt-2"
      >
        {isLoading ? "Checking..." : "Refresh Status"}
      </Button>
    </div>
  );
}
