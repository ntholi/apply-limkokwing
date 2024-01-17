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
import { facultyRepository } from './repository';
import { Faculty } from './faculty';

export default function FacultyPage() {
  return (
    <ResourcePage
      resourceLabel='Faculties'
      repository={facultyRepository}
      create={FacultyCreate}
      edit={FacultyEdit}
      details={FacultyDetails}
      navLinkProps={(it) => ({ label: it.name })}
    ></ResourcePage>
  );
}

function FacultyDetails({ item }: { item: Faculty }) {
  return (
    <DetailsView>
      <FieldView label='Name' value={item.name} />
    </DetailsView>
  );
}

function FacultyCreate(props: CreateViewProps<Faculty>) {
  return (
    <CreateView {...props}>
      <TextField name='name' />
    </CreateView>
  );
}

function FacultyEdit(props: EditViewProps<Faculty>) {
  return (
    <EditView {...props}>
      <TextField name='name' />
    </EditView>
  );
}
