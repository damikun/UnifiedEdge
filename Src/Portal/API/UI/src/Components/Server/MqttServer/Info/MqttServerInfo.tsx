import clsx from "clsx";
import React, { Suspense, useState } from "react";
import { useParams } from "react-router-dom";
import { useLazyLoadQuery } from "react-relay";
import MqttTopics from "./TopicList/MqttTopics";
import MqttClients from "./ClientList/MqttClients";
import { graphql } from "babel-plugin-relay/macro";
import MqttServerStatistic from "./MqttServerStatistic";
import MqttServerNetworkInfo from "./MqttServerNetworkInfo";
import { MqttServerInfoQuery } from "./__generated__/MqttServerInfoQuery.graphql";
import MqttRecentMessages from "./RecentMessagesList/MqttRecentMessages";


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

    ...MqttRecentMessagesPaginationFragment @arguments(server_uid: $id)@defer
  }
`;

export default React.memo(MqttServerInfo)

function MqttServerInfo() {

  const { id }: any = useParams<string>();

  const [server_id] = useState(id);
  
  const data = useLazyLoadQuery<MqttServerInfoQuery>(
    MqttServerInfoQueryTag,
    {id:server_id},
    {
      fetchPolicy: "store-and-network",
      UNSTABLE_renderPolicy: "partial"
    },
  );

  return <>
    <div className="flex flex-col space-y-5 2xl:space-y-0 2xl:flex-row">
      <div className="flex w-full 2xl:w-1/2 2xl:pr-5">
        <MqttServerNetworkInfo dataRef={data}/>
      </div>
      <div className="flex w-full 2xl:w-1/2">
        <MqttServerStatistic dataRef={data}/>
      </div>
    </div>

    <div className="flex flex-col space-y-5 2xl:space-y-0 2xl:flex-row">
      <div className="flex w-full 2xl:w-1/2 2xl:pr-5">
        <MqttClients dataRef={data}/>
      </div>

      <div className="flex w-full 2xl:w-1/2">
        <MqttTopics dataRef={data}/>
      </div>

    </div>


    <MqttRecentMessages dataRef={data}/>
  </>
}