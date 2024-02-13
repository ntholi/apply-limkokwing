import {
  Application,
  UserDetails,
} from '@/app/(admin)/admin/applications/modals/Application';
import { applicationsRepository } from '@/app/(admin)/admin/applications/repository';
import { Card, CardBody, Input } from '@nextui-org/react';
import { User } from 'firebase/auth';
import React, { useImperativeHandle } from 'react';
import useLocation from './useLocation';
import { useForm } from 'react-hook-form';
import CountryInput from './CountryInput';

type Props = {
  application: Application;
  user: User;
};

export type UserDetailsHandle = {
  onSubmit: () => boolean;
};

const UserDetailsInput = React.forwardRef<UserDetailsHandle, Props>(
  (props, ref) => {
    const { application } = props;
    const location = useLocation();
    const {
      register,
      handleSubmit,
      getValues,
      setValue,
      formState: { errors, isValid },
    } = useForm<UserDetails>();

    useImperativeHandle(ref, () => ({
      onSubmit() {
        handleSubmit(async (data) => {
          await applicationsRepository.updateUserDetails(application.id, data);
        })();
        return isValid;
      },
    }));

    return (
      <div>
        <Card className='w-full md:w-[40vw]'>
          <CardBody className='flex flex-col gap-3 bg-black/90'>
            <Input
              type='text'
              variant='bordered'
              label='Id/Passport'
              {...register('nationalId', {
                required: {
                  message: 'Required',
                  value: true,
                },
                minLength: {
                  message: 'Min length 6',
                  value: 6,
                },
              })}
              errorMessage={errors.nationalId?.message}
            />
            <div className='grid gap-3 sm:grid-cols-2'>
              <Input
                type='text'
                variant='bordered'
                label='First Name'
                {...register('firstName', {
                  required: {
                    value: true,
                    message: 'Required',
                  },
                })}
                errorMessage={errors.firstName?.message}
              />
              <Input
                type='text'
                variant='bordered'
                label='Last Name'
                {...register('lastName', {
                  required: {
                    value: true,
                    message: 'Required',
                  },
                })}
                errorMessage={errors.lastName?.message}
              />
            </div>
            <Input
              type='email'
              variant='bordered'
              label='Email'
              {...register('email')}
            />

            <Input
              type='tel'
              variant='bordered'
              label='Phone Number'
              {...register('phoneNumber')}
            />

            <div className='grid gap-3 sm:grid-cols-2'>
              <Input
                type='text'
                variant='bordered'
                label='City/District'
                {...register('city')}
              />
              <CountryInput
                variant='bordered'
                value={getValues('country')}
                onChange={(value) => setValue('country', value)}
              />
            </div>
          </CardBody>
        </Card>
      </div>
    );
  }
);
UserDetailsInput.displayName = 'UserDetailsInput';

// returns firstName and lastName of user '' if not found in an array
function extractName(user: User | null) {
  if (!user) return ['', ''];
  const name = user.displayName?.split(' ');
  if (!name) return ['', ''];
  const firstName = name[0];
  const lastName = name[1];
  return [firstName, lastName];
}

export default UserDetailsInput;
