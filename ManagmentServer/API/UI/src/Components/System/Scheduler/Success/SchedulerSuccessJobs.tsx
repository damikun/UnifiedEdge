import clsx from "clsx";
import React, { useCallback } from "react";
import { graphql } from "babel-plugin-relay/macro";
import { useSearchParams } from "react-router-dom";
import { usePaginationFragment } from "react-relay";
import { DETAIL_ID_PARAM_NAME } from "../SchedulerView";
import { SchedulerSuccessJobItem } from "./SchedulerSuccessJobItem";
import { SchedulerSuccessJobsDataFragment$key } from "./__generated__/SchedulerSuccessJobsDataFragment.graphql";
import StayledInfinityScrollContainer from "../../../../UIComponents/ScrollContainter/StayledInfinityScrollContainer";
import { SchedulerSuccessJobsPaginationFragmentRefetchQuery } from "./__generated__/SchedulerSuccessJobsPaginationFragmentRefetchQuery.graphql";

const SchedulerSuccessJobsDataFragment = graphql`
  fragment SchedulerSuccessJobsDataFragment on Query
  @argumentDefinitions(
    first: { type: Int, defaultValue: 20 }
    after: { type: String }
  )
  @refetchable(queryName: "SchedulerSuccessJobsPaginationFragmentRefetchQuery") {
    __id
    successJobs(first: $first, after: $after)
      @connection(key: "SchedulerSuccessJobsPaginationFragmentConnection_successJobs") {
      __id
      edges {
        node {
          id
          ...SchedulerSuccessJobItemDataFragment
        }
      }
    }
  }
`;

export default React.memo(SchedulerSuccessJobs)

type SchedulerSuccessJobsProps = {
  dataRef:SchedulerSuccessJobsDataFragment$key | null;
}

function SchedulerSuccessJobs({dataRef}:SchedulerSuccessJobsProps) {

  const pagination = usePaginationFragment<
  SchedulerSuccessJobsPaginationFragmentRefetchQuery,
  SchedulerSuccessJobsDataFragment$key
  >(SchedulerSuccessJobsDataFragment, dataRef);

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
    "border border-gray-200 rounded-sm shadow-sm pt-2 h-96 bg-green-300")}>
      <StayledInfinityScrollContainer
        header={<Header/>}
        onEnd={handleLoadMore}
      >
        {
          pagination?.data?.successJobs?.edges?.map((edge,index)=>{
              return <SchedulerSuccessJobItem 
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
    <div className="flex w-5/12 2xl:w-6/12">
      <div>Name</div>
    </div>
    <div className="w-2/12 2xl:w-3/12 text-center justify-center hidden lg:flex">
      <div>Duration</div>
    </div>
    <div className="flex w-5/12 2xl:w-3/12 text-center justify-center">
      <div>Timestamp</div>
    </div>
  </div>
}