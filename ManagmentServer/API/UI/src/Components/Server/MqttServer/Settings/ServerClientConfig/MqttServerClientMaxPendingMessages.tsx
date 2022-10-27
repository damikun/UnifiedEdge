import { useFormik } from "formik";
import React, { useMemo } from "react";
import { graphql } from "babel-plugin-relay/macro";
import { useFragment, useMutation } from "react-relay";
import { generateErrors, is } from "../../../../../Utils/Validation";
import { FormInput } from "../../../../../UIComponents/Form/FormInput";
import { useToast } from "../../../../../UIComponents/Toast/ToastProvider";
import StayledButton from "../../../../../UIComponents/Buttons/StayledButton";
import { MqttServerClientMaxPendingMessagesDataFragment$key } from "./__generated__/MqttServerClientMaxPendingMessagesDataFragment.graphql";
import { MqttServerClientMaxPendingMessagesUpdateMutation, SetMqttServerClientMaxPendingMessagesInput } from "./__generated__/MqttServerClientMaxPendingMessagesUpdateMutation.graphql";


export const MqttServerClientMaxPendingMessagesDataFragment = graphql`
  fragment MqttServerClientMaxPendingMessagesDataFragment on GQL_MqttServerClientCfg 
  {
    id
    serverUID
    maxPendingMessagesPerClient
  }
`;

const MqttServerClientMaxPendingMessagesMutationTag = graphql`
  mutation MqttServerClientMaxPendingMessagesUpdateMutation($input: SetMqttServerClientMaxPendingMessagesInput!) {
    setMqttServerClientMaxPendingMessages(input: $input) {
      ... on SetMqttServerClientMaxPendingMessagesPayload {          
        gQL_MqttServerClientCfg{
          ...MqttServerClientMaxPendingMessagesDataFragment
        }
      }
    }
}
`

export default React.memo(MqttServerClientMaxPendingMessages)

type MqttServerClientMaxPendingMessagesProps = {
  dataRef:MqttServerClientMaxPendingMessagesDataFragment$key | null | undefined;
}

function MqttServerClientMaxPendingMessages({dataRef}:MqttServerClientMaxPendingMessagesProps) {

  const data = useFragment(MqttServerClientMaxPendingMessagesDataFragment, dataRef!);
    const [
    commit,
    isInFlight,
  ] = useMutation<MqttServerClientMaxPendingMessagesUpdateMutation>(MqttServerClientMaxPendingMessagesMutationTag);

  const toast = useToast();

  const formik = useFormik<SetMqttServerClientMaxPendingMessagesInput>({
    initialValues: {
      server_uid:data.serverUID,
      maxPendingMessages: data?.maxPendingMessagesPerClient ?? 100,
    },

    onSubmit: async (values) => {
        !isInFlight &&
        commit({
          variables: {
            input: {
              server_uid: values.server_uid,
              maxPendingMessages: values.maxPendingMessages,
            }
          },

          onError(error) {
            toast?.pushError("Failed to process mutation");
            console.log(error);
          },

          onCompleted(response) {},

          updater(store, response) {
            if(response.setMqttServerClientMaxPendingMessages.gQL_MqttServerClientCfg){
              // ...
            }
          },

        });

    },

    validate: (values) => {
      return generateErrors(values, {
        maxPendingMessages: [is.greaterThan(99),is.lessThan(5001)]
      });
    },

    validateOnChange: true

  });

  const hasChanged = useMemo(() => data?.maxPendingMessagesPerClient !== null ? formik.values.maxPendingMessages !== data.maxPendingMessagesPerClient : formik.values.maxPendingMessages !== 100,
   [data, formik.values.maxPendingMessages]
  )

  return <form
    onSubmit={formik.handleSubmit}
    className="px-3 pb-2 w-full flex flex-row space-x-2 max-w-sm">
      <FormInput
      label="Max Pending messages"
      id="maxPendingMessages"
      type="number"
      min={100}
      max={5000}
      disabled={isInFlight}
      error={formik.errors.maxPendingMessages}
      value={formik.values.maxPendingMessages}
      onChange={formik.handleChange}
      afterFieldComponent={
        <StayledButton invisible={!hasChanged} isloading={isInFlight} className="mt-auto" type="submit">Save</StayledButton>
      }
    />
    
  </form>
}
