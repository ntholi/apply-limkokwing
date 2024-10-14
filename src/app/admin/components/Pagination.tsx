'use client';

import React from 'react';
import { Box, Pagination as MantinePagination } from '@mantine/core';
import { useRouter, useSearchParams } from 'next/navigation';

type Props = {
  total: number;
  path: string;
};

export default function Pagination({ total, path }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = Number(searchParams.get('page'));

  const handleChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', page.toString());
    router.push(`${path}?${params.toString()}`);
  };

  return (
    <Box p={'sm'}>
      <MantinePagination
        size={'xs'}
        total={total}
        value={page ?? 1}
        onChange={handleChange}
      />
    </Box>
  );
}
