import { Resource } from '@/app/(admin)/admin-core/repository/repository';

interface Course {
  level: number;
  name: string;
}

export interface Prerequisite extends Resource {
  name: string;
  courses: Course[];
}
