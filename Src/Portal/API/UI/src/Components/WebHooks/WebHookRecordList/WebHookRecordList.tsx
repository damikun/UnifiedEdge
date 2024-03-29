import { graphql } from "babel-plugin-relay/macro";
import { usePaginationFragment } from "react-relay";
import Modal from "../../../UIComponents/Modal/Modal";
import { WebHookRecordItem } from "./WebHookRecordItem";
import WebHookRecordDetail from "./WebHookRecordDetail";
import Section from "../../../UIComponents/Section/Section";
import React, { useCallback, useEffect, useState } from "react";
import TableHeader from "../../../UIComponents/Table/TableHeader";
import { useSearchParamHandler } from "../../../Hooks/useHandleSearchParam";
import InfinityScrollBody from "../../../UIComponents/Table/InfinityScrollBody";
import InfinityScrollTable from "../../../UIComponents/Table/InfinityScrollTable";
import { WebHookRecordListPaginationFragment$key } from "./__generated__/WebHookRecordListPaginationFragment.graphql";
import { WebHookRecordListPaginationFragmentRefetchQuery } from "./__generated__/WebHookRecordListPaginationFragmentRefetchQuery.graphql";


const WebHookRecordListPaginationFragment = graphql`
  fragment WebHookRecordListPaginationFragment on Query
  @argumentDefinitions(
    first: { type: Int, defaultValue: 20 }
    after: { type: String }
    hook_id: { type: "ID!" }
  )
  @refetchable(queryName: "WebHookRecordListPaginationFragmentRefetchQuery") {
    __id
    webHookRecords(hook_id:$hook_id, first: $first, after: $after)
      @connection(key: "WebHookRecordListPaginationFragmentConnection_webHookRecords") {
      __id
      edges {
        node {
          id
          ...WebHookRecordItemDataFragment
        }
      }
    }
  }
`;

export const RECORD_PARAM_NAME = "record_id"

export default React.memo(WebHookRecordList)

type WebHookRecordListProps = {
  dataRef: WebHookRecordListPaginationFragment$key | null;
}

function WebHookRecordList({dataRef}:WebHookRecordListProps) {

  const pagination = usePaginationFragment<
  WebHookRecordListPaginationFragmentRefetchQuery,
  WebHookRecordListPaginationFragment$key
  >(WebHookRecordListPaginationFragment, dataRef);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [connectionId, setConnectionId] = useState<string | undefined>(pagination.data?.webHookRecords?.__id);

  useEffect(() => {
    setConnectionId(pagination.data?.webHookRecords?.__id)
  }, [pagination.data?.webHookRecords?.__id])
  
  const handleLoadMore = useCallback(
    () => {
      pagination.loadNext(10);
    },
    [pagination],
  )
  
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isOpen, open, close] = useSearchParamHandler(RECORD_PARAM_NAME);

  return <>

    <Modal
      position="top"
      isOpen={isOpen}
      onClose={close}
      component={
        <WebHookRecordDetail />
      }
    />

    <Section 
      name={"Records"}
      component={
      <InfinityScrollTable
        header={<Header/>}
        height="h-80"
        >
          <InfinityScrollBody height="h-80" onEnd={handleLoadMore}>
            {
              pagination?.data?.webHookRecords?.edges?.map((edge,index)=>{
                  return <WebHookRecordItem 
                  key={edge.node?.id??index}
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
    <tr className="flex w-20 items-center justify-center">
      <th>State</th>
    </tr>
    <tr className="flex-1 hidden lg:flex">
      <th>Trigger</th>
    </tr>
    <tr className="flex lg:flex items-center truncate my-auto">
      <th>Time</th>
    </tr>
    <tr className="flex w-24 md:w-28 items-center justify-center text-center">
      <th>Status</th>
    </tr>
  </TableHeader>
}