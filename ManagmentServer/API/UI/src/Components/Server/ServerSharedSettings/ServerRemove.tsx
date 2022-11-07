import clsx from "clsx";
import { useNavigate } from "react-router";
import { graphql } from "babel-plugin-relay/macro";
import { useFragment, useMutation } from "react-relay";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Section from "../../../UIComponents/Section/Section";
import React, { useCallback, useState,useTransition } from "react";
import { useToast } from "../../../UIComponents/Toast/ToastProvider";
import ModalContainer from "../../../UIComponents/Modal/ModalContainer";
import StayledButton from "../../../UIComponents/Buttons/StayledButton";
import Modal, { useModalContext } from "../../../UIComponents/Modal/Modal";
import { ServerRemoveDataFragment$key } from "./__generated__/ServerRemoveDataFragment.graphql";
import { ServerRemoveUpdateMutation } from "./__generated__/ServerRemoveUpdateMutation.graphql";

export const ServerRemoveDataFragment = graphql`
  fragment ServerRemoveDataFragment on GQL_IServer
  {
    id
  }
`;

const ServerRemoveMutationTag = graphql`
  mutation ServerRemoveUpdateMutation(
    $input: RemoveServerInput!,
    $connections: [ID!]!) {
    removeServer(input: $input) {
      ... on RemoveServerPayload {          
        removed_id @deleteEdge(connections: $connections)
      }
    }
  }
`

export default React.memo(ServerRemove)

type ServerRemoveProps = {
  dataRef:ServerRemoveDataFragment$key | null | undefined;
}

function ServerRemove({dataRef}:ServerRemoveProps) {

  const [isOpen, setOpen] = useState(false)  

  const hanldeModalOpen = useCallback(
    () => setOpen(true),
    [],
  )

  const hanldeModalClose = useCallback(
    () =>setOpen(false),
    [],
  )

  return <>
    <Modal
      isOpen={isOpen}
      position="top"
      onClose={hanldeModalClose}
      component={
        <DeleteServerModal dataRef={dataRef} />
      }
    />
    {
      dataRef && <Section 
      name="Remove"
      component={
        <div className={clsx("flex bg-gray-100 flex-col w-full pt-4",
        "border border-gray-200 rounded-sm shadow-sm pt-2 p-5 space-y-2")}>
          <div className="max-w-lg w-full">
            <StayledButton
              variant="error"
              iconLeft={faTrash}
              size="normal"
              onClick={hanldeModalOpen}>
              Delete
            </StayledButton>
          </div>
        </div>
      }></Section>
    }
  </>
}


///////////////////////////////
///////////////////////////////


type DeleteServerModalProps = {
  dataRef:ServerRemoveDataFragment$key | null | undefined;
}

function DeleteServerModal({dataRef}:DeleteServerModalProps){

  const data = useFragment(ServerRemoveDataFragment, dataRef!);

  const toast = useToast();

  const ctx = useModalContext();

  const navigate = useNavigate();

  //@ts-ignore
  const [_, startTransition] = useTransition({
      busyDelayMs: 2000,
  });

  const handleNavigate = useCallback(
    ()=>{
      startTransition(() => {
        navigate("/Monitor")
    });
    },
    [navigate, startTransition],
    )

    
  const [
    commit,
    isInFlight,
  ] = useMutation<ServerRemoveUpdateMutation>(ServerRemoveMutationTag);

  const handleMutation = useCallback(
    () => {
      !isInFlight &&  commit({
        variables: {
          input: {
            id:data.id
          },
          connections: []
        },

        onError(error) {
          toast?.pushError("Failed to remove Server");
          console.log(error);
        },

        onCompleted(response) {},

        updater(store, response) {
          if(response.removeServer.removed_id){
            ctx.close()
            handleNavigate()
          }
        },

      });
    },
    [data.id,isInFlight,commit,ctx,toast,handleNavigate],
  )

  const handleCancle = useCallback(
    () => ctx.close(),
    [ctx],
  )
  
  return <ModalContainer label="Remove">
    <div className="flex flex-col space-y-5">
      <div>Are you sure you wanna delete this Server?</div>

      <div className="flex w-full justify-end">
        <div className="flex space-x-2">
          <StayledButton
            isloading={isInFlight}
            disabled={isInFlight}
            size="normal"
            onClick={handleMutation}
            variant="primaryred"
            >
            Confirm
          </StayledButton>
          <StayledButton
            disabled={isInFlight}
            onClick={handleCancle}
            size="normal"
            variant="secondarygray"
            >
            Cancle
          </StayledButton>
        </div>
      </div>
    </div>
  </ModalContainer>
}