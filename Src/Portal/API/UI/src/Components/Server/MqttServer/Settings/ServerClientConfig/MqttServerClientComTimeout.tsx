import { useFormik } from "formik";
import React, { useMemo } from "react";
import { graphql } from "babel-plugin-relay/macro";
import { useFragment, useMutation } from "react-relay";
import { generateErrors, is } from "../../../../../Utils/Validation";
import { FormInput } from "../../../../../UIComponents/Form/FormInput";
import { useToast } from "../../../../../UIComponents/Toast/ToastProvider";
import StayledButton from "../../../../../UIComponents/Buttons/StayledButton";
import { MqttServerClientComTimeoutDataFragment$key } from "./__generated__/MqttServerClientComTimeoutDataFragment.graphql";
import { MqttServerClientComTimeoutUpdateMutation, SetMqttServerClientCommunicationTimeoutInput } from "./__generated__/MqttServerClientComTimeoutUpdateMutation.graphql";
import { HandleErrors } from "../../../../../Utils/ErrorHelper";


export const MqttServerClientComTimeoutDataFragment = graphql`
  fragment MqttServerClientComTimeoutDataFragment on GQL_MqttServerClientCfg 
  {
    id
    serverUID
    communicationTimeout
  }
`;

const MqttServerClientComTimeoutMutationTag = graphql`
  mutation MqttServerClientComTimeoutUpdateMutation($input: SetMqttServerClientCommunicationTimeoutInput!) {
    setMqttServerClientCommunicationTimeout(input: $input) {
      ... on SetMqttServerClientCommunicationTimeoutPayload {          
        gQL_MqttServerClientCfg{
          ...MqttServerClientComTimeoutDataFragment
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

export default React.memo(MqttServerClientComTimeout)

type MqttServerClientComTimeoutProps = {
  dataRef:MqttServerClientComTimeoutDataFragment$key | null | undefined;
}

function MqttServerClientComTimeout({dataRef}:MqttServerClientComTimeoutProps) {

  const data = useFragment(MqttServerClientComTimeoutDataFragment, dataRef!);
    const [
    commit,
    isInFlight,
  ] = useMutation<MqttServerClientComTimeoutUpdateMutation>(MqttServerClientComTimeoutMutationTag);

  const toast = useToast();

  const formik = useFormik<SetMqttServerClientCommunicationTimeoutInput>({
    initialValues: {
      server_uid: data?.serverUID,
      timeout_ms: data?.communicationTimeout ?? 5000,
    },

    onSubmit: async (values) => {
        !isInFlight &&
        commit({
          variables: {
            input: {
              server_uid: values.server_uid,
              timeout_ms: values.timeout_ms,
            }
          },

          onError(error) {
            toast?.pushError("Failed to process mutation");
            console.log(error);
          },

          onCompleted(response) {},

          updater(store, response) {
            if(response?.setMqttServerClientCommunicationTimeout?.gQL_MqttServerClientCfg){
              // ...
            }

            HandleErrors(toast, response?.setMqttServerClientCommunicationTimeout?.errors);
          },

        });

    },

    validate: (values) => {
      return generateErrors(values, {
        timeout_ms: [is.greaterThan(999),is.lessThan(50001)]
      });
    },

    validateOnChange: true

  });

  const hasChanged = useMemo(() => data?.communicationTimeout !== null ? formik.values.timeout_ms !== data.communicationTimeout : formik.values.timeout_ms !== 5000,
   [data, formik.values.timeout_ms]
  )

  return <form
    onSubmit={formik.handleSubmit}
    className="px-3 pb-2 w-full flex flex-row space-x-2 max-w-sm">
      <FormInput
        label="Timeout (ms)"
        id="timeout_ms"
        disabled={isInFlight}
        type="number"
        min={1000}
        max={50000}
        error={formik.errors.timeout_ms}
        value={formik.values.timeout_ms}
        onChange={formik.handleChange}
        afterFieldComponent={
          <StayledButton invisible={!hasChanged} isloading={isInFlight} className="mt-auto" type="submit">Save</StayledButton>
        }
      />
  </form>
}
