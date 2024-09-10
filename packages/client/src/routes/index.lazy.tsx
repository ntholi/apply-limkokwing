import Body from '@/components/base/Body';
import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <Body>
      <h3></h3>
    </Body>
  );
}
