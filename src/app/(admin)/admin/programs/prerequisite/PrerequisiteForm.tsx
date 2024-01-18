import { Paper, Stack } from '@mantine/core';
import { Certificate } from '../../certificates/Certificate';

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
