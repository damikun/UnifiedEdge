import { graphql } from "babel-plugin-relay/macro";
import { usePaginationFragment } from "react-relay";
import MqttAuthClientsBar from "./MqttAuthClientsBar";
import MqttClientDetail from "./MqttAuthClientDetail";
import { MqttAuthClientItem } from "./MqttAuthClientItem";
import Modal from "../../../../../UIComponents/Modal/Modal";
import { useParams, useSearchParams } from "react-router-dom";
import React, { useCallback, useEffect, useState } from "react";
import Section from "../../../../../UIComponents/Section/Section";
import TableHeader from "../../../../../UIComponents/Table/TableHeader";
import { useSearchParamHandler } from "../../../../../Hooks/useHandleSearchParam";
import InfinityScrollBody from "../../../../../UIComponents/Table/InfinityScrollBody";
import InfinityScrollTable from "../../../../../UIComponents/Table/InfinityScrollTable";
import { MqttAuthClientsCtxProvider, useMqttAuthClientsCtx } from "./MqttAuthClientsCtxProvider";
import { MqttAuthClientsBarEnableFragment$key } from "./__generated__/MqttAuthClientsBarEnableFragment.graphql";
import { MqttAuthClientsPaginationFragment$key } from "./__generated__/MqttAuthClientsPaginationFragment.graphql";
import { MqttAuthClientsPaginationFragmentRefetchQuery } from "./__generated__/MqttAuthClientsPaginationFragmentRefetchQuery.graphql";


export const MqttAuthClientsPaginationFragment = graphql`
  fragment MqttAuthClientsPaginationFragment on Query
  @argumentDefinitions(
    first: { type: Int, defaultValue: 20 }
    after: { type: String }
    server_uid: { type: "ID!" }
  )
  @refetchable(queryName: "MqttAuthClientsPaginationFragmentRefetchQuery") {
    __id
    mqttAuthClients(server_uid:$server_uid, first: $first, after: $after)
      @connection(key: "MqttAuthClientsPaginationFragmentConnection_mqttAuthClients") {
      __id
      edges {
        node {
          id
          clientId
          ...MqttAuthClientItemDataFragment
        }
      }
    }
  }
`;

export const CLIENT_PARAM_NAME = "client_id"

export default React.memo(MqttAuthClients)

type MqttAuthClientsProps = {
  dataRef: (MqttAuthClientsPaginationFragment$key | null) & 
  (MqttAuthClientsBarEnableFragment$key | null);
}

function MqttAuthClients({dataRef}:MqttAuthClientsProps) {
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isOpen, open, close] = useSearchParamHandler(CLIENT_PARAM_NAME);
  
  return <MqttAuthClientsCtxProvider>
    <Modal
      position="top"
      isOpen={isOpen}
      onClose={close}
      component={
        <MqttClientDetail />
      }
    />
    <Section 
      name={"Auth Clients"}
      bar={<MqttAuthClientsBar dataRef={dataRef}/>}
      component={
        <InfinityScrollTable
          height="h-96"
          header={<Header/>}
        > 
          <ClientListBody dataRef={dataRef}/>
        </InfinityScrollTable>
      }
    />
  </MqttAuthClientsCtxProvider>
}

type ClientListBodyProps = {

} & MqttAuthClientsProps

function ClientListBody({dataRef}:ClientListBodyProps){

  const { id }: any = useParams<string>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [server_id] = useState(id)

  const pagination = usePaginationFragment<
  MqttAuthClientsPaginationFragmentRefetchQuery,
  MqttAuthClientsPaginationFragment$key
  >(MqttAuthClientsPaginationFragment, dataRef);

  const conCtx = useMqttAuthClientsCtx();
  
  useEffect(() => {
    pagination.data?.mqttAuthClients?.__id &&
      conCtx.setId(pagination.data?.mqttAuthClients?.__id)
  }, [pagination.data?.mqttAuthClients?.__id])
  
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
        pagination?.data?.mqttAuthClients?.edges?.map((edge,index)=>{

          if(edge === null || edge === undefined){
            return <></>
          }

          return <MqttAuthClientItem 
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
      <th>ClientId</th>
    </tr>
    <tr className="flex w-5/12 2xl:w-2/12 text-center justify-center">
      <th>Enabled</th>
    </tr>
  </TableHeader>
}