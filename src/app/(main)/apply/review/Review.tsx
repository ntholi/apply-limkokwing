import React from 'react';
import { useApplication } from '../ApplicationProvider';
import ResultsTable from './ResultsTable';
import {
  Accordion,
  AccordionItem,
  Button,
  Divider,
  Link,
} from '@nextui-org/react';
import { IconCheck } from '@tabler/icons-react';
import ContentWrapper from '../../components/ContentWrapper';
import PersonalDetails from './PersonalDetails';
import { Edit } from 'lucide-react';
import Courses from './Courses';
import Documents from './Documents';

export default function Review() {
  const application = useApplication();
  if (!application) return null;

  return (
    <ContentWrapper>
      <Accordion>
        <AccordionItem key='1' title='Personal Details'>
          <PersonalDetails application={application} />
        </AccordionItem>
        <AccordionItem key='2' title='Qualifications'>
          <ResultsTable application={application} />
        </AccordionItem>
        <AccordionItem key='3' title='Courses' className='relative'>
          <Courses application={application} />
        </AccordionItem>
        <AccordionItem key='4' title='Documents'>
          <Documents application={application} />
        </AccordionItem>
      </Accordion>
    </ContentWrapper>
  );
}

type EditButtonProps = {
  children: React.ReactNode;
};
function EditButton({ children }: EditButtonProps) {
  return (
    <Button
      size='sm'
      variant='light'
      startContent={<Edit size={13} />}
      className='absolute right-10 top-4'
      radius='full'
    >
      {children}
    </Button>
  );
}
