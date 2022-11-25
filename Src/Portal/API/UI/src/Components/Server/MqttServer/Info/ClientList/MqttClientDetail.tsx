import clsx from "clsx";
import { CLIENT_PARAM_NAME } from "./MqttClients";
import { graphql } from "babel-plugin-relay/macro";
import { useCallback, useMemo, useState } from "react";
import { GraphQLSubscriptionConfig } from "relay-runtime";
import { GetLocalDate } from "../../../../../Shared/Common";
import Badge from "../../../../../UIComponents/Badged/Badge";
import { useParams, useSearchParams } from "react-router-dom";
import { HandleErrors } from "../../../../../Utils/ErrorHelper";
import { useToast } from "../../../../../UIComponents/Toast/ToastProvider";
import { useLazyLoadQuery, useMutation, useSubscription } from "react-relay";
import ModalContainer from "../../../../../UIComponents/Modal/ModalContainer";
import StayledButton from "../../../../../UIComponents/Buttons/StayledButton";
import { MqttClientDetailQuery } from "./__generated__/MqttClientDetailQuery.graphql";
import { FieldDivider, FieldGroup, FieldSection } from "../../../../../Shared/Field/FieldHelpers";
import { MqttClientDetailSubscription } from "./__generated__/MqttClientDetailSubscription.graphql";
import { MqttClientDetailResetStatsMutation } from "./__generated__/MqttClientDetailResetStatsMutation.graphql";


const MqttClientDetailTag = graphql`
  query MqttClientDetailQuery($server_uid:ID!,$server_client_uid:ID!) {
    mqttServerClient(
        server_uid:$server_uid,
        server_client_uid: $server_client_uid) {
          id
          protocol
          clientId
          serverUid
    }

    mqttServerClientStatistic(
        server_uid:$server_uid,
        server_client_uid: $server_client_uid) {
          id
          bytesReceived
          bytesSent

          sentPacketsCount
          receivedPacketsCount

          sentApplicationMessagesCount
          receivedApplicationMessagesCount

          lastNonKeepAlivePacketReceivedTimestamp
          lastPacketReceivedTimestamp
          lastPacketSentTimestamp
    }
  }
`;

// eslint-disable-next-line @typescript-eslint/no-redeclare
const MqttClientDetailSubscriptionTag = graphql`
    subscription MqttClientDetailSubscription(
      $server_id:ID!,
      $client_id:ID!,
    ) {
      mqttServerClientStatistics(server_id:$server_id, client_id:$client_id){
        clientId
        serverId

        stats {
            id
            bytesReceived
            bytesSent

            sentPacketsCount
            receivedPacketsCount

            sentApplicationMessagesCount
            receivedApplicationMessagesCount

            lastNonKeepAlivePacketReceivedTimestamp
            lastPacketReceivedTimestamp
            lastPacketSentTimestamp
        }
      }
    }
`;


