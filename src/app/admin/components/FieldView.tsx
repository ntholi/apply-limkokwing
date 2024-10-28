import { Box, BoxProps, Divider, Text } from '@mantine/core';
import React from 'react';

type Props = {
  label: string;
  children: React.ReactNode;
} & BoxProps;

export default function FieldView({ label, children, ...props }: Props) {
  return (
    <Box {...props}>
      {children ? (
        <>
          {React.isValidElement(children) ? (
            children
          ) : (
            <Text size='sm' fw={500}>
              {children}
            </Text>
          )}
        </>
      ) : (
        <Text size='sm'>Empty</Text>
      )}
      <Text size='sm' c='dimmed'>
        {label}
      </Text>
      <Divider />
    </Box>
  );
}
