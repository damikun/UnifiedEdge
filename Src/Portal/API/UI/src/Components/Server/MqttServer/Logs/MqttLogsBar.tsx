import { useParams } from "react-router-dom";
import { useCallback, useState } from "react";
import { graphql } from "babel-plugin-relay/macro";
import { useFragment, useMutation } from "react-relay";
import { HandleErrors } from "../../../../Utils/ErrorHelper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FormSwitch } from "../../../../UIComponents/Form/FormSwitch";
import { useToast } from "../../../../UIComponents/Toast/ToastProvider";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { MqttLogsBarEnableFragment$key } from "./__generated__/MqttLogsBarEnableFragment.graphql";
import { MqttLogsBarEnableAuthMutation } from "./__generated__/MqttLogsBarEnableAuthMutation.graphql";


export const MqttLogsBarEnableFragmentTag = graphql`
  fragment MqttLogsBarEnableFragment on Query
  @argumentDefinitions(
    server_id: { type: "ID!" }
  )
  {
    mqttServerById(id:$server_id){
      id
      loggingEnabled
    }
  }
`;


export const MqttLogsBarEnableAuthMutationTag = graphql`
mutation MqttLogsBarEnableAuthMutation(
  $input: EnableMqttLoggingInput!
  ) {
    enableMqttLogging(input: $input) {
    ... on EnableMqttLoggingPayload {
      gQL_MqttServer{
        id
        loggingEnabled
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

type MqttLogsBarProps = {
  dataRef: MqttLogsBarEnableFragment$key | null;
}

export default function MqttLogsBar({dataRef}:MqttLogsBarProps){

  const { id }: any = useParams<string>();

  const [server_id] = useState(id)
  
  const data = useFragment(MqttLogsBarEnableFragmentTag, dataRef);

  const [
    commit,
    isInFlight,
  ] = useMutation<MqttLogsBarEnableAuthMutation>(
    MqttLogsBarEnableAuthMutationTag
  );

  const toast = useToast();

  const handleCheckedEvent = useCallback(
    (id: string | undefined,
    checked: boolean,
    value: string | undefined,
    name: string | undefined) => {

      return !isInFlight  && commit({
        variables: {
          input: {
            server_uid: server_id,
            enable: checked,
          }
        },

        onError(error) {
          toast?.pushError("Failed to process mutation");
          console.log(error);
        },

        onCompleted(response) {},

        updater(store, response) {
          if(response?.enableMqttLogging?.gQL_MqttServer){
            // ...
          }
          HandleErrors(toast, response?.enableMqttLogging?.errors);
        },

        optimisticUpdater(store){

          if(data?.mqttServerById.id){
            var hook = store.get(data?.mqttServerById.id);

            hook?.setValue(checked,"loggingEnabled")
          }
        }

      });
    },
    [
      isInFlight,
      server_id,
      commit,
      toast,
      data?.mqttServerById.id
    ]
  );


  return <>
    <div className="flex flex-row space-x-5 items-center flex-nowrap overflow-hidden">
      <div className="flex flex-row space-x-3 items-center pl-2 overflow-hidden">
        <FontAwesomeIcon 
          className="text-yellow-500 font-semibold"
          icon={faTriangleExclamation}
        />
        <span className="flex font-semibold text-sm truncate break-all">
          Activation has perf. impact
        </span>
      </div>
      <FormSwitch
        id={"enable_client_auth"}
        uncheckedColor="bg-red-500"
        checked={data?.mqttServerById.loggingEnabled ?? false}
        onChange={handleCheckedEvent}
      />
    </div>
  </> 
}