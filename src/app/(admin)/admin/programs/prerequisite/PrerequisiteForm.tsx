import { Divider, Paper, Stack, Title } from '@mantine/core';
import { Certificate } from '../../certificates/Certificate';

type Props = {
  certificate?: Certificate;
};

export default function PrerequisiteForm({ certificate }: Props) {
  if (!certificate) return null;
  return (
    <Stack>
      <Divider mt={'xs'} />
      <Stack>{certificate.name}</Stack>
    </Stack>
  );
}
