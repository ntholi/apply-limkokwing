import { NavLink, NavLinkProps, Skeleton, Stack } from '@mantine/core';
import Link from 'next/link';
import React, { useContext } from 'react';
import { UrlObject } from 'url';
import { Resource } from './repository/repository';
import { FirestoreDataContext } from './RepositoryDataProvider';
import { useQueryState } from 'nuqs';
import { useSearchParams } from 'next/navigation';

type Props<T extends Resource> = {
  navLinkProps: (
    item: T,
    index: number
  ) => NavLinkProps & { href?: string | UrlObject };
};
export default function Navbar<T extends Resource>(props: Props<T>) {
  const { navLinkProps } = props;
  const searchParams = useSearchParams();
  const { data, loading } = useContext(FirestoreDataContext);
  const [id] = useQueryState('id');

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        data.map((item, index) => (
          <NavLink
            key={index}
            component={Link}
            active={id === item.id}
            href={`?id=${item.id}&${searchParams.toString()}`}
            {...navLinkProps(item, index)}
          />
        ))
      )}
    </>
  );
}

function Loader() {
  return (
    <Stack p='sm'>
      {[...Array(7)].map((_, i) => (
        <Skeleton key={i} h={41} />
      ))}
    </Stack>
  );
}
