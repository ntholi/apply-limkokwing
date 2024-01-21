import { FirebaseRepository } from '../../admin-core';
import { Application } from './modals/Application';
import { Results } from './modals/Results';

class ApplicationsRepository extends FirebaseRepository<Application> {
  constructor() {
    super(`applications`);
  }

  async addResults(userId: string, results: Results) {
    const application = await this.get(userId);
    if (application) {
      await this.update(userId, {
        ...application,
        results: [...application.results, results],
      });
    }
  }
}

export const applicationsRepository = new ApplicationsRepository();
