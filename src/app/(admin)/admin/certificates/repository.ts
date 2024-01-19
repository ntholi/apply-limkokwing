import { FirebaseRepository } from '../../admin-core/repository';
import { Certificate, GradingScheme } from './Certificate';

class CertificateRepository extends FirebaseRepository<Certificate> {
  constructor() {
    super('certificates');
  }

  async addCourse(certificateId: string, courseName: string) {
    const certificate = await this.get(certificateId);
    if (certificate) {
      const courses = certificate.courses;
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

  async addGradingScheme(certificateId: string, gradingScheme: GradingScheme) {
    const certificate = await this.get(certificateId);
    if (certificate) {
      const gradingSchemes: GradingScheme[] = certificate.gradingSchemes || [];
      if (gradingSchemes.some((it) => it.grade === gradingScheme.grade)) {
        return;
      }
      gradingSchemes.push(gradingScheme);
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
}

export const certificateRepository = new CertificateRepository();
