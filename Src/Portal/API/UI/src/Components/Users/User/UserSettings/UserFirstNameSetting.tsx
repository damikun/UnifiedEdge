import { useFormik } from "formik";
import React, { useMemo } from "react";
import { graphql } from "babel-plugin-relay/macro";
import { useFragment, useMutation } from "react-relay";
import { generateErrors, is } from "../../../../Utils/Validation";
import { FormInput } from "../../../../UIComponents/Form/FormInput";
import { useToast } from "../../../../UIComponents/Toast/ToastProvider";
import StayledButton from "../../../../UIComponents/Buttons/StayledButton";
import { UserFirstNameSettingDataFragment$key } from "./__generated__/UserFirstNameSettingDataFragment.graphql";
import { UpdateUserFirstNameInput, UserFirstNameSettingUpdateMutation } from "./__generated__/UserFirstNameSettingUpdateMutation.graphql";
import { HandleErrors } from "../../../../Utils/ErrorHelper";


export const UserFirstNameSettingDataFragment = graphql`
  fragment UserFirstNameSettingDataFragment on GQL_User 
  {
    id
    firstName
  }
`;

const UserFirstNameSettingMutationTag = graphql`
  mutation UserFirstNameSettingUpdateMutation($input: UpdateUserFirstNameInput!) {
    updateUserFirstName(input: $input) {
      ... on UpdateUserFirstNamePayload {          
        gQL_User{
          id
          firstName
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

export default React.memo(UserFirstNameSetting)

type UserFirstNameSettingProps = {
  dataRef:UserFirstNameSettingDataFragment$key | null | undefined;
}

function UserFirstNameSetting({dataRef}:UserFirstNameSettingProps) {

  const data = useFragment(UserFirstNameSettingDataFragment, dataRef!);
    const [
    commit,
    isInFlight,
  ] = useMutation<UserFirstNameSettingUpdateMutation>(UserFirstNameSettingMutationTag);

  const toast = useToast();

  const formik = useFormik<UpdateUserFirstNameInput>({
    initialValues: {
      first_name:data.firstName??"",
      user_id:data.id
    },

    onSubmit: async (values) => {
      !isInFlight && hasChanged&&
        commit({
          variables: {
            input: {
              first_name: values.first_name,
              user_id:values.user_id,
            }
          },

          onError(error) {
            toast?.pushError("Failed to process mutation");
            console.log(error);
          },

          onCompleted(response) {},

          updater(store, response) {
            if(response?.updateUserFirstName?.gQL_User){
              // ...
            }
            HandleErrors(toast, response?.updateUserFirstName?.errors);
          },

        });

    },

    validate: (values) => {
      return generateErrors(values, {
        first_name: [
          is.required(),
          is.minLength(3),
        ],
        user_id :[is.required()]
      });
    },

    validateOnChange: true

  });

  const hasChanged = useMemo(() => formik.values.first_name !== data.firstName ,
   [data, formik.values.first_name]
  )

  return <form
    onSubmit={formik.handleSubmit}
    className="pb-2 w-full flex flex-row space-x-2 max-w-sm">
      <FormInput
        label="First name"
        id="first_name"
        disabled={isInFlight}
        error={formik.errors.first_name}
        value={formik.values.first_name}
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
