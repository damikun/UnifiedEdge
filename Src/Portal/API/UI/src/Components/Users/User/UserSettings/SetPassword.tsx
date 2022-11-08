import { useFormik } from "formik";
import { graphql } from "babel-plugin-relay/macro";
import React, { useCallback, useState } from "react";
import { useFragment, useMutation } from "react-relay";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { generateErrors, is } from "../../../../Utils/Validation";
import { FormInput } from "../../../../UIComponents/Form/FormInput";
import { useToast } from "../../../../UIComponents/Toast/ToastProvider";
import ModalContainer from "../../../../UIComponents/Modal/ModalContainer";
import StayledButton from "../../../../UIComponents/Buttons/StayledButton";
import Modal, { useModalContext } from "../../../../UIComponents/Modal/Modal";
import { SetPasswordDataFragment$key } from "./__generated__/SetPasswordDataFragment.graphql";
import { SetPasswordMutation, SetUserPasswordInput } from "./__generated__/SetPasswordMutation.graphql";
import { HandleErrors } from "../../../../Utils/ErrorHelper";



export const SetPasswordDataFragment = graphql`
  fragment SetPasswordDataFragment on GQL_User 
  {
    id
  }
`;

export default React.memo(SetPassword)

type SetPasswordProps = {
  dataRef:SetPasswordDataFragment$key | null | undefined;
}

function SetPassword({dataRef}:SetPasswordProps) {

  const data = useFragment(SetPasswordDataFragment, dataRef!);

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
        <SetPasswordModal user_id={data.id} />
      }
    />

    <StayledButton
      variant="secondaryblue"
      iconLeft={faPen}
      size="normal"
      onClick={hanldeModalOpen}>
      Update
    </StayledButton>
  </>
}


///////////////////////////////
///////////////////////////////

const SetPasswordMutationTag = graphql`
  mutation SetPasswordMutation(
      $input: SetUserPasswordInput!
    ){
    setUserPassword(input: $input) {
      ... on SetUserPasswordPayload {
        gQL_User{
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
  }`


type SetPasswordModalProps = {
  user_id:string;
}

function SetPasswordModal({user_id}:SetPasswordModalProps){

  const [
    commit,
    isInFlight,
  ] = useMutation<SetPasswordMutation>(SetPasswordMutationTag);

  const toast = useToast();

  const ctx = useModalContext();

  const formik = useFormik<SetUserPasswordInput>({
    initialValues: {
      user_id: user_id??"",
      current_password: "",
      new_password: "",
    },

    onSubmit: async (values) => {
        !isInFlight &&
        commit({
          variables: {
            input: {
              user_id: values.user_id,
              current_password:values.current_password,
              new_password:values.new_password,
            }
          },

          onError(error) {
            toast?.pushError("Failed to process mutation");
            console.log(error);
          },

          onCompleted(response) {},

          updater(store, response) {
            if(response?.setUserPassword?.gQL_User){
              toast?.pushSuccess("Pasword changed")
              ctx?.close();
            }
            HandleErrors(toast, response?.setUserPassword?.errors);
          },

        });

    },

    validate: (values) => {
      return generateErrors(values, {
        current_password: [
          is.required(),
          is.minLength(3),
        ],
        new_password: [
          is.required(),
          is.minLength(3),
        ],
      });
    },

    validateOnChange: false

  });
  
  const handleCancle = useCallback(
    () => ctx.close(),
    [ctx],
  )
  
  return <ModalContainer label="Password">
    <form
    onSubmit={formik.handleSubmit}
    className="px-3 pb-2 w-full space-y-2">
      <FormInput
        label="Current password"
        id="current_password"
        type={"password"}
        disabled={isInFlight}
        error={formik.errors.current_password}
        value={formik.values.current_password??""}
        onChange={formik.handleChange}
      />

      <FormInput
        label="New password"
        id="new_password"
        type={"password"}
        disabled={isInFlight}
        error={formik.errors.new_password}
        value={formik.values.new_password??""}
        onChange={formik.handleChange}
      />

      <div className="mb-6 text-center h-10 flex-1">
        <StayledButton
          isloading={isInFlight}
          variant="secondaryblue"
          disabled={isInFlight}
          className="flex-1 my-auto w-full"
          type="submit"
        >
          <div className="mx-auto my-auto">
            Update
          </div>
        </StayledButton>
      </div>
    </form>
  </ModalContainer>
}