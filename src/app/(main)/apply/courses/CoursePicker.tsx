import { Application } from '@/app/(admin)/admin/applications/modals/Application';
import ChoiceModal from './ChoiceModal';
import { applicationsRepository } from '@/app/(admin)/admin/applications/repository';

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
      <ChoiceModal
        label='First Choice'
        application={application}
        onSelected={firstChoiceSelected}
      />
      <ChoiceModal
        label='Second Choice'
        application={application}
        onSelected={secondChoiceSelected}
      />
    </div>
  );
}
