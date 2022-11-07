import clsx from "clsx";
import CreateNewUser from "./UserCreate";
import { useCallback, useState } from "react";
import Modal from "../../../UIComponents/Modal/Modal";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import StayledButton from "../../../UIComponents/Buttons/StayledButton";


export default function UserListBar(){
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
        <ModalContainer label="Create User">
          <CreateNewUser />
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

// --------------------------------

type ModalContainerProps = {
  children: React.ReactNode;
  label?:string
}

function ModalContainer({children,label}:ModalContainerProps){
  return <div className={clsx("flex flex-col w-full h-full",
    "bg-gray-50 z-50 rounded-md shadow-sm overflow-hidden")}>
    <ModalHeader label={label}/>
    <div className="p-5 xl:p-7">
      {children}
    </div>
  </div>
}

type ModalHeaderProps = {
  label?:string
}

function ModalHeader({label}:ModalHeaderProps){
  return <div className={clsx("w-full bg-gray-200 overflow-hidden",
  "px-2 py-1 font-semibold text-gray-800 shadow-sm")}>
    {label}
  </div>
}