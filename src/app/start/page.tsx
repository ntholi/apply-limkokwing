'use client';
import React from 'react';
import Container from '../core/Container';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';

export default function StartPage() {
  const qualifications = [
    { label: 'LGCSE', value: 'LGCSE' },
    { label: 'IGCSE', value: 'IGCSE' },
  ];
  return (
    <Container width='sm'>
      <h1 className='text-3xl'>Application</h1>
      <div className='mt-5 flex flex-col gap-5'>
        <Autocomplete
          label='Highest Qualification Obtained'
          className='w-full'
          defaultItems={qualifications}
        >
          {(item) => (
            <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
          )}
        </Autocomplete>
      </div>
    </Container>
  );
}
