import { WelcomeMessage } from '@/components/share/welcome-message';
import { ApiStatus } from '@/components/share/api-status';

export default function Page() {
  return (
    <main className="flex items-center justify-center min-h-svh bg-gradient-to-b from-white to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <div className="container max-w-4xl mx-auto py-12 px-4">
        <div className="grid grid-cols-1 gap-8">
          <WelcomeMessage />
          <ApiStatus />

          <div className="text-center text-sm text-muted-foreground mt-6">
            <p>Built with Next.js, Elysia, and Bun</p>
          </div>
        </div>
      </div>
    </main>
  );
}
