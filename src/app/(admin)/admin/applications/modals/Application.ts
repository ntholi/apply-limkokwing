import { Resource } from '@/app/(admin)/admin-core/repository/repository';
import { Results } from './Results';

type Status =
  | 'incomplete'
  | 'submitted'
  | 'withdrawn'
  | 'accepted'
  | 'rejected'
  | 'waitlisted';

export interface Application extends Resource {
  userId: string;
  status: Status;
  results: Results[];
}
