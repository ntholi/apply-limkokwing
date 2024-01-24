import {
  FieldValue,
  Timestamp,
  collection,
  doc,
  onSnapshot,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore';
import { FirebaseRepository } from '../../admin-core';
import {
  Application,
  ProgramChoice,
  UploadDocument,
} from './modals/Application';
import { Results } from './modals/Results';
import { db } from '@/lib/config/firebase';
import { Certificate } from '../certificates/Certificate';
import { ResourceCreate } from '../../admin-core/repository/repository';

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
    const data: ResourceCreate<Application> = {
      status: 'incomplete',
      results: [] as Results[],
      certificate: null,
      firstChoice: null,
      secondChoice: null,
      dateSubmitted: null,
      faculty: null,
      documents: [] as UploadDocument[],
    };
    await setDoc(doc(db, 'applications', userId), data);
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

  async updateCertificate(userId: string, certificate: Certificate) {
    const application = await this.get(userId);
    if (!application) {
      await this.createForUser(userId);
    }
    if (application) {
      await this.update(userId, {
        ...application,
        certificate: {
          id: certificate.id,
          name: certificate.name,
        },
      });
    }
  }

  async setFirstChoice(id: string, program: ProgramChoice) {
    const application = await this.get(id);
    if (application) {
      await this.update(id, {
        ...application,
        faculty: program.faculty,
        firstChoice: program,
      });
    }
  }

  async setSecondChoice(id: string, program: ProgramChoice) {
    const application = await this.get(id);
    if (application) {
      await this.update(id, {
        ...application,
        secondChoice: program,
      });
    }
  }

  async removeFirstChoice(id: string) {
    const application = await this.get(id);
    if (application) {
      await this.update(id, {
        ...application,
        firstChoice: null,
      });
    }
  }

  async removeSecondChoice(id: string) {
    const application = await this.get(id);
    if (application) {
      await this.update(id, {
        ...application,
        secondChoice: null,
      });
    }
  }

  async updateDocuments(id: string, document: UploadDocument) {
    const application = await this.get(id);
    if (!application) {
      await this.createForUser(id);
    }
    const list = application?.documents || [];
    const newDocuments = list.filter((item) => item.name !== document.name);
    newDocuments.push(document);
    if (application) {
      await this.update(id, {
        ...application,
        documents: newDocuments,
      });
    }
  }

  async updateStatus(id: string, status: Application['status']) {
    const application = await this.get(id);
    if (application) {
      let dateSubmitted: FieldValue | null = application.dateSubmitted || null;
      if (status === 'submitted' && !dateSubmitted) {
        dateSubmitted = serverTimestamp();
      }
      await this.update(id, {
        ...application,
        dateSubmitted: dateSubmitted as Timestamp,
        status,
      });
    }
  }

  async updateUserDetails(id: string, userDetails: Application['userDetails']) {
    const application = await this.get(id);
    if (application) {
      await this.update(id, {
        ...application,
        userDetails,
      });
    }
  }
}

export const applicationsRepository = new ApplicationsRepository();
