import { Button } from '@nextui-org/react';
import Container from './core/Container';
import { GraduationCap } from 'lucide-react';

export default function Home() {
  return (
    <Container
      as='main'
      className='flex justify-center mt-10 flex-col items-center gap-3'
    >
      <div className='text-sm text-center p-2 rounded-lg border border-foreground-500 flex gap-2 items-center'>
        <GraduationCap />
        <h1>Limkokwing University of Creative Technology</h1>
      </div>
      <h2 className='md:text-8xl text-center font-bold uppercase text-5xl'>
        Be The Most Successful
      </h2>
      <Button
        color='primary'
        className='w-full block sm:w-52 mt-20'
        radius='full'
      >
        Apply Now
      </Button>
    </Container>
  );
}
