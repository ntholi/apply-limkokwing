import { Button } from '@nextui-org/react';
import Container from './core/Container';

export default function Home() {
  return (
    <Container as='main'>
      <div className='flex justify-center mt-10 flex-col items-center gap-3'>
        <h1 className='text-5xl'>Hello World</h1>
        <Button color='primary' className='w-full block sm:w-52' radius='full'>
          Apply Now
        </Button>
      </div>
    </Container>
  );
}
