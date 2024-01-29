import { parseAsInteger, useQueryState } from 'nuqs';
import React, { useEffect } from 'react';
import { useApplication } from '../apply/ApplicationProvider';

export default function useCanProceed() {
  const [step] = useQueryState('step', parseAsInteger.withDefault(1));
  const [canProceed, setCanProceed] = React.useState(false);
  const [steppable, setSteppable] = React.useState(1);
  const application = useApplication();

  useEffect(() => {
    if (!application) return;
    setSteppable(1);
    if (
      application.userDetails?.firstName &&
      application.userDetails?.lastName
    ) {
      setSteppable(2);
    }
    if (application.results.length > 0) {
      setSteppable(3);
    }
    if (application.firstChoice) {
      setSteppable(4);
    }
    if (application.documents.length > 0) {
      setSteppable(5);
    }
    setCanProceed(step < steppable);
  }, [application, step, steppable]);

  return { steppable, canProceed };
}
