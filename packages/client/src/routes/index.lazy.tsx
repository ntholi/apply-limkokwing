import Body from '@/components/base/Body';
import { Button } from '@/components/ui/button';
import { createLazyFileRoute, Link } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <Body className='mt-12 flex flex-col items-center gap-12'>
      <h1 className='w-full rounded-sm border px-2 py-3 text-center text-sm md:w-[25%]'>
        Limkokwing University of Creative Technology
      </h1>
      <p className='text-center text-5xl font-bold sm:text-6xl md:w-1/2 md:text-8xl'>
        Be The Most Successful
      </p>
      <Button className='w-full md:w-[25%]' asChild>
        <Link to={'/apply'}>Apply Now</Link>
      </Button>
    </Body>
  );
}
