import { parseAsInteger, useQueryState } from 'nuqs';
import React, { useEffect } from 'react';
import { useApplication } from '../apply/ApplicationProvider';

export default function useCanProceed() {
  const [step] = useQueryState('step', parseAsInteger.withDefault(1));
  const [navigatableStep, setNavigatableStep] = React.useState(1);
  const application = useApplication();

  useEffect(() => {
    if (!application) return;
    if (
      step === 1 &&
      application.userDetails?.firstName &&
      application.userDetails?.lastName
    ) {
      setNavigatableStep(1);
    } else if (step === 2 && application.results.length > 0) {
      setNavigatableStep(2);
    } else if (step === 3 && application.firstChoice) {
      setNavigatableStep(3);
    } else if (step === 4 && application.documents.length > 0) {
      setNavigatableStep(4);
    } else if (step === 5) {
      setNavigatableStep(5);
    } else {
      setNavigatableStep(0);
    }
  }, [application, step]);

  return { navigatableStep, canProceed: step <= navigatableStep };
}
