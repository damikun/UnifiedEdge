import clsx from "clsx";
import { useParams } from "react-router-dom";
import { MqttTopicItem } from "./MqttTopicItem";
import { graphql } from "babel-plugin-relay/macro";
import { usePaginationFragment, useSubscription } from "react-relay";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Section from "../../../../../UIComponents/Section/Section";
import { MqttTopicsPaginationFragment$key } from "./__generated__/MqttTopicsPaginationFragment.graphql";
import StayledInfinityScrollContainer from "../../../../../UIComponents/ScrollContainter/StayledInfinityScrollContainer";
import { MqttTopicsPaginationFragmentRefetchQuery } from "./__generated__/MqttTopicsPaginationFragmentRefetchQuery.graphql";
import { GraphQLSubscriptionConfig } from "relay-runtime";
import { MqttTopicsNewInboundSubscription } from "./__generated__/MqttTopicsNewInboundSubscription.graphql";

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
  
  return <Section 
      name={"Topics"}
      component={
        <>
        <div className={clsx("flex bg-gray-100 flex-col w-full",
        "border border-gray-200 rounded-sm shadow-sm pt-2 h-96")}>
          <StayledInfinityScrollContainer
            header={<Header/>}
            onEnd={handleLoadMore}
          >
            {
              pagination?.data?.mqttServerTopicStats?.edges?.map((edge,index)=>{
                  return <MqttTopicItem 
                  key={edge.node?.id??index}
                  dataRef={edge.node}
                  onItemClick={handleItemDetail}
                />
              })
            }
          </StayledInfinityScrollContainer>
        </div>
        </>
      }
    />
}

function Header(){
  return <div className={clsx("flex text-gray-600 w-full",
  "space-x-2 justify-between border-b border-gray-200",
  "py-2 lg:pb-5 mb-1 px-2 md:px-5 select-none font-semibold")}>
    <div className="flex w-8/12 2xl:w-9/12">
      <div>Name</div>
    </div>
    <div className="flex w-4/12 2xl:w-3/12 text-center justify-center">
      <div>Message Count</div>
    </div>
  </div>
}