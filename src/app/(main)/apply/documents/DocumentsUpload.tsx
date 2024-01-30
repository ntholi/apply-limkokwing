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
    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
      <FileUploader
        label={'ID/Birth Certificate'}
        filePath={`${application.id}/id`}
        value={application?.documents.findLast((d) => d.name === 'ID')?.url}
        onCompleted={(url) => {
          applicationsRepository.updateDocuments(application.id, {
            name: 'ID',
            url,
          });
        }}
      />
      <FileUploader
        label={`${application?.certificate?.name} Certificate`}
        filePath={`${application.id}/certificate`}
        value={
          application?.documents.findLast(
            (d) => d.name === application?.certificate?.name
          )?.url
        }
        onCompleted={(url) => {
          applicationsRepository.updateDocuments(application.id, {
            name: application?.certificate?.name || 'Certificate',
            url,
          });
        }}
      />
    </div>
  );
}
