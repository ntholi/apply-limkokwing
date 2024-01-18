import { Resource } from '@/app/(admin)/admin-core/repository/repository';

interface Course {
  level: number;
  name: string;
}

export interface Certificate extends Resource {
  name: string;
}
