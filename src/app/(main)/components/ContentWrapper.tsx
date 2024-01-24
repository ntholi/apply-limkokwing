import { Card, CardBody } from '@nextui-org/react';
import { twMerge } from 'tailwind-merge';

type Props = {
  children: React.ReactNode;
  className?: string;
};
export default function ContentWrapper({ children, className }: Props) {
  return (
    <Card className={twMerge('bg-black/40', className)}>
      <CardBody className='items-center p-4 sm:p-8'>{children}</CardBody>
    </Card>
  );
}
