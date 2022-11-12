import { useSearchParams } from "react-router-dom";
import { graphql } from "babel-plugin-relay/macro";
import { usePaginationFragment } from "react-relay";
import Modal from "../../../UIComponents/Modal/Modal";
import { WebHookRecordItem } from "./WebHookRecordItem";
import WebHookRecordDetail from "./WebHookRecordDetail";
import Section from "../../../UIComponents/Section/Section";
import TableHeader from "../../../UIComponents/Table/TableHeader";
import React, { useCallback, useEffect, useMemo, useState } from "react";
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
  
  const [searchParams, setSearchParams] = useSearchParams();
  
  const isOpen = useMemo(() => 
    searchParams.get(RECORD_PARAM_NAME)!== null, [searchParams]
  );
  
  const handleModalClose = useCallback(() => {
    searchParams.delete(RECORD_PARAM_NAME);
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  const handleItemDetail = useCallback(
    (log_id: string | null | undefined) => {
      searchParams.delete(RECORD_PARAM_NAME);
      if (log_id) {
        searchParams.append(RECORD_PARAM_NAME, log_id);
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
        <WebHookRecordDetail />
      }
    />

    <Section 
      name={"Records"}
      component={
      <InfinityScrollTable
        header={<Header/>}
        height="h-80"
        onEnd={handleLoadMore}
        >
          <InfinityScrollBody>
            {
              pagination?.data?.webHookRecords?.edges?.map((edge,index)=>{
                  return <WebHookRecordItem 
                  key={edge.node?.id??index}
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