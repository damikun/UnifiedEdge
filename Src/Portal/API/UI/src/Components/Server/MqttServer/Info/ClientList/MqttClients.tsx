import MqttClientDetail from "./MqttClientDetail";
import { MqttClientItem } from "./MqttClientItem";
import { graphql } from "babel-plugin-relay/macro";
import { GraphQLSubscriptionConfig } from "relay-runtime";
import Modal from "../../../../../UIComponents/Modal/Modal";
import { useParams, useSearchParams } from "react-router-dom";
import Section from "../../../../../UIComponents/Section/Section";
import { usePaginationFragment, useSubscription } from "react-relay";
import TableHeader from "../../../../../UIComponents/Table/TableHeader";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import InfinityScrollBody from "../../../../../UIComponents/Table/InfinityScrollBody";
import InfinityScrollTable from "../../../../../UIComponents/Table/InfinityScrollTable";
import { MqttClientsPaginationFragment$key } from "./__generated__/MqttClientsPaginationFragment.graphql";
import { MqttClientsClientUpdatedSubscription } from "./__generated__/MqttClientsClientUpdatedSubscription.graphql";
import { MqttClientsClientConnectedSubscription } from "./__generated__/MqttClientsClientConnectedSubscription.graphql";
import { MqttClientsPaginationFragmentRefetchQuery } from "./__generated__/MqttClientsPaginationFragmentRefetchQuery.graphql";


// eslint-disable-next-line @typescript-eslint/no-redeclare
const MqttClientsClientConnectedTag = graphql`
    subscription MqttClientsClientConnectedSubscription(
      $id:ID!,
      $connections: [ID!]!
    ) {
        mqttNewClient(server_id: $id){
          client@prependNode(
            connections: $connections
            edgeTypeName: "GQL_MqttNewClientEdge"
          ){
            ...MqttClientItemDataFragment 
          }   
        }
    }
`;

// eslint-disable-next-line @typescript-eslint/no-redeclare
const MqttClientsClientUpdatedTag = graphql`
    subscription MqttClientsClientUpdatedSubscription(
      $id:ID!,
    ) {
        mqttClientUpdated(server_id: $id){
          ...MqttClientItemDataFragment
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
  
  const [searchParams, setSearchParams] = useSearchParams();
  
  const isOpen = useMemo(() => 
    searchParams.get(CLIENT_PARAM_NAME)!== null, [searchParams]
  );
  
  const handleModalClose = useCallback(() => {
    searchParams.delete(CLIENT_PARAM_NAME);
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  
  return <>
  <Modal
    position="top"
    isOpen={isOpen}
    onClose={handleModalClose}
    component={
      <MqttClientDetail />
    }
  />
  <Section 
      name={"Clients"}
      component={
        <InfinityScrollTable
          header={<Header/>}
        >
          <ClientListBody dataRef={dataRef}/>
        </InfinityScrollTable>
      }
    />
  </>
}

type ClientListBodyProps = {

}&MqttClientsProps

function ClientListBody({dataRef}:ClientListBodyProps){

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
    },
    onCompleted: () => {} /* Subscription established */,
    onError: error => {} /* Subscription errored */,
    onNext: response => {} /* Subscription payload received */,
  }as GraphQLSubscriptionConfig<MqttClientsClientConnectedSubscription>), [id,connectionId]);

  useSubscription<MqttClientsClientConnectedSubscription>(client_connected_sub);

  const client_disconnected_sub = useMemo(() => ({
    variables: {id:id,connections:connectionId?[connectionId]:[]},
    subscription:MqttClientsClientUpdatedTag,
    updater: (store,element) => { 
      // update using DeleteEdge
    },
    onCompleted: () => {} /* Subscription established */,
    onError: error => {} /* Subscription errored */,
    onNext: response => {} /* Subscription payload received */,
  }as GraphQLSubscriptionConfig<MqttClientsClientUpdatedSubscription>), [id,connectionId]);

  useSubscription<MqttClientsClientUpdatedSubscription>(client_disconnected_sub);

  const handleLoadMore = useCallback(
    () => {
      pagination.loadNext(10);
    },
    [pagination],
  )
  
  const [searchParams, setSearchParams] = useSearchParams();

  const handleItemDetail = useCallback(
    (client_id: string | null | undefined) => {
      searchParams.delete(CLIENT_PARAM_NAME);
      if (client_id) {
        searchParams.append(CLIENT_PARAM_NAME, client_id);
      }
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );

  return <InfinityScrollBody
    height="h-72"
    onEnd={handleLoadMore}
    >
      {
        pagination?.data?.mqttServerClients?.edges?.map((edge,index)=>{

          if(edge === null || edge === undefined){
            return <></>
          }

          return <MqttClientItem 
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
    <tr className="flex w-6/12 2xl:w-8/12">
      <th>Uid</th>
    </tr>
    <tr className="w-1/12 2xl:w-2/12 text-center justify-center hidden lg:flex">
      <th>Version</th>
    </tr>
    <tr className="flex w-5/12 2xl:w-2/12 text-center justify-center">
      <th>State</th>
    </tr>
  </TableHeader>
}