import { userRole } from '@/db/schema';
import { User as DefaultUser } from 'next-auth';

declare module 'next-auth' {
  interface User extends DefaultUser {
    role: (typeof userRole.enumValues)[number];
  }
}
