import clsx from "clsx";
import { useEffect } from "react";
import { AdapterListItem } from "./AdapterListItem";
import { graphql } from "babel-plugin-relay/macro";
import { usePaginationFragment } from "react-relay";
import { useMonitorAdapterListCtx } from "./AdapterListCtxProvider";
import { AdapterListRefetchQuery } from "./__generated__/AdapterListRefetchQuery.graphql";
import { AdapterListDataFragment$key } from "./__generated__/AdapterListDataFragment.graphql";

export const AdapterListDataFragment = graphql`
  fragment AdapterListDataFragment on Query 
  @argumentDefinitions(
    first: { type: Int }
    after: { type: String }
  ) @refetchable(queryName: "AdapterListRefetchQuery") {
    adapters(
      first: $first   
      after: $after
    ) @connection(key: "AdapterListConnection_adapters"){
      __id
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
      edges {
        node {
          id
          ...AdapterListItemDataFragment
        }
      }
    }
  }
`;

// -------------------------------

type AdapterListProps = {
  dataRef:AdapterListDataFragment$key;
};

export default function AdapterList({dataRef}:AdapterListProps){

  const page_data = usePaginationFragment<
    AdapterListRefetchQuery,
    AdapterListDataFragment$key
  >(AdapterListDataFragment, dataRef);

  const context = useMonitorAdapterListCtx();

  useEffect(() => {
    page_data?.data.adapters?.__id && context.setId(page_data?.data.adapters?.__id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page_data?.data.adapters?.__id])

  return <table className={clsx("flex bg-gray-100 flex-col w-full",
    "border border-gray-200 rounded-sm shadow-sm pt-2")}>
    <AdapterListHeader/>
    {
      page_data?.data?.adapters?.edges
        ?.filter(e=>e !== null && e !== undefined)
        .map((entity) => {
          return <AdapterListItem 
                  key={entity.node?.id}
                  dataRef={entity.node}
                  />
        })
    }
  </table> 
}

// -------------------------------

type AdapterListHeaderProps = {

}

function AdapterListHeader({}:AdapterListHeaderProps){

  return <thead className={clsx("flex text-gray-600 w-full",
    "space-x-2 justify-between border-b border-gray-200",
    "py-2 lg:pb-5 mb-1 px-2 md:px-5 select-none")}>
    <tr className="flex w-6/12 2xl:w-8/12">
      <th>Name</th>
    </tr>
    <tr className="w-3/12 2xl:w-2/12 text-center justify-center hidden md:flex">
      <th>Type</th>
    </tr>
    <tr className="flex w-3/12 2xl:w-2/12 text-center justify-center">
      <th>State</th>
    </tr>
  </thead>
} 