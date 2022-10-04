import clsx from "clsx";
import React, { useCallback } from "react";
import { graphql } from "babel-plugin-relay/macro";
import { useSearchParams } from "react-router-dom";
import { usePaginationFragment } from "react-relay";
import { DETAIL_ID_PARAM_NAME } from "../SchedulerView";
import { SchedulerRecurringJobItem } from "./SchedulerRecurringJobItem";
import { SchedulerRecurringJobsDataFragment$key } from "./__generated__/SchedulerRecurringJobsDataFragment.graphql";
import StayledInfinityScrollContainer from "../../../../UIComponents/ScrollContainter/StayledInfinityScrollContainer";
import { SchedulerRecurringJobsPaginationFragmentRefetchQuery } from "./__generated__/SchedulerRecurringJobsPaginationFragmentRefetchQuery.graphql";

const SchedulerRecurringJobssDataFragment = graphql`
  fragment SchedulerRecurringJobsDataFragment on Query
  @argumentDefinitions(
    first: { type: Int, defaultValue: 20 }
    after: { type: String }
  )
  @refetchable(queryName: "SchedulerRecurringJobsPaginationFragmentRefetchQuery") {
    __id
    recurringJobs(first: $first, after: $after)
      @connection(key: "SchedulerRecurringJobsPaginationFragmentConnection_recurringJobs") {
      __id
      edges {
        node {
          id
          ...SchedulerRecurringJobItemDataFragment
        }
      }
    }
  }
`;

export default React.memo(SchedulerRecurringJobs)

type SchedulerRecurringJobsProps = {
  dataRef:SchedulerRecurringJobsDataFragment$key | null;
}

function SchedulerRecurringJobs({dataRef}:SchedulerRecurringJobsProps) {

  const pagination = usePaginationFragment<
  SchedulerRecurringJobsPaginationFragmentRefetchQuery,
  SchedulerRecurringJobsDataFragment$key
  >(SchedulerRecurringJobssDataFragment, dataRef);

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
    "border border-gray-200 rounded-sm shadow-sm pt-2",
    "h-96 bg-gray-300")}>
      <StayledInfinityScrollContainer
        header={<Header/>}
        onEnd={handleLoadMore}
      >
        {
          pagination?.data?.recurringJobs?.edges?.map((edge,index)=>{
              return <SchedulerRecurringJobItem 
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
    <div className="flex w-5/12 2xl:w-8/12">
      <div>Name</div>
    </div>
    <div className="w-2/12 2xl:w-2/12 text-center justify-center hidden lg:flex">
      <div>Result</div>
    </div>
    <div className="flex w-5/12 2xl:w-2/12 text-center justify-center">
      <div>Last run</div>
    </div>
  </div>
}