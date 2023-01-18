import { useCallback, useState } from "react";
import CreateNewWebHook from "./WebHookCreate";
import Modal from "../../../UIComponents/Modal/Modal";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import StayledButton from "../../../UIComponents/Buttons/StayledButton";
import ModalContainer from "../../../UIComponents/Modal/ModalContainer";


export default function WebHookListBar(){
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
        <ModalContainer label="Create WebHook">
          <CreateNewWebHook />
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
