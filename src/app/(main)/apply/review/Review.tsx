import React from 'react';
import { ContentWrapper } from '../page';
import { useApplication } from '../ApplicationProvider';
import ResultsTable from './ResultsTable';

export default function Review() {
  const application = useApplication();
  if (!application) return null;

  return (
    <div>
      <ContentWrapper>
        <h2>Qualifications</h2>
        <ResultsTable application={application} />
      </ContentWrapper>
    </div>
  );
}
