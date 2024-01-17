import { FirebaseRepository } from '../../admin-core/repository';
import { Program } from './program';

class ProgramRepository extends FirebaseRepository<Program> {
  constructor() {
    super('programs');
  }
}

export const programRepository = new ProgramRepository();
