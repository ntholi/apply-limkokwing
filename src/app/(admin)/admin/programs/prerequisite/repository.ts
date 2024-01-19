import { FirebaseRepository } from '@/app/(admin)/admin-core';
import { Prerequisite } from '../modal/program';

class PrerequisiteRepository extends FirebaseRepository<Prerequisite> {
  constructor() {
    super('prerequisites');
  }
}

export const prerequisiteRepository = new PrerequisiteRepository();
