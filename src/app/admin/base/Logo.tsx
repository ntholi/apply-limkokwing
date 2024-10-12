import NextLink from 'next/link';
import NextImage from 'next/image';
import { Image } from '@mantine/core';

type Props = {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};
export default function Logo({ size = 'sm' }: Props) {
  const heights = {
    xs: 40,
    sm: 60,
    md: 80,
    lg: 120,
    xl: 200,
  };
  const height = heights[size];
  return (
    <NextLink href='/admin'>
      <Image
        alt=''
        src='/logo-white.png'
        h={height}
        component={NextImage}
        width={height * 5}
        height={height * 5}
      />
    </NextLink>
  );
}
