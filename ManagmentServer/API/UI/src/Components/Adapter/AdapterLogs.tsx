import React, { useCallback } from "react";
import AdapterLogsItem from "./AdapterLogsItem";
import { graphql } from "babel-plugin-relay/macro";
import { usePaginationFragment } from "react-relay";
import Section from "../../UIComponents/Section/Section";
import TableHeader from "../../UIComponents/Table/TableHeader";
import InfinityScrollTable from "../../UIComponents/Table/InfinityScrollTable";
import { AdapterLogsPaginationFragment_logs$key } from "./__generated__/AdapterLogsPaginationFragment_logs.graphql";
import { AdapterLogsPaginationFragmentRefetchQuery } from "./__generated__/AdapterLogsPaginationFragmentRefetchQuery.graphql";


const AdapterLogsPaginationFragment = graphql`
  fragment AdapterLogsPaginationFragment_logs on GQL_Adapter
  @argumentDefinitions(
    first: { type: Int, defaultValue: 20 }
    after: { type: String }
  )
  @refetchable(queryName: "AdapterLogsPaginationFragmentRefetchQuery") {
    __id
    logs(first: $first, after: $after)
      @connection(key: "AdapterLogsPaginationFragmentConnection_logs") {
      __id
      edges {
        node {
          id
          ...AdapterLogsItemDataFragment
        }
      }
    }
  }
`;

export default React.memo(AdapterLogs)

type AdapterLogsProps = {
  dataRef:AdapterLogsPaginationFragment_logs$key | null;
}

function AdapterLogs({dataRef}:AdapterLogsProps) {
  const pagination = usePaginationFragment<
  AdapterLogsPaginationFragmentRefetchQuery,
  AdapterLogsPaginationFragment_logs$key
  >(AdapterLogsPaginationFragment, dataRef);

  const handleLoadMore = useCallback(
    () => {
      pagination.loadNext(10);
    },
    [pagination],
  )
  
  return <Section 
    name={"Logs"}
    component={
      <InfinityScrollTable
        header={<Header/>}
        onEnd={handleLoadMore}
      >
        {
          pagination?.data?.logs?.edges?.map((edge,index)=>{
              return <AdapterLogsItem 
              key={edge.node?.id??index}
              dataRef={edge.node}
            />
          })
        }
      </InfinityScrollTable>
    }
    />
}

function Header(){
  return <TableHeader>
  <tr className="flex w-6/12 2xl:w-8/12">
    <th>Name</th>
  </tr>
  <tr className="w-1/12 2xl:w-2/12 text-center justify-center hidden md:flex">
    <th>State</th>
  </tr>
  <tr className="flex w-5/12 2xl:w-2/12 text-center justify-center">
    <th>Timestamp</th>
  </tr>
  </TableHeader>
}