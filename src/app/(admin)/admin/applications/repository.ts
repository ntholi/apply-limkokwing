import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { FirebaseRepository } from '../../admin-core';
import { Application } from './modals/Application';
import { Results } from './modals/Results';
import { db } from '@/lib/config/firebase';

class ApplicationsRepository extends FirebaseRepository<Application> {
  constructor() {
    super(`applications`);
  }

  async createForUser(userId: string) {
    await setDoc(doc(db, 'applications', userId), {
      status: 'incomplete',
      results: [] as Results[],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
  }

  async addResults(userId: string, results: Results) {
    const application = await this.get(userId);
    if (!application) {
      await this.createForUser(userId);
    }
    const list = application?.results || [];
    if (application) {
      await this.update(userId, {
        ...application,
        results: [...list, results],
      });
    }
  }
}

export const applicationsRepository = new ApplicationsRepository();
