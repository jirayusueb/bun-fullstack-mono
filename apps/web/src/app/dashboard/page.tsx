import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@workspace/ui/components/button';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your dashboard',
};

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-12">
      <div className="flex flex-col items-center justify-center space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Welcome to your Dashboard
          </h1>
          <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl">
            You have successfully logged in.
          </p>
        </div>

        <div className="w-full max-w-lg rounded-lg border bg-card p-6 shadow-sm">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Account Information</h2>
            <p className="text-sm text-muted-foreground">
              This is a placeholder dashboard page. In a real application, this would display user-specific information and functionality.
            </p>
            <div className="rounded-md bg-muted p-4">
              <code className="text-sm">
                {JSON.stringify({
                  id: 'user1',
                  name: 'Demo User',
                  email: 'demo@example.com',
                  joinedAt: new Date().toISOString(),
                }, null, 2)}
              </code>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <Button variant="outline" asChild>
            <Link href="/">Go Home</Link>
          </Button>
          <Button asChild>
            <Link href="/sign-in">Sign Out</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
