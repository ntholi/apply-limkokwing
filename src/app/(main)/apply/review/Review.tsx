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

const items = [
  {
    name: 'Personal Details',
    href: '/apply?step=1',
    component: PersonalDetails,
  },
  {
    name: 'Qualifications',
    href: '/apply?step=2',
    component: ResultsTable,
  },
  {
    name: 'Courses',
    href: '/apply?step=3',
    component: Courses,
  },
  {
    name: 'Documents',
    href: '/apply?step=4',
    component: Documents,
  },
];

export default function Review() {
  const application = useApplication();
  if (!application) return null;

  return (
    <ContentWrapper>
      <Accordion>
        {items.map((item) => (
          <AccordionItem key={item.name} title={item.name} className='relative'>
            <EditButton href={item.href} />
            <item.component application={application} />
          </AccordionItem>
        ))}
      </Accordion>
    </ContentWrapper>
  );
}

type EditButtonProps = {
  href: string;
};

function EditButton({ href }: EditButtonProps) {
  return (
    <Button
      size='sm'
      variant='light'
      as={Link}
      href={href}
      startContent={<Edit size={13} />}
      className='absolute right-1 top-[60px]'
    >
      Edit
    </Button>
  );
}
