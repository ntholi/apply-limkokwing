import { Resource } from '../../../admin-core/repository/repository';
import { Faculty } from './faculty';

export interface Program extends Resource {
  name: string;
  faculty: Faculty;
}
