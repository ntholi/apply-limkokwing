'use client';

import { DetailsView, FieldView, ResourcePage } from '@/app/(admin)/admin-core';
import { Card, Grid, GridCol, Stack } from '@mantine/core';
import { Application } from './modals/Application';
import { applicationsRepository } from './repository';
import StatusUpdater from './StatusUpdater';

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
    <Grid p='lg'>
      <GridCol span={{ base: 12, md: 5 }}>
        <Card shadow='sm' padding='lg' radius='md' withBorder>
          <Stack>
            <FieldView
              label='National Id'
              value={item.userDetails?.nationalId || '(None)'}
            />
            <FieldView
              label='Names'
              value={`${item.userDetails?.firstName} ${item.userDetails?.lastName}`}
            />
            <FieldView label='Email' value={item.userDetails?.email} />
            <FieldView
              label='Phone'
              value={item.userDetails?.phoneNumber || '(None)'}
            />
          </Stack>
        </Card>
      </GridCol>
      <GridCol span={{ base: 12, md: 7 }}>
        <Card shadow='sm' radius='md' withBorder>
          <StatusUpdater application={item} />
        </Card>
        <Card shadow='sm' radius='md' withBorder mt={'md'}>
          <Stack>
            <FieldView
              label='First Choice'
              value={item.firstChoice?.programName || '(None)'}
            />
            <FieldView
              label='Second Choice'
              value={item.secondChoice?.programName || '(None)'}
            />
          </Stack>
        </Card>
      </GridCol>
    </Grid>
  );
}
