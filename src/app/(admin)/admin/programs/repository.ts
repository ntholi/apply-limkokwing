import { doc, getDoc, setDoc } from 'firebase/firestore';
import { FirebaseRepository } from '../../admin-core/repository';
import { Prerequisite, Program } from './modal/program';
import { db } from '@/lib/config/firebase';
import { Results } from '../applications/modals/Results';

class ProgramRepository extends FirebaseRepository<Program> {
  constructor() {
    super('programs');
  }

  async addPrerequisite(programId: string, prerequisite: Prerequisite) {
    const docRef = doc(db, this.collectionName, programId);
    const program = (await getDoc(docRef)).data() as Program;
    const prerequisites = program.prerequisites || [];
    const exists = prerequisites.find(
      (it) =>
        it.courseName === prerequisite.courseName &&
        it.certificateId === prerequisite.certificateId
    );
    if (!exists) {
      prerequisites.push(prerequisite);
    }
    await setDoc(docRef, { ...program, prerequisites });
  }

  async removePrerequisite(programId: string, prerequisite: Prerequisite) {
    const docRef = doc(db, this.collectionName, programId);
    const program = (await getDoc(docRef)).data() as Program;
    const prerequisites = program.prerequisites || [];
    const exists = prerequisites.find(
      (it) =>
        it.courseName === prerequisite.courseName &&
        it.certificateId === prerequisite.certificateId
    );
    if (exists) {
      const index = prerequisites.indexOf(exists);
      prerequisites.splice(index, 1);
    }
    await setDoc(docRef, { ...program, prerequisites });
  }

  async updatePrerequisite(
    programId: string,
    oldPrerequisite: Prerequisite,
    newPrerequisite: Prerequisite
  ) {
    const docRef = doc(db, this.collectionName, programId);
    const program = (await getDoc(docRef)).data() as Program;
    const prerequisites = program.prerequisites || [];
    const exists = prerequisites.find(
      (it) =>
        it.courseName === oldPrerequisite.courseName &&
        it.certificateId === oldPrerequisite.certificateId
    );
    if (exists) {
      const index = prerequisites.indexOf(exists);
      prerequisites.splice(index, 1, newPrerequisite);
    }
    await setDoc(docRef, { ...program, prerequisites });
  }

  async getSuitablePrograms(results?: Results[]) {
    if (!results) {
      return [];
    }
    const programs = await this.getAll();
    const suitablePrograms = programs.filter((program) => {
      const credits = results.reduce((acc, result) => {
        if (result.grade.level <= program.requiredCredits) {
          acc += 1;
        }
        return acc;
      }, 0);
      console.log('credits', credits);
      console.log('program.requiredCredits', program.requiredCredits);
      if (credits < program.requiredCredits) {
        return false;
      }

      return true;
    });
    return suitablePrograms;
  }
}

export const programRepository = new ProgramRepository();
