import { useFormik } from "formik";
import React, { useMemo } from "react";
import { graphql } from "babel-plugin-relay/macro";
import { useFragment, useMutation } from "react-relay";
import { generateErrors } from "../../../../../Utils/Validation";
import { FormInput } from "../../../../../UIComponents/Form/FormInput";
import { useToast } from "../../../../../UIComponents/Toast/ToastProvider";
import StayledButton from "../../../../../UIComponents/Buttons/StayledButton";
import { MqttServerClientPresistSessionDataFragment$key } from "./__generated__/MqttServerClientPresistSessionDataFragment.graphql";
import { MqttServerClientPresistSessionUpdateMutation, SetMqttServerClientPresistSessionInput } from "./__generated__/MqttServerClientPresistSessionUpdateMutation.graphql";
import { HandleErrors } from "../../../../../Utils/ErrorHelper";


export const MqttServerClientPresistSessionDataFragment = graphql`
  fragment MqttServerClientPresistSessionDataFragment on GQL_MqttServerClientCfg 
  {
    id
    serverUID
    presistentSession
  }
`;

const MqttServerClientPresistSessionMutationTag = graphql`
  mutation MqttServerClientPresistSessionUpdateMutation($input: SetMqttServerClientPresistSessionInput!) {
    setMqttServerClientPresistSession(input: $input) {
      ... on SetMqttServerClientPresistSessionPayload {          
        gQL_MqttServerClientCfg{
          ...MqttServerClientPresistSessionDataFragment
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

export default React.memo(MqttServerClientPresistSession)

type MqttServerClientPresistSessionProps = {
  dataRef:MqttServerClientPresistSessionDataFragment$key | null | undefined;
}

function MqttServerClientPresistSession({dataRef}:MqttServerClientPresistSessionProps) {

  const data = useFragment(MqttServerClientPresistSessionDataFragment, dataRef!);
    const [
    commit,
    isInFlight,
  ] = useMutation<MqttServerClientPresistSessionUpdateMutation>(MqttServerClientPresistSessionMutationTag);

  const toast = useToast();

  const formik = useFormik<SetMqttServerClientPresistSessionInput>({
    initialValues: {
      server_uid:data.serverUID,
      presistSession: data?.presistentSession ?? false,
    },

    onSubmit: async (values) => {
        !isInFlight &&
        commit({
          variables: {
            input: {
              server_uid: values.server_uid,
              presistSession: values.presistSession,
            }
          },

          onError(error) {
            toast?.pushError("Failed to process mutation");
            console.log(error);
          },

          onCompleted(response) {},

          updater(store, response) {
            if(response?.setMqttServerClientPresistSession?.gQL_MqttServerClientCfg){
              // ...
            }
            HandleErrors(toast, response?.setMqttServerClientPresistSession?.errors);
          },

        });

    },

    validate: (values) => {
      return generateErrors(values, {
        presistSession: []
      });
    },

    validateOnChange: true

  });

  const hasChanged = useMemo(() => data?.presistentSession !== null ? formik.values.presistSession !== data.presistentSession : formik.values.presistSession !== false,
   [data, formik.values.presistSession]
  )

  return <form
    onSubmit={formik.handleSubmit}
    className="pb-0 w-full flex flex-row space-x-2 max-w-sm">
      <FormInput
      label="Presist session"
      id="presistSession"
      disabled={isInFlight}
      type="checkbox"
      error={formik.errors.presistSession}
      checked={formik.values.presistSession}
      onChange={formik.handleChange}
      afterFieldComponent={
        <StayledButton invisible={!hasChanged} isloading={isInFlight} className="mt-auto" type="submit">Save</StayledButton>
      }
    />
    
  </form>
}
