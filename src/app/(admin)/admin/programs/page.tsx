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
    <DetailsView>
      <FieldView label='Name' value={item.name} />
      <FieldView label='Faculty' value={item.faculty} />
    </DetailsView>
  );
}

function ProgramCreate(props: CreateViewProps<Program>) {
  const [filter] = useQueryState('filter', parseAsArrayOf(parseAsString));
  const faculty = (
    filter && filter[0] == 'faculty' ? filter[1] : ''
  ) as Faculty['code'];

  const defaultValues = { name: '', faculty };

  return (
    <CreateView defaultValues={defaultValues} {...props}>
      <TextField name='name' />
      <TextField name='faculty' value={faculty} />
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
