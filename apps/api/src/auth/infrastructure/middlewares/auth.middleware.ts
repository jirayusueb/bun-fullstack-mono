import type { Session, User } from 'better-auth';
import type { Context } from 'elysia';
import { auth } from '@/auth/infrastructure/auth.service';

export async function userMiddleware(c: Context) {
  const session = await auth.api.getSession({ headers: c.request.headers });

  if (!session) {
    c.set.status = 401;
    return {
      success: 'error',
      message: 'Unauthorized Access: Token is missing',
    };
  }

  return {
    user: session.user,
    session: session.session,
  };
}

export function userInfo(user: User | null, session: Session | null) {
  return {
    user,
    session,
  };
}
