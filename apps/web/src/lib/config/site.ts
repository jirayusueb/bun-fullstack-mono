import { env } from '@/lib/env';

export const siteConfig = {
  name: 'Fullstack Monorepo',
  description: 'A modern fullstack monorepo with Bun, Next.js, and Elysia.js',
  url: env.NEXT_PUBLIC_APP_URL,
  ogImage: '/og.jpg',
  links: {
    github: 'https://github.com/yourusername/bun-fullstack-mono',
    twitter: 'https://twitter.com/yourusername',
  },
  creator: 'Your Name',
};
