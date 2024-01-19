import {
  ActionIcon,
  Box,
  Divider,
  Group,
  LoadingOverlay,
  Paper,
  PaperProps,
  Table,
  Title,
} from '@mantine/core';
import { IconTrashFilled } from '@tabler/icons-react';
import React, { useEffect } from 'react';
import { Certificate, GradingScheme } from './Certificate';
import GradingSchemeForm from './GradingSchemeForm';
import { certificateRepository } from './repository';
import DraggableTable from './DndListHandle';

type Props = {
  certificate: Certificate;
} & PaperProps;

export default function GradingSchemesTable({ certificate, ...props }: Props) {
  const [gradingSchemes, setGradingSchemes] = React.useState<GradingScheme[]>(
    []
  );
  const [isPending, startTransition] = React.useTransition();

  useEffect(() => {
    return certificateRepository.listenForDocument(certificate.id, (data) => {
      setGradingSchemes(data.gradingSchemes || []);
    });
  }, [certificate.id]);

  function handleDelete(gradingScheme: GradingScheme) {
    startTransition(async () => {
      await certificateRepository.deleteGradingScheme(
        certificate.id,
        gradingScheme
      );
    });
  }

  return (
    <Paper withBorder p='md' {...props}>
      <Group justify='space-between'>
        <Title order={4} fw={'lighter'}>
          Grading Schemes
        </Title>
        <GradingSchemeForm />
      </Group>
      <Divider mt={'xs'} mb={'sm'} />
      <Box pos='relative'>
        <LoadingOverlay visible={isPending} />
        <DraggableTable data={gradingSchemes} />
      </Box>
    </Paper>
  );
}
