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
import CoursesTable from './CoursesTable';
import GradingSchemesTable from './GradingSchemeTable';
import { Tabs, rem } from '@mantine/core';
import {
  IconInfoCircle,
  IconSchool,
  IconScoreboard,
} from '@tabler/icons-react';

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
  const iconStyle = { width: rem(12), height: rem(12) };

  return (
    <Tabs defaultValue='details'>
      <Tabs.List>
        <Tabs.Tab
          value='details'
          leftSection={<IconInfoCircle style={iconStyle} />}
        >
          Details
        </Tabs.Tab>
        <Tabs.Tab
          value='messages'
          leftSection={<IconSchool style={iconStyle} />}
        >
          Courses
        </Tabs.Tab>
        <Tabs.Tab
          value='settings'
          leftSection={<IconScoreboard style={iconStyle} />}
        >
          Grading Schemes
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value='details'>
        <DetailsView>
          <FieldView label='Name' value={item.name} />
        </DetailsView>
      </Tabs.Panel>

      <Tabs.Panel value='messages'>
        <DetailsView>
          <CoursesTable certificate={item} />
        </DetailsView>
      </Tabs.Panel>

      <Tabs.Panel value='settings'>
        <DetailsView>
          <GradingSchemesTable certificate={item} />
        </DetailsView>
      </Tabs.Panel>
    </Tabs>
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
