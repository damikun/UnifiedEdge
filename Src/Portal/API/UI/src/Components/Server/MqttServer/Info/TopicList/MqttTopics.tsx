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
import { MqttTopicsUpdatedSubscription } from "./__generated__/MqttTopicsUpdatedSubscription.graphql";
import { MqttTopicsPaginationFragment$key } from "./__generated__/MqttTopicsPaginationFragment.graphql";
import { MqttTopicsNewInboundSubscription } from "./__generated__/MqttTopicsNewInboundSubscription.graphql";
import { MqttTopicsPaginationFragmentRefetchQuery } from "./__generated__/MqttTopicsPaginationFragmentRefetchQuery.graphql";


// eslint-disable-next-line @typescript-eslint/no-redeclare
const MqttTopicsNewInboundTag = graphql`
    subscription MqttTopicsNewInboundSubscription(
      $id:ID!,
      $connections: [ID!]!
    ) {
      mqttNewTopic(server_id: $id){
        topic@prependNode(
          connections: $connections
          edgeTypeName: "GQL_MqttTopic"
        ){
          ...MqttTopicItemDataFragment 
        }   
      }
    }
`;


// eslint-disable-next-line @typescript-eslint/no-redeclare
const MqttTopicsUpdatedTag = graphql`
    subscription MqttTopicsUpdatedSubscription(
      $id:ID!,
    ) {
      mqttTopicUpdated(server_id: $id){
        ...MqttTopicItemDataFragment 
      }
    }
`;

export const MqttTopicsPaginationFragment = graphql`
  fragment MqttTopicsPaginationFragment on Query
  @argumentDefinitions(
    first: { type: Int, defaultValue: 20 }
    after: { type: String }
    server_uid: { type: "ID!" }
  )
  @refetchable(queryName: "MqttTopicsPaginationFragmentRefetchQuery") {
    __id
    mqttServerTopics(server_uid:$server_uid, first: $first, after: $after)
      @connection(key: "MqttTopicsPaginationFragmentConnection_mqttServerTopics") {
      __id
      edges {
        node {
          id
          topic
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

  const [connectionId, setConnectionId] = useState<string | undefined>(pagination.data?.mqttServerTopics?.__id);

  const client_new_sub = useMemo(() => ({
    variables: {id:id,connections:connectionId?[connectionId]:[]},
    subscription:MqttTopicsNewInboundTag,
    updater: (store,element) => { 
      // Update using prepenNode
    },
    onCompleted: () => {} /* Subscription established */,
    onError: error => {} /* Subscription errored */,
    onNext: response => {} /* Subscription payload received */,
  }as GraphQLSubscriptionConfig<MqttTopicsNewInboundSubscription>), [id,connectionId]);

  useSubscription<MqttTopicsNewInboundSubscription>(client_new_sub);

  const client_updated_sub = useMemo(() => ({
    variables: {id:id},
    subscription:MqttTopicsUpdatedTag,
    updater: (store,element) => { 
      // Update using prepenNode
    },
    onCompleted: () => {} /* Subscription established */,
    onError: error => {} /* Subscription errored */,
    onNext: response => {} /* Subscription payload received */,
  }as GraphQLSubscriptionConfig<MqttTopicsUpdatedSubscription>), [id]);

  useSubscription<MqttTopicsUpdatedSubscription>(client_updated_sub);

  useEffect(() => {
    setConnectionId(pagination.data?.mqttServerTopics?.__id)
  }, [pagination.data?.mqttServerTopics?.__id])
  
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
      pagination?.data?.mqttServerTopics?.edges?.map((edge,index)=>{

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
      <th>Messages</th>
    </tr>
  </TableHeader>
}