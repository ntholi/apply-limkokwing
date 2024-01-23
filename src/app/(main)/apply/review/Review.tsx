import React from 'react';
import { useApplication } from '../ApplicationProvider';
import ResultsTable from './ResultsTable';
import { Accordion, AccordionItem, Button, Link } from '@nextui-org/react';
import { IconCheck } from '@tabler/icons-react';
import ContentWrapper from '../../components/ContentWrapper';

export default function Review() {
  const application = useApplication();
  if (!application) return null;

  return (
    <ContentWrapper>
      <Accordion>
        <AccordionItem key='1' title='Qualifications'>
          <h2 className='p-1 font-semibold'>
            {application?.certificate?.name}
          </h2>
          <ResultsTable application={application} />
        </AccordionItem>
        <AccordionItem key='2' title='Courses'>
          x
        </AccordionItem>
        <AccordionItem key='3' title='Documents'>
          <ul className='flex flex-col gap-2'>
            {application.documents.map((doc) => (
              <li key={doc.name} className='flex gap-3 items-center'>
                <Button
                  isIconOnly
                  size='sm'
                  radius='full'
                  color='success'
                  variant='bordered'
                  className='border-1'
                >
                  <IconCheck size={'1rem'} />
                </Button>
                <Link
                  href={doc.url}
                  showAnchorIcon
                  target='_blank'
                  color='foreground'
                >
                  {doc.name}
                </Link>
              </li>
            ))}
          </ul>
        </AccordionItem>
      </Accordion>
    </ContentWrapper>
  );
}
