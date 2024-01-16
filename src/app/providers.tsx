// app/providers.tsx
'use client';

import { NextUIProvider } from '@nextui-org/react';

function Providers({ children }: { children: React.ReactNode }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}

export default Providers;
