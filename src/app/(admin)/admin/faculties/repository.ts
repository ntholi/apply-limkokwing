import { FirebaseRepository } from '../../admin-core/repository';
import { Faculty } from './faculty';

class FacultyRepository extends FirebaseRepository<Faculty> {
  constructor() {
    super('faculties');
  }
}

export const facultyRepository = new FacultyRepository();
