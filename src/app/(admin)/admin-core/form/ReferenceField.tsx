'use client';
import React, { useEffect } from 'react';
import { Autocomplete, CloseButton } from '@mantine/core';
import { variableToLabel } from '../utils/utils';
import { Resource } from '../repository/repository';
import { ReferenceInputProps } from '../types';

const NOTHING_SELECTED = 'Nothing Selected';

type Data = {
  id?: string;
  [key: string]: any;
};

export default function ReferenceField<T extends Resource>(
  props: ReferenceInputProps<T>,
) {
  const [reference, setReference] = React.useState('');
  const [description, setDescription] = React.useState(NOTHING_SELECTED);
  const [data, setData] = React.useState<Data[]>([]);

  useEffect(() => {
    if (props.repository) {
      props.repository
        .getResourceList(props.reference)
        .then((data) => {
          setData(data);
        })
        .catch(console.error);
      if (props.value) {
        props.repository
          .getResource(props.reference, props.value)
          .then((data) => {
            if (!data.id) {
              throw new Error('Resource does not have an id');
            }
            setReference(data.id);
            setDescription((data as any)[props.referenceLabel]);
          })
          .catch(console.error);
      }
    }
  }, [props.reference, props.repository, props.value, props.referenceLabel]);

  const label = props.label || variableToLabel(props.name);
  return (
    <Autocomplete
      {...props}
      label={label}
      description={description}
      value={reference}
      onOptionSubmit={(value) => {
        setReference(value);
        props.onChange(value);
      }}
      onChange={(value) => {
        setDescription(value);
      }}
      rightSection={
        reference && (
          <CloseButton
            onClick={() => {
              setReference('');
              props.onChange('');
              setDescription(NOTHING_SELECTED);
            }}
          />
        )
      }
      data={data.map((it) => {
        if (!it.id) {
          throw new Error('Resource does not have an id');
        }
        return {
          value: it.id,
          label: it[props.referenceLabel],
        };
      })}
    />
  );
}
