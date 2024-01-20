import React, { useEffect } from 'react';
import { Certificate } from './Certificate';
import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Group,
  LoadingOverlay,
  Paper,
  PaperProps,
  Table,
  TextInput,
  Title,
} from '@mantine/core';
import { IconTrashFilled } from '@tabler/icons-react';
import { hasLength, useForm } from '@mantine/form';
import { certificateRepository } from './repository';

type Props = {
  certificate: Certificate;
} & PaperProps;

export default function CoursesTable({ certificate, ...props }: Props) {
  const [courses, setCourses] = React.useState<string[]>([]);
  const [isPending, startTransition] = React.useTransition();

  useEffect(() => {
    return certificateRepository.listenForDocument(certificate.id, (data) => {
      setCourses(data.courses || []);
    });
  }, [certificate.id]);

  function handleDelete(course: string) {
    startTransition(async () => {
      await certificateRepository.deleteCourse(certificate.id, course);
    });
  }

  const rows = courses.map((course) => (
    <Table.Tr key={course}>
      <Table.Td>{course}</Table.Td>
      <Table.Td align='right'>
        <ActionIcon
          color='red'
          disabled={isPending}
          variant='light'
          onClick={() => handleDelete(course)}
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
          Courses
        </Title>
        <CourseForm certificateId={certificate.id} />
      </Group>
      <Divider mt={'xs'} mb={'sm'} />
      <Box pos='relative'>
        <LoadingOverlay visible={isPending} />
        <Table withRowBorders={false} highlightOnHover>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Box>
    </Paper>
  );
}

function CourseForm({ certificateId }: { certificateId: string }) {
  const [isPending, startTransition] = React.useTransition();
  const form = useForm({
    initialValues: {
      name: '',
    },

    validate: {
      name: hasLength({ min: 1 }, 'Required'),
    },
  });

  function handleSubmit(value: { name: string }) {
    startTransition(async () => {
      await certificateRepository.addCourse(certificateId, value.name);
      form.reset();
    });
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Group align='center'>
        <TextInput placeholder='New Course' {...form.getInputProps('name')} />
        <Button type='submit' loading={isPending}>
          Add
        </Button>
      </Group>
    </form>
  );
}
