import React, { useCallback } from "react";
import { graphql } from "babel-plugin-relay/macro";
import { useSearchParams } from "react-router-dom";
import { usePaginationFragment } from "react-relay";
import { DETAIL_ID_PARAM_NAME } from "../SchedulerView";
import { SchedulerSuccessJobItem } from "./SchedulerSuccessJobItem";
import TableHeader from "../../../../UIComponents/Table/TableHeader";
import InfinityScrollBody from "../../../../UIComponents/Table/InfinityScrollBody";
import InfinityScrollTable from "../../../../UIComponents/Table/InfinityScrollTable";
import { SchedulerSuccessJobsDataFragment$key } from "./__generated__/SchedulerSuccessJobsDataFragment.graphql";
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
  
  return  <InfinityScrollTable
    className="pt-2 bg-green-300"
    header={<Header/>}
    >
    <InfinityScrollBody onEnd={handleLoadMore}>
      {
        pagination?.data?.successJobs?.edges?.map((edge,index)=>{
            return <SchedulerSuccessJobItem 
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
    <tr className="flex w-5/12 2xl:w-6/12">
      <th>Name</th>
    </tr>
    <tr className="w-2/12 2xl:w-3/12 text-center justify-center hidden lg:flex">
      <th>Duration</th>
    </tr>
    <tr className="flex w-5/12 2xl:w-3/12 text-center justify-center">
      <th>Timestamp</th>
    </tr>
  </TableHeader>
}