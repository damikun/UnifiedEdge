import Modal from './Modal';
import * as React from 'react';
import ModalContainer from './ModalContainer';
import {useCallback, useMemo, useState} from 'react';

type useModalProps = {
  position?: "center" | "top" | "fullscreen"
}

export default function useModal({position = "top"}:useModalProps = {}): [
  React.ReactNode | null,
  (label: string, showModal: (onClose: () => void) => React.ReactNode) => void,
  () => void
] {
  const [modalContent, setModalContent] = useState<null | {
    closeOnClickOutside: boolean;
    content: React.ReactNode;
    label: string;
  }>(null);

  const onClose = useCallback(() => {
    setModalContent(null);
  }, []);

  const close= useCallback(
    () => {
      onClose()
    },
    [onClose],
  )
  

  const modal = useMemo(() => {
    if (modalContent === null) {
      return null;
    }
    const {label, content} = modalContent;

    return <Modal
      position={position}
      onClose={onClose}
      component={
        <ModalContainer label={label}>
          {content}
        </ModalContainer>
      }
      isOpen={content!=null} 
    />

  }, [modalContent, onClose, position]);

  const showModal = useCallback(
    (
      label: string,
      getContent: (onClose: () => void) => React.ReactNode,
      closeOnClickOutside = false,
    ) => {
      setModalContent({
        closeOnClickOutside,
        content: getContent(onClose),
        label,
      });
    },
    [onClose],
  );

  return [modal, showModal, close];
}
