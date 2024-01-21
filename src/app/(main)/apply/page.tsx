import React from 'react';
import Container from '../core/Container';
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardHeader,
} from '@nextui-org/react';
import Stepper from '../components/Stepper';
import InputSymbols from './InputSymbols';

export default function StartPage() {
  return (
    <Container>
      <h1 className='text-2xl'>Application</h1>
      <Stepper className='my-10' />
      <div className='mt-5 flex flex-col gap-5'>
        <Card>
          <CardBody className='items-center'>
            <InputSymbols />
          </CardBody>
        </Card>
        <nav className='flex justify-between'>
          <Button>Back</Button>
          <Button color='primary'>Next</Button>
        </nav>
      </div>
    </Container>
  );
}
