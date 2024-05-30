'use client';

import Container from './core/Container';
import HomeButton from './home/HomeButton';

export default function Home() {
  return (
    <Container
      as='main'
      className='flex justify-center mt-4 flex-col items-center gap-3'
    >
      <div className='text-center p-3 rounded bg-zinc-900 border border-zinc-700 flex gap-2 items-center'>
        <h1 className='text-xs sm:text-sm'>
          Limkokwing University of Creative Technology
        </h1>
      </div>
      <h2 className='md:text-8xl text-center font-bold uppercase text-5xl mt-6'>
        Be The Most Successful
      </h2>
      <HomeButton />
    </Container>
  );
}
