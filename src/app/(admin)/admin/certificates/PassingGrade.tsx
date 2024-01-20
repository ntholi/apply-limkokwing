import { Select } from '@mantine/core';
import { Certificate } from './Certificate';
import { certificateRepository } from './repository';

type Props = {
  certificate: Certificate;
};

export default function PassingGrade({ certificate }: Props) {
  function handleChange(value: string | null) {
    const grade = certificate.gradingSchemes?.find((it) => it.grade === value);
    certificateRepository.update(certificate.id, {
      ...certificate,
      passingGrade: grade || null,
    });
  }

  const data =
    certificate.gradingSchemes
      ?.sort((a, b) => a.level - b.level)
      .map((it) => it.grade) || [];

  return (
    <Select
      label='Passing Grade'
      withAsterisk={!certificate.passingGrade}
      data={data}
      value={certificate.passingGrade?.grade}
      onChange={handleChange}
    />
  );
}
