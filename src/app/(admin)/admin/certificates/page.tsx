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
