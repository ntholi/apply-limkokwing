import Body from '@/components/base/Body';
import { Button } from '@/components/ui/button';
import { createLazyFileRoute, Link } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <Body className='flex flex-col items-center mt-12 gap-12'>
      <h1 className='text-sm border py-3 px-2 rounded-sm md:w-[25%] text-center w-full'>
        Limkokwing University of Creative Technology
      </h1>
      <p className='text-5xl sm:text-6xl md:text-8xl font-bold md:w-1/2 text-center'>
        Be The Most Successful
      </p>
      <Button className='w-full md:w-[25%]' asChild>
        <Link to={'/apply'}>Apply Now</Link>
      </Button>
    </Body>
  );
}
