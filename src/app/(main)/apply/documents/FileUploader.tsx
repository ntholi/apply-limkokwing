import React, { useEffect } from 'react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { storage } from '@/lib/config/firebase';
import { Input, Progress } from '@nextui-org/react';
import { MdUpload } from 'react-icons/md';

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
          })
          .catch(console.error);
      }
    );
  };

  return (
    <div
      className='flex flex-col gap-1'
      onClick={() => {
        if (inputRef.current) inputRef.current.click();
      }}
    >
      <label className='ps-2 text-sm text-center'>{label}</label>
      <div className='flex cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-gray-700 h-48 w-56 p-2'>
        <MdUpload className='text-4xl text-gray-600' />
        <p className='rounded-full bg-gray-600 px-5 py-2 text-xs'>Upload</p>
        {inputRef.current?.files && inputRef.current?.files.length > 0 && (
          <p className='mt-2 text-center text-xs text-gray-400'>
            {inputRef.current?.files[0].name}
          </p>
        )}
      </div>
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
