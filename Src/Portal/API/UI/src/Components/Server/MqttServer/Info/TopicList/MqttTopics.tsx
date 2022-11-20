import { useParams } from "react-router-dom";
import { MqttTopicItem } from "./MqttTopicItem";
import { graphql } from "babel-plugin-relay/macro";
import { GraphQLSubscriptionConfig } from "relay-runtime";
import Section from "../../../../../UIComponents/Section/Section";
import { usePaginationFragment, useSubscription } from "react-relay";
import TableHeader from "../../../../../UIComponents/Table/TableHeader";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import InfinityScrollBody from "../../../../../UIComponents/Table/InfinityScrollBody";
import InfinityScrollTable from "../../../../../UIComponents/Table/InfinityScrollTable";
import { MqttTopicsPaginationFragment$key } from "./__generated__/MqttTopicsPaginationFragment.graphql";
import { MqttTopicsNewInboundSubscription } from "./__generated__/MqttTopicsNewInboundSubscription.graphql";
import { MqttTopicsPaginationFragmentRefetchQuery } from "./__generated__/MqttTopicsPaginationFragmentRefetchQuery.graphql";


// eslint-disable-next-line @typescript-eslint/no-redeclare
const MqttTopicsNewInboundTag = graphql`
    subscription MqttTopicsNewInboundSubscription(
      $id:ID!,
      $connections: [ID!]!
    ) {
      mqttNewInboundTopic(server_id: $id){
        topic@prependNode(
          connections: $connections
          edgeTypeName: "GQL_MqttServerTopicStat"
        ){
          ...MqttTopicItemDataFragment 
        }   
      }
    }
`;

const MqttTopicsPaginationFragment = graphql`
  fragment MqttTopicsPaginationFragment on Query
  @argumentDefinitions(
    first: { type: Int, defaultValue: 20 }
    after: { type: String }
    server_uid: { type: "ID!" }
  )
  @refetchable(queryName: "MqttTopicsPaginationFragmentRefetchQuery") {
    __id
    mqttServerTopicStats(server_uid:$server_uid, first: $first, after: $after)
      @connection(key: "MqttTopicsPaginationFragmentConnection_mqttServerTopicStats") {
      __id
      edges {
        node {
          id
          ...MqttTopicItemDataFragment
        }
      }
    }
  }
`;

export default React.memo(MqttTopics)

type MqttTopicsProps = {
  dataRef: MqttTopicsPaginationFragment$key | null;
}

function MqttTopics({dataRef}:MqttTopicsProps) {

  return <Section 
    name={"Topics"}
    component={
      <InfinityScrollTable
        header={<Header/>}
      >
        <TopicListBody dataRef={dataRef}/>
      </InfinityScrollTable>
    }
  />
}


type TopicListBodyProps = {

}&MqttTopicsProps

function TopicListBody({dataRef}:TopicListBodyProps){

  const { id }: any = useParams<string>();

  const pagination = usePaginationFragment<
  MqttTopicsPaginationFragmentRefetchQuery,
  MqttTopicsPaginationFragment$key
  >(MqttTopicsPaginationFragment, dataRef);

  const [connectionId, setConnectionId] = useState<string | undefined>(pagination.data?.mqttServerTopicStats?.__id);

  const client_connected_sub = useMemo(() => ({
    variables: {id:id,connections:connectionId?[connectionId]:[]},
    subscription:MqttTopicsNewInboundTag,
    updater: (store,element) => { 
      // Update using prepenNode
    },
    onCompleted: () => {} /* Subscription established */,
    onError: error => {} /* Subscription errored */,
    onNext: response => {} /* Subscription payload received */,
  }as GraphQLSubscriptionConfig<MqttTopicsNewInboundSubscription>), [id,connectionId]);

  useSubscription<MqttTopicsNewInboundSubscription>(client_connected_sub);

  useEffect(() => {
    setConnectionId(pagination.data?.mqttServerTopicStats?.__id)
  }, [pagination.data?.mqttServerTopicStats?.__id])
  
  const handleLoadMore = useCallback(
    () => {
      pagination.loadNext(10);
    },
    [pagination],
  )
  
  const handleItemDetail = useCallback(
    (log_id: string | null | undefined) => {

    },
    []
  );

  return <InfinityScrollBody
  height="h-72"
  onEnd={handleLoadMore}
  >
    {
      pagination?.data?.mqttServerTopicStats?.edges?.map((edge,index)=>{

          if(edge === null || edge === undefined){
            return <></>
          }

          return <MqttTopicItem 
          key={edge.node?.id??index}
          dataRef={edge.node}
          onItemClick={handleItemDetail}
        />
      })
    }
</InfinityScrollBody>

}

function Header(){
  return <TableHeader>
    <tr className="flex w-8/12 2xl:w-9/12">
      <th>Name</th>
    </tr>
    <tr className="flex w-4/12 2xl:w-3/12 text-center justify-center">
      <th>Message Count</th>
    </tr>
  </TableHeader>
}