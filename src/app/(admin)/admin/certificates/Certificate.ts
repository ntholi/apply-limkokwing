import { Resource } from '@/app/(admin)/admin-core/repository/repository';
import internal from 'stream';

export interface GradingScheme {
  level: number;
  grade: string;
}

export interface Certificate extends Resource {
  name: string;
  courses: string[];
  gradingSchemes: GradingScheme[];
}
