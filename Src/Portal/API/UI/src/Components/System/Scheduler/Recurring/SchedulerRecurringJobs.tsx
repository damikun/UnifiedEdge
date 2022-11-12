import React, { useCallback } from "react";
import { graphql } from "babel-plugin-relay/macro";
import { useSearchParams } from "react-router-dom";
import { usePaginationFragment } from "react-relay";
import { DETAIL_ID_PARAM_NAME } from "../SchedulerView";
import TableHeader from "../../../../UIComponents/Table/TableHeader";
import { SchedulerRecurringJobItem } from "./SchedulerRecurringJobItem";
import InfinityScrollBody from "../../../../UIComponents/Table/InfinityScrollBody";
import InfinityScrollTable from "../../../../UIComponents/Table/InfinityScrollTable";
import { SchedulerRecurringJobsDataFragment$key } from "./__generated__/SchedulerRecurringJobsDataFragment.graphql";
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
  
  return <InfinityScrollTable
    className="pt-2 bg-gray-300"
    header={<Header/>}
    onEnd={handleLoadMore}
    >
    <InfinityScrollBody>
      {
        pagination?.data?.recurringJobs?.edges?.map((edge,index)=>{
            return <SchedulerRecurringJobItem 
            key={edge.node?.id??index}
            dataRef={edge.node}
            onItemClick={handleItemDetail}
          />
        })
      }
    </InfinityScrollBody>
  </InfinityScrollTable>
}

function Header(){
  return <TableHeader>
    <tr className="flex w-5/12 2xl:w-8/12">
      <th>Name</th>
    </tr>
    <tr className="w-2/12 2xl:w-2/12 text-center justify-center hidden lg:flex">
      <th>Result</th>
    </tr>
    <tr className="flex w-5/12 2xl:w-2/12 text-center justify-center">
      <th>Last run</th>
    </tr>
  </TableHeader>
}