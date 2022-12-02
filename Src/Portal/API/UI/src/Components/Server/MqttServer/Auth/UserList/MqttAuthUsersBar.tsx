import { useCallback, useState } from "react";
import CreateMqttAuthUser from "./CreateMqttAuthUser";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Modal from "../../../../../UIComponents/Modal/Modal";
import StayledButton from "../../../../../UIComponents/Buttons/StayledButton";
import ModalContainer from "../../../../../UIComponents/Modal/ModalContainer";


export default function MqttAuthUsersBar(){
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
      <ModalContainer label="Define User">
        <CreateMqttAuthUser />
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