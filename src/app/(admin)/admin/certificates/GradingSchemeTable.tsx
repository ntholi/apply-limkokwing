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

  const rows = gradingSchemes.map((it) => (
    <Table.Tr key={it.level}>
      <Table.Td>{it.level}</Table.Td>
      <Table.Td>{it.grade}</Table.Td>
      <Table.Td align='right'>
        <ActionIcon
          color='red'
          disabled={isPending}
          variant='light'
          onClick={() => handleDelete(it)}
        >
          <IconTrashFilled size={'0.9rem'} />
        </ActionIcon>
      </Table.Td>
    </Table.Tr>
  ));

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
        <Table withRowBorders={false} highlightOnHover>
          <Table.Thead>
            <Table.Tr>
              <Table.Td>Level</Table.Td>
              <Table.Td>Grade</Table.Td>
              <Table.Td />
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Box>
    </Paper>
  );
}
