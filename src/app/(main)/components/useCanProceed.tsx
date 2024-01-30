import { parseAsInteger, useQueryState } from 'nuqs';
import React, { useEffect } from 'react';
import { useApplication } from '../apply/ApplicationProvider';

export default function useCanProceed() {
  const [step] = useQueryState('step', parseAsInteger.withDefault(1));
  const [canProceed, setCanProceed] = React.useState(false);
  const [steppable, setSteppable] = React.useState(1);
  const application = useApplication();

  const step1 = (() => {
    if (!application) return false;
    const { userDetails } = application;
    if (!userDetails) return false;
    const { nationalId, firstName, lastName } = userDetails;
    return (
      nationalId &&
      nationalId.length >= 5 &&
      firstName &&
      firstName.length >= 2 &&
      lastName &&
      lastName.length >= 2
    );
  })();
  const step2 = application && application.results.length > 0;
  const step3 = application && application.firstChoice;
  const step4 = application && application.documents.length > 0;

  useEffect(() => {
    setSteppable(1);
    if (step1) {
      setSteppable(2);
    }
    if (step1 && step2) {
      setSteppable(3);
    }
    if (step1 && step2 && step3) {
      setSteppable(4);
    }
    if (step1 && step2 && step3 && step4) {
      setSteppable(6);
    }
    setCanProceed(step < steppable);
  }, [application, step, step1, step2, step3, step4, steppable]);

  return { steppable, canProceed };
}
