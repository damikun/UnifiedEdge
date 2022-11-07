import { useNavigate } from "react-router";
import { graphql } from "babel-plugin-relay/macro";
import { useFragment, useMutation } from "react-relay";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import React, { useCallback, useState,useTransition } from "react";
import { useToast } from "../../../../UIComponents/Toast/ToastProvider";
import ModalContainer from "../../../../UIComponents/Modal/ModalContainer";
import StayledButton from "../../../../UIComponents/Buttons/StayledButton";
import Modal, { useModalContext } from "../../../../UIComponents/Modal/Modal";
import { UserRemoveDataFragment$key } from "./__generated__/UserRemoveDataFragment.graphql";
import { UserRemoveUpdateMutation } from "./__generated__/UserRemoveUpdateMutation.graphql";

export const UserRemoveDataFragment = graphql`
  fragment UserRemoveDataFragment on GQL_User 
  {
    id
  }
`;

const UserRemoveMutationTag = graphql`
  mutation UserRemoveUpdateMutation($input: RemoveUserInput!) {
    removeUser(input: $input) {
      ... on RemoveUserPayload {          
        gQL_User{
          id
        }
      }
    }
  }
`

export default React.memo(UserRemove)

type UserRemoveProps = {
  dataRef:UserRemoveDataFragment$key | null | undefined;
}

function UserRemove({dataRef}:UserRemoveProps) {

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
        <DeleteUserModal dataRef={dataRef} />
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


type DeleteUserModalProps = {
  dataRef:UserRemoveDataFragment$key | null | undefined;
}

function DeleteUserModal({dataRef}:DeleteUserModalProps){

  const data = useFragment(UserRemoveDataFragment, dataRef!);

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
        navigate("/Users")
    });
    },
    [navigate, startTransition],
    )

    
  const [
    commit,
    isInFlight,
  ] = useMutation<UserRemoveUpdateMutation>(UserRemoveMutationTag);

  const handleMutation = useCallback(
    () => {
      !isInFlight &&  commit({
        variables: {
          input: {
            user_id:data.id
          }
        },

        onError(error) {
          toast?.pushError("Failed to remove User");
          console.log(error);
        },

        onCompleted(response) {},

        updater(store, response) {
          if(response.removeUser.gQL_User){
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
      <div>Are you sure you wanna delete this user?</div>

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