import { useSetRecoilState } from "recoil";
import { useParams } from "react-router-dom";
import { useCallback, useState } from "react";
import Modal from "../../../../UIComponents/Modal/Modal";
import MqttExplorerPublishMessage from "./MqttExplorerPublishMessage";
import { faEraser, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import StayledButton from "../../../../UIComponents/Buttons/StayledButton";
import { CreateDefaultStore, mqttExplorerStore } from "./MqttServerExplorer";


export default function MqttExplorerMessagesBarBar(){
  const [modalState, setModalState] = useState(false);

  const { id }: any = useParams<string>();    

  const [server_id] = useState(id);
  
  const setState = useSetRecoilState(mqttExplorerStore(server_id))

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

  const handleClean = useCallback(
    () => {
      setState(CreateDefaultStore())
    },
    [setState], 
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
        variant="secondarygray"
        onClick={handleClean}
        // size="normal"
        iconLeft={faEraser}>
          Clear
      </StayledButton>
      <StayledButton 
        onMobileIconOnly={false}
        variant="secondaryblue"
        onClick={handleOpen}
        // size="normal"
        iconLeft={faPaperPlane}>
          Publish
      </StayledButton>
    </div>
  </> 
}