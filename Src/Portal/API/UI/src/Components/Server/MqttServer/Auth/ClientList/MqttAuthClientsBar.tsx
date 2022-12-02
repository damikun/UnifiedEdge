import { useCallback, useState } from "react";
import CreateMqttAuthClient from "./CreateMqttAuthClient";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../../../../UIComponents/Modal/Modal";
import StayledButton from "../../../../../UIComponents/Buttons/StayledButton";
import ModalContainer from "../../../../../UIComponents/Modal/ModalContainer";


export default function MqttAuthClientsBar(){
  const [modalState, setModalState] = useState(false);

  const handleClose = useCallback(
    () => {
      setModalState(false);
    },
    [],
  )
  
  const handleOpen = useCallback(
    () => {
      setModalState(true);
    },
    [], 
  )

  return <>
    <Modal
      isOpen={modalState}
      position="center"
      onClose={handleClose}>
        <ModalContainer label="Define client">
          <CreateMqttAuthClient />
        </ModalContainer>
    </Modal>

    <StayledButton 
      onMobileIconOnly={false}
      variant="primaryblue"
      onClick={handleOpen}
      iconLeft={faPlus}>
        Add
    </StayledButton>
  </> 
}