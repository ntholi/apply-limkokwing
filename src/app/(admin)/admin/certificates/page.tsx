'use client';
import React from 'react';

import {
  FieldView,
  ResourcePage,
  DetailsView,
  CreateViewProps,
  CreateView,
  TextField,
  EditViewProps,
  EditView,
} from '@/app/(admin)/admin-core';
import { certificateRepository } from './repository';
import { Certificate } from './Certificate';
import { Divider, Group, Paper, Stack, Text, Title } from '@mantine/core';
import CoursesTable from './CoursesTable';
import CourseForm from './CourseForm';

export default function CertificatePage() {
  return (
    <ResourcePage
      resourceLabel='Certificates'
      repository={certificateRepository}
      create={CertificateCreate}
      edit={CertificateEdit}
      details={CertificateDetails}
      navLinkProps={(it) => ({ label: it.name })}
    ></ResourcePage>
  );
}

function CertificateDetails({ item }: { item: Certificate }) {
  return (
    <DetailsView>
      <FieldView label='Name' value={item.name} />
      <CoursesView certificate={item} />
    </DetailsView>
  );
}

function CertificateCreate(props: CreateViewProps<Certificate>) {
  return (
    <CreateView {...props}>
      <TextField name='name' />
    </CreateView>
  );
}

function CertificateEdit(props: EditViewProps<Certificate>) {
  return (
    <EditView {...props}>
      <TextField name='name' />
    </EditView>
  );
}

function CoursesView({ certificate }: { certificate: Certificate }) {
  return (
    <Paper withBorder p='md'>
      <Group justify='space-between'>
        <Title order={4} fw={'lighter'}>
          Courses
        </Title>
        <CourseForm certificateId={certificate.id} />
      </Group>
      <Divider mt={'xs'} mb={'sm'} />
      <CoursesTable certificate={certificate} />
    </Paper>
  );
}
