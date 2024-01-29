import { Application } from '@/app/(admin)/admin/applications/modals/Application';
import React from 'react';

type Props = {
  application: Application;
};

export default function PersonalDetails({ application }: Props) {
  const { userDetails } = application;
  return (
    <div className='flex flex-col gap-3'>
      <Details title='National ID' value={userDetails?.nationalId} />
      <Details
        title='Names'
        value={`${application.userDetails?.firstName} ${userDetails?.firstName}`}
      />
      <Details title='Email' value={userDetails?.email} />
      <Details title='Phone Number' value={userDetails?.phoneNumber} />
    </div>
  );
}

function Details({ title, value }: { title: string; value?: string }) {
  return (
    <div className='flex flex-col'>
      <p className=''>{value || '(Empty)'}</p>
      <label className='text-xs mt-0 text-default-500'>{title}</label>
    </div>
  );
}
