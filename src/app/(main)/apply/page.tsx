import React from 'react';
import Container from '../core/Container';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';
import Stepper from '../components/Stepper';
import InputSymbols from './InputSymbols';

export default function StartPage() {
  const qualifications = [
    { label: 'LGCSE', value: 'LGCSE' },
    { label: 'IGCSE', value: 'IGCSE' },
    { label: 'COSC', value: 'COSC' },
  ];
  return (
    <Container>
      <h1 className='text-2xl'>Application</h1>
      <Stepper className='my-10' />
      <div className='mt-5 flex flex-col gap-5 items-center'>
        <InputSymbols />
      </div>
    </Container>
  );
}
