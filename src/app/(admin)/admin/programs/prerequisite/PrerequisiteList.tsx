import React, { useEffect, useState } from 'react';
import { Prerequisite } from '../modal/program';
import { useQueryState } from 'nuqs';
import { programRepository } from '../repository';

function PrerequisiteList() {
  const [prerequisites, setPrerequisites] = useState<Prerequisite[]>([]);
  const [programId] = useQueryState('id');
  const [certificateId] = useQueryState('certificate');

  useEffect(() => {
    if (programId) {
      return programRepository.listenForDocument(programId, (data) => {
        const prerequisites = data.prerequisites || [];
        setPrerequisites(
          prerequisites.filter((it) => it.certificateId === certificateId)
        );
      });
    }
  }, [certificateId, programId]);

  return (
    <div>
      {prerequisites.map((it) => (
        <div key={`${it.certificateId}${it.courseName}`}>{it.courseName}</div>
      ))}
    </div>
  );
}

export default PrerequisiteList;
