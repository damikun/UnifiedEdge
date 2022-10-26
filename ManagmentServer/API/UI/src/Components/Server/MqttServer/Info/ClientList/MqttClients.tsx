import clsx from "clsx";
import { MqttClientItem } from "./MqttClientItem";
import { graphql } from "babel-plugin-relay/macro";
import { GraphQLSubscriptionConfig } from "relay-runtime";
import Modal from "../../../../../UIComponents/Modal/Modal";
import { useParams, useSearchParams } from "react-router-dom";
import Section from "../../../../../UIComponents/Section/Section";
import { usePaginationFragment, useSubscription } from "react-relay";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { MqttClientsPaginationFragment$key } from "./__generated__/MqttClientsPaginationFragment.graphql";
import { MqttClientsClientConnectedSubscription } from "./__generated__/MqttClientsClientConnectedSubscription.graphql";
import StayledInfinityScrollContainer from "../../../../../UIComponents/ScrollContainter/StayledInfinityScrollContainer";
import { MqttClientsPaginationFragmentRefetchQuery } from "./__generated__/MqttClientsPaginationFragmentRefetchQuery.graphql";
import { MqttClientsClientDisconnectedSubscription } from "./__generated__/MqttClientsClientDisconnectedSubscription.graphql";


// eslint-disable-next-line @typescript-eslint/no-redeclare
const MqttClientsClientConnectedTag = graphql`
    subscription MqttClientsClientConnectedSubscription(
      $id:ID!,
      $connections: [ID!]!
    ) {
        mqttClientConnected(server_id: $id){
          client@prependNode(
            connections: $connections
            edgeTypeName: "GQL_MqttClientEdge"
          ){
            ...MqttClientItemDataFragment 
          }   
        }
    }
`;

// eslint-disable-next-line @typescript-eslint/no-redeclare
const MqttClientsClientDisconnectedTag = graphql`
    subscription MqttClientsClientDisconnectedSubscription(
      $id:ID!,
      $connections: [ID!]!
    ) {
        mqttClientDisconnected(server_id: $id){
          client{
            id  @deleteEdge(connections: $connections)
          }
        }
    }
`;

const MqttClientsPaginationFragment = graphql`
  fragment MqttClientsPaginationFragment on Query
  @argumentDefinitions(
    first: { type: Int, defaultValue: 20 }
    after: { type: String }
    server_uid: { type: "ID!" }
  )
  @refetchable(queryName: "MqttClientsPaginationFragmentRefetchQuery") {
    __id
    mqttServerClients(server_uid:$server_uid, first: $first, after: $after)
      @connection(key: "MqttClientsPaginationFragmentConnection_mqttServerClients") {
      __id
      edges {
        node {
          id
          ...MqttClientItemDataFragment
        }
      }
    }
  }
`;

export const CLIENT_PARAM_NAME = "client_id"

export default React.memo(MqttClients)

type MqttClientsProps = {
  dataRef: MqttClientsPaginationFragment$key | null;
}

function MqttClients({dataRef}:MqttClientsProps) {

  const { id }: any = useParams<string>();

  const pagination = usePaginationFragment<
  MqttClientsPaginationFragmentRefetchQuery,
  MqttClientsPaginationFragment$key
  >(MqttClientsPaginationFragment, dataRef);

  const [connectionId, setConnectionId] = useState<string | undefined>(pagination.data?.mqttServerClients?.__id);

  useEffect(() => {
    setConnectionId(pagination.data?.mqttServerClients?.__id)
  }, [pagination.data?.mqttServerClients?.__id])
  
  const client_connected_sub = useMemo(() => ({
    variables: {id:id,connections:connectionId?[connectionId]:[]},
    subscription:MqttClientsClientConnectedTag,
    updater: (store,element) => { 
      // Update using prepenNode

      console.log("Client connected sub")
    },
    onCompleted: () => {} /* Subscription established */,
    onError: error => {} /* Subscription errored */,
    onNext: response => {} /* Subscription payload received */,
  }as GraphQLSubscriptionConfig<MqttClientsClientConnectedSubscription>), [id,connectionId]);

  useSubscription<MqttClientsClientConnectedSubscription>(client_connected_sub);

  const client_disconnected_sub = useMemo(() => ({
    variables: {id:id,connections:connectionId?[connectionId]:[]},
    subscription:MqttClientsClientDisconnectedTag,
    updater: (store,element) => { 
      // update using DeleteEdge
    },
    onCompleted: () => {} /* Subscription established */,
    onError: error => {} /* Subscription errored */,
    onNext: response => {} /* Subscription payload received */,
  }as GraphQLSubscriptionConfig<MqttClientsClientDisconnectedSubscription>), [id,connectionId]);

  useSubscription<MqttClientsClientDisconnectedSubscription>(client_disconnected_sub);

  const handleLoadMore = useCallback(
    () => {
      pagination.loadNext(10);
    },
    [pagination],
  )
  
  const [searchParams, setSearchParams] = useSearchParams();
  
  const isOpen = useMemo(() => 
    searchParams.get(CLIENT_PARAM_NAME)!== null, [searchParams]
  );
  
  const handleModalClose = useCallback(() => {
    searchParams.delete(CLIENT_PARAM_NAME);
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  const handleItemDetail = useCallback(
    (log_id: string | null | undefined) => {
      searchParams.delete(CLIENT_PARAM_NAME);
      if (log_id) {
        searchParams.append(CLIENT_PARAM_NAME, log_id);
      }
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );
  
  return <Section 
      name={"Connected clients"}
      component={
        <>
        <Modal
          position="top"
          isOpen={isOpen}
          onClose={handleModalClose}
          component={
            <div>Future modal</div>
            // <SystemLogDetail />
          }
        />
        <div className={clsx("flex bg-gray-100 flex-col w-full",
        "border border-gray-200 rounded-sm shadow-sm pt-2 h-96")}>
          <StayledInfinityScrollContainer
            header={<Header/>}
            onEnd={handleLoadMore}
          >
            {
              pagination?.data?.mqttServerClients?.edges?.map((edge,index)=>{
                  return <MqttClientItem 
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
    <div className="flex w-6/12 2xl:w-8/12">
      <div>Uid</div>
    </div>
    <div className="w-1/12 2xl:w-2/12 text-center justify-center hidden lg:flex">
      <div>Version</div>
    </div>
    <div className="flex w-5/12 2xl:w-2/12 text-center justify-center">
      <div>Connected</div>
    </div>
  </div>
}