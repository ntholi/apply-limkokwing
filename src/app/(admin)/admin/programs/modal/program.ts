import { Resource } from '../../../admin-core/repository/repository';
import { GradingScheme } from '../../certificates/Certificate';
import { Faculty } from './faculty';

export interface Prerequisite extends Resource {
  certificateId: string;
  courseName: string;
  minGrade: GradingScheme;
}

export interface Program extends Resource {
  level: string;
  name: string;
  requiredCredits: number;
  faculty: Faculty['code'];
  prerequisites: Prerequisite[];
}
