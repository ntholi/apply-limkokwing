import { doc, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore';
import { FirebaseRepository } from '../../admin-core';
import { Application } from './modals/Application';
import { Results } from './modals/Results';
import { db } from '@/lib/config/firebase';

class ApplicationsRepository extends FirebaseRepository<Application> {
  constructor() {
    super(`applications`);
  }

  listenOrCreate(userId: string, callback: (application: Application) => void) {
    const docRef = doc(db, this.collectionName, userId);
    const unsubscribe = onSnapshot(docRef, (docSnap) => {
      if (docSnap.exists()) {
        callback({ id: docSnap.id, ...docSnap.data() } as Application);
      } else {
        this.createForUser(userId);
      }
    });
    return unsubscribe;
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
    const newResults = list.filter((item) => item.course !== results.course);
    newResults.push(results);
    if (application) {
      await this.update(userId, {
        ...application,
        results: newResults,
      });
    }
  }

  async removeResult(userId: string, results: Results) {
    const application = await this.get(userId);
    if (!application) {
      await this.createForUser(userId);
    }
    const list = application?.results || [];
    if (application) {
      await this.update(userId, {
        ...application,
        results: list.filter((item) => item.course !== results.course),
      });
    }
  }
}

export const applicationsRepository = new ApplicationsRepository();
