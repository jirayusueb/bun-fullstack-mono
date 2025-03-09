import { WelcomeMessage } from '@/components/share/welcome-message';
import { ApiStatus } from '@/components/share/api-status';
import Link from 'next/link';
import { Button } from '@workspace/ui/components/button';

export default function Page() {
  return (
    <main className="flex items-center justify-center min-h-svh bg-gradient-to-b from-white to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <div className="container max-w-4xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 gap-8">
          <WelcomeMessage />
          <ApiStatus />

          <div className="flex flex-col items-center justify-center space-y-4 mt-8">
            <h2 className="text-xl font-semibold">Get Started</h2>
            <div className="flex gap-4">
              <Button asChild variant="outline">
                <Link href="/sign-up">Sign Up</Link>
              </Button>
              <Button asChild>
                <Link href="/sign-in">Sign In</Link>
              </Button>
            </div>
          </div>

          <div className="text-center text-sm text-muted-foreground mt-6">
            <p>Built with Next.js, Elysia, and Bun</p>
          </div>
        </div>
      </div>
    </main>
  );
}
