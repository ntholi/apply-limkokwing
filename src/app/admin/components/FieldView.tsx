import React from 'react';
import { Box, BoxProps, Divider, Text, TextProps } from '@mantine/core';
import { dateTime } from '@/lib/format';

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

function formatValue(value: any) {
  if (!value) return '(None)';

  if (value instanceof Date) {
    return dateTime(value);
  }
  return value;
}
