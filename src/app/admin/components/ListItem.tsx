'use client';

import { NavLink, NavLinkProps } from '@mantine/core';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import React from 'react';

type Props = {
  path: string;
  id: string | number;
} & NavLinkProps;

export default function ListItem({ path, id, ...props }: Props) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <NavLink
      href={`${path}/${id}?${searchParams.toString()}`}
      component={Link}
      {...props}
      active={pathname === `${path}/${id}`}
    />
  );
}
