import { Resource } from '../../admin-core/repository/repository';

export interface Category extends Resource {
  name: string;
  description: string;
  image: string | null;
}
