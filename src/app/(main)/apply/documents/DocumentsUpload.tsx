import React from 'react';
import FileUploader from './FileUploader';
import { useApplication } from '../ApplicationProvider';
import { Divider } from '@nextui-org/react';

export default function DocumentsUpload() {
  const application = useApplication();
  const [idDocument, setIdDocument] = React.useState<string | null>(null);

  if (!application) {
    return null;
  }
  return (
    <>
      <div className='flex gap-5 justify-center'>
        <FileUploader
          label={'ID/Birth Certificate/Passport'}
          filePath={`${application.id}/id`}
          onCompleted={setIdDocument}
        />
        <FileUploader
          label={application.certificate.name}
          filePath={`${application.id}/id`}
          onCompleted={setIdDocument}
        />
      </div>
    </>
  );
}
