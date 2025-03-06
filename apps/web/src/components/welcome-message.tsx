"use client";

import { useQuery } from "@tanstack/react-query";
import { Button } from "@workspace/ui/components/button";
import { clientClient } from "@/lib/api";

type ApiTimeResponse = {
  message: string;
  time: string;
  timestamp: string;
};

export function WelcomeMessage() {
  const { data, isLoading, isError, refetch } = useQuery<ApiTimeResponse>({
    queryKey: ["welcome-message"],
    queryFn: async () => {
      try {
        // Get the API time
        const res = await clientClient.time.get();
        if (!res.data) {
          throw new Error("No data returned");
        }
        return {
          message: "Welcome to the Fullstack App",
          time: res.data.formatted,
          timestamp: res.data.time,
        };
      } catch (error) {
        console.error("Failed to fetch API time:", error);
        throw new Error("Failed to fetch data from API");
      }
    },
  });

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {isLoading ? (
        <div className="flex flex-col items-center gap-3">
          <h1 className="text-2xl font-bold">Loading message...</h1>
          <div className="h-2 w-32 animate-pulse rounded-full bg-gray-200" />
        </div>
      ) : isError ? (
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold text-red-500">
            API is not available
          </h1>
          <p className="text-sm text-gray-500">
            Please start the API server to see the welcome message
          </p>
        </div>
      ) : data ? (
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold">{data.message}</h1>
          <p className="text-sm text-gray-500 mt-2">Server time: {data.time}</p>
        </div>
      ) : (
        <div className="flex flex-col items-center text-center">
          <h1 className="text-2xl font-bold">Welcome to the Fullstack App</h1>
          <p className="text-sm text-gray-500 mt-2">No time data available</p>
        </div>
      )}

      <Button size="sm" onClick={() => refetch()} disabled={isLoading}>
        {isLoading ? "Loading..." : "Refresh"}
      </Button>
    </div>
  );
}
