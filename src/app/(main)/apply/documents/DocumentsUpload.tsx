import React from 'react';
import FileUploader from './FileUploader';
import { useApplication } from '../ApplicationProvider';
import { applicationsRepository } from '@/app/(admin)/admin/applications/repository';

export default function DocumentsUpload() {
  const application = useApplication();

  if (!application) {
    return null;
  }
  return (
    <>
      <div className='flex gap-5 justify-center'>
        <FileUploader
          label={'ID/Birth Certificate/Passport'}
          filePath={`${application.id}/id`}
          onCompleted={(url) => {
            applicationsRepository.updateDocuments(application.id, {
              name: 'ID',
              url,
            });
          }}
        />
        <FileUploader
          label={`${application.certificate.name} Certificate`}
          filePath={`${application.id}/id`}
          onCompleted={(url) => {
            applicationsRepository.updateDocuments(application.id, {
              name: application.certificate.name,
              url,
            });
          }}
        />
      </div>
    </>
  );
}
