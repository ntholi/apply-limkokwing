import { storage } from '@/lib/config/firebase';
import { Card, CardBody, Input, Progress } from '@nextui-org/react';
import { IconCloudUpload } from '@tabler/icons-react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useEffect } from 'react';
import { MdCheckCircle } from 'react-icons/md';

type Props = {
  onCompleted: (url: string) => void;
  onUploadStart?: () => void;
  injectFileExtension?: boolean;
  filePath: string;
  label?: string;
} & React.ComponentProps<typeof Input>;

export default function FileUploader(props: Props) {
  const {
    onCompleted,
    filePath: _filePath,
    onUploadStart,
    injectFileExtension = true,
    label = 'Upload File',
  } = props;
  const [file, setFile] = React.useState<File | null>(null);
  const [progress, setProgress] = React.useState(0);
  const [showProgress, setShowProgress] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (file) {
      setShowProgress(true);
    } else {
      setShowProgress(false);
    }
  }, [file]);

  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log('file', event.target.files);
    if (!file) return;
    setFile(file);

    if (onUploadStart) onUploadStart();

    let filePath = _filePath;
    if (injectFileExtension) {
      const fileExtension = file.name.split('.').pop();
      filePath = `${filePath}.${fileExtension}`;
    }
    const storageRef = ref(storage, filePath);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        console.error(error);
      },
      async () => {
        getDownloadURL(uploadTask.snapshot.ref)
          .then(onCompleted)
          .finally(() => {
            setProgress(0);
            setShowProgress(false);
            setFile(null);
          })
          .catch(console.error);
      }
    );
  };

  return (
    <div className='flex flex-col gap-1'>
      <label className='ps-2 text-sm text-center mb-1 text-default-500'>
        {label}
      </label>
      <Card
        className='h-48 w-56 p-2'
        isPressable
        onPress={() => {
          if (inputRef.current) inputRef.current.click();
        }}
      >
        <CardBody className='justify-center items-center gap-3'>
          <IconCloudUpload size={'2rem'} />
          <p className='text-sm'>Click Upload</p>
          {file ? (
            <p className='mt-2 text-center text-xs text-gray-400'>
              {file.name}
            </p>
          ) : (
            props.value && (
              <>
                <div className='text-green-500 flex text-xs gap-1 items-center'>
                  <MdCheckCircle /> <p>Uploaded</p>
                </div>
              </>
            )
          )}
        </CardBody>
      </Card>
      <input
        hidden
        ref={inputRef}
        accept='image/*,.pdf'
        type='file'
        onChange={handleUpload}
        disabled={progress > 0}
      />
      {showProgress && <Progress value={progress} size='sm' />}
    </div>
  );
}
