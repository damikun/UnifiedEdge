import MqttLogDetail from "./MqttAuthLogDetail";
import MqttAuthLogsBar from "./MqttAuthLogsBar";
import { graphql } from "babel-plugin-relay/macro";
import { usePaginationFragment } from "react-relay";
import { MqttAuthLogItem } from "./MqttAuthLogItem";
import Modal from "../../../../../UIComponents/Modal/Modal";
import { useParams, useSearchParams } from "react-router-dom";
import Section from "../../../../../UIComponents/Section/Section";
import useDidMountEffect from "../../../../../Hooks/useDidMountEffect";
import TableHeader from "../../../../../UIComponents/Table/TableHeader";
import React, { startTransition, useCallback, useEffect, useMemo, useState } from "react";
import InfinityScrollBody from "../../../../../UIComponents/Table/InfinityScrollBody";
import InfinityScrollTable from "../../../../../UIComponents/Table/InfinityScrollTable";
import { MqttAuthLogsCtxProvider, useMqttAuthLogsCtx } from "./MqttAuthLogsCtxProvider";
import { MqttAuthLogsPaginationFragment$key } from "./__generated__/MqttAuthLogsPaginationFragment.graphql";
import { MqttAuthClientsPaginationFragment$key } from "./__generated__/MqttAuthClientsPaginationFragment.graphql";
import { MqttAuthUsersPaginationFragment$key } from "../UserList/__generated__/MqttAuthUsersPaginationFragment.graphql";
import { MqttAuthLogsPaginationFragmentRefetchQuery } from "./__generated__/MqttAuthLogsPaginationFragmentRefetchQuery.graphql";



export const MqttAuthLogsPaginationFragment = graphql`
  fragment MqttAuthLogsPaginationFragment on Query
  @argumentDefinitions(
    first: { type: Int, defaultValue: 20 }
    after: { type: String }
    auth_user_id: { type: "ID", defaultValue: null }
    auth_client_id: { type: "ID", defaultValue: null }
    server_uid: { type: "ID!" }
  )
  @refetchable(queryName: "MqttAuthLogsPaginationFragmentRefetchQuery") {
    __id
    mqttAuthLogs(
      server_uid:$server_uid,
      first: $first,
      after: $after,
      auth_user_id:$auth_user_id,
      auth_client_id:$auth_client_id)
      @connection(key: "MqttAuthLogsPaginationFragmentConnection_mqttAuthLogs") {
      __id
      edges {
        node {
          id
          ...MqttAuthLogItemDataFragment
        }
      }
    }
  }
`;

export const Log_PARAM_NAME = "Log_id"

export default React.memo(MqttAuthLogs)

type MqttAuthLogsProps = {
  dataRef:(MqttAuthClientsPaginationFragment$key | null) & 
  (MqttAuthUsersPaginationFragment$key | null) &
  (MqttAuthLogsPaginationFragment$key  | null)
}

function MqttAuthLogs({dataRef}:MqttAuthLogsProps) {
  
  const [searchParams, setSearchParams] = useSearchParams();
  
  const isOpen = useMemo(() => 
    searchParams.get(Log_PARAM_NAME)!== null, [searchParams]
  );
  
  const handleModalClose = useCallback(() => {
    searchParams.delete(Log_PARAM_NAME);
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  
  return <MqttAuthLogsCtxProvider>
  <Modal
    position="top"
    isOpen={isOpen}
    onClose={handleModalClose}
    component={
      <MqttLogDetail />
    }
  />
    <Section 
      name={"Auth Events"}
      bar={<MqttAuthLogsBar dataRef={dataRef}/>}
      component={
        <InfinityScrollTable
          height="h-96"
          header={<Header/>}
        >
          <LogListBody dataRef={dataRef}/>
        </InfinityScrollTable>
      }
    />
  </MqttAuthLogsCtxProvider>
}

type LogListBodyProps = {

}&MqttAuthLogsProps

function LogListBody({dataRef}:LogListBodyProps){

  const { id }: any = useParams<string>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [server_id] = useState(id)

  const ctx = useMqttAuthLogsCtx()

  const pagination = usePaginationFragment<
  MqttAuthLogsPaginationFragmentRefetchQuery,
  MqttAuthLogsPaginationFragment$key
  >(MqttAuthLogsPaginationFragment, dataRef);

  useDidMountEffect(() => {
    startTransition(() => {
      pagination.refetch({
        server_uid:server_id,
        auth_client_id:ctx.client_filter.id ?? null,
        auth_user_id:ctx.user_filter.id ?? null,
        first:100
      })
    
    },);
  }, [ctx.client_filter,ctx.user_filter])
  
  const conCtx = useMqttAuthLogsCtx();
  
  useEffect(() => {
    pagination.data?.mqttAuthLogs?.__id &&
      conCtx.setId(pagination.data?.mqttAuthLogs?.__id)
  }, [pagination.data?.mqttAuthLogs?.__id,conCtx])
  
  const handleLoadMore = useCallback(
    () => {
      pagination.loadNext(10);
    },
    [pagination],
  )
  
  const [searchParams, setSearchParams] = useSearchParams();

  const handleItemDetail = useCallback(
    (Log_id: string | null | undefined) => {
      searchParams.delete(Log_PARAM_NAME);
      if (Log_id) {
        searchParams.append(Log_PARAM_NAME, Log_id);
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
        pagination?.data?.mqttAuthLogs?.edges?.map((edge,index)=>{

          if(edge === null || edge === undefined){
            return <></>
          }

          return <MqttAuthLogItem 
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
    <tr className="flex w-6/12 2xl:w-3/12">
      <th>Result</th>
    </tr>
    <tr className="w-6/12 2xl:w-6/12 hidden 2xl:flex">
      <th>Source</th>
    </tr>
    <tr className="flex justify-center items-center text-center w-5/12 2xl:w-3/12">
      <th>TimeStamp</th>
    </tr>
  </TableHeader>
}