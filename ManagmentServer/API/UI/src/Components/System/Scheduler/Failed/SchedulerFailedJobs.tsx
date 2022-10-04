import clsx from "clsx";
import React, { useCallback } from "react";
import { graphql } from "babel-plugin-relay/macro";
import { useSearchParams } from "react-router-dom";
import { usePaginationFragment } from "react-relay";
import { DETAIL_ID_PARAM_NAME } from "../SchedulerView";
import { SchedulerFailedJobItem } from "./SchedulerFailedJobItem";
import { SchedulerFailedJobsDataFragment$key } from "./__generated__/SchedulerFailedJobsDataFragment.graphql";
import StayledInfinityScrollContainer from "../../../../UIComponents/ScrollContainter/StayledInfinityScrollContainer";
import { SchedulerFailedJobsPaginationFragmentRefetchQuery } from "./__generated__/SchedulerFailedJobsPaginationFragmentRefetchQuery.graphql";


const SchedulerFailedJobsDataFragment = graphql`
  fragment SchedulerFailedJobsDataFragment on Query
  @argumentDefinitions(
    first: { type: Int, defaultValue: 20 }
    after: { type: String }
  )
  @refetchable(queryName: "SchedulerFailedJobsPaginationFragmentRefetchQuery") {
    __id
    failedJobs(first: $first, after: $after)
      @connection(key: "SchedulerFailedJobsPaginationFragmentConnection_failedJobs") {
      __id
      edges {
        node {
          id
          ...SchedulerFailedJobItemDataFragment
        }
      }
    }
  }
`;

export default React.memo(SchedulerFailedJobs)

type SchedulerFailedJobsProps = {
  dataRef:SchedulerFailedJobsDataFragment$key | null;
}

function SchedulerFailedJobs({dataRef}:SchedulerFailedJobsProps) {

  const pagination = usePaginationFragment<
  SchedulerFailedJobsPaginationFragmentRefetchQuery,
  SchedulerFailedJobsDataFragment$key
  >(SchedulerFailedJobsDataFragment, dataRef);

  const handleLoadMore = useCallback(
    () => {
      pagination.loadNext(10);
    },
    [pagination],
  )
  
  const [searchParams, setSearchParams] = useSearchParams();
  
  const handleItemDetail = useCallback(
    (log_id: string | null | undefined) => {
      searchParams.delete(DETAIL_ID_PARAM_NAME);
      if (log_id) {
        searchParams.append(DETAIL_ID_PARAM_NAME, log_id);
      }
      setSearchParams(searchParams);
    },
    [searchParams, setSearchParams]
  );
  
  return <div className={clsx("flex bg-gray-100 flex-col w-full",
    "border border-gray-200 rounded-sm shadow-sm pt-2 h-96 bg-red-300")}>
      <StayledInfinityScrollContainer
        header={<Header/>}
        onEnd={handleLoadMore}
      >
        {
          pagination?.data?.failedJobs?.edges?.map((edge,index)=>{
              return <SchedulerFailedJobItem 
              key={edge.node?.id??index}
              dataRef={edge.node}
              onItemClick={handleItemDetail}
            />
          })
        }
      </StayledInfinityScrollContainer>
    </div>
}

function Header(){
  return <div className={clsx("flex text-gray-600 w-full",
  "space-x-2 justify-between border-b border-gray-200",
  "py-2 lg:pb-5 mb-1 px-2 md:px-5 select-none font-semibold")}>
    <div className="flex w-4/12 2xl:w-4/12">
      <div>Name</div>
    </div>
    <div className="w-3/12 2xl:w-6/12 text-center justify-start hidden lg:flex">
      <div>Reason</div>
    </div>
    <div className="flex w-5/12 2xl:w-2/12 text-center justify-center">
      <div className="truncate">Timestamp</div>
    </div>
  </div>
}