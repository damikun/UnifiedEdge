import { useCallback, useState } from "react";
import Modal from "../../../../UIComponents/Modal/Modal";
import { faMessage } from "@fortawesome/free-solid-svg-icons";
import MqttExplorerPublishMessage from "./MqttExplorerPublishMessage";
import StayledButton from "../../../../UIComponents/Buttons/StayledButton";



export default function MqttExplorerMessagesBarBar(){
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
      <MqttExplorerPublishMessage />
    </Modal>

    <div className="flex flex-row space-x-3 items-center flex-nowrap">
      <StayledButton 
        onMobileIconOnly={false}
        variant="primaryblue"
        onClick={handleOpen}
        size="normal"
        iconRight={faMessage}>
          Publish
      </StayledButton>
    </div>
  </> 
}