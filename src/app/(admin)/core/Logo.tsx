import { Anchor, MantineSize } from '@mantine/core';
import Link from 'next/link';

type Props = {
  size?: MantineSize;
};
export default function Logo({ size = 'xs' }: Props) {
  return (
    <Anchor
      component={Link}
      href={'/'}
      underline='never'
      c='blue.7'
      fw={600}
      size={size}
    >
      Pindrop
    </Anchor>
  );
}
