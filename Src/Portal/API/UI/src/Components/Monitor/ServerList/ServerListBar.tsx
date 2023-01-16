import clsx from "clsx";
import AddNewServer from "../CreateServer";
import { useMutation } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import Modal from "../../../UIComponents/Modal/Modal";
import { useCallback, useMemo, useState } from "react";
import { HandleErrors } from "../../../Utils/ErrorHelper";
import { useToast } from "../../../UIComponents/Toast/ToastProvider";
import StayledButton from "../../../UIComponents/Buttons/StayledButton";
import { faPlay, faPlus, faStop } from "@fortawesome/free-solid-svg-icons";
import { ServerListBarprocessServerGroupCmdMutation } from "./__generated__/ServerListBarprocessServerGroupCmdMutation.graphql";


export default function ServerListBar(){
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
        <ModalContainer label="Create server">
          <AddNewServer />
        </ModalContainer>
    </Modal>

    <div className="flex flex-row flex-nowrap space-x-3 items-center">
      <StayledButton 
        onMobileIconOnly={false}
        variant="primaryblue"
        onClick={handleOpen}
        iconLeft={faPlus}>
          Add
      </StayledButton>

      <ControlSection/>
    </div>
  </> 
}

// --------------------------------

type ModalContainerProps = {
  children: React.ReactNode;
  label?:string
}

function ModalContainer({children,label}:ModalContainerProps){
  return <div className={clsx("flex flex-col w-full h-full",
    "bg-gray-50 z-50 rounded-lg shadow-sm overflow-hidden")}>
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


const ServerListBarprocessServerGroupCmdMutationTag = graphql`
    mutation ServerListBarprocessServerGroupCmdMutation($input: ProcessServerGroupCmdInput!) {
      processServerGroupCmd(input: $input) {
        ... on ProcessServerGroupCmdPayload {     

          gQL_ServerGroupResult

          errors{
            __typename

            ... on ValidationError{
                errors{
                property
                message
                }
            }

            ... on ResultError{
                message
            }
            }
        }
    }
}
`

function ControlSection(){
    
  const [commit_start,isInFlight_start] = useMutation<ServerListBarprocessServerGroupCmdMutation>(
    ServerListBarprocessServerGroupCmdMutationTag
  );

  const [commit_stop,isInFlight_stop] = useMutation<ServerListBarprocessServerGroupCmdMutation>(
    ServerListBarprocessServerGroupCmdMutationTag
  );

  const toast = useToast();

  const handleStart = useCallback(
      () => {
      !isInFlight_start && commit_start({
          variables: {
            input: {
              cmd:"START"
            }
          },

          onError(error) {
            toast?.pushError("Failed to process mutation");
            console.log(error);
          },

          onCompleted(response) {},

          updater(store, response) {
              HandleErrors(toast, response?.processServerGroupCmd?.errors);
          },

        });
    },[commit_start, isInFlight_start, toast],
  )

  
  const handleStop = useCallback(
    () => {
    !isInFlight_stop && commit_stop({
        variables: {
          input: {
            cmd:"STOP"
          }
        },

        onError(error) {
          toast?.pushError("Failed to process mutation");
          console.log(error);
        },

        onCompleted(response) {},

        updater(store, response) {
            HandleErrors(toast, response?.processServerGroupCmd?.errors);
        },

      });
    },[commit_stop, isInFlight_stop, toast],
  ) 

    const isInFlight = useMemo(() => isInFlight_start || isInFlight_stop, [isInFlight_start,isInFlight_stop])

    return  <div className={clsx("p-2 flex m-0.5 justify-cente",
    "flex items-center")}>
    <div className={clsx("flex-row flex space-x-2 px-2 py-1",
    "bg-gray-200 shadow-sm rounded-lg")}>
        <StayledButton
            variant={!isInFlight ?"primaryblue":"primarygray"}
            disabled={isInFlight}
            className="w-9"
            isloading={isInFlight_start}
            iconOnly
            size="small"
            iconLeft={faPlay}
            onClick={handleStart}
        />
        <Divider/>
        <StayledButton
            variant={!isInFlight ?"primaryred":"primarygray"}
            disabled={isInFlight}
            className="w-9"
            isloading={isInFlight_stop}
            iconOnly
            size="small"
            iconLeft={faStop}
            onClick={handleStop}
        />
    </div>
  </div>
}

function Divider(){
  return <div className="whitespace-pre w-0.5 bg-gray-300 bg-opacity-80"></div>
}