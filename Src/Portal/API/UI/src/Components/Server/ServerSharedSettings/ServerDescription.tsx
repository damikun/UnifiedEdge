import { useFormik } from "formik";
import React, { useMemo } from "react";
import { graphql } from "babel-plugin-relay/macro";
import { useFragment, useMutation } from "react-relay";
import { HandleErrors } from "../../../Utils/ErrorHelper";
import { generateErrors, is } from "../../../Utils/Validation";
import { FormInput } from "../../../UIComponents/Form/FormInput";
import { useToast } from "../../../UIComponents/Toast/ToastProvider";
import StayledButton from "../../../UIComponents/Buttons/StayledButton";
import { ServerDescriptionDataFragment$key } from "./__generated__/ServerDescriptionDataFragment.graphql";
import { ServerDescriptionUpdateMutation, SetServerDescriptionInput } from "./__generated__/ServerDescriptionUpdateMutation.graphql";


export const ServerDescriptionDataFragment = graphql`
  fragment ServerDescriptionDataFragment on GQL_IServer 
  {
    id
    description
  }
`;

const ServerDescriptionMutationTag = graphql`
  mutation ServerDescriptionUpdateMutation($input: SetServerDescriptionInput!) {
    setServerDescription(input: $input) {
      ... on SetServerDescriptionPayload {          
        gQL_IServer{
          id
          description
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

export default React.memo(ServerDescription)

type ServerDescriptionProps = {
  dataRef:ServerDescriptionDataFragment$key | null | undefined;
}

function ServerDescription({dataRef}:ServerDescriptionProps) {

  const data = useFragment(ServerDescriptionDataFragment, dataRef!);
    const [
    commit,
    isInFlight,
  ] = useMutation<ServerDescriptionUpdateMutation>(ServerDescriptionMutationTag);

  const toast = useToast();

  const formik = useFormik<SetServerDescriptionInput>({
    initialValues: {
      id:data.id,
      description: data?.description ?? "",
    },

    onSubmit: async (values) => {
        !isInFlight &&
        commit({
          variables: {
            input: {
              id: data.id,
              description: values.description,
            }
          },

          onError(error) {
            toast?.pushError("Failed to process mutation");
            console.log(error);
          },

          onCompleted(response) {},

          updater(store, response) {
            if(response?.setServerDescription?.gQL_IServer){
              // ...
            }
            HandleErrors(toast, response?.setServerDescription?.errors);
          },

        });

    },

    validate: (values) => {
      return generateErrors(values, {
        description: []
      });
    },

    validateOnChange: true

  });

  const hasChanged = useMemo(() => data?.description !== null ? formik.values.description !== data.description : formik.values.description !== "",
   [data, formik.values.description]
  )

  return <form
    onSubmit={formik.handleSubmit}
    className="pb-0 w-full flex flex-row space-x-2 max-w-sm">
      <FormInput
        label="Server description"
        id="description"
        disabled={isInFlight}
        error={formik.errors.description}
        value={formik.values.description}
        onChange={formik.handleChange}
        afterFieldComponent={
          hasChanged && <StayledButton isloading={isInFlight} className="mt-auto" type="submit">Save</StayledButton>
        }
      />
  </form>
}
