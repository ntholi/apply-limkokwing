import { Application } from '@/app/(admin)/admin/applications/modals/Application';
import { Divider } from '@nextui-org/react';
import React from 'react';

type Props = {
  application: Application;
};

export default function Courses({ application }: Props) {
  return (
    <div className='border rounded-lg p-4 border-default w-full sm:w-96 mb-3'>
      <div className='flex items-center gap-4'>
        <span>1</span>
        <div>
          <h3 className=''>{application.firstChoice?.programName || 'None'}</h3>
          <p className='text-xs text-default-500'>First Choice</p>
        </div>
      </div>
      <Divider className='my-3' />
      <div className='flex items-center gap-4'>
        <span>2</span>
        <div>
          <h3 className=''>
            {application.secondChoice?.programName || 'None'}
          </h3>
          <p className='text-xs text-default-500'>Second Choice</p>
        </div>
      </div>
    </div>
  );
}
