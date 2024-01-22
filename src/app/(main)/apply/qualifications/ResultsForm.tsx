import React, { useTransition } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Autocomplete,
  SelectItem,
  Select,
} from '@nextui-org/react';
import {
  Certificate,
  GradingScheme,
} from '@/app/(admin)/admin/certificates/Certificate';
import { applicationsRepository } from '@/app/(admin)/admin/applications/repository';
import { User } from 'firebase/auth';
import { IconPlus } from '@tabler/icons-react';

type Props = {
  certificate: Certificate;
  user: User;
};

export default function ResultsForm({ certificate, user }: Props) {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const [course, setCourse] = React.useState<string>();
  const [grade, setGrade] = React.useState<GradingScheme>();
  const [isPending, startTransition] = useTransition();

  function handleSubmit() {
    startTransition(async () => {
      if (course && grade) {
        setCourse(undefined);
        setGrade(undefined);
        await applicationsRepository.addResults(user.uid, {
          course,
          grade,
        });
        onClose();
      }
    });
  }

  return (
    <>
      <Button
        variant='bordered'
        onPress={onOpen}
        startContent={<IconPlus size={'1rem'} />}
      >
        Add
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className='flex flex-col gap-1'>
                Add Results
              </ModalHeader>
              <ModalBody>
                <Autocomplete
                  label='Course'
                  defaultItems={certificate.courses
                    .sort((a, b) => a.localeCompare(b))
                    .map((course) => ({
                      key: course,
                      name: course,
                    }))}
                  className='col-span-5'
                  size='sm'
                  selectedKey={course}
                  onSelectionChange={(item) => {
                    setCourse(item as string);
                  }}
                >
                  {(item) => (
                    <SelectItem key={item.key}>{item.name}</SelectItem>
                  )}
                </Autocomplete>
                <Select
                  className='col-span-5'
                  label={'Results'}
                  variant='flat'
                  selectedKeys={grade?.grade}
                  onChange={(event) => {
                    const item = event.target.value;
                    setGrade(
                      certificate.gradingSchemes.find((it) => it.grade == item)
                    );
                  }}
                  isDisabled={!course}
                  size='sm'
                  items={certificate.gradingSchemes}
                >
                  {(it) => <SelectItem key={it.grade}>{it.grade}</SelectItem>}
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color='danger' variant='light' onPress={onClose}>
                  Close
                </Button>
                <Button
                  onPress={handleSubmit}
                  isDisabled={!grade}
                  isLoading={isPending}
                  onClick={handleSubmit}
                >
                  Add
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
