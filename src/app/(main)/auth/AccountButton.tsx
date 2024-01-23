'use client';
import { Avatar } from '@nextui-org/avatar';
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  DropdownItem,
} from '@nextui-org/dropdown';
import { Skeleton } from '@nextui-org/skeleton';
import React from 'react';
import Link from 'next/link';
import { useSession } from './SessionProvider';
import { LogOut, UserRound } from 'lucide-react';
import { auth } from '@/lib/config/firebase';
import { signOut } from 'firebase/auth';

export default function AccountButton() {
  const { user, status } = useSession();
  if (status === 'loading')
    return <Skeleton className='flex size-10 rounded-full' />;
  return user ? (
    <Dropdown placement='bottom-end' size='sm'>
      <DropdownTrigger>
        <Avatar
          isBordered
          size='sm'
          as='button'
          className='transition-transform'
          src={user?.photoURL || undefined}
          name={nameToInitials(user?.displayName)}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label='Profile Actions' variant='flat'>
        <DropdownSection title={user?.displayName || ''}>
          <DropdownItem
            startContent={<LogOut />}
            onClick={() => signOut(auth)}
            key='signOut'
          >
            Sign Out
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  ) : (
    <Link href={'/auth/signin'}>Account</Link>
  );
}

function nameToInitials(name: string | null | undefined) {
  if (!name) return;
  if (name.split(' ').length === 1) return name[0];
  return name
    .split(' ')
    .map((word) => word[0])
    .join('');
}
