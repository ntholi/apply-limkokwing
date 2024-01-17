import { FirebaseRepository } from '../../admin-core/repository';
import { ResourceCreate } from '../../admin-core/repository/repository';
import { Faculty } from './faculty';

class FacultyRepository extends FirebaseRepository<Faculty> {
  constructor() {
    super('faculties');
  }

  async create(faculty: ResourceCreate<Faculty>): Promise<Faculty> {
    faculty.name = faculty.name.trim().toLowerCase();
    return await super.create(faculty);
  }

  async update(id: string, faculty: Faculty): Promise<Faculty> {
    faculty.name = faculty.name.trim().toLowerCase();
    return await super.update(id, faculty);
  }
}

export const facultyRepository = new FacultyRepository();
