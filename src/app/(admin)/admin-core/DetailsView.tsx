import { Stack } from '@mantine/core';
import React, { PropsWithChildren } from 'react';

export default function DetailsView({ children }: PropsWithChildren) {
  return <Stack p={40}>{children}</Stack>;
}
