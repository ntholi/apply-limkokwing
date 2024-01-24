import {
  Application,
  UserDetails,
} from '@/app/(admin)/admin/applications/modals/Application';
import { applicationsRepository } from '@/app/(admin)/admin/applications/repository';
import { Input } from '@nextui-org/react';
import { User } from 'firebase/auth';
import React, { useEffect } from 'react';

type Props = {
  application: Application;
  user: User;
};

export default function UserDetailsInput({ user, application }: Props) {
  const [nationalId, setNationalId] = React.useState<string>('');
  const [firstName, setFirstName] = React.useState<string>('');
  const [lastName, setLastName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [phoneNumber, setPhoneNumber] = React.useState<string>('');

  useEffect(() => {
    const { userDetails } = application;
    const [firstName, lastName] = extractName(user);
    setFirstName(userDetails?.firstName || firstName);
    setLastName(userDetails?.lastName || lastName);
    setEmail(userDetails?.email || user.email || '');
    setPhoneNumber(userDetails?.phoneNumber || user.phoneNumber || '');
  }, [user, application]);

  useEffect(() => {
    applicationsRepository.updateUserDetails(application.id, {
      nationalId,
      firstName,
      lastName,
      email,
      phoneNumber,
    });
  }, [nationalId, firstName, lastName, email, phoneNumber, application.id]);

  return (
    <>
      <h1 className='text-lg'>Personal Details</h1>
      <div className='flex flex-col gap-3 w-full mt-5'>
        <Input
          type='text'
          variant='bordered'
          label='Id/Passport'
          value={nationalId}
          onChange={(e) => setNationalId(e.target.value)}
        />
        <Input
          type='text'
          variant='bordered'
          label='First Name'
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Input
          type='text'
          variant='bordered'
          label='Last Name'
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />

        <Input
          type='email'
          variant='bordered'
          label='Email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type='tel'
          variant='bordered'
          label='Phone Number'
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </div>
    </>
  );
}

// returns firstName and lastName of user '' if not found in an array
function extractName(user: User | null) {
  if (!user) return ['', ''];
  const name = user.displayName?.split(' ');
  if (!name) return ['', ''];
  const firstName = name[0];
  const lastName = name[1];
  return [firstName, lastName];
}
