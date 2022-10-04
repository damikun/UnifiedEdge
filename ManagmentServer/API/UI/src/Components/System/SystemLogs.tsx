import clsx from "clsx";
import SystemLogDetail from "./SystemLogDetail";
import { SystemLogItem } from "./SystemLogItem";
import Modal from "../../UIComponents/Modal/Modal";
import { graphql } from "babel-plugin-relay/macro";
import { useSearchParams } from "react-router-dom";
import React, { useCallback, useMemo } from "react";
import Section from "../../UIComponents/Section/Section";
import { useLazyLoadQuery, usePaginationFragment } from "react-relay";
import { SystemLogsQuery } from "./__generated__/SystemLogsQuery.graphql";
import { SystemLogsPaginationFragment$key } from "./__generated__/SystemLogsPaginationFragment.graphql";
import StayledInfinityScrollContainer from "../../UIComponents/ScrollContainter/StayledInfinityScrollContainer";
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
        <SystemLogDetail />
      }
    />
    <Section 
      name={"Logs"}
      component={
        <div className={clsx("flex bg-gray-100 flex-col w-full",
        "border border-gray-200 rounded-sm shadow-sm pt-2 h-96")}>
          <StayledInfinityScrollContainer
            header={<Header/>}
            onEnd={handleLoadMore}
          >
            {
              pagination?.data?.systemLogs?.edges?.map((edge,index)=>{
                  return <SystemLogItem 
                  key={edge.node?.iD??index}
                  dataRef={edge.node}
                  onItemClick={handleItemDetail}
                />
              })
            }
          </StayledInfinityScrollContainer>
        </div>
      }
    />
  </>
}

function Header(){
  return <div className={clsx("flex text-gray-600 w-full",
  "space-x-2 justify-between border-b border-gray-200",
  "py-2 lg:pb-5 mb-1 px-2 md:px-5 select-none font-semibold")}>
    <div className="flex w-6/12 2xl:w-8/12">
      <div>Name</div>
    </div>
    <div className="w-1/12 2xl:w-2/12 text-center justify-center hidden lg:flex">
      <div>Type</div>
    </div>
    <div className="flex w-5/12 2xl:w-2/12 text-center justify-center">
      <div>Timestamp</div>
    </div>
  </div>
}