import { Group, Stack, Skeleton, Box, BoxProps } from '@mantine/core';
import { useQueryState } from 'nuqs';
import React, { useEffect } from 'react';
import { Certificate } from '../../certificates/Certificate';
import PrerequisiteForm from './PrerequisiteForm';
import PrerequisiteList from './PrerequisiteList';
import { certificateRepository } from '../../certificates/repository';

export default function PrerequisiteDetails(props: BoxProps) {
  const [certificateId] = useQueryState('certificate');
  const [programId] = useQueryState('id');
  const [certificate, setCertificate] = React.useState<Certificate>();
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    if (certificateId && programId) {
      setLoading(true);
      certificateRepository
        .get(certificateId)
        .then(setCertificate)
        .finally(() => setLoading(false));
    }
  }, [certificateId, programId]);

  return (
    <Box {...props}>
      {loading ? (
        <Loader />
      ) : (
        certificate && (
          <>
            <PrerequisiteForm certificate={certificate} />
            <PrerequisiteList />
          </>
        )
      )}
    </Box>
  );
}

function Loader() {
  return (
    <Stack>
      <Group justify='space-between'>
        <Skeleton w={200} h={30} />
        <Skeleton w={100} h={30} />
      </Group>
      <Stack gap={'xs'}>
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} w='100%' h={50} />
        ))}
      </Stack>
    </Stack>
  );
}
