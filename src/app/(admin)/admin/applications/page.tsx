'use client';

import { DetailsView, FieldView, ResourcePage } from '@/app/(admin)/admin-core';
import { Button, Card, Grid, GridCol, Stack, Text } from '@mantine/core';
import { Application } from './modals/Application';
import { applicationsRepository } from './repository';
import StatusUpdater from './StatusUpdater';
import { IconExternalLink } from '@tabler/icons-react';

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
      <GridCol span={{ base: 12, md: 5 }}>
        <Card shadow='sm' radius='md' withBorder>
          <Stack gap={'xs'}>
            <Text size='sm' fw={500}>
              Documents
            </Text>
            {item.documents.map((doc) => (
              <Button
                key={doc.name}
                variant='default'
                size='sm'
                component='a'
                target='_blank'
                href={doc.url}
                rightSection={<IconExternalLink size={18} />}
              >
                {doc.name}
              </Button>
            ))}
          </Stack>
        </Card>
      </GridCol>
    </Grid>
  );
}
