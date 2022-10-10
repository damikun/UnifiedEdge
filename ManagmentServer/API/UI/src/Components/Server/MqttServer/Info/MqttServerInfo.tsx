import React from "react";
import { useParams } from "react-router-dom";
import { useLazyLoadQuery } from "react-relay";
import MqttClients from "./ClientList/MqttClients";
import { graphql } from "babel-plugin-relay/macro";
import ServerSharedInfo from "../../ServerSharedInfo/ServerSharedInfo";
import { MqttServerInfoQuery } from "./__generated__/MqttServerInfoQuery.graphql";
import MqttServerNetworkInfo from "./MqttServerNetworkInfo";


export const MqttServerInfoQueryTag = graphql`
  query MqttServerInfoQuery($id:ID!) 
  {
    mqttServerById(id:$id){
      id
      ...ServerSharedInfoFragment
    }
    ...MqttClientsPaginationFragment @arguments(server_uid: $id)

    ...MqttServerNetworkInfoFragment @arguments(server_uid: $id)
  }
`;

export default React.memo(MqttServerInfo)

function MqttServerInfo() {

  const { id }: any = useParams<string>();

  const data = useLazyLoadQuery<MqttServerInfoQuery>(
    MqttServerInfoQueryTag,
    {id:id},
    {
      fetchPolicy: "store-and-network",
      UNSTABLE_renderPolicy: "partial"
    },
  );

  return <>
    <MqttServerNetworkInfo dataRef={data}/>
    {/* <ServerSharedInfo dataRef={data.mqttServerById}/> */}
    <MqttClients dataRef={data}/>
  </>
}