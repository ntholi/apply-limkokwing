import Body from '@/components/base/Body';
import { ModeToggle } from '@/components/theme/mode-toggle';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <Body>
      <h3>
        <ModeToggle />
      </h3>
    </Body>
  );
}
