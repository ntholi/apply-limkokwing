import { FirebaseRepository } from '../../admin-core/repository';
import { Certificate, GradingScheme } from './Certificate';

class CertificateRepository extends FirebaseRepository<Certificate> {
  constructor() {
    super('certificates');
  }

  async addCourse(certificateId: string, courseName: string) {
    const certificate = await this.get(certificateId);
    if (certificate) {
      const courses = certificate.courses || [];
      if (!courses.includes(courseName)) {
        await this.update(certificateId, {
          ...certificate,
          courses: [...courses, courseName],
        });
      }
    }
  }

  async deleteCourse(certificateId: string, courseName: string) {
    const certificate = await this.get(certificateId);
    if (certificate) {
      const courses = certificate.courses.filter(
        (course) => course !== courseName
      );
      await this.update(certificateId, {
        ...certificate,
        courses,
      });
    }
  }

  async addGradingScheme(certificateId: string, grade: string) {
    const certificate = await this.get(certificateId);
    if (certificate) {
      const gradingSchemes: GradingScheme[] = certificate.gradingSchemes || [];
      if (gradingSchemes.some((it) => it.grade === grade)) {
        return;
      }
      gradingSchemes.push({
        grade,
        level: gradingSchemes.length + 1,
      });
      await this.update(certificateId, {
        ...certificate,
        gradingSchemes,
      });
    }
  }

  async deleteGradingScheme(
    certificateId: string,
    gradingScheme: GradingScheme
  ) {
    const certificate = await this.get(certificateId);
    if (certificate) {
      const gradingSchemes: GradingScheme[] = certificate.gradingSchemes || [];
      const newGradingSchemes = gradingSchemes.filter(
        (it) => it.grade !== gradingScheme.grade
      );
      await this.update(certificateId, {
        ...certificate,
        gradingSchemes: newGradingSchemes,
      });
    }
  }

  async updateGradingSchemeLevel(
    certificateId: string,
    gradingScheme: GradingScheme,
    level: number
  ) {
    const certificate = await this.get(certificateId);
    if (certificate) {
      const gradingSchemes: GradingScheme[] = certificate.gradingSchemes || [];
      const newGradingSchemes = gradingSchemes.map((it) => {
        if (it.grade === gradingScheme.grade) {
          return {
            ...it,
            level,
          };
        }
        return it;
      });
      await this.update(certificateId, {
        ...certificate,
        gradingSchemes: newGradingSchemes,
      });
    }
  }

  async reorderGradingSchemes(certificateId: string, from: number, to: number) {
    const certificate = await this.get(certificateId);
    if (certificate) {
      const gradingSchemes: GradingScheme[] = certificate.gradingSchemes || [];
      const fromLevel = gradingSchemes.find((it) => it.level === from)?.level;
      const toLevel = gradingSchemes.find((it) => it.level === to)?.level;
      if (!fromLevel || !toLevel) {
        return;
      }
      const newGradingSchemes = gradingSchemes.map((it) => {
        if (it.level === fromLevel) {
          return {
            ...it,
            level: toLevel,
          };
        }
        if (it.level === toLevel) {
          return {
            ...it,
            level: fromLevel,
          };
        }
        return it;
      });
      await this.update(certificateId, {
        ...certificate,
        gradingSchemes: newGradingSchemes,
      });
    }
  }
}

export const certificateRepository = new CertificateRepository();
