import clsx from "clsx";
import { useEffect } from "react";
import { ServerListItem } from "./ServerListItem";
import { graphql } from "babel-plugin-relay/macro";
import { usePaginationFragment } from "react-relay";
import { useMonitorServerListCtx } from "./ServerListCtxProvider";
import { ServerListRefetchQuery } from "./__generated__/ServerListRefetchQuery.graphql";
import { ServerListDataFragment$key } from "./__generated__/ServerListDataFragment.graphql";

export const ServerListDataFragment = graphql`
  fragment ServerListDataFragment on Query 
  @argumentDefinitions(
    first: { type: Int }
    after: { type: String }
  ) @refetchable(queryName: "ServerListRefetchQuery") {
    servers(
      first: $first   
      after: $after
    ) @connection(key: "ServerListConnection_servers"){
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
          ...ServerListItemDataFragment
        }
      }
    }
  }
`;

// -------------------------------

type ServerListProps = {
  dataRef:ServerListDataFragment$key;
};

export default function ServerList({dataRef}:ServerListProps){

  const page_data = usePaginationFragment<
    ServerListRefetchQuery,
    ServerListDataFragment$key
  >(ServerListDataFragment, dataRef);

  const context = useMonitorServerListCtx();

  useEffect(() => {
    page_data?.data.servers?.__id && context.setId(page_data?.data.servers?.__id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page_data?.data.servers?.__id])

  return <table className={clsx("flex bg-gray-100 flex-col w-full",
    "border border-gray-200 rounded-sm shadow-sm pt-2")}>
    <ServerListHeader/>
    {
      page_data?.data?.servers?.edges
        ?.filter(e=>e !== null && e !== undefined)
        .map((entity) => {
          return <ServerListItem 
                  key={entity.node?.id}
                  dataRef={entity.node}
                  />
        })
    }
  </table> 
}

// -------------------------------

type ServerListHeaderProps = {

}

function ServerListHeader({}:ServerListHeaderProps){

  return <thead className={clsx("flex text-gray-600 w-full",
    "space-x-2 justify-between border-b border-gray-200",
    "py-2 lg:pb-5 mb-1 px-2 md:px-5 select-none")}>
    <tr className="flex w-6/12 2xl:w-8/12">
      <th>Name</th>
    </tr>
    <tr className="flex w-3/12 2xl:w-2/12 text-center justify-center">
      <th>Type</th>
    </tr>
    <tr className="flex w-3/12 2xl:w-2/12 text-center justify-center">
      <th>State</th>
    </tr>
  </thead>
} 