'use client';

import { useApiHealth } from '@/features/utils/api/use-api-health';

export function ApiHealthStatus() {
  const { data, isLoading, error } = useApiHealth();

  if (isLoading) {
    return <div>Loading API status...</div>;
  }

  if (error) {
    return <div>Error checking API: {error.message}</div>;
  }

  return (
    <div>
      <h2>API Status</h2>
      <div className="status">
        <span className={data?.isAvailable ? 'online' : 'offline'}>
          {data?.message}
        </span>
      </div>
      {data?.status && (
        <div className="details">
          <p>Environment: {data.status.environment}</p>
          <p>Uptime: {data.status.uptime} seconds</p>
          <p>Version: {data.status.version}</p>
        </div>
      )}
    </div>
  );
}
