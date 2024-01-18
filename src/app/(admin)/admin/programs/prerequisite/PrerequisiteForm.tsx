import { Paper, Stack } from '@mantine/core';
import { Certificate } from '../modal/Prerequisite';

type Props = {
  certificate?: Certificate;
};

export default function PrerequisiteForm({ certificate }: Props) {
  if (!certificate) return null;
  return (
    <Paper p={'md'} withBorder>
      <Stack>{certificate.name}</Stack>
    </Paper>
  );
}
