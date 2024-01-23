import { Card, CardBody } from '@nextui-org/react';
import { PropsWithChildren } from 'react';

export default function ContentWrapper({ children }: PropsWithChildren) {
  return (
    <Card className='bg-black/40'>
      <CardBody className='items-center p-4 sm:p-8'>{children}</CardBody>
    </Card>
  );
}
