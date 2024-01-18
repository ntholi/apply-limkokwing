import { FirebaseRepository } from '../../admin-core/repository';
import { Certificate } from './Certificate';

class CertificateRepository extends FirebaseRepository<Certificate> {
  constructor() {
    super('certificates');
  }
}

export const certificateRepository = new CertificateRepository();
