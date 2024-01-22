import React, { useEffect } from 'react';
import { Application } from '@/app/(admin)/admin/applications/modals/Application';
import { programRepository } from '@/app/(admin)/admin/programs/repository';

type Props = {
  application: Application;
};

export default function CourseList({ application }: Props) {
  const [courses, setCourses] = React.useState<Recommendation[]>([]);
  useEffect(() => {
    programRepository.getRecommendations(application).then((data) => {
      setCourses(data);
    });
  }, [application]);
  return (
    <div>
      {courses.map((course) => (
        <div key={course.programId}>
          <div>{course.programName}</div>
          <div>{course.match}</div>
        </div>
      ))}
    </div>
  );
}
