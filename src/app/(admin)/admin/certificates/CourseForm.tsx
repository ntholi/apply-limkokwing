import React from 'react';
import { hasLength, useForm } from '@mantine/form';
import { Button, Group, TextInput } from '@mantine/core';
import { db } from '@/lib/config/firebase';
import { setDoc, collection, getDoc, doc } from 'firebase/firestore';
import { Certificate } from './Certificate';

type Props = {
  certificateId: string;
};

export default function CourseForm({ certificateId }: Props) {
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
      const res = await getDoc(doc(db, 'certificates', certificateId));
      if (res.exists()) {
        const data = res.data() as Certificate;
        if (data) {
          const courses: string[] = data.courses || [];
          courses.push(value.name);
          const certificate: Certificate = {
            ...data,
            courses,
          };
          await setDoc(doc(db, 'certificates', certificateId), certificate);
          form.reset();
        }
      }
    });
  }

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Group justify='space-between'>
        <TextInput
          withAsterisk
          label='Course'
          {...form.getInputProps('name')}
        />
        <Button type='submit'>Add</Button>
      </Group>
    </form>
  );
}
