import { Group, Select } from '@mantine/core';
import { Certificate } from './Certificate';
import { certificateRepository } from './repository';

type Props = {
  certificate: Certificate;
};

export default function PassingGrade({ certificate }: Props) {
  function changeCredit(value: string | null) {
    const grade = certificate.gradingSchemes?.find((it) => it.grade === value);
    certificateRepository.update(certificate.id, {
      ...certificate,
      creditGrade: grade || null,
    });
  }
  function changePass(value: string | null) {
    const grade = certificate.gradingSchemes?.find((it) => it.grade === value);
    certificateRepository.update(certificate.id, {
      ...certificate,
      passGrade: grade || null,
    });
  }

  const data =
    certificate.gradingSchemes
      ?.sort((a, b) => a.level - b.level)
      .map((it) => it.grade) || [];

  return (
    <Group>
      <Select
        label='Pass Grade'
        size='sm'
        withAsterisk={!certificate.passGrade}
        data={data}
        value={certificate.passGrade?.grade}
        onChange={changePass}
      />
      <Select
        label='Credit Grade'
        size='sm'
        withAsterisk={!certificate.creditGrade}
        data={data}
        value={certificate.creditGrade?.grade}
        onChange={changeCredit}
      />
    </Group>
  );
}
