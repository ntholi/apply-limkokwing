import { Application } from '@/app/(admin)/admin/applications/modals/Application';
import { applicationsRepository } from '@/app/(admin)/admin/applications/repository';

import React, {
  Context,
  PropsWithChildren,
  useEffect,
  useState,
  createContext,
} from 'react';
import { useSession } from '../auth/SessionProvider';

export const ApplicationContext: Context<Application | undefined> =
  createContext<Application | undefined>(undefined);

export default function ApplicationProvider({ children }: PropsWithChildren) {
  const { user } = useSession();
  const [value, setValue] = useState<Application>();

  useEffect(() => {
    if (user) {
      return applicationsRepository.listenOrCreate(user.uid, setValue);
    }
  }, [user]);

  return (
    <ApplicationContext.Provider value={value}>
      {children}
    </ApplicationContext.Provider>
  );
}

export function useApplication() {
  const context = React.useContext(ApplicationContext);
  if (context === undefined) {
    throw new Error('useApplication must be used within a ApplicationProvider');
  }
  return context;
}
