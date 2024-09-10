import Body from '@/components/base/Body';
import { Button } from '@/components/ui/button';
import { createLazyFileRoute, Link } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <Body className='flex flex-col items-center mt-12 gap-6 sm:gap-12'>
      <h1 className='text-sm border py-3 rounded-sm sm:w-[25%] text-center'>
        Limkokwing University of Creative Technology
      </h1>
      <p className='text-8xl font-bold w-1/2 text-center'>
        Be The Most Successful
      </p>
      <Button className='w-full sm:w-[25%]' asChild>
        <Link to={'/apply'}>Apply Now</Link>
      </Button>
    </Body>
  );
}
