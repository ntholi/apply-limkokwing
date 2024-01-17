import { User } from 'firebase/auth';

type Role = 'user' | 'admin';

declare module 'firebase/auth' {
  interface User {
    role?: Role;
  }
}
