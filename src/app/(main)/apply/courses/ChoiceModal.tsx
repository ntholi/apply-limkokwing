import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  CardBody,
  Card,
} from '@nextui-org/react';
import { IconPlus } from '@tabler/icons-react';
import RecommendationList from './RecommendationList';
import { Application } from '@/app/(admin)/admin/applications/modals/Application';

type Props = {
  label: string;
  application: Application;
  onSelected: (item: Recommendation) => void;
};

function ChoiceModal({ label, application, onSelected }: Props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Card isPressable onPress={onOpen} className='w-60 h-48'>
        <CardBody className='flex-col items-center justify-center gap-2'>
          <IconPlus size={48} />
          {label}
        </CardBody>
      </Card>
      <Modal isOpen={isOpen} onClose={onClose} size='5xl' placement='top'>
        <ModalContent>
          <ModalHeader className='flex flex-col gap-1'>
            Pick {label}
          </ModalHeader>
          <ModalBody>
            <RecommendationList
              application={application}
              onSelected={(item) => {
                onSelected(item);
                onClose();
              }}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}

export default ChoiceModal;
