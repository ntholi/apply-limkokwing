import { Resource } from '../../../admin-core/repository/repository';
import { GradingScheme } from '../../certificates/Certificate';
import { Faculty } from './faculty';

export interface Prerequisite extends Resource {
  certificateId: string;
  courseName: string;
  minGrade: GradingScheme;
  mandatory: boolean;
}

export interface Program extends Resource {
  level: string;
  name: string;
  requirements: {
    credits: number;
    passes: number;
  };
  faculty: Faculty['code'];
  prerequisites: Prerequisite[];
}
