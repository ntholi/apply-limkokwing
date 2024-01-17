import { Box } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import React, { PropsWithChildren } from 'react';
import { ZodObject, ZodTypeAny } from 'zod';
import SubmitButton from './form/SubmitButton';
import { Repository, Resource } from './repository/repository';
import { useQueryState } from 'next-usequerystate';

export type CreateViewProps<T extends Resource> = {
  schema?: ZodObject<{ [K in any]: ZodTypeAny }>;
  repository: Repository<T>;
};

export default function CreateView<T extends Resource>(
  props: PropsWithChildren<CreateViewProps<T>>,
) {
  const { children, schema, repository } = props;
  const form = useForm<T>({
    validate: schema && zodResolver(schema),
  });
  const [_, setView] = useQueryState('view');
  const [__, setId] = useQueryState('id');

  const handleSubmit = async (values: T) => {
    if (repository) {
      const res = await repository.create(values);
      await setView(null);
      await setId(res.id);
    }
  };

  return (
    <Box p='xl' component='form' onSubmit={form.onSubmit(handleSubmit)}>
      {React.Children.map(children, (child: React.ReactNode) => {
        if (!React.isValidElement(child)) return child;
        return React.cloneElement(child as React.ReactElement, {
          ...child.props,
          ...form.getInputProps(child.props.name),
          repository,
        });
      })}
      <SubmitButton>Create</SubmitButton>
    </Box>
  );
}
