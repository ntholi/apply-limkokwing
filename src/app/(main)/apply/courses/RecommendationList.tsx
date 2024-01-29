import React, { useEffect } from 'react';
import { Application } from '@/app/(admin)/admin/applications/modals/Application';
import { programRepository } from '@/app/(admin)/admin/programs/repository';
import {
  AvatarProps,
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Skeleton,
} from '@nextui-org/react';
import { Faculties } from '@/app/(admin)/admin/programs/modal/faculty';
import clsx from 'clsx';
import { applicationsRepository } from '@/app/(admin)/admin/applications/repository';
import CourseFilter from '../../courses/ProgramFilter';
import { useQueryState } from 'nuqs';

type Props = {
  application: Application;
  onSelected: (recommendation: Recommendation) => void;
};

export default function RecommendationList({ application, onSelected }: Props) {
  const [courses, setCourses] = React.useState<Recommendation[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [faculty] = useQueryState('faculty');

  useEffect(() => {
    setLoading(true);
    programRepository
      .getRecommendations(application)
      .then((data) => {
        setCourses(
          data.filter((it) => {
            if (faculty) {
              return it.faculty === faculty;
            }
            return true;
          })
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, [application, faculty]);

  return (
    <>
      <CourseFilter />
      <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 pb-10'>
        {loading && courses.length === 0 ? (
          <Loader />
        ) : (
          courses.map((course) => (
            <RecommendationCard
              key={course.programId}
              item={course}
              onSelected={onSelected}
            />
          ))
        )}
      </section>
    </>
  );
}

type CardProps = {
  item: Recommendation;
  onSelected: (recommendation: Recommendation) => void;
};

const RecommendationCard = ({ item, onSelected }: CardProps) => {
  return (
    <Badge
      content='1st Choice'
      shape='circle'
      color='primary'
      size='sm'
      isInvisible
    >
      <Card
        isPressable
        onPress={() => onSelected(item)}
        className='bg-default-100 border border-transparent hover:border hover:border-primary-500 '
      >
        <CardHeader className='flex gap-3'>
          <Button
            color={getColor(item.match)}
            variant='flat'
            isIconOnly
            size='lg'
            radius='full'
          >
            <div>
              <p className='text-sm'>{item.match}%</p>
            </div>
          </Button>
          <div className='flex flex-col text-start'>
            <p className='text-md'>{item.programName}</p>
            <p className='text-tiny text-default-500'>
              {Faculties.find((it) => it.code === item.faculty)?.name}
            </p>
          </div>
        </CardHeader>
        <Divider />
        <CardBody className='text-small'>Recommended Course</CardBody>
      </Card>
    </Badge>
  );
};

function Loader() {
  return Array.from({ length: 4 }).map((_, i) => (
    <Skeleton key={i} className='w-full h-36 rounded-lg' />
  ));
}

function getColor(match: number): AvatarProps['color'] {
  if (match > 85) return 'success';
  if (match > 70) return 'warning';
  if (match > 50) return 'secondary';
  return 'danger';
}
