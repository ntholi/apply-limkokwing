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
import { programRepository } from './repository';
import { Program } from './modal/program';
import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs';
import { Faculty } from './modal/faculty';
import PrerequisiteView from './prerequisite/PrerequisiteView';
import { Tabs } from '@mantine/core';
import { IconInfoCircle, IconTilde } from '@tabler/icons-react';

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
          <FieldView label='Name' value={item.name} />
          <FieldView label='Faculty' value={item.faculty} />
        </DetailsView>
      </Tabs.Panel>

      <Tabs.Panel value='prerequisites'>
        <PrerequisiteView program={item} />
      </Tabs.Panel>
    </Tabs>
  );
}

function ProgramCreate(props: CreateViewProps<Program>) {
  const [filter] = useQueryState('filter', parseAsArrayOf(parseAsString));
  const faculty = (
    filter && filter[0] == 'faculty' ? filter[1] : ''
  ) as Faculty['code'];

  const initialValues = { name: '', faculty };

  return (
    <CreateView initialValues={initialValues} {...props}>
      <TextField name='name' />
      <TextField name='faculty' value={faculty} hidden />
    </CreateView>
  );
}

function ProgramEdit(props: EditViewProps<Program>) {
  return (
    <EditView {...props}>
      <TextField name='name' />
      <TextField name='faculty' />
    </EditView>
  );
}
