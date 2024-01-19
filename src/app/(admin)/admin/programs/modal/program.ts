import { Resource } from '../../../admin-core/repository/repository';
import { Faculty } from './faculty';

export interface Prerequisite extends Resource {
  certificateId: string;
  courseName: string;
  minGrade: number;
}

export interface Program extends Resource {
  name: string;
  faculty: Faculty['code'];
  prerequisites: Prerequisite[];
}
