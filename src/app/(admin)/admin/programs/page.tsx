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
  SelectField,
} from '@/app/(admin)/admin-core';
import { programRepository } from './repository';
import { Program } from './modal/program';
import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs';
import { Faculty } from './modal/faculty';
import CertificateView from './prerequisite/CertificateView';
import { Divider, Tabs } from '@mantine/core';
import { IconInfoCircle, IconTilde } from '@tabler/icons-react';
import PrerequisiteDetails from './prerequisite/PrerequisiteDetails';
import NumberField from '../../admin-core/form/NumberField';

const levels = [
  'Certificate',
  'Diploma',
  'Associate Degree',
  'Bachelor Degree',
  'Honours Degree',
  'Postgraduate Diploma',
  'Master Degree',
  'Doctorate Degree',
];

export default function ProgramPage() {
  return (
    <ResourcePage
      resourceLabel='Programs'
      repository={programRepository}
      create={ProgramCreate}
      edit={ProgramEdit}
      details={ProgramDetails}
      navLinkProps={(it) => ({ label: it.name })}
    ></ResourcePage>
  );
}

function ProgramDetails({ item }: { item: Program }) {
  return (
    <Tabs defaultValue='prerequisites'>
      <Tabs.List>
        <Tabs.Tab value='details' leftSection={<IconInfoCircle />}>
          Details
        </Tabs.Tab>
        <Tabs.Tab value='prerequisites' leftSection={<IconTilde />}>
          Prerequisites
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value='details'>
        <DetailsView>
          <FieldView label='Level' value={item.level} />
          <FieldView label='Name' value={item.name} />
          <FieldView label='Required Credits' value={item.requiredCredits} />
          <FieldView label='Faculty' value={item.faculty} />
        </DetailsView>
      </Tabs.Panel>

      <Tabs.Panel value='prerequisites'>
        <DetailsView>
          <CertificateView program={item} />
          <Divider />
          <PrerequisiteDetails />
        </DetailsView>
      </Tabs.Panel>
    </Tabs>
  );
}

function ProgramCreate(props: CreateViewProps<Program>) {
  const [filter] = useQueryState('filter', parseAsArrayOf(parseAsString));
  const faculty = (
    filter && filter[0] == 'faculty' ? filter[1] : ''
  ) as Faculty['code'];

  const initialValues = {
    level: '',
    name: '',
    faculty,
    requiredCredits: 0,
    prerequisites: [],
  };

  return (
    <CreateView initialValues={initialValues} {...props}>
      <SelectField name='level' options={levels} />
      <TextField name='name' />
      <NumberField name='requiredCredits' />
      <TextField name='faculty' value={faculty} hidden />
    </CreateView>
  );
}

function ProgramEdit(props: EditViewProps<Program>) {
  return (
    <EditView {...props}>
      <SelectField name='level' options={levels} />
      <TextField name='name' />
      <NumberField name='requiredCredits' />
    </EditView>
  );
}
