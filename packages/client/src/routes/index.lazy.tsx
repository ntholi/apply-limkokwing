import { ModeToggle } from '@/components/mode-toggle';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className='p-2'>
      <h3>
        <ModeToggle />
      </h3>
    </div>
  );
}
