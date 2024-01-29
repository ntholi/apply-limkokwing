'use client';

import Container from './core/Container';
import { GraduationCap } from 'lucide-react';
import HomeButton from './home/HomeButton';

export default function Home() {
  return (
    <Container
      as='main'
      className='flex justify-center pt-10 flex-col items-center gap-3'
    >
      <div className='text-center p-2 rounded-lg border border-foreground-500 flex gap-2 items-center'>
        <GraduationCap />
        <h1 className='text-xs sm:text-sm'>
          Limkokwing University of Creative Technology
        </h1>
      </div>
      <h2 className='md:text-8xl text-center font-bold uppercase text-5xl mt-[5vh] md:mt-0'>
        Be The Most Successful
      </h2>
      <HomeButton />
    </Container>
  );
}
