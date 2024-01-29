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
          <h2 className='p-1 font-semibold'>
            {application?.certificate?.name}
          </h2>
          <ResultsTable application={application} />
        </AccordionItem>
        <AccordionItem key='3' title='Courses'>
          <div className='border rounded-lg p-4 border-default w-full sm:w-96 mb-3'>
            <div className='flex items-center gap-4'>
              <span>1</span>
              <div>
                <h3 className=''>{application.firstChoice?.programName}</h3>
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
        </AccordionItem>
        <AccordionItem key='4' title='Documents'>
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
