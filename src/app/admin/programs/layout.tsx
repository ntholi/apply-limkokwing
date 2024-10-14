'use client';
import ListLayout from '@admin/components/ListLayout';
import { PropsWithChildren } from 'react';
import { getPrograms } from './actions';
import ListItem from '@admin/components/ListItem';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <ListLayout
      getItems={getPrograms}
      path='/admin/programs'
      renderItem={(item, path) => (
        <ListItem label={item.name} id={item.id} path={path} />
      )}
    >
      {children}
    </ListLayout>
  );
}
