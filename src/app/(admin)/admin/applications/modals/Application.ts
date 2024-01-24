import { Resource } from '@/app/(admin)/admin-core/repository/repository';
import { Results } from './Results';
import { Timestamp } from 'firebase/firestore';

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

export interface UserDetails {
  nationalId: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
}

export interface Application extends Resource {
  status: Status;
  userDetails?: UserDetails | null;
  documents: UploadDocument[];
  results: Results[];
  certificate: {
    id: string;
    name: string;
  } | null;
  firstChoice: ProgramChoice | null;
  secondChoice: ProgramChoice | null;
  dateSubmitted: Timestamp | null;
}
