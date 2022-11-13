import clsx from "clsx";
import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { graphql } from "babel-plugin-relay/macro";
import { GraphQLSubscriptionConfig } from "relay-runtime";
import { useFragment, useSubscription } from "react-relay";
import Section from "../../../../UIComponents/Section/Section";
import SectionBody from "../../../../UIComponents/Section/SectionBody";
import { FieldGroup, FieldSection } from "../../../../Shared/Field/FieldHelpers";
import { MqttServerNetworkInfoFragment$key } from "./__generated__/MqttServerNetworkInfoFragment.graphql";
import { MqttServerNetworkInfoSendPacketsSubscription } from "./__generated__/MqttServerNetworkInfoSendPacketsSubscription.graphql";
import { MqttServerNetworkInfoRcvdPacketsSubscription } from "./__generated__/MqttServerNetworkInfoRcvdPacketsSubscription.graphql";


export const MqttServerNetworkInfoFragmentTag = graphql`
  fragment MqttServerNetworkInfoFragment on Query 
  @argumentDefinitions(
    server_uid: { type: "ID!" }
  )
  {
    mqttServerEndpoint(server_uid:$server_uid) {
      id
      iPAddress
      port
      serverUid
    }

    mqttServerStats(server_uid: $server_uid) {
      id
      packetRcvCount
      packetSndCount
    }
  }
`;

// eslint-disable-next-line @typescript-eslint/no-redeclare
const MqttServerNetworkInfoRcvdPacketsRef = graphql`
    subscription MqttServerNetworkInfoRcvdPacketsSubscription(
      $id:ID!
    ) {
        mqttServerMetrics(server_id: $id, metric: INBOUND_PACKETS) {
          id
          timeStamp
          unit
          value
        }
    }
`;

// eslint-disable-next-line @typescript-eslint/no-redeclare
const MqttServerNetworkInfoSendPacketsRef = graphql`
    subscription MqttServerNetworkInfoSendPacketsSubscription(
      $id:ID!
    ) {
        mqttServerMetrics(server_id: $id, metric: OUTBOUND_PACKETS) {
          id
          timeStamp
          unit
          value
        }
    }
`;

export default React.memo(MqttServerNetworkInfo)

type MqttServerNetworkInfoProps = {
  dataRef:MqttServerNetworkInfoFragment$key | null;
}

function MqttServerNetworkInfo({dataRef}:MqttServerNetworkInfoProps) {

  const data = useFragment(MqttServerNetworkInfoFragmentTag, dataRef);
  
  const { id }: any = useParams<string>();
  
  const send_sub = useMemo(() => ({
    variables: {id:id},
    subscription:MqttServerNetworkInfoSendPacketsRef,
    updater: (store,element) => { 
      if(element.mqttServerMetrics.id && data?.mqttServerStats?.id){
        var server_data = store.get(data?.mqttServerStats?.id);
        
        server_data?.setValue(element.mqttServerMetrics.value,"packetSndCount")
      }
    },
    onCompleted: () => {} /* Subscription established */,
    onError: error => {} /* Subscription errored */,
    onNext: response => {} /* Subscription payload received */,
  }as GraphQLSubscriptionConfig<MqttServerNetworkInfoSendPacketsSubscription>), [id,data?.mqttServerStats?.id]);

  useSubscription<MqttServerNetworkInfoSendPacketsSubscription>(send_sub);

  const rcvd_sub = useMemo(() => ({
    variables: {id:id},
    subscription:MqttServerNetworkInfoRcvdPacketsRef,
    updater: (store,element) => { 
      if(element.mqttServerMetrics.id && data?.mqttServerStats?.id){
        var server_data = store.get(data?.mqttServerStats?.id);
        
        server_data?.setValue(element.mqttServerMetrics.value,"packetRcvCount")
      }
    },
    onCompleted: () => {} /* Subscription established */,
    onError: error => {} /* Subscription errored */,
    onNext: response => {} /* Subscription payload received */,
  }as GraphQLSubscriptionConfig<MqttServerNetworkInfoRcvdPacketsSubscription>), [id,data?.mqttServerStats?.id]);

  useSubscription<MqttServerNetworkInfoRcvdPacketsSubscription>(rcvd_sub);
  
  return <Section 
  name="Network"
  component={

    <SectionBody className="flex">
      <div className="flex flex-col lg:flex-row lg:space-x-10 justify-between 2xl:justify-start">
        <FieldGroup>
          <FieldSection
          variant="flex-row"
          name="Port">
            <div className="font-mono">
              {data?.mqttServerEndpoint.port}
            </div>
          </FieldSection>
          <FieldSection
          variant="flex-row"
          name="IP Address">
            <div className="font-mono">
              {data?.mqttServerEndpoint.iPAddress}
            </div>
          </FieldSection>
        </FieldGroup>

        <FieldGroup>
          <FieldSection
          variant="flex-row"
          name="Inbound">
            <div className="font-mono truncate">
              {data?.mqttServerStats.packetSndCount}
            </div>
          </FieldSection>
          <FieldSection
          variant="flex-row"
          name="Outbound  ">
            <div className="font-mono truncate">
              {data?.mqttServerStats.packetRcvCount}
            </div>
          </FieldSection>
        </FieldGroup>
      </div>
    </SectionBody>

  }/>
}