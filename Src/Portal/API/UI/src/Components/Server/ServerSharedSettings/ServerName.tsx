import { useFormik } from "formik";
import React, { useMemo } from "react";
import { graphql } from "babel-plugin-relay/macro";
import { useFragment, useMutation } from "react-relay";
import { HandleErrors } from "../../../Utils/ErrorHelper";
import { generateErrors, is } from "../../../Utils/Validation";
import { FormInput } from "../../../UIComponents/Form/FormInput";
import { useToast } from "../../../UIComponents/Toast/ToastProvider";
import StayledButton from "../../../UIComponents/Buttons/StayledButton";
import { ServerNameDataFragment$key } from "./__generated__/ServerNameDataFragment.graphql";
import { ServerNameUpdateMutation, SetServerNameInput } from "./__generated__/ServerNameUpdateMutation.graphql";


export const ServerNameDataFragment = graphql`
  fragment ServerNameDataFragment on GQL_IServer 
  {
    id
    name
  }
`;

const ServerNameMutationTag = graphql`
  mutation ServerNameUpdateMutation($input: SetServerNameInput!) {
    setServerName(input: $input) {
      ... on SetServerNamePayload {          
        gQL_IServer{
          id
          name
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

export default React.memo(ServerName)

type ServerNameProps = {
  dataRef:ServerNameDataFragment$key | null | undefined;
}

function ServerName({dataRef}:ServerNameProps) {

  const data = useFragment(ServerNameDataFragment, dataRef!);

  const [
    commit,
    isInFlight,
  ] = useMutation<ServerNameUpdateMutation>(ServerNameMutationTag);

  const toast = useToast();

  const formik = useFormik<SetServerNameInput>({
    initialValues: {
      id:data.id,
      name: data?.name ?? "Undefined",
    },

    onSubmit: async (values) => {
        !isInFlight &&
        commit({
          variables: {
            input: {
              id: data.id,
              name: values.name,
            }
          },

          onError(error) {
            toast?.pushError("Failed to process mutation");
            console.log(error);
          },

          onCompleted(response) {},

          updater(store, response) {
            if(response?.setServerName?.gQL_IServer){
              // ...
            }
            HandleErrors(toast, response?.setServerName?.errors);
          },

        });

    },

    validate: (values) => {
      return generateErrors(values, {
        name: [
          is.required(),
          is.minLength(2),
        ]
      });
    },

    validateOnChange: true

  });

  const hasChanged = useMemo(() => formik.values.name !== data.name ,
   [data, formik.values.name]
  )

  return <form
    onSubmit={formik.handleSubmit}
    className="pb-0 w-full flex flex-row space-x-2 max-w-sm">
      <FormInput
      label="Server name"
      id="name"
      disabled={isInFlight}
      error={formik.errors.name}
      value={formik.values.name}
      onChange={formik.handleChange}
      afterFieldComponent={
        hasChanged && <StayledButton isloading={isInFlight} className="mt-auto" type="submit">Save</StayledButton>
      }
    />
    
  </form>
}
