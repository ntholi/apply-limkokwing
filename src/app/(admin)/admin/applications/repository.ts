import { FirebaseRepository } from '../../admin-core';
import { Application } from './modals/Application';

class ApplicationsRepository extends FirebaseRepository<Application> {
  constructor() {
    super(`applications`);
  }
}

export const applicationsRepository = new ApplicationsRepository();
