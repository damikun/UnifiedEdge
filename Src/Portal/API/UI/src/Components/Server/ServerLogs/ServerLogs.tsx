import ServerLogDetail from "./ServerlogDetail";
import { ServerLogsItem } from "./ServerLogsItem";
import { graphql } from "babel-plugin-relay/macro";
import { usePaginationFragment } from "react-relay";
import Modal from "../../../UIComponents/Modal/Modal";
import Section from "../../../UIComponents/Section/Section";
import { useParams, useSearchParams } from "react-router-dom";
import React, { useCallback, useMemo, useState } from "react";
import TableHeader from "../../../UIComponents/Table/TableHeader";
import InfinityScrollBody from "../../../UIComponents/Table/InfinityScrollBody";
import InfinityScrollTable from "../../../UIComponents/Table/InfinityScrollTable";
import { ServerLogsPaginationFragment_logs$key } from "./__generated__/ServerLogsPaginationFragment_logs.graphql";
import { ServerLogsPaginationFragmentRefetchQuery } from "./__generated__/ServerLogsPaginationFragmentRefetchQuery.graphql";


const ServerLogsPaginationFragment = graphql`
  fragment ServerLogsPaginationFragment_logs on Query
  @argumentDefinitions(
    first: { type: Int, defaultValue: 20 }
    after: { type: String }
    id: { type: "ID!" }
  )
  @refetchable(queryName: "ServerLogsPaginationFragmentRefetchQuery") {
    __id
    serverLogs(server_id:$id, first: $first, after: $after)
      @connection(key: "ServerLogsPaginationFragmentConnection_serverLogs") {
      __id
      edges {
        node {
          ... on GQL_IServerEvent{
            iD
            ...ServerLogsItemDataFragment
          }
        }
      }
    }
  }
`;

export const LOG_PARAM_NAME = "log_id"

export default React.memo(ServerLogs)

type ServerLogsProps = {
  dataRef:ServerLogsPaginationFragment_logs$key | null;
}

function ServerLogs({dataRef}:ServerLogsProps) {

  const { id }: any = useParams<string>();
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [server_id] = useState<string>(id)

  const pagination = usePaginationFragment<
  ServerLogsPaginationFragmentRefetchQuery,
  ServerLogsPaginationFragment_logs$key
  >(ServerLogsPaginationFragment, dataRef);

  const handleLoadMore = useCallback(
    () => {
      pagination.loadNext(10);
    },
    [pagination],
  )
  
  const [searchParams, setSearchParams] = useSearchParams();
  
  const isOpen = useMemo(() => 
    searchParams.get(LOG_PARAM_NAME)!== null, [searchParams]
  );
  
  const handleModalClose = useCallback(() => {
    searchParams.delete(LOG_PARAM_NAME);
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  const handleItemDetail = useCallback(
    (log_id: string | null | undefined) => {
      searchParams.delete(LOG_PARAM_NAME);
      if (log_id) {
        searchParams.append(LOG_PARAM_NAME, log_id);
      }
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );

  return <>
    <Modal
      position="top"
      isOpen={isOpen}
      onClose={handleModalClose}
      component={
        <ServerLogDetail />
      }
    />
    <Section 
      name={"Application logs"}
      component={
        <InfinityScrollTable
          header={<Header/>}
        >
          <InfinityScrollBody onEnd={handleLoadMore}>
            {
              pagination?.data?.serverLogs?.edges?.map((edge,index)=>{
                  return <ServerLogsItem 
                  key={edge.node?.iD??index}
                  dataRef={edge.node}
                  onItemClick={handleItemDetail}
                />
              })
            }
          </InfinityScrollBody>
        </InfinityScrollTable>
      }
      />
    </>
}

function Header(){
  return <TableHeader>
  <tr className="flex w-6/12 2xl:w-8/12">
    <th>Name</th>
  </tr>
  <tr className="w-1/12 2xl:w-2/12 text-center justify-center hidden lg:flex">
    <th>Type</th>
  </tr>
  <tr className="flex w-5/12 2xl:w-2/12 text-center justify-center">
    <th>Timestamp</th>
  </tr>
</TableHeader>
}