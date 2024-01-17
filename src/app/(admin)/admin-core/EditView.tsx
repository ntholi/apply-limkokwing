import { Box } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import React, { PropsWithChildren } from 'react';
import { ZodObject, ZodTypeAny } from 'zod';
import SubmitButton from './form/SubmitButton';
import { Repository, Resource } from './repository/repository';
import { useQueryState } from 'next-usequerystate';

export type EditViewProps<T extends Resource> = {
  schema?: ZodObject<{ [K in any]: ZodTypeAny }>;
  repository: Repository<T>;
  resource: T;
};

export default function EditView<T extends Resource>(
  props: PropsWithChildren<EditViewProps<T>>,
) {
  const { children, schema, repository, resource } = props;
  const form = useForm<T>({
    initialValues: {
      ...resource,
    },
    validate: schema && zodResolver(schema),
  });
  const [_, setView] = useQueryState('view');

  const handleSubmit = async (values: T) => {
    if (repository && resource) {
      if (!resource.id) throw new Error('Resource does not have an id');
      await repository.update(resource.id, values);
      await setView(null);
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
      <SubmitButton>Update</SubmitButton>
    </Box>
  );
}