const MqttClientDetailResetStatsMutationTag = graphql`
  mutation MqttClientDetailResetStatsMutation(
    $input: ResetMqttClientStatisticInput!
    ) {
      resetMqttClientStatistic(input: $input) {
      ... on ResetMqttClientStatisticPayload {
        gQL_MqttClientStatistics{
          id
          bytesReceived
          bytesSent

          sentPacketsCount
          receivedPacketsCount

          sentApplicationMessagesCount
          receivedApplicationMessagesCount

          lastNonKeepAlivePacketReceivedTimestamp
          lastPacketReceivedTimestamp
          lastPacketSentTimestamp
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

export default function MqttClientDetail(){

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();

  const { id }: any = useParams<string>();

  const [server_id] = useState(id)
  const [client_id] = useState(searchParams.get(CLIENT_PARAM_NAME) as string)

  const data = useLazyLoadQuery<MqttClientDetailQuery>(
    MqttClientDetailTag,
    {server_uid:server_id,
    server_client_uid:client_id
    },
    {
      fetchPolicy: "store-and-network",
      fetchKey:"mqttClientDetailFetchKey"
    },
  );

  const [
    commit,
    isInFlight,
  ] = useMutation<MqttClientDetailResetStatsMutation>(
    MqttClientDetailResetStatsMutationTag
  );

  const data_sub = useMemo(() => ({
    variables: {
      client_id:client_id,
      server_id:server_id
    },
    subscription:MqttClientDetailSubscriptionTag,
    updater: (store,element) => { 

    },
    onCompleted: () => {} /* Subscription established */,
    onError: error => {} /* Subscription errored */,
    onNext: response => {} /* Subscription payload received */,
  }as GraphQLSubscriptionConfig<MqttClientDetailSubscription>), [client_id,server_id]);

  useSubscription<MqttClientDetailSubscription>(data_sub);

  const toast = useToast();
  
  const handleReset = useCallback(
    () => {
      server_id && client_id  &&! isInFlight && commit({
        variables: {
          input: {
            server_uid: server_id,
            client_uid: client_id,
          }
        },

        onError(error) {
          toast?.pushError("Failed to process mutation");
          console.log(error);
        },

        onCompleted(response) {},

        updater(store, response) {
          if(response?.resetMqttClientStatistic?.gQL_MqttClientStatistics){
              //success
          }

          HandleErrors(toast, response?.resetMqttClientStatistic?.errors);
        },

      });
    },
    [isInFlight,server_id,client_id,toast,commit],
  )

  const dt_lastPacketSentTimestamp = useMemo(()=>{
    return GetLocalDate(data?.mqttServerClientStatistic?.lastPacketSentTimestamp);
  },[data]) 

  const dt_lastPacketReceivedTimestamp = useMemo(()=>{
    return GetLocalDate(data?.mqttServerClientStatistic?.lastPacketReceivedTimestamp);
  },[data]) 

  const dt_lastNonKeepAlivePacketReceivedTimestamp = useMemo(()=>{
    return GetLocalDate(data?.mqttServerClientStatistic?.lastNonKeepAlivePacketReceivedTimestamp);
  },[data]) 

  return <ModalContainer label="Client detail">
    <div className="flex flex-col space-y-5 max-w-2xl md:w-96">

        <FieldGroup>
            <FieldSection className="items-center" name="Mqtt">
              <Badge
                  turncate
                  border={false}
                  className="text-xxs border border-gray-200"
                  size="thin"
                  variant="ternarygray"
              >
                  {data?.mqttServerClient.protocol}    
              </Badge>
            </FieldSection>
            <FieldSection multiline name="Client Id">
                <div className={clsx("font-sans text-gray-700 font-semibold",
                "text-sm max-w-full break-all select-all")}>
                    {data?.mqttServerClient.clientId}
                </div>
            </FieldSection>
        </FieldGroup>

        {
            data.mqttServerClientStatistic && <>
            
                <FieldDivider/>

                <FieldGroup>
                    <FieldSection variant="flex-row" name="Last message">
                        {dt_lastNonKeepAlivePacketReceivedTimestamp}
                    </FieldSection>
                    <FieldSection variant="flex-row" name="Last packet send">
                        {dt_lastPacketSentTimestamp}
                    </FieldSection>
                    <FieldSection variant="flex-row" name="Last packet rcv">
                        {dt_lastPacketReceivedTimestamp}
                    </FieldSection>
                </FieldGroup>
            </>
        }

        {
            data.mqttServerClientStatistic && <>
            
                <FieldDivider/>

                <FieldGroup>
                    <FieldSection variant="flex-row" name="Messages send">
                        {data.mqttServerClientStatistic.sentApplicationMessagesCount}
                    </FieldSection>
                    <FieldSection variant="flex-row" name="Messages rcvd">
                        {data.mqttServerClientStatistic.receivedApplicationMessagesCount}
                    </FieldSection>
                    <FieldSection variant="flex-row" name="Packets send">
                        {data.mqttServerClientStatistic.sentPacketsCount}
                    </FieldSection>
                    <FieldSection variant="flex-row" name="Packets rcvd">
                        {data.mqttServerClientStatistic.receivedPacketsCount}
                    </FieldSection>
                    <FieldSection variant="flex-row" name="Bytes send">
                        {data.mqttServerClientStatistic.bytesSent}
                    </FieldSection>
                    <FieldSection variant="flex-row" name="Bytes rcv">
                        {data.mqttServerClientStatistic.bytesReceived}
                    </FieldSection>
                </FieldGroup>

                <StayledButton
                isloading={isInFlight}
                onClick={handleReset}
                className="h-12 w-full"
                variant="secondaryblue"
                >
                  Reset Stats
                </StayledButton>

            </>
        }
    </div>
  </ModalContainer>
}