import { Application } from '@/app/(admin)/admin/applications/modals/Application';
import { Button, Link } from '@nextui-org/react';
import { IconCheck } from '@tabler/icons-react';
import React from 'react';

type Props = {
  application: Application;
};

export default function Documents({ application }: Props) {
  return (
    <ul className='flex flex-col gap-2'>
      {application.documents.map((doc) => (
        <li key={doc.name} className='flex gap-3 items-center'>
          <Button
            isIconOnly
            size='sm'
            radius='full'
            color='success'
            variant='bordered'
            className='border-1'
          >
            <IconCheck size={'1rem'} />
          </Button>
          <Link
            href={doc.url}
            showAnchorIcon
            target='_blank'
            color='foreground'
          >
            {doc.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}
