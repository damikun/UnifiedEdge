import clsx from "clsx";
import { useSearchParams } from "react-router-dom";
import { graphql } from "babel-plugin-relay/macro";
import { usePaginationFragment } from "react-relay";
import Modal from "../../../UIComponents/Modal/Modal";
import { WebHookRecordItem } from "./WebHookRecordItem";
import WebHookRecordDetail from "./WebHookRecordDetail";
import Section from "../../../UIComponents/Section/Section";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import StayledInfinityScrollContainer from "../../../UIComponents/ScrollContainter/StayledInfinityScrollContainer";
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
  
  return <Section 
    name={"Records"}
    component={
      <>
      <Modal
        position="top"
        isOpen={isOpen}
        onClose={handleModalClose}
        component={
          <WebHookRecordDetail />
        }
      />
      <div className={clsx("flex bg-gray-100 flex-col w-full",
      "border border-gray-200 rounded-sm shadow-sm pt-2 h-96")}>
        <StayledInfinityScrollContainer
          header={<Header/>}
          onEnd={handleLoadMore}
        >
          {
            pagination?.data?.webHookRecords?.edges?.map((edge,index)=>{
                return <WebHookRecordItem 
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
  return <div className={clsx("flex space-x-2 py-1",
  "text-gray-700 border-gray-200 border-b",
  "py-2 lg:pb-3 mb-1 px-2 md:px-5 select-none font-semibold")}>
    <div className="flex w-20 items-center justify-center">
      <div>State</div>
    </div>
    <div className="flex-1 hidden lg:flex">
      <div>Trigger</div>
    </div>
    <div className="flex-1 lg:w-44">
      <div>Time</div>
    </div>
    <div className="flex w-24 md:w-28 items-center text-center">
      <div>Status</div>
    </div>
  </div>
}