import { Resource } from '@/app/(admin)/admin-core/repository/repository';
import { Results } from './Results';

type Status =
  | 'incomplete'
  | 'submitted'
  | 'withdrawn'
  | 'accepted'
  | 'rejected'
  | 'waitlisted';

export interface UploadDocument {
  name: string;
  url: string;
}

export interface ProgramChoice {
  programId: string;
  programName: string;
}

export interface Application extends Resource {
  status: Status;
  documents: UploadDocument[];
  results: Results[];
  certificate?: {
    id: string;
    name: string;
  };
  firstChoice?: ProgramChoice;
  secondChoice?: ProgramChoice;
}
