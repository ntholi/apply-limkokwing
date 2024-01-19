import React, { useEffect, useState } from 'react';
import { Prerequisite, Program } from '../modal/program';
import { useQueryState } from 'nuqs';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '@/lib/config/firebase';

function PrerequisiteList() {
  const [prerequisites, setPrerequisites] = useState<Prerequisite[]>([]);
  const [programId] = useQueryState('id');
  const [certificateId] = useQueryState('certificate');

  useEffect(() => {
    if (programId) {
      const unsubscribe = onSnapshot(doc(db, 'programs', programId), (doc) => {
        const data = { ...doc.data(), id: doc.id } as Program;
        const prerequisites = data.prerequisites || [];
        setPrerequisites(
          prerequisites.filter((it) => it.certificateId === certificateId)
        );
      });
      return () => unsubscribe();
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
