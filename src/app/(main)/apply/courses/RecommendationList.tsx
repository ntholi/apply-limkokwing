import React, { useEffect } from 'react';
import { Application } from '@/app/(admin)/admin/applications/modals/Application';
import { programRepository } from '@/app/(admin)/admin/programs/repository';
import {
  Avatar,
  AvatarProps,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Link,
} from '@nextui-org/react';
import { Faculties } from '@/app/(admin)/admin/programs/modal/faculty';
import { useQueryState } from 'nuqs';
import clsx from 'clsx';

type Props = {
  application: Application;
};

export default function RecommendationList({ application }: Props) {
  const [courses, setCourses] = React.useState<Recommendation[]>([]);
  useEffect(() => {
    programRepository.getRecommendations(application).then((data) => {
      setCourses(data);
    });
  }, [application]);
  return (
    <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
      {courses.map((course) => (
        <RecommendationCard key={course.programId} item={course} />
      ))}
    </section>
  );
}

const RecommendationCard = ({ item }: { item: Recommendation }) => {
  const [active, setActive] = useQueryState('program');
  return (
    <Card
      isPressable
      className={clsx([active === item.programId && 'border border-primary'])}
      onPress={() => {
        setActive(item.programId);
      }}
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
      <CardBody className='text-small'>
        <p>Make beautiful websites regardless of your design experience.</p>
      </CardBody>
    </Card>
  );
};

function getColor(match: number): AvatarProps['color'] {
  if (match > 85) return 'success';
  if (match > 70) return 'warning';
  if (match > 50) return 'secondary';
  return 'danger';
}
