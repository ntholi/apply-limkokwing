import { useState } from 'react';
import { Button } from './components/ui/button';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1 className='text-3xl font-bold underline'>Hello world!</h1>
      <Button>Hello World</Button>
    </>
  );
}

export default App;
