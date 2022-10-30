import clsx from "clsx";
import { useEffect } from "react";
import { WebHookListItem } from "./WebHookListItem";
import { graphql } from "babel-plugin-relay/macro";
import { usePaginationFragment } from "react-relay";
import { useWebHookListCtx } from "./WebHookListCtxProvider";
import { WebHookListRefetchQuery } from "./__generated__/WebHookListRefetchQuery.graphql";
import { WebHookListDataFragment$key } from "./__generated__/WebHookListDataFragment.graphql";


export const WebHookListDataFragment = graphql`
  fragment WebHookListDataFragment on Query 
  @argumentDefinitions(
    first: { type: Int, defaultValue: 100 }
    after: { type: String }
  ) @refetchable(queryName: "WebHookListRefetchQuery") {
    webHooks(
      first: $first   
      after: $after
    ) @connection(key: "WebHookListConnection_webHooks"){
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
          ...WebHookListItemDataFragment
        }
      }
    }
  }
`;

// -------------------------------

type WebHookListProps = {
  dataRef:WebHookListDataFragment$key;
};

export default function WebHookList({dataRef}:WebHookListProps){

  const page_data = usePaginationFragment<
    WebHookListRefetchQuery,
    WebHookListDataFragment$key
  >(WebHookListDataFragment, dataRef);

  const context = useWebHookListCtx();

  useEffect(() => {
    page_data?.data.webHooks?.__id && context.setId(page_data?.data.webHooks?.__id)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page_data?.data.webHooks?.__id])

  return <table className={clsx("flex bg-gray-100 flex-col w-full",
    "border border-gray-200 rounded-sm shadow-sm pt-2")}>
    <WebHookListHeader/>
    {
      page_data?.data?.webHooks?.edges
        ?.filter(e=>e !== null && e !== undefined)
        .map((entity) => {
          return <WebHookListItem 
                  key={entity.node?.id}
                  dataRef={entity.node}
                  />
        })
    }
  </table> 
}

// -------------------------------

type WebHookListHeaderProps = {

}

function WebHookListHeader({}:WebHookListHeaderProps){

  return <thead className={clsx("flex text-gray-600 w-full",
    "space-x-2 border-b justify-between lg:justify-start border-gray-200",
    "py-2 lg:pb-5 mb-1 px-2 md:px-5 select-none")}>
    <tr className="flex w-3/12">
      <th>Name</th>
    </tr>
    <tr className="w-6/12 2xl:w-7/12 hidden lg:flex">
      <th>Url</th>
    </tr>
    <tr className="w-3/12 2xl:w-2/12 justify-center">
      <th>Last run</th>
    </tr>
  </thead>
} 