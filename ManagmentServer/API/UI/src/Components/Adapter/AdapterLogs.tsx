import clsx from "clsx";
import React, { useCallback } from "react";
import { usePaginationFragment } from "react-relay";
import AdapterLogsItem from "./AdapterLogsItem";
import { graphql } from "babel-plugin-relay/macro";
import Section from "../../UIComponents/Section/Section";
import StayledInfinityScrollContainer from "../../UIComponents/ScrollContainter/StayledInfinityScrollContainer";
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
      <div className={clsx("flex bg-gray-100 flex-col w-full",
      "border border-gray-200 rounded-sm shadow-sm pt-2 h-96")}>
        <StayledInfinityScrollContainer
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
        </StayledInfinityScrollContainer>
      </div>
    }
    />
}

function Header(){
  return <div className={clsx("flex text-gray-600 w-full",
  "space-x-2 justify-between border-b border-gray-200",
  "py-2 lg:pb-5 mb-1 px-2 md:px-5 select-none font-semibold")}>
  <div className="flex w-6/12 2xl:w-8/12">
    <div>Name</div>
  </div>
  <div className="w-1/12 2xl:w-2/12 text-center justify-center hidden md:flex">
    <div>State</div>
  </div>
  <div className="flex w-5/12 2xl:w-2/12 text-center justify-center">
    <div>Timestamp</div>
  </div>
</div>
}