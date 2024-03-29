import React, { useCallback } from "react";
import SystemLogDetail from "./SystemLogDetail";
import { SystemLogItem } from "./SystemLogItem";
import { graphql } from "babel-plugin-relay/macro";
import Modal from "../../../UIComponents/Modal/Modal";
import Section from "../../../UIComponents/Section/Section";
import TableHeader from "../../../UIComponents/Table/TableHeader";
import { useLazyLoadQuery, usePaginationFragment } from "react-relay";
import { SystemLogsQuery } from "./__generated__/SystemLogsQuery.graphql";
import { useSearchParamHandler } from "../../../Hooks/useHandleSearchParam";
import InfinityScrollBody from "../../../UIComponents/Table/InfinityScrollBody";
import InfinityScrollTable from "../../../UIComponents/Table/InfinityScrollTable";
import { SystemLogsPaginationFragment$key } from "./__generated__/SystemLogsPaginationFragment.graphql";
import { SystemLogsPaginationFragmentRefetchQuery } from "./__generated__/SystemLogsPaginationFragmentRefetchQuery.graphql";


const SystemLogsTag = graphql`
  query SystemLogsQuery{
    ...SystemLogsPaginationFragment
  }
`;

const SystemLogsPaginationFragment = graphql`
  fragment SystemLogsPaginationFragment on Query
  @argumentDefinitions(
    first: { type: Int, defaultValue: 20 }
    after: { type: String }
  )
  @refetchable(queryName: "SystemLogsPaginationFragmentRefetchQuery") {
    __id
    systemLogs(first: $first, after: $after)
      @connection(key: "SystemLogsPaginationFragmentConnection_systemLogs") {
      __id
      edges {
        node {
          iD
          ...SystemLogItemDataFragment
        }
      }
    }
  }
`;

export const LOG_PARAM_NAME = "log_id"

export default React.memo(SystemLogs)

function SystemLogs() {

  const data = useLazyLoadQuery<SystemLogsQuery>(
    SystemLogsTag,
    {},
    {
      fetchPolicy: "store-and-network",
    },
  );

  const pagination = usePaginationFragment<
  SystemLogsPaginationFragmentRefetchQuery,
  SystemLogsPaginationFragment$key
  >(SystemLogsPaginationFragment, data);

  
  const handleLoadMore = useCallback(
    () => {
      pagination.loadNext(10);
    },
    [pagination],
  )
  
  const [isOpen, open, close] = useSearchParamHandler(LOG_PARAM_NAME);
  
  return <>
    <Modal
      position="top"
      isOpen={isOpen}
      onClose={close}
      component={
        <SystemLogDetail />
      }
    />
    <Section 
      name={"Logs"}
      component={
        <InfinityScrollTable
        header={<Header/>}

        >
          <InfinityScrollBody onEnd={handleLoadMore}>
            {
              pagination?.data?.systemLogs?.edges?.map((edge,index)=>{
                  return <SystemLogItem 
                  key={edge.node?.iD??index}
                  dataRef={edge.node}
                  onItemClick={open}
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