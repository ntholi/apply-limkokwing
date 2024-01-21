'use client';
import {
  Certificate,
  GradingScheme,
} from '@/app/(admin)/admin/certificates/Certificate';
import { certificateRepository } from '@/app/(admin)/admin/certificates/repository';
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Divider,
  Select,
  SelectItem,
  Skeleton,
  Slider,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  getKeyValue,
} from '@nextui-org/react';
import React, { Key, useEffect, useTransition } from 'react';
import { User } from 'firebase/auth';
import { applicationsRepository } from '@/app/(admin)/admin/applications/repository';
import { Results } from '@/app/(admin)/admin/applications/modals/Results';

type Props = {
  user: User;
};
export default function Qualifications({ user }: Props) {
  const [certificate, setCertificate] = React.useState<Certificate>();

  return (
    <div className='w-full'>
      <CertificateInput setValue={setCertificate} value={certificate} />
      {certificate && (
        <>
          <div className='mt-10'>
            <ResultsInput user={user} certificate={certificate} />
          </div>
          <div className='mt-2'>
            <ResultsTable user={user} />
          </div>
        </>
      )}
    </div>
  );
}

function ResultsInput({
  certificate,
  user,
}: {
  certificate: Certificate;
  user: User;
}) {
  const [course, setCourse] = React.useState<string>();
  const [grade, setGrade] = React.useState<GradingScheme>();
  const [isPending, startTransition] = useTransition();

  function handleSubmit() {
    startTransition(async () => {
      if (course && grade) {
        await applicationsRepository.addResults(user.uid, {
          course,
          grade,
        });
      }
    });
  }

  return (
    <div className='w-full'>
      <Divider className='mt-1 mb-5' />
      <div className='grid grid-cols-12 gap-3 items-center'>
        <Autocomplete
          label='Course'
          defaultItems={certificate.courses.map((course, index) => ({
            key: index,
            name: course,
          }))}
          className='col-span-5'
          size='sm'
          selectedKey={course}
          onSelectionChange={(item: Key) => {
            setCourse(item as string);
          }}
        >
          {(item) => <SelectItem key={item.key}>{item.name}</SelectItem>}
        </Autocomplete>
        <Select
          className='col-span-5'
          label={'Results'}
          variant='flat'
          selectedKeys={grade?.grade}
          onChange={(event) => {
            const item = event.target.value;
            setGrade(certificate.gradingSchemes.find((it) => it.grade == item));
          }}
          isDisabled={!course}
          size='sm'
          items={certificate.gradingSchemes}
        >
          {(it) => <SelectItem key={it.grade}>{it.grade}</SelectItem>}
        </Select>
        <Button
          className='col-span-1'
          fullWidth={true}
          isDisabled={!grade}
          isLoading={isPending}
          onClick={handleSubmit}
        >
          Add
        </Button>
      </div>
    </div>
  );
}

function ResultsTable({ user }: { user: User }) {
  const [results, setResults] = React.useState<Results[]>([]);
  useEffect(() => {
    return applicationsRepository.listenForDocument(user.uid, (data) => {
      setResults(data.results);
    });
  }, [user]);
  return (
    <Table>
      <TableHeader>
        <TableColumn>course</TableColumn>
        <TableColumn>grade</TableColumn>
      </TableHeader>
      <TableBody items={results}>
        {(item) => (
          <TableRow key={item.course}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}

type CertificateProps = {
  setValue: (value: Certificate | undefined) => void;
  value: Certificate | undefined;
};

function CertificateInput({ setValue, value }: CertificateProps) {
  const [loading, setLoading] = React.useState(true);
  const [certificates, setCertificates] = React.useState<Certificate[]>([]);

  useEffect(() => {
    certificateRepository
      .getAll()
      .then((data) => {
        setCertificates([
          ...data,
          {
            courses: [],
            gradingSchemes: [],
            id: '0',
            name: 'Other',
            passingGrade: null,
          },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      {loading ? (
        <Skeleton className='w-full h-14 rounded-lg' />
      ) : (
        <Autocomplete
          label='Highest Qualification'
          className='w-full'
          selectedKey={value?.id}
          onSelectionChange={(item: Key) => {
            setValue(certificates.find((c) => c.id === item));
          }}
          defaultItems={certificates}
          description={!value && 'Please select your highest qualification'}
          isLoading={loading}
        >
          {(item) => (
            <AutocompleteItem key={item.id}>{item.name}</AutocompleteItem>
          )}
        </Autocomplete>
      )}
    </>
  );
}
