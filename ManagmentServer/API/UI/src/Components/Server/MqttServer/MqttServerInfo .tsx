import React from "react";
import { useParams } from "react-router-dom";
import { useLazyLoadQuery } from "react-relay";
import { graphql } from "babel-plugin-relay/macro";
import ServerSharedInfo from "../ServerSharedInfo/ServerSharedInfo";
import { MqttServerInfoQuery } from "./__generated__/MqttServerInfoQuery.graphql";


export const MqttServerInfoQueryTag = graphql`
  query MqttServerInfoQuery($id:ID!) 
  {
    mqttServerById(id:$id){
      id
      ...ServerSharedInfoFragment
    }
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
    <ServerSharedInfo dataRef={data.mqttServerById}/>
  </>
}