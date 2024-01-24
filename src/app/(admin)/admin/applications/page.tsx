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
import { parseAsArrayOf, parseAsString, useQueryState } from 'nuqs';
import { Divider, Tabs } from '@mantine/core';
import { IconInfoCircle, IconTilde } from '@tabler/icons-react';
import NumberField from '../../admin-core/form/NumberField';
import { applicationsRepository } from './repository';

export default function applicationPage() {
  return (
    <ResourcePage
      resourceLabel='applications'
      repository={applicationsRepository}
      create={applicationCreate}
      edit={applicationEdit}
      details={applicationDetails}
      navLinkProps={(it) => ({ label: it.userDetails.name })}
    ></ResourcePage>
  );
}

function applicationDetails({ item }: { item: application }) {
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
          <CertificateView application={item} />
          <Divider mt={'lg'} />
          <PrerequisiteDetails />
        </DetailsView>
      </Tabs.Panel>
    </Tabs>
  );
}

function applicationCreate(props: CreateViewProps<application>) {
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

function applicationEdit(props: EditViewProps<application>) {
  return (
    <EditView {...props}>
      <SelectField name='level' options={levels} />
      <TextField name='name' />
      <NumberField name='requiredCredits' />
    </EditView>
  );
}
