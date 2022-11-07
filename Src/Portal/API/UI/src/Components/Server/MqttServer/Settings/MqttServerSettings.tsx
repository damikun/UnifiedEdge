import React from "react";
import { useParams } from "react-router-dom";
import { useLazyLoadQuery } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import ServerRemove from "../../ServerSharedSettings/ServerRemove";
import MqttServerNetworkSettings from "./MqttServerNetworkSettings";
import MqttServerMqttClientSettings from "./MqttServerMqttClientSettings";
import ServerSharedSettings from "../../ServerSharedSettings/ServerSharedSettings";
import { MqttServerSettingsQuery } from "./__generated__/MqttServerSettingsQuery.graphql";


export const MqttServerSettingsQueryTag = graphql`
  query MqttServerSettingsQuery($id:ID!) 
  {
    mqttServerById(id:$id){
      ...ServerSharedSettingsFragment 
      ...ServerRemoveDataFragment
    }
    ...MqttServerNetworkSettingsFragment @arguments(server_uid:$id)

    ...MqttServerMqttClientSettingsFragment @arguments(server_uid:$id)
  }
`;

export default React.memo(MqttServerSettings)

function MqttServerSettings() {

  const { id }: any = useParams<string>();

  const data = useLazyLoadQuery<MqttServerSettingsQuery>(
    MqttServerSettingsQueryTag,
    {id:id},
    {
      fetchPolicy: "store-and-network",
      UNSTABLE_renderPolicy: "partial"
    },
  );

  return <>
    <ServerSharedSettings dataRef={data.mqttServerById} />
    <MqttServerNetworkSettings dataRef={data} />
    <MqttServerMqttClientSettings dataRef={data} />
    <ServerRemove dataRef={data.mqttServerById} />
  </>
}