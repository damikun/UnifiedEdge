import clsx from "clsx";
import React, { Suspense } from "react";
import { useParams } from "react-router-dom";
import { useLazyLoadQuery } from "react-relay";
import MqttTopics from "./TopicList/MqttTopics";
import MqttClients from "./ClientList/MqttClients";
import { graphql } from "babel-plugin-relay/macro";
import MqttServerStatistic from "./MqttServerStatistic";
import MqttServerNetworkInfo from "./MqttServerNetworkInfo";
import { MqttServerInfoQuery } from "./__generated__/MqttServerInfoQuery.graphql";


export const MqttServerInfoQueryTag = graphql`
  query MqttServerInfoQuery($id:ID!) 
  {
    mqttServerById(id:$id){ 
      id
      ...ServerSharedInfoFragment
    }
    ...MqttClientsPaginationFragment @arguments(server_uid: $id)@defer

    ...MqttServerNetworkInfoFragment @arguments(server_uid: $id)

    ...MqttServerStatisticFragment @arguments(server_uid: $id)

    ...MqttTopicsPaginationFragment @arguments(server_uid: $id)@defer
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
    <div className={clsx("grid grid-flow-row-dense xl:grid-flow-col gap-5")}>
      <MqttServerNetworkInfo dataRef={data}/>
      <MqttServerStatistic dataRef={data}/>
    </div>

    {/* <Suspense fallback={null}> */}
      <MqttClients dataRef={data}/>
    {/* </Suspense> */}
    <MqttTopics dataRef={data}/>
  </>
}