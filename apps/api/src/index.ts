import betterAuthView from '@/auth/infrastructure/auth-view.controller';
import { utilController } from '@/shared/infrastructure/controllers/util.controller';
import { taskController } from '@/tasks/infrastructure/task.controller';
import { Elysia } from 'elysia';
import logger from 'logixlysia';
import { corsConfig } from './config/cors';
import { swaggerConfig } from './config/swagger';
import { env } from './env';

// Create the Elysia app
const app = new Elysia()
  .use(corsConfig)
  .use(logger())
  .use(swaggerConfig)
  .all('/api/auth/*', betterAuthView)
  .use(utilController)
  .use(taskController);

app.listen(env.PORT);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${env.PORT}`);

export type App = typeof app;
