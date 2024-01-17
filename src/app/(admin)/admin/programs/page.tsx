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
    </DetailsView>
  );
}

function ProgramCreate(props: CreateViewProps<Program>) {
  return (
    <CreateView {...props}>
      <TextField name='name' />
    </CreateView>
  );
}

function ProgramEdit(props: EditViewProps<Program>) {
  return (
    <EditView {...props}>
      <TextField name='name' />
    </EditView>
  );
}
