import { WelcomeMessage } from '@/components/welcome-message';

export default function Page() {
  return (
    <main className="flex items-center justify-center min-h-svh bg-gradient-to-b from-white to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <div className="flex flex-col items-center justify-center gap-8 p-8 border rounded-lg shadow-md bg-white dark:bg-gray-950">
        <WelcomeMessage />

        <div className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          <p>Built with Next.js, React Query, and Bun</p>
        </div>
      </div>
    </main>
  );
}
