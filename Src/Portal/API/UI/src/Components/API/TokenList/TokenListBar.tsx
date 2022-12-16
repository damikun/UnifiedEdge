import CreateNewToken from "./TokenCreate";
import { useCallback, useState } from "react";
import Modal from "../../../UIComponents/Modal/Modal";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import StayledButton from "../../../UIComponents/Buttons/StayledButton";
import ModalContainer from "../../../UIComponents/Modal/ModalContainer";


export default function TokenListBar(){
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
        <ModalContainer label="Generate Token">
          <CreateNewToken />
        </ModalContainer>
    </Modal>

    <StayledButton 
      onMobileIconOnly={false}
      variant="primaryblue"
      onClick={handleOpen}
      iconLeft={faPlus}>
        New
    </StayledButton>
  </> 
}
