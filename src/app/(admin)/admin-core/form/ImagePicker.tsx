'use client';
import { storage } from '@/lib/config/firebase';
import {
  ActionIcon,
  Box,
  Flex,
  Image,
  Loader,
  Paper,
  Text,
  useMantineColorScheme,
} from '@mantine/core';
import { IconPhoto, IconTrashFilled } from '@tabler/icons-react';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytes,
} from 'firebase/storage';
import React, { useEffect, useRef, useState } from 'react';
import { ImagePickerProps } from '../types';
import { variableToLabel } from '../utils/utils';

export default function ImagePicker(props: ImagePickerProps) {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [image, setImage] = useState<string | null | undefined>();
  const { colorScheme } = useMantineColorScheme();

  useEffect(() => {
    setImage(props.value ? props.value : null);
  }, [props.value]);

  async function handleDelete() {
    console.log();
    if (!props.value) return;
    setImage(null);
    props.onChange(null);
    const fileRef = ref(storage, props.value);
    await deleteObject(fileRef);
  }

  async function handleUpload() {
    setUploading(true);
    try {
      if (inputRef.current?.files?.length) {
        const file = inputRef.current.files[0];
        const path = await generateFilePath(props.folder, file);
        const fileRef = ref(storage, path);
        await uploadBytes(fileRef, file);
        const url = await getDownloadURL(fileRef);
        setImage(url);
        props.onChange(url);
      }
    } finally {
      setUploading(false);
    }
  }

  return (
    <>
      <input
        type='file'
        ref={inputRef}
        accept='image/*'
        onChange={handleUpload}
        hidden
      />
      <Text size='sm' fw={'bold'} mb={5}>
        {props.label || variableToLabel(props.name)}
      </Text>
      <Paper
        withBorder
        p='sm'
        h={props.height || 300}
        w='100%'
        bg={colorScheme == 'dark' ? 'dark.7' : 'gray.1'}
      >
        {image ? (
          <ImageDisplay
            disabled={props.disabled}
            image={image}
            handleDelete={handleDelete}
          />
        ) : (
          <UploadButton
            uploading={uploading}
            inputRef={inputRef}
            disabled={props.disabled}
          />
        )}
      </Paper>
    </>
  );
}

function ImageDisplay({
  disabled,
  image,
  handleDelete,
}: {
  disabled?: boolean;
  image: string;
  handleDelete: () => void;
}) {
  return (
    <Box w='100%' h='100%' pos='relative'>
      <Image src={image} alt='' width='100%' height='100%' fit='contain' />
      <Flex
        pos='absolute'
        top='0'
        bottom='0'
        left='0'
        right='0'
        justify='center'
        align='center'
      >
        <ActionIcon disabled={disabled} color='red' onClick={handleDelete}>
          <IconTrashFilled size='1rem' />
        </ActionIcon>
      </Flex>
    </Box>
  );
}

function UploadButton({
  uploading,
  inputRef,
  disabled,
}: {
  uploading: boolean;
  disabled?: boolean;
  inputRef: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <Flex justify='center' align='center' h={'100%'} w={'100%'}>
      {uploading ? (
        <Loader />
      ) : (
        <ActionIcon
          variant='default'
          size='xl'
          disabled={disabled}
          onClick={() => inputRef?.current?.click()}
        >
          <IconPhoto />
        </ActionIcon>
      )}
    </Flex>
  );
}

// generate a unique file name based on file properties
async function generateFilePath(folder: string | undefined, file: File) {
  const message = file.name + file.size + file.lastModified;
  const encoder = new TextEncoder();
  const data = encoder.encode(message);
  const digest = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(digest));
  const hash = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  const fileName = `${hash}.${file.name.split('.').pop()}`;
  if (folder) {
    return `${folder}/${fileName}`;
  }
  return fileName;
}
