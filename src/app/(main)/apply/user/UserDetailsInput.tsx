import { Application } from '@/app/(admin)/admin/applications/modals/Application';
import { applicationsRepository } from '@/app/(admin)/admin/applications/repository';
import { Card, CardBody, Input } from '@nextui-org/react';
import { User } from 'firebase/auth';
import React, { useEffect } from 'react';
import useLocation from './useLocation';
import CountryInput from './CountryInput';

type Props = {
  application: Application;
  user: User;
};

export default function UserDetailsInput({ user, application }: Props) {
  const location = useLocation();
  const [nationalId, setNationalId] = React.useState<string>('');
  const [firstName, setFirstName] = React.useState<string>('');
  const [lastName, setLastName] = React.useState<string>('');
  const [email, setEmail] = React.useState<string>('');
  const [phoneNumber, setPhoneNumber] = React.useState<string>('');
  const [country, setCountry] = React.useState<string>('');
  const [city, setCity] = React.useState<string>('');

  useEffect(() => {
    console.log('userDetails', application.userDetails);
    console.log('location', location);
    const { userDetails } = application;
    const [firstName, lastName] = extractName(user);
    setNationalId(userDetails?.nationalId || '');
    setFirstName(userDetails?.firstName || firstName);
    setLastName(userDetails?.lastName || lastName);
    setEmail(userDetails?.email || user.email || '');
    setPhoneNumber(userDetails?.phoneNumber || user.phoneNumber || '');
    setCountry(userDetails?.country || location?.address?.country || '');
    setCity(userDetails?.city || location?.address?.city || '');
  }, [user, application, location]);

  useEffect(() => {
    if (nationalId.length < 5) return;
    if (firstName.length < 2) return;
    if (lastName.length < 2) return;

    applicationsRepository.updateUserDetails(application.id, {
      nationalId,
      firstName,
      lastName,
      email,
      phoneNumber,
      city,
      country,
    });
  }, [
    nationalId,
    firstName,
    lastName,
    email,
    phoneNumber,
    city,
    country,
    application.id,
  ]);

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
          <div className='grid gap-3 sm:grid-cols-2'>
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
          </div>
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

          <div className='grid gap-3 sm:grid-cols-2'>
            <Input
              type='text'
              variant='bordered'
              label='City/District'
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <CountryInput
              // variant='bordered'
              // label='Country'
              value={country}
              onChange={(value) => setCountry(value)}
            />
          </div>
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
