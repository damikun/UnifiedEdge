import { useFormik } from "formik";
import React, { useMemo } from "react";
import { graphql } from "babel-plugin-relay/macro";
import { useFragment, useMutation } from "react-relay";
import { generateErrors, is } from "../../../../Utils/Validation";
import { FormInput } from "../../../../UIComponents/Form/FormInput";
import { useToast } from "../../../../UIComponents/Toast/ToastProvider";
import StayledButton from "../../../../UIComponents/Buttons/StayledButton";
import { UserLastNameSettingDataFragment$key } from "./__generated__/UserLastNameSettingDataFragment.graphql";
import { UpdateUserLastNameInput, UserLastNameSettingUpdateMutation } from "./__generated__/UserLastNameSettingUpdateMutation.graphql";
import { HandleErrors } from "../../../../Utils/ErrorHelper";


export const UserLastNameSettingDataFragment = graphql`
  fragment UserLastNameSettingDataFragment on GQL_User 
  {
    id
    lastName
  }
`;

const UserLastNameSettingMutationTag = graphql`
  mutation UserLastNameSettingUpdateMutation($input: UpdateUserLastNameInput!) {
    updateUserLastName(input: $input) {
      ... on UpdateUserLastNamePayload {          
        gQL_User{
          id
          lastName
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

export default React.memo(UserLastNameSetting)

type UserLastNameSettingProps = {
  dataRef:UserLastNameSettingDataFragment$key | null | undefined;
}

function UserLastNameSetting({dataRef}:UserLastNameSettingProps) {

  const data = useFragment(UserLastNameSettingDataFragment, dataRef!);
    const [
    commit,
    isInFlight,
  ] = useMutation<UserLastNameSettingUpdateMutation>(UserLastNameSettingMutationTag);

  const toast = useToast();

  const formik = useFormik<UpdateUserLastNameInput>({
    initialValues: {
      last_name:data.lastName??"",
      user_id:data.id
    },

    onSubmit: async (values) => {
      !isInFlight && hasChanged&&
        commit({
          variables: {
            input: {
              last_name: values.last_name,
              user_id:values.user_id,
            }
          },

          onError(error) {
            toast?.pushError("Failed to process mutation");
            console.log(error);
          },

          onCompleted(response) {},

          updater(store, response) {
            if(response?.updateUserLastName?.gQL_User){
              // ...
            }
            HandleErrors(toast, response?.updateUserLastName?.errors);
          },

        });

    },

    validate: (values) => {
      return generateErrors(values, {
        last_name: [
          is.required(),
          is.minLength(3),
        ],
        user_id :[is.required()]
      });
    },

    validateOnChange: true

  });

  const hasChanged = useMemo(() => formik.values.last_name !== data.lastName ,
   [data, formik.values.last_name]
  )

  return <form
    onSubmit={formik.handleSubmit}
    className="pb-0 w-full flex flex-row space-x-2 max-w-sm">
      <FormInput
        label="Last name"
        id="last_name"
        disabled={isInFlight}
        error={formik.errors.last_name}
        value={formik.values.last_name}
        onChange={formik.handleChange}
        afterFieldComponent={
          hasChanged && <StayledButton
          isloading={isInFlight}
          className="mt-auto"
          type="submit">
            Save
          </StayledButton>
        }
      /> 
  </form>
}
