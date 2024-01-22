import React, { useEffect } from 'react';
import { Application } from '@/app/(admin)/admin/applications/modals/Application';
import { programRepository } from '@/app/(admin)/admin/programs/repository';

type Props = {
  application: Application;
};

export default function CourseList({ application }: Props) {
  const [courses, setCourses] = React.useState([]);
  useEffect(() => {
    programRepository.getSuitablePrograms(application?.results).then((data) => {
      console.log('Done', data);
    });
  }, [application]);
  return <div>CourseList</div>;
}
