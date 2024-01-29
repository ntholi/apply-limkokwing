'use client';
import React, { Suspense, useEffect, useState } from 'react';
import Container from '../core/Container';
import { Program } from '@/app/(admin)/admin/programs/modal/program';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Divider,
  Skeleton,
} from '@nextui-org/react';
import { Faculties } from '@/app/(admin)/admin/programs/modal/faculty';
import { programRepository } from '@/app/(admin)/admin/programs/repository';
import { useQueryState } from 'nuqs';
import CourseFilter from './ProgramFilter';
import { Certificate } from '@/app/(admin)/admin/certificates/Certificate';
import { certificateRepository } from '@/app/(admin)/admin/certificates/repository';

export default function CoursesPage() {
  return (
    <Container>
      <h1 className='text-2xl font-semibold text-default-900'>Courses</h1>
      <CourseFilter />
      <section className='mt-10'>
        <CourseList />
      </section>
    </Container>
  );
}

function CourseList() {
  const [faculty] = useQueryState('faculty');
  const [programs, setPrograms] = React.useState<Program[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    setLoading(true);
    const filter = faculty ? { field: 'faculty', value: faculty } : undefined;
    programRepository
      .getAll(50, filter)
      .then((programs) => setPrograms(programs))
      .finally(() => setLoading(false));
  }, [faculty]);

  if (loading) {
    return <Loader />;
  }

  return programs.length > 0 ? (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
      {programs.map((program) => (
        <CourseCard key={program.id} program={program} />
      ))}
    </div>
  ) : (
    <p className='mt-5 sm:mt-20 text-center text-zinc-400 text-sm'>
      Nothing to see here
    </p>
  );
}

function CourseCard({ program }: { program: Program }) {
  return (
    <Card className='bg-default-100 border border-transparent'>
      <CardHeader className='flex gap-3'>
        <div className='flex flex-col text-start'>
          <p className='text-md'>{program.name}</p>
          <p className='text-tiny text-default-500'>
            {Faculties.find((it) => it.code === program.faculty)?.name}
          </p>
        </div>
      </CardHeader>
      <Divider />
      <CardBody className='text-small'>
        <p>Minimum of {program.requiredCredits} credits required</p>
      </CardBody>
    </Card>
  );
}

function Loader() {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
      {Array.from({ length: 4 }).map((_, i) => (
        <Skeleton key={i} className='w-full h-36 rounded-lg' />
      ))}
    </div>
  );
}
