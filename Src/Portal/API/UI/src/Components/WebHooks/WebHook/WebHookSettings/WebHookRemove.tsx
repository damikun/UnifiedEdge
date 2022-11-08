import { useNavigate } from "react-router";
import { graphql } from "babel-plugin-relay/macro";
import { useFragment, useMutation } from "react-relay";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import React, { useCallback, useState,useTransition } from "react";
import { useToast } from "../../../../UIComponents/Toast/ToastProvider";
import ModalContainer from "../../../../UIComponents/Modal/ModalContainer";
import StayledButton from "../../../../UIComponents/Buttons/StayledButton";
import Modal, { useModalContext } from "../../../../UIComponents/Modal/Modal";
import { WebHookRemoveDataFragment$key } from "./__generated__/WebHookRemoveDataFragment.graphql";
import { WebHookRemoveUpdateMutation } from "./__generated__/WebHookRemoveUpdateMutation.graphql";
import { HandleErrors } from "../../../../Utils/ErrorHelper";

export const WebHookRemoveDataFragment = graphql`
  fragment WebHookRemoveDataFragment on GQL_WebHook 
  {
    id
  }
`;

const WebHookRemoveMutationTag = graphql`
  mutation WebHookRemoveUpdateMutation($input: RemoveWebHookInput!) {
    removeWebHook(input: $input) {
      ... on RemoveWebHookPayload {          
        gQL_WebHook{
          id
        }
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

export default React.memo(WebHookRemove)

type WebHookRemoveProps = {
  dataRef:WebHookRemoveDataFragment$key | null | undefined;
}

function WebHookRemove({dataRef}:WebHookRemoveProps) {

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
        <DeleteHookModal dataRef={dataRef} />
      }
    />

    <StayledButton
      variant="error"
      iconLeft={faTrash}
      size="normal"
      onClick={hanldeModalOpen}>
      Delete
    </StayledButton>
  </>
}


///////////////////////////////
///////////////////////////////


type DeleteHookModalProps = {
  dataRef:WebHookRemoveDataFragment$key | null | undefined;
}

function DeleteHookModal({dataRef}:DeleteHookModalProps){

  const data = useFragment(WebHookRemoveDataFragment, dataRef!);

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
        navigate("/WebHooks")
    });
    },
    [navigate, startTransition],
    )

    
  const [
    commit,
    isInFlight,
  ] = useMutation<WebHookRemoveUpdateMutation>(WebHookRemoveMutationTag);

  const handleMutation = useCallback(
    () => {
      !isInFlight &&  commit({
        variables: {
          input: {
            hook_id:data.id
          }
        },

        onError(error) {
          toast?.pushError("Failed to remove WebHook");
          console.log(error);
        },

        onCompleted(response) {},

        updater(store, response) {
          if(response?.removeWebHook?.gQL_WebHook){
            ctx.close()
            handleNavigate()
          }
          HandleErrors(toast, response?.removeWebHook?.errors);
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
      <div>Are you sure you wanna delete this WebHook?</div>

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