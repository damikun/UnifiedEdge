import { useFormik } from "formik";
import React, { useMemo } from "react";
import { graphql } from "babel-plugin-relay/macro";
import { useFragment, useMutation } from "react-relay";
import { HandleErrors } from "../../../Utils/ErrorHelper";
import { generateErrors } from "../../../Utils/Validation";
import { FormInput } from "../../../UIComponents/Form/FormInput";
import { useToast } from "../../../UIComponents/Toast/ToastProvider";
import StayledButton from "../../../UIComponents/Buttons/StayledButton";
import { ServerLocationDataFragment$key } from "./__generated__/ServerLocationDataFragment.graphql";
import { ServerLocationUpdateMutation, SetServerLocationInput } from "./__generated__/ServerLocationUpdateMutation.graphql";



export const ServerLocationDataFragment = graphql`
  fragment ServerLocationDataFragment on GQL_IServer 
  {
    id
    location
  }
`;

const ServerLocationMutationTag = graphql`
  mutation ServerLocationUpdateMutation($input: SetServerLocationInput!) {
    setServerLocation(input: $input) {
      ... on SetServerLocationPayload {          
        gQL_IServer{
          id
          location
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

export default React.memo(ServerLocation)

type ServerLocationProps = {
  dataRef:ServerLocationDataFragment$key | null | undefined;
}

function ServerLocation({dataRef}:ServerLocationProps) {

  const data = useFragment(ServerLocationDataFragment, dataRef!);
    const [
    commit,
    isInFlight,
  ] = useMutation<ServerLocationUpdateMutation>(ServerLocationMutationTag);

  const toast = useToast();

  const formik = useFormik<SetServerLocationInput>({
    initialValues: {
      id:data.id,
      location: data?.location ?? "",
    },

    onSubmit: async (values) => {
        !isInFlight &&
        commit({
          variables: {
            input: {
              id: data.id,
              location: values.location,
            }
          },

          onError(error) {
            toast?.pushError("Failed to process mutation");
            console.log(error);
          },

          onCompleted(response) {},

          updater(store, response) {
            if(response?.setServerLocation?.gQL_IServer){
              // ...
            }
            HandleErrors(toast, response?.setServerLocation?.errors);
          },

        });

    },

    validate: (values) => {
      return generateErrors(values, {
        location: []
      });
    },

    validateOnChange: true

  });

  const hasChanged = useMemo(() => data?.location !== null ? formik.values.location !== data.location : formik.values.location !== "",
   [data, formik.values.location]
  )

  return <form
    onSubmit={formik.handleSubmit}
    className="px-3 pb-2 w-full flex flex-row space-x-2 max-w-sm">
      <FormInput
      label="Server location"
      id="location"
      disabled={isInFlight}
      error={formik.errors.location}
      value={formik.values.location}
      onChange={formik.handleChange}
      afterFieldComponent={
        hasChanged && <StayledButton isloading={isInFlight} className="mt-auto" type="submit">Save</StayledButton>
      }
    />
    
  </form>
}
