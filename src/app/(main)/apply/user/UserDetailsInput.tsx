import { Application } from '@/app/(admin)/admin/applications/modals/Application';
import { applicationsRepository } from '@/app/(admin)/admin/applications/repository';
import { Card, CardBody, Input } from '@nextui-org/react';
import { User } from 'firebase/auth';
import React, { useEffect } from 'react';
import LocationChooser from './LocationChooser';
import { MapLocation } from './MapLocation';

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
  const [location, setLocation] = React.useState<MapLocation | null>(null);

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
      <Card className='w-full md:w-[40vw]'>
        <CardBody className='flex flex-col gap-3 bg-black/90'>
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
          <LocationChooser location={location} setLocation={setLocation} />
        </CardBody>
      </Card>
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
