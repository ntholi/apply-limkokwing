import Link from 'next/link';
import { Text } from '@mantine/core';

export default function Logo() {
  return (
    <Text component={Link} href={'/admin'}>
      Limkokwing University
    </Text>
  );
}
