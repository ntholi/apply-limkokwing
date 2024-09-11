import { Hono, Context } from 'hono';
import {
  authHandler,
  initAuthConfig,
  verifyAuth,
  type AuthConfig,
} from '@hono/auth-js';
import Google from '@auth/core/providers/google';

const app = new Hono();

app.use('*', initAuthConfig(getAuthConfig));

app.use('/api/auth/*', authHandler());

app.use('/api/*', verifyAuth());

app.get('/api/protected', (c) => {
  const auth = c.get('authUser');
  return c.json(auth);
});

function getAuthConfig(c: Context): AuthConfig {
  console.log('getAuthConfig', {
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    AUTH_SECRET: process.env.AUTH_SECRET,
  });
  return {
    secret: process.env.AUTH_SECRET,
    providers: [
      Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
    ],
  };
}

export default app;
