import React from 'react';
import { TextInput } from '@mantine/core';
import { variableToLabel } from '../utils/utils';
import { InputProps } from '../types';

export default function TextField(props: InputProps) {
  const label = props.label || variableToLabel(props.name);
  return <TextInput {...props} label={label} />;
}
