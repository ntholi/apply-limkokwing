'use client';
import { Box, BoxProps, CloseButton, TextInput } from '@mantine/core';
import { Search } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';

type Props = BoxProps & { path: string };
export default function SearchField({ path, ...props }: Props) {
  const [value, setValue] = React.useState('');

  const router = useRouter();

  function handleSearch(value: string) {
    setValue(value);
    router.push(`${path}?search=${value}`);
  }

  const leftSection = value ? (
    <CloseButton
      onClick={() => {
        setValue('');
        router.push(path);
      }}
    />
  ) : (
    <Search size={20} />
  );

  return (
    <Box pt={0} {...props}>
      <TextInput
        placeholder='Search'
        value={value}
        onChange={(event) => {
          handleSearch(event.target.value);
        }}
        rightSection={leftSection}
      />
    </Box>
  );
}
