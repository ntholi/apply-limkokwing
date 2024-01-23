import React, { useEffect, useState } from 'react';
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
  Skeleton,
} from '@nextui-org/react';
import { Faculties } from '@/app/(admin)/admin/programs/modal/faculty';
import { useQueryState } from 'nuqs';
import clsx from 'clsx';
import { applicationsRepository } from '@/app/(admin)/admin/applications/repository';
import { IconCheck, IconQuestionMark, IconTrash } from '@tabler/icons-react';

type Props = {
  application: Application;
};

export default function RecommendationList({ application }: Props) {
  const [courses, setCourses] = React.useState<Recommendation[]>([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    setLoading(true);
    programRepository
      .getRecommendations(application)
      .then((data) => {
        setCourses(data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [application]);

  return (
    <>
      <div>
        <div className='flex gap-2 text-sm items-center'>
          <Status status={!!application.firstChoice} />
          <p>1st Option:</p>
          <p>{application.firstChoice?.programName}</p>
          <Button
            isIconOnly
            color='danger'
            variant='light'
            size='sm'
            onClick={() => {
              applicationsRepository.removeFirstOption(application.id);
            }}
          >
            <IconTrash size={'1rem'} />
          </Button>
        </div>
        <div className='flex gap-2 text-sm items-center'>
          <Status status={!!application.secondChoice} />
          <p>2st Option:</p>
          <p>{application.secondChoice?.programName}</p>
          <Button
            isIconOnly
            color='danger'
            variant='light'
            size='sm'
            onClick={() => {
              applicationsRepository.removeFirstOption(application.id);
            }}
          >
            <IconTrash size={'1rem'} />
          </Button>
        </div>
      </div>
      <Divider />
      <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
        {loading && courses.length === 0 ? (
          <Loader />
        ) : (
          courses.map((course) => (
            <RecommendationCard
              application={application}
              key={course.programId}
              item={course}
            />
          ))
        )}
      </section>
    </>
  );
}

const RecommendationCard = ({
  item,
  application,
}: {
  item: Recommendation;
  application: Application;
}) => {
  const handleSelect = () => {
    applicationsRepository
      .updateProgram(application.id, {
        programId: item.programId,
        programName: item.programName,
      })
      .catch((e) => {
        console.error(e);
      });
  };
  return (
    <Card
      isPressable
      className={clsx([
        item.programId == application.firstChoice?.programId &&
          'border border-primary',
      ])}
      onPress={handleSelect}
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

function Loader() {
  return Array.from({ length: 4 }).map((_, i) => (
    <Skeleton key={i} className='w-full h-36 rounded-lg' />
  ));
}

function Status({ status }: { status: boolean }) {
  return status ? (
    <span className='bg-teal-500 rounded-full p-0.5'>
      <IconCheck size={'1rem'} />
    </span>
  ) : (
    <span className='bg-gray-500 rounded-full p-0.5'>
      <IconQuestionMark size={'1rem'} />
    </span>
  );
}

function getColor(match: number): AvatarProps['color'] {
  if (match > 85) return 'success';
  if (match > 70) return 'warning';
  if (match > 50) return 'secondary';
  return 'danger';
}
