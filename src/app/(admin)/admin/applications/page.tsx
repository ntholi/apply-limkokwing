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
import { Application } from './modals/Application';

export default function applicationPage() {
  return (
    <ResourcePage
      resourceLabel='Applications'
      repository={applicationsRepository}
      details={applicationDetails}
      navLinkProps={(it) => ({
        label: `${it.userDetails?.firstName} ${it.userDetails?.lastName}`,
      })}
    ></ResourcePage>
  );
}

function applicationDetails({ item }: { item: Application }) {
  return (
    <DetailsView>
      <FieldView label='Name' value={item.userDetails?.firstName} />
    </DetailsView>
  );
}
