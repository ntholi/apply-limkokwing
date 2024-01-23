import {
  Application,
  ProgramChoice,
} from '@/app/(admin)/admin/applications/modals/Application';
import ChoiceModal from './ChoiceModal';
import { applicationsRepository } from '@/app/(admin)/admin/applications/repository';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Link,
} from '@nextui-org/react';
import { useTransition } from 'react';

type Props = {
  application: Application;
};

export default function CoursePicker({ application }: Props) {
  function firstChoiceSelected(item: Recommendation) {
    applicationsRepository
      .setFirstChoice(application.id, {
        programId: item.programId,
        programName: item.programName,
      })
      .catch((e) => {
        console.error(e);
      });
  }

  function secondChoiceSelected(item: Recommendation) {
    applicationsRepository
      .setSecondChoice(application.id, {
        programId: item.programId,
        programName: item.programName,
      })
      .catch((e) => {
        console.error(e);
      });
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-5'>
      {application.firstChoice ? (
        <CoursePreview
          label='First Choice'
          item={application.firstChoice}
          onDelete={async () => {
            await applicationsRepository.removeFirstChoice(application.id);
          }}
        />
      ) : (
        <ChoiceModal
          label='First Choice'
          application={application}
          onSelected={firstChoiceSelected}
        />
      )}
      {application.secondChoice ? (
        <CoursePreview
          label='Second Choice'
          item={application.secondChoice}
          onDelete={async () => {
            await applicationsRepository.removeSecondChoice(application.id);
          }}
        />
      ) : (
        <ChoiceModal
          label='Second Choice'
          application={application}
          onSelected={secondChoiceSelected}
        />
      )}
    </div>
  );
}

type CardProps = {
  item: ProgramChoice;
  label: string;
  onDelete: () => Promise<void>;
};

function CoursePreview({ item, label, onDelete }: CardProps) {
  const [isPending, startTransition] = useTransition();
  return (
    <Card className='w-60 h-48'>
      <CardBody className='flex-col items-center justify-center mt-10'>
        <h3 className=''>{item.programName}</h3>
        <p className='text-xs text-gray-500'>{label}</p>
      </CardBody>
      <CardFooter className='justify-center'>
        <Button
          isLoading={isPending}
          size='sm'
          onClick={() => {
            startTransition(async () => {
              await onDelete();
            });
          }}
        >
          Remove
        </Button>
      </CardFooter>
    </Card>
  );
}
