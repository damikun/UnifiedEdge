import clsx from "clsx";
import React, { useCallback } from "react";
import { graphql } from "babel-plugin-relay/macro";
import { useSearchParams } from "react-router-dom";
import { usePaginationFragment } from "react-relay";
import { DETAIL_ID_PARAM_NAME } from "../SchedulerView";
import { SchedulerFailedJobItem } from "./SchedulerFailedJobItem";
import TableHeader from "../../../../UIComponents/Table/TableHeader";
import InfinityScrollTable from "../../../../UIComponents/Table/InfinityScrollTable";
import { SchedulerFailedJobsDataFragment$key } from "./__generated__/SchedulerFailedJobsDataFragment.graphql";
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
  
  return <InfinityScrollTable
    className="pt-2 bg-red-300"
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
  </InfinityScrollTable>
}

function Header(){
  return <TableHeader>
    <tr className="flex w-4/12 2xl:w-4/12">
      <th>Name</th>
    </tr>
    <tr className="w-3/12 2xl:w-6/12 text-center justify-start hidden lg:flex">
      <th>Reason</th>
    </tr>
    <tr className="flex w-5/12 2xl:w-2/12 text-center justify-center">
      <th className="truncate">Timestamp</th>
    </tr>
  </TableHeader>
}